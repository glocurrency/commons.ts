/* eslint-disable eslint-comments/disable-enable-pair */
import * as matchers from '@shopify/react-testing/matchers'
import { destroyAll } from '@shopify/react-testing'
import { afterEach, expect, vi } from 'vitest'

const MockResizeObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

const MockMatchMedia = vi.fn(query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(), // Deprecated
  removeListener: vi.fn(), // Deprecated
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}))

expect.extend(matchers)

vi.stubGlobal('ResizeObserver', MockResizeObserver)
vi.stubGlobal('matchMedia', MockMatchMedia)

afterEach(() => {
  destroyAll()
})
