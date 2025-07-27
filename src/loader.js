import { readFile } from 'fs/promises'
import path from 'path'

const importRegex = /import\s+[\s\S]*?['"](.+?)['"]/g

export async function loadModule(filePath, seen = new Set()) {
  if (seen.has(filePath)) return ''
  seen.add(filePath)

  let code = await readFile(filePath, 'utf-8')
  const dir = path.dirname(filePath)
  const imports = [...code.matchAll(importRegex)]

  for (const match of imports) {
    const importPath = match[1]

    // ✅ Resolve the full path of the import
    const fullPath = importPath.startsWith('/')
      ? path.join(process.cwd(), importPath.slice(1)) // handle "/absolute/..."
      : path.resolve(dir, importPath)                 // handle "./" and "../"

    // 🔁 Recursively load the imported module
    const importedCode = await loadModule(fullPath, seen)

    // 🧵 Replace the import statement with the actual code
    code = code.replace(match[0], `// inlined ${importPath}\n${importedCode}`)
  }

  return code
}
