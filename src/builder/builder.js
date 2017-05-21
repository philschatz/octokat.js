const fs = require('fs')
const types = require('./types')

types.forEach((type) => {
  // typeName: 'InputRepo'
  // argTypes: null
  // children: {
  //   'issues': 'InputRepoIssues'
  //   'git': 'InputGit'
  // }
  // verbs:
  //   fetch:
  //     argTypes: []
  //     resultType: 'RepoResponse'
  //   remove:
  //     argTypes: []
  //     resultType: 'void'


  const importTypes = {}

  const instanceChildren = []
  const instanceChildrenDeclarations = []
  Object.keys(type.children || {}).forEach((instanceChildName) => {
    const instanceChildType = type.children[instanceChildName]
    importTypes[instanceChildType] = true
    instanceChildren.push(`this.${instanceChildName} = new ${instanceChildType}(basePath + '/${instanceChildName}')`)
    instanceChildrenDeclarations.push(`${instanceChildName} : ${instanceChildType}`)
  })

  const verbMethods = []
  Object.keys(type.verbs || {}).forEach((verbMethodKey) => {
    const {argTypes, resultType} = type.verbs[verbMethodKey]
    importTypes[resultType.replace('[]', '')] = true // Strip off arrays
    verbMethods.push(`${verbMethodKey}(/*args*/) : Promise<${resultType}> { return VERBS._${verbMethodKey}<${resultType}>(this._basePath) }`)
  })

  const instanceMethodsStr = '/* Not implemented yet */'


  if (type.returnType) {
    importTypes[type.returnType] = true
  }

  const instanceRequires = Object.keys(importTypes)
  .filter((importType) => importType != 'void') // remove the void type
  .map((importType) => `import ${importType} from './${importType}'`)

  let source = `
import * as VERBS from '../verbs'
${instanceRequires.join('\n')}
`


  if (type.argTypes) {
    // Cannot just create a simple class. Need to create a function and then Object.merge the props onto it
    // http://stackoverflow.com/a/41853194 in https://stackoverflow.com/questions/12766528/build-a-function-object-with-properties-in-typescript#18640025

    source += `
export default (basePath : string) => {
  return Object.assign(
    (a1: string, a2: string) => {
      const basePath = a1 + '/' + a2
      return new ${type.returnType}(basePath)
    },
    {
      ${instanceChildrenDeclarations.concat(verbMethods).join(',\n')}
    }
  )
}
`


  } else {
    // Create a simple class

    // source += `import base from './base'\n`
    source += `
export default class ${type.typeName} {
   _basePath: string
   ${instanceChildrenDeclarations.join('\n')}
   constructor(basePath : string) {
     this._basePath = basePath
     ${instanceChildren.join('\n')}
   }

   ${instanceMethodsStr}

   ${verbMethods.join('\n')}
}
`

  }



  fs.writeFileSync(`${__dirname}/out/${type.typeName}.ts`, source)
})
