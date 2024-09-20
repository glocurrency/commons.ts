import { mount } from '@shopify/react-testing'
import { AppProvider, SkeletonPage } from '@shopify/polaris'
import { describe, test } from 'vitest'
import { PageSkeleton } from '..'

describe('PageSkeleton', () => {
  test('renders correctly ', () => {
    const wrapper = mount(
      <AppProvider i18n={{}}>
        <PageSkeleton />
      </AppProvider>,
    )
    expect(wrapper).toContainReactComponent(SkeletonPage)
  })
})
