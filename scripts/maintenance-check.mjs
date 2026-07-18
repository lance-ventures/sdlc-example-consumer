import { existsSync, readFileSync } from 'node:fs';

if (existsSync(new URL('../.agents', import.meta.url)))
  throw new Error('consumer must not vendor system-owned .agents assets');
const config = readFileSync(new URL('../sdlc.yml', import.meta.url), 'utf8');
if (!config.includes('version: 2')) throw new Error('generic workflow config is not enabled');
if (!config.includes('needs: [shape, look]')) throw new Error('workflow graph fan-in is not configured');
process.stdout.write('maintenance contract passed\n');
