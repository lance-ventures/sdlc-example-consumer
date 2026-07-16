import { createServer, type Server } from 'node:http';

export const page = `<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>SDLC Consumer</title></head>
  <body><main><h1>Lifecycle proof</h1><p>This service exercises every deterministic SDLC phase.</p></main></body>
</html>`;

export function start(port = 0): Promise<Server> {
  const server = createServer((request, response) => {
    if (request.url === '/health') {
      response.writeHead(200, { 'content-type': 'application/json' });
      response.end('{"status":"ok"}');
      return;
    }
    response.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    response.end(page);
  });
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, '127.0.0.1', () => resolve(server));
  });
}

if (import.meta.main) await start(Number(process.env.PORT ?? 3000));
