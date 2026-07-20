import { readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const htmlPath = resolve(root, 'dist/index.html');
const serverEntry = resolve(root, 'dist-ssr/entry-server.js');

const [{ render }, template] = await Promise.all([
  import(pathToFileURL(serverEntry).href),
  readFile(htmlPath, 'utf8'),
]);

const marker = '<div id="root"></div>';
if (!template.includes(marker)) {
  throw new Error(`Prerender marker not found in ${htmlPath}`);
}

const html = template.replace(marker, `<div id="root">${render()}</div>`);
await writeFile(htmlPath, html);
await rm(resolve(root, 'dist-ssr'), { recursive: true, force: true });
