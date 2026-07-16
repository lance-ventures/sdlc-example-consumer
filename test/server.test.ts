import { strict as assert } from 'node:assert';
import { after, before, test } from 'node:test';
import type { AddressInfo } from 'node:net';
import type { Server } from 'node:http';
import { start } from '../src/server.ts';

let server: Server;
let baseUrl: string;

before(async () => {
  server = await start();
  const address = server.address() as AddressInfo;
  baseUrl = `http://127.0.0.1:${address.port}`;
});

after(() => server.close());

test('serves the health contract', async () => {
  const response = await fetch(`${baseUrl}/health`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: 'ok' });
});

test('serves the visual route', async () => {
  const response = await fetch(baseUrl);
  assert.match(await response.text(), /<main>.*Lifecycle proof/s);
});
