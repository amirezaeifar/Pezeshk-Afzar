import { parse, compileScript, compileTemplate } from '@vue/compiler-sfc'
import fs from 'fs'
import path from 'path'

const files = []
function walk(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name)
    if (f.isDirectory()) walk(p)
    else if (f.name.endsWith('.vue')) files.push(p)
  }
}
walk('src')

let errors = 0
for (const file of files) {
  const src = fs.readFileSync(file, 'utf-8')
  const { descriptor, errors: parseErrors } = parse(src, { filename: file })
  if (parseErrors.length) {
    console.log('PARSE ERROR', file, parseErrors)
    errors++
    continue
  }
  try {
    if (descriptor.script || descriptor.scriptSetup) {
      compileScript(descriptor, { id: file })
    }
    if (descriptor.template) {
      const r = compileTemplate({ source: descriptor.template.content, filename: file, id: file })
      if (r.errors && r.errors.length) {
        console.log('TEMPLATE ERROR', file, r.errors)
        errors++
      }
    }
  } catch (e) {
    console.log('COMPILE ERROR', file, e.message)
    errors++
  }
}
console.log(`Checked ${files.length} .vue files, ${errors} errors`)
