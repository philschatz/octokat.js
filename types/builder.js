const fs = require('fs')

const routes = require('./routes.json')
const _ = require('lodash')
const plus = require('../src/plus')

// Map of URL -> Method -> Params
const converted = {}

// Extract the info we need from routes.json
Object.keys(routes).forEach((key1) => {
  Object.keys(routes[key1]).forEach((key2) => {

    const {url, method, params} = routes[key1][key2]

    if (url) {
      converted[url] = converted[url] || {}
      converted[url][method] = _.omitBy(params, (value, keyName) => keyName.startsWith('$'))
    }
  })
})


// Construct the tree we will need
const convertedTree = {/*childrenWithoutArgs: {}, childrenWithArgs: {}*/}

// It will have a format similar to:
// {
//   'repos': {
//     childrenWithArgs: {
//       ':owner/:name': CHILD_NODE
//     }
//     childrenWithoutArgs: {
//       'issues': CHILD_NODE
//     },
//     methods: {
//       'GET': {
//         'labels': { required: false, type: 'String'}}
//       }
//     }
//   },
// }

Object.keys(converted).forEach((route) => {

  function addArgsSegment(treeNode, argsSegment) {
    treeNode.childrenWithArgs = treeNode.childrenWithArgs || {}
    const childNode = treeNode.childrenWithArgs[argsSegment] || {/*childrenWithArgs: {}, childrenWithoutArgs: {}, methods: {}*/}
    treeNode.childrenWithArgs[argsSegment] = childNode // add if does not exist yet

    if (Object.keys(treeNode.childrenWithArgs).length > 1) {
      // woah, multiple functions. Let's check if they have the same number of args
      console.log('Duplicates for', segments.slice(1, segmentIndex).join('/'), Object.keys(treeNode.childrenWithArgs));
    }
    return childNode
  }

  function addSegment(treeNode, segment) {
    treeNode.childrenWithoutArgs = treeNode.childrenWithoutArgs || {}
    const childNode = treeNode.childrenWithoutArgs[segment] || {/*childrenWithArgs: {}, childrenWithoutArgs: {}, methods: {}*/}
    treeNode.childrenWithoutArgs[segment] = childNode // add if does not exist yet
    return childNode
  }


  const segments = route.split(/\/|\.\.\./)
  let treeNode = convertedTree
  let segmentIndex = 1 // because each route begins with a '/'
  let args = [] // these get added on and then cleared as we walk through the route
  while (segments[segmentIndex]) {
    const segment = segments[segmentIndex]
    if (segment[0] === ':') {
      // it is an argument
      args.push(segment)
    } else {
      if (args.length > 0) {
        const argsSegment = args.join('/')

        treeNode = addArgsSegment(treeNode, argsSegment)
        args = []

      }

      treeNode = addSegment(treeNode, segment)
      args = []
    }
    segmentIndex++
  }

  // Copy/pasta from above
  if (args.length > 0) {
    const argsSegment = args.join('/')

    treeNode = addArgsSegment(treeNode, argsSegment)
    args = []
  }


  // Attach the methods to the node
  treeNode._route = route
  treeNode.methods = converted[route]
})

// console.log(JSON.stringify(convertedTree));

// Delete the root `childrenWithArgs` because Octokat does not support GitLFS
delete convertedTree.childrenWithArgs









const addVerbMethods = (declarations, pathSoFar, treeNode) => {
  const ret = []

  function addDeclaration(methodName) {
    const method = treeNode.methods[methodName]
    if (Object.keys(method).length > 0) {
      const typeName = plus.camelize(`${pathSoFar}_${methodName.toLowerCase()}_Params`)

      let isEverythingOptional = true
      const params = Object.keys(method).map((key) => {
        let {type, required} = method[key]
        // Rewrite types like Array and Json into something for typescript
        if (type === 'Array') {
          type = `String[]`
        } else if (type === 'Json') {
          type = `Object`
        }
        if (required) {
          isEverythingOptional = false
        }
        return `${key}${required? '' : '?'}: ${type};`
      })
      declarations.push(`export type ${typeName} = { ${params.join('\n')} }`)
      return `params${isEverythingOptional ? `?` : ``}: ${typeName}`
    } else {
      return `` // There are no args when calling .fetch() (or whatever verb it is)
    }
  }
  if (treeNode.methods) {
    if (treeNode.methods['GET']) {
      const paramsName = addDeclaration('GET')
      ret.push(`fetch(${paramsName}): Promise<any>`)
      ret.push(`fetchAll(${paramsName}): Promise<any>`)
      ret.push(`read(${paramsName}): Promise<any>`)
      ret.push(`readBinary(${paramsName}): Promise<any>`)
    }
    if (treeNode.methods['POST']) {
      const paramsName = addDeclaration('POST')
      ret.push(`create(${paramsName}): Promise<any>`)
    }
    if (treeNode.methods['PATCH']) {
      const paramsName = addDeclaration('PATCH')
      ret.push(`update(${paramsName}): Promise<any>`)
    }
    if (treeNode.methods['PUT']) {
      const paramsName = addDeclaration('PUT')
      ret.push(`add(${paramsName}): Promise<any>`)
    }
    if (treeNode.methods['DELETE']) {
      const paramsName = addDeclaration('DELETE')
      ret.push(`remove(${paramsName}): Promise<any>`)
    }
  } else {
    ret.push(`// No verb methods`)
  }
  return ret
}

const shortcutBuildType = (keyName, declarations, treeNode, myName, pathSoFar) => {
  if (treeNode.childrenWithArgs && !treeNode.childrenWithoutArgs && !treeNode.methods) {
    // This is copy/pasta from below. since it is a "shortcut"
    const argsStr = Object.keys(treeNode.childrenWithArgs)[0]
    const value = treeNode.childrenWithArgs[argsStr]
    const args = argsStr.split('/').map((arg) => {
      return `${arg.substring(1)}: any`
    })

    return `
// Syntactic shortcut used here
${keyName}${`(${args.join(', ')}): { ${recBuildType(declarations, value, myName, pathSoFar)} }`}
`
  } else {
    return `${keyName}: { ${recBuildType(declarations, treeNode, myName, pathSoFar)} }`
  }
}


const recBuildType = (declarations, treeNode, myName, pathSoFar) => {
  let functionDefinition = ''
  let children = []
  let verbMethods = []


  if (treeNode.childrenWithArgs) {
    const argsStr = Object.keys(treeNode.childrenWithArgs)[0]
    const value = treeNode.childrenWithArgs[argsStr]
    const args = argsStr.split('/').map((arg) => {
      return `${arg.substring(1)}: any`
    })

    functionDefinition = `(${args.join(', ')}): { ${recBuildType(declarations, value, myName, `${pathSoFar}_Fn`)} }`
  }
  if (treeNode.childrenWithoutArgs) {
    children = Object.keys(treeNode.childrenWithoutArgs).map((childName) => {
      const child = treeNode.childrenWithoutArgs[childName]
      // return `${plus.camelize(childName)}: { ${recBuildType(declarations, child, childName, `${pathSoFar}_${childName}`)} }`
      return shortcutBuildType(plus.camelize(childName), declarations, child, childName, `${pathSoFar}_${childName}`)
    })
  }
  if (treeNode.methods) {
    verbMethods = addVerbMethods(declarations, pathSoFar, treeNode)
  }

  return `
${functionDefinition}
${children.join('\n')}
${verbMethods.join('\n')}
`

}

const rootDeclarations = []
const rootChildren = recBuildType(rootDeclarations, convertedTree, 'BUG_IF_YOU_SEE_ME', 'Octokat')
source = `

declare module 'octokat' {
  ${rootDeclarations.join('\n')}

  export default class Octokat {
    constructor(options?: Object)
    ${rootChildren}
  }
}
`

fs.writeFileSync(`${__dirname}/index.d.ts`, source)
