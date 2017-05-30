const fs = require('fs')

const routes = require('./routes.json')
const _ = require('lodash')
const plus = require('../src/plus')

// Map of URL -> Method -> Params
const converted = {}

// Extract the info we need from routes.json
Object.keys(routes).forEach((key1) => {
  Object.keys(routes[key1]).forEach((key2) => {

    const {url, method, params, yields} = routes[key1][key2]

    if (url) {
      converted[url] = converted[url] || {}
      converted[url][method] = params // _.omitBy(params, (value, keyName) => keyName.startsWith('$'))
      if (yields) {
        converted[url][method]._yields = yields
      }
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
    let method = treeNode.methods[methodName]
    method = _.omit(method, '_yields')
    if (Object.keys(method).length > 0) {
      const typeName = plus.camelize(`${pathSoFar}_${methodName.toLowerCase()}_Params`)

      let isEverythingOptional = true
      const extendsTypes = Object.keys(method).filter((key) => {
        return key[0] === `$` && treeNode._route.indexOf(`:${key.substring(1)}`) < 0
      }).map((key) => {
        return `& ${plus.camelize(`Param_${key.substring(1)}`)}`
      })
      const params = Object.keys(method).filter((key) => key[0] !== `$`).map((key) => {
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
      if (extendsTypes.length > 0 || params.length > 0) {
        declarations.push(`export type ${typeName} = ${extendsTypes.join('\n')} & { ${params.join('\n')} }`)
        return `params${isEverythingOptional ? `?` : ``}: ${typeName}`
      } else {
        return `` // There are no args when calling .fetch() (or whatever verb it is)
      }
    } else {
      return `` // There are no args when calling .fetch() (or whatever verb it is)
    }
  }
  if (treeNode.methods) {
    if (treeNode.methods['GET']) {
      const paramsName = addDeclaration('GET')
      const yields = treeNode.methods['GET']._yields || 'any'
      ret.push(`fetch(${paramsName}): Promise<${yields}>`)
      if (yields.startsWith('SearchResult<')) {
        // Replace SearchResult<Foo> with Foo[]
        ret.push(`fetchAll(${paramsName}): Promise<${yields.substring('SearchResult<'.length, yields.length - 1)}[]>`)
      }
      ret.push(`read(${paramsName}): Promise<String>`)
      ret.push(`readBinary(${paramsName}): Promise<any>`)
    }
    if (treeNode.methods['POST']) {
      const paramsName = addDeclaration('POST')
      const yields = treeNode.methods['POST']._yields || 'any'
      ret.push(`create(${paramsName}): Promise<${yields}>`)
    }
    if (treeNode.methods['PATCH']) {
      const paramsName = addDeclaration('PATCH')
      const yields = treeNode.methods['PATCH']._yields || 'any'
      ret.push(`update(${paramsName}): Promise<${yields}>`)
    }
    if (treeNode.methods['PUT']) {
      const paramsName = addDeclaration('PUT')
      const yields = treeNode.methods['PUT']._yields || 'any'
      ret.push(`add(${paramsName}): Promise<${yields}>`)
    }
    if (treeNode.methods['DELETE']) {
      const paramsName = addDeclaration('DELETE')
      const yields = treeNode.methods['DELETE']._yields || 'any'
      ret.push(`remove(${paramsName}): Promise<${yields}>`)
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
const rootTypes = Object.keys(routes.defines.params).map((paramName) => {
  const param = routes.defines.params[paramName]
  // const {required, type, enum} = param
  const required = param.required
  const type = param.type
  const enum2 = param.enum
  let paramType
  if (enum2) {
    paramType = enum2.map((item) => `"${item}"`).join('|')
  } else {
    switch (type) {
      case 'String':
      case 'Number':
      case 'Boolean':
        paramType = type
        break;
      case 'Json':
        paramType = 'Object'
        break
      case 'Date':
        paramType = 'String'
        break
      case 'Array':
        paramType = 'string[]'
        break
      default:
        throw new Error(`BUG: unsupported type ${type}`)
    }
  }
  return `export interface ${plus.camelize(`Param_${paramName}`)} { ${paramName}${required? '' : '?'}: ${paramType} }`
})

source = `

declare module 'octokat' {

  // Base types
  ${rootTypes.join('\n')}

  // Response Types
  ${fs.readFileSync(__dirname + `/../response-types/_all.d.ts`)}

  // Input Param Types
  ${rootDeclarations.join('\n')}

  export default class Octokat {
    constructor(options?: Object)
    ${rootChildren}
  }
}
`

fs.writeFileSync(`${__dirname}/index.d.ts`, source)
