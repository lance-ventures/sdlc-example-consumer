import { page } from '../src/server.ts';

for (const required of ['<main>', '<h1>', 'name="viewport"'])
  if (!page.includes(required)) throw new Error(`visual route is missing ${required}`);
process.stdout.write('visual contract passed\n');
