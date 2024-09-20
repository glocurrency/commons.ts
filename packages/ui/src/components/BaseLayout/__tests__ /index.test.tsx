import { mount } from '@shopify/react-testing'
import { describe, test } from 'vitest'
import { BaseLayout } from '..'

describe('BaseLayout', () => {
  test('renders correctly ', () => {
    const wrapper = mount(
      <BaseLayout navigation={<nav>Menu!</nav>}>Hello!</BaseLayout>,
    )
    expect(wrapper).toContainReactText('Menu!')
    expect(wrapper).toContainReactText('Hello!')
  })
})
