import { parse } from '@vue/compiler-sfc'
import fs from 'fs'
const files = process.argv.slice(2)
for (const file of files) {
  const src = fs.readFileSync(file, 'utf-8')
  const { errors } = parse(src, { filename: file })
  for (const e of errors) {
    console.log(file, '-> loc:', JSON.stringify(e.loc && e.loc.start), JSON.stringify(e.loc && e.loc.end), 'msg:', e.message)
  }
  if (!errors.length) console.log(file, '-> OK')
}
