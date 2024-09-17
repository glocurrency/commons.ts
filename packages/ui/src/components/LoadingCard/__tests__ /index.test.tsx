import { mount } from '@shopify/react-testing'
import { describe, test } from 'vitest'
import { LoadingCard } from '..'

describe('LoadingCard', () => {
  test('window.matchMedia is mocked', () => {
    expect(window.matchMedia).toBeDefined()
    expect(window.matchMedia('asdf').matches).toBeFalsy()
  })
  test('renders correctly ', () => {
    const wrapper = mount(<LoadingCard />)
    expect(wrapper.props.count).toBeUndefined()
  })
})
