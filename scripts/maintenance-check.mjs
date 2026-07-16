import { existsSync, readFileSync } from 'node:fs';

if (existsSync(new URL('../.agents', import.meta.url)))
  throw new Error('consumer must not vendor system-owned .agents assets');
const config = readFileSync(new URL('../sdlc.yml', import.meta.url), 'utf8');
if (!config.includes('profile: full')) throw new Error('full lifecycle is not configured');
process.stdout.write('maintenance contract passed\n');
