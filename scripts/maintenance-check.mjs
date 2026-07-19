import { existsSync, readFileSync } from 'node:fs';

if (existsSync(new URL('../.agents', import.meta.url)))
  throw new Error('consumer must not vendor system-owned .agents assets');
const manifest = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
);
const installedSystem = JSON.parse(
  readFileSync(
    new URL(
      '../node_modules/@lance-ventures/sdlc/package.json',
      import.meta.url,
    ),
    'utf8',
  ),
);
if ('sdlcSystemVersion' in manifest)
  throw new Error('consumer must not duplicate the installed SDLC version');
if (
  manifest.devDependencies?.['@lance-ventures/sdlc'] !==
  installedSystem.version
)
  throw new Error('installed SDLC does not match the declared exact dependency');
const config = readFileSync(new URL('../sdlc.yml', import.meta.url), 'utf8');
if (!config.includes('version: 2')) throw new Error('generic workflow config is not enabled');
if (!config.includes('needs: [shape, look]')) throw new Error('workflow graph fan-in is not configured');
process.stdout.write('maintenance contract passed\n');
