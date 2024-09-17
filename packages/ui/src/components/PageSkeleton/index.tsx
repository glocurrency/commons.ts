import { SkeletonPage, SkeletonBodyText, Layout, Card } from '@shopify/polaris'

export const PageSkeleton = () => {
  return (
    <SkeletonPage backAction>
      <Layout>
        <Layout.Section>
          <Card>
            <SkeletonBodyText />
          </Card>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  )
}
