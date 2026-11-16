import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const exclude = new Set(['dist', 'node_modules', '.git', '.github', 'scripts']);
const skipFiles = new Set(['package.json', 'vercel.json', 'README.md', '.gitignore']);
if (fs.existsSync(dist)) fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, {recursive:true});

let htmlCount = 0;
function walk(dir) {
  for (const ent of fs.readdirSync(dir, {withFileTypes:true})) {
    if (exclude.has(ent.name)) continue;
    const source = path.join(dir, ent.name);
    if (ent.isDirectory()) { walk(source); continue; }
    if (!ent.isFile()) continue;
    const relative = path.relative(root, source);
    if (skipFiles.has(relative)) continue;
    const dest = path.join(dist, relative);
    fs.mkdirSync(path.dirname(dest), {recursive:true});
    fs.copyFileSync(source, dest);
    if (relative.endsWith('.html')) htmlCount++;
  }
}
walk(root);
if (htmlCount < 13) throw new Error('Expected 13 published HTML routes; found ' + htmlCount + '. Run the snapshot workflow before deploying.');
if (!fs.existsSync(path.join(dist,'favicon.png'))) throw new Error('Missing JP favicon.png. Run the snapshot workflow.');
console.log('Prepared ' + htmlCount + ' HTML routes and published assets in dist');
