import { transformAsync } from '@babel/core'
import { loadModule } from './loader.js'

export async function bundle(entry) {
  const inlined = await loadModule(entry, new Set())

  const transpiled = await transformAsync(inlined, {
    presets: [['@babel/preset-env', { modules: false }]],
    babelrc: false,
  })

  return transpiled.code
}
