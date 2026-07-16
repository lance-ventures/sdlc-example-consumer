import { readFileSync } from 'node:fs';

const readme = readFileSync(new URL('../README.md', import.meta.url), 'utf8');
for (const required of ['npm run check', 'sdlc conformance --all'])
  if (!readme.includes(required)) throw new Error(`README is missing ${required}`);
process.stdout.write('documentation contract passed\n');
