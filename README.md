# Creative Coding

This project is a base setup for creative coding, utilizing different technologies for rendering in- and output.

It is based on Turborepo and Svelte - written in TypeScript.

## Running this project

For the dev server run the following command:

```sh
npm run dev
```

For production deployments navigate to the app directory you want to deploy and follow the descriptions in the corresponding README.md file.

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `web`: a [svelte-kit](https://kit.svelte.dev/) app, using peer-to-peer connections (via WebRTC) to render p5.js and Three.js scenes
- `docs`: a [svelte-kit](https://kit.svelte.dev/) demo app
- `ui`: a stub Svelte component library shared by both `web` and `docs` applications
- `eslint-config-custom`: `eslint` configurations (includes `eslint-plugin-svelte` and `eslint-config-prettier`)

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
