# `@glocurrency/use-form`

A React hook to help manage form data

---

## Install

```bash
$ pnpm add @glocurrency/use-form
```

## Usage

```ts
import { useForm } from '@glocurrency/use-form'

const OrderForm() => {
  const { data, setData, post, errors, processing } = useForm({ amount: 100.00 })

  return (
    <>
      <TextField
        label="Amount"
        value={data.amount}
        value={data.amount?.toString()}
        onChange={(v) => setData('amount', Number(v))}
        error={errors.amount}
      />
      <Button
        variant="primary"
        onClick={() => post(`/orders/${orderId}`)}
        accessibilityLabel="Update"
        disabled={processing}
      >
        {processing ? 'Updating..' : 'Update'}
      </Button>
    </>
  )
}
```
