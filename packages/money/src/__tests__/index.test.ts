import { describe, expect, it } from 'vitest'
import {
  guessAmount,
  formatCents,
  formatAmount,
  formatAmountWithZeroes,
} from '../index'

describe('money', () => {
  it('can guess amount', () => {
    expect(guessAmount('100.00')).toBe(100.0)
  })
  it('will return 0 if amount is invalid', () => {
    expect(guessAmount('not an amount')).toBe(0.0)
  })
  it('can format cents', () => {
    expect(formatCents('GBP', 500)).toBe('£5')
  })
  it('can format amount', () => {
    expect(formatAmount('GBP', 5)).toBe('£5')
  })
  it('can format amount with zeroes', () => {
    expect(formatAmountWithZeroes('GBP', 5)).toBe('£5.00')
  })
})
