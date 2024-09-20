import { mount } from '@shopify/react-testing'
import { AppProvider, Page } from '@shopify/polaris'
import { describe, test, vi } from 'vitest'
import { EditPage } from '..'

vi.mock('next/router', () => require('next-router-mock'))

describe('EditPage', () => {
  test('renders correctly ', () => {
    const wrapper = mount(
      <AppProvider i18n={{}}>
        <EditPage title="dummy-title">Hello!</EditPage>
      </AppProvider>,
    )
    expect(wrapper).toContainReactComponent(Page)
    expect(wrapper).toContainReactText('dummy-title')
    expect(wrapper).toContainReactText('Hello!')
  })
})
