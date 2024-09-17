# `@glocurrency/use-get`

A React hook to interact with APIs

---

## Install

```bash
$ pnpm add @glocurrency/use-get
```

## Usage

```js
import { useGet } from '@glocurrency/use-get'

export function useGetOrders() {
  return useGet<OrderData[]>('/orders')
}
```

## Authors

- [Ivan Stasiuk](https://github.com/brokeyourbike) | [Twitter](https://twitter.com/brokeyourbike) | [LinkedIn](https://www.linkedin.com/in/brokeyourbike) | [stasi.uk](https://stasi.uk)
