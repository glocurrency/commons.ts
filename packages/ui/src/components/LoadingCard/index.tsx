import { Spinner, LegacyStack, Card } from '@shopify/polaris'

export const LoadingCard = () => {
  return (
    <Card>
      <LegacyStack distribution="center">
        <div style={{ marginTop: '1rem' }}>
          <Spinner size="small" />
        </div>
      </LegacyStack>
    </Card>
  )
}
