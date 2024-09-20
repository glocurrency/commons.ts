import { describe, expect, it } from 'vitest'
import { first8, slim } from '../index'

describe('uuid', () => {
  it('can get first 8 chars', () => {
    expect(first8('a322523d-2a01-407f-8d28-4fbcbc011370')).toBe('a322523d')
  })
  it('can work with empty string', () => {
    expect(first8('')).toBe('')
  })
  it('can slim uuid', () => {
    expect(slim('a322523d-2a01-407f-8d28-4fbcbc011370')).toBe(
      'a322523d2a01407f8d284fbcbc011370',
    )
  })
})
