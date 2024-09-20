import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import {useForm} from '..'

vi.mock('next/router', () => require('next-router-mock'));

describe('useForm', () => {
  it('useForm should not be undefined', () => {
    const { result } = renderHook(() => useForm())
    expect(result.current).not.toBeUndefined()
  })
})
