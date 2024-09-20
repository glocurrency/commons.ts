import { mount } from '@shopify/react-testing'
import { describe, test, vi } from 'vitest'
import { useGetEventsFor } from '../../../hooks/timeline'
import { Timeline } from '..'

vi.mock('../../../hooks/timeline', () => ({
  useGetEventsFor: vi.fn(),
}))

describe('Timeline', () => {
  test('renders correctly ', () => {
    ;(useGetEventsFor as jest.Mock).mockReturnValue({
      response: { data: [] },
      isLoading: false,
      isError: false,
      mutate: vi.fn(),
    })

    const wrapper = mount(
      <Timeline app="dummy" targetType="dummy-type" targetId="dummy-id" />,
    )
    expect(wrapper).toContainReactText('Timeline')
  })
})
