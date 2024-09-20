import { mount } from '@shopify/react-testing'
import { describe, test } from 'vitest'
import { act } from 'react'
import { HighlightJson } from '..'

describe('HighlightJson', () => {
  test('can render valid json', async () => {
    await act(async () => {
      const wrapper = mount(<HighlightJson json='{"success": true}' />)
      expect(wrapper).toContainReactText('{"success": true}')
    })
  })
})
