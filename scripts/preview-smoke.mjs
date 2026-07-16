import { start } from '../src/server.ts';

const server = await start();
try {
  const address = server.address();
  if (!address || typeof address === 'string') throw new Error('preview has no TCP address');
  const response = await fetch(`http://127.0.0.1:${address.port}/health`);
  if (!response.ok || (await response.json()).status !== 'ok')
    throw new Error('preview health contract failed');
  process.stdout.write('preview smoke passed\n');
} finally {
  server.close();
}
