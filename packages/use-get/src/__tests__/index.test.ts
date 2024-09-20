import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useGet } from '..'

describe('useGet', () => {
  it('useGet isLoading should be true', () => {
    const { result } = renderHook(() =>
      useGet('https://jsonplaceholder.typicode.com/todos/1'),
    )
    expect(result.current.isLoading).toBeTruthy()
  })
})
