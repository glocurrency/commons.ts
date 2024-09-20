import { describe, expect, it } from 'vitest'
import {
  getMonthOptions,
  getYearOptions,
  parseAndFormatDate,
  parseAndFormatTime,
  formatDateOnly,
} from '../index'

describe('time', () => {
  it('can generate month options', () => {
    expect(getMonthOptions()).toHaveLength(12)
  })
  it('can generate year options', () => {
    const currentYear = new Date().getFullYear()
    expect(getYearOptions(currentYear)).toHaveLength(1)
  })
  it('can parse date', () => {
    expect(parseAndFormatDate('2024-09-20T11:16:49.96+01:00')).toEqual(
      '20/09/2024 11:16:49',
    )
  })
  it('can parse time', () => {
    expect(parseAndFormatTime('2024-09-20T11:16:49.96+01:00')).toEqual('11:16')
  })
  it('can format date only', () => {
    expect(formatDateOnly(new Date('2024-09-20T11:16:49.96+01:00'))).toEqual(
      '2024-09-20',
    )
  })
})
