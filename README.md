# ArkMarket

[ArkProject](https://www.arkproject.dev) marketplace template using the [T3 Stack](https://create.t3.gg) & [Turborepo](https://turborepo.org). See live demo at [market.arkproject.dev](https://market.arkproject.dev).

## About

Here’s the monorepo structure:

```text
apps
  ├─ arkmarket
packages
  ├─ ui
tooling
  ├─ eslint
  ├─ prettier
  ├─ tailwind
  └─ typescript
```

The `apps` directory contains the code for:

- arkmarket: ArkMarket's web application ([market.arkproject.dev](https://market.arkproject.dev)).

The `packages` directory contains the code for:

- `ui`: UI component library, using [shadcn](https://ui.shadcn.com).

The `tooling` directory contains the code for:

- `eslint`: ESlint presets.
- `prettier`: Prettier presets.
- `tailwind`: Tailwind presets.
- `typescript`: Typescript configuration.

> We use `@ark-market` as a placeholder for package names. You might want to replace it with your own organization or project name. You can use find-and-replace to change all the instances of `@ark-market` to something like `@my-company` or `@project-name`.

## Template

> We use `@ark-market` as a placeholder for package names. You might want to replace it with your own organization or project name. You can use find-and-replace to change all the instances of `@ark-market` to something like `@my-company` or `@project-name`.

## Local setup

Clone the repo:

```bash
git clone git@github.com:ArkProjectNFTs/ark-market.git
```

Install dependencies:

```bash
pnpm i
```

Configure environment variables:

```bash
cp .env.example .env
```

Start arkmarket application:

```bash
pnpm dev
```
