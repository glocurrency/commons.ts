import { describe, expect, it } from 'vitest'
import { isLocalStorageAvailable } from '../index'

describe('storage', () => {
  it('local storage available during tests', () => {
    expect(isLocalStorageAvailable()).toBe(true)
  })
})
