# SDLC example consumer

This repository proves the boundary between an installed SDLC system and a
consumer application. It contains application code, `sdlc.yml`, consumer
checks, and generated workflows. It does not contain copied SDLC agents,
skills, prompts, schemas, or mutation code.

Install the packaged system and run the complete deterministic proof:

```sh
npm install --save-dev @lance-ventures/sdlc --registry=https://npm.pkg.github.com
npm run check
npx sdlc generate --check
npx sdlc conformance --all --source-sha HEAD
```

The required conformance lane uses fixture provider results. The generated
phase workflows use live providers only when their corresponding credentials
are configured.
