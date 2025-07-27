import { bundle } from './src/bundler.js'
import { writeFile } from 'fs/promises'

const result = await bundle('./src/app/entry.js')
await writeFile('./public/bundle.js', result)

console.log('✅ Bundle built to public/bundle.js')

