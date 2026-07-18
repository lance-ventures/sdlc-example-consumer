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

The configured `delivery` workflow is a consumer-owned graph. Its job and phase
names are ordinary data, dependencies use native GitHub Actions `needs`, and
each phase composes a packaged definition with a deterministic consumer check.
The required conformance lane uses fixture provider results; consumers can opt
individual definitions into live providers when their credentials are present.

Because the system repository and package are private, package conformance runs
from the system repository: it checks out this repository at a pinned commit,
installs a freshly packed artifact, and executes all configured phases. This public
repository's own CI verifies the consumer application contract and the absence
of vendored system assets.
