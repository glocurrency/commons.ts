# commons.ts

[![Maintainability](https://api.codeclimate.com/v1/badges/d8273220fd500d485303/maintainability)](https://codeclimate.com/github/glocurrency/commons.ts/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d8273220fd500d485303/test_coverage)](https://codeclimate.com/github/glocurrency/commons.ts/test_coverage)

common.ts is a set of NPM packages used at GloCurrency

## Available packages

- [`@glocurrency/storage`](./packages/storage/README.md): Tiny utilities to make use of local storage.

  ![npm](https://img.shields.io/npm/dm/@glocurrency/storage)
  ![npm bundle size](https://packagephobia.com/badge?p=@glocurrency/storage)
  ![npm](https://img.shields.io/npm/v/@glocurrency/storage)

- [`@glocurrency/money`](./packages/money/README.md): Money helpers.

  ![npm](https://img.shields.io/npm/dm/@glocurrency/money)
  ![npm bundle size](https://packagephobia.com/badge?p=@glocurrency/money)
  ![npm](https://img.shields.io/npm/v/@glocurrency/money)

- [`@glocurrency/time`](./packages/time/README.md): Time helpers.

  ![npm](https://img.shields.io/npm/dm/@glocurrency/time)
  ![npm bundle size](https://packagephobia.com/badge?p=@glocurrency/time)
  ![npm](https://img.shields.io/npm/v/@glocurrency/time)

- [`@glocurrency/use-form`](./packages/use-form/README.md): A React hook to help manage form data.

  ![npm](https://img.shields.io/npm/dm/@glocurrency/use-form)
  ![npm bundle size](https://packagephobia.com/badge?p=@glocurrency/use-form)
  ![npm](https://img.shields.io/npm/v/@glocurrency/use-form)

- [`@glocurrency/use-get`](./packages/use-get/README.md): A React hook to interact with APIs.

  ![npm](https://img.shields.io/npm/dm/@glocurrency/use-get)
  ![npm bundle size](https://packagephobia.com/badge?p=@glocurrency/use-get)
  ![npm](https://img.shields.io/npm/v/@glocurrency/use-get)

- [`@glocurrency/ui`](./packages/ui/README.md): React components.

  ![npm](https://img.shields.io/npm/dm/@glocurrency/ui)
  ![npm bundle size](https://packagephobia.com/badge?p=@glocurrency/ui)
  ![npm](https://img.shields.io/npm/v/@glocurrency/ui)


## Development

### Local

```bash
$ pnpm install
$ # ... do your changes ...
$ pnpm run fmt
$ pnpm run test
```

#### Unit Test

```bash
$ pnpm run test # will run all tests
$ pnpm run test:watch # will watch tests and only rerun the one who are modified
$ pnpm run test:coverage # will generate a coverage report
```

### Container Setup

<details>

You will need to install those additional dependencies:

1. [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
1. [Docker](https://www.docker.com/products/docker-desktop/)

Run the command from the command palette `Dev Containers: Reopen in Container` to open the project in a container.

![Reopen in Container](https://shared.storage.glocurrency.com/reopen-in-container.png)

</details>

## Authors
- [Ivan Stasiuk](https://github.com/brokeyourbike) | [Twitter](https://twitter.com/brokeyourbike) | [LinkedIn](https://www.linkedin.com/in/brokeyourbike) | [stasi.uk](https://stasi.uk)

## License
[MIT License](https://github.com/glocurrency/commons.ts/blob/main/LICENSE)
