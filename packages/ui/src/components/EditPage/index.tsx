import { useMemo, type ReactNode } from 'react'
import { useRouter } from 'next/router'
import { MenuActionDescriptor, Page } from '@shopify/polaris'
import { ShareIcon } from '@shopify/polaris-icons'
import useClipboard from 'react-use-clipboard'
import toast from 'react-hot-toast'

export const EditPage = ({
  title,
  children,
  showShareButton,
}: {
  title: string
  children: ReactNode
  showShareButton?: boolean
}) => {
  const router = useRouter()
  const [_, setCopied] = useClipboard(
    `${process.env['NEXT_PUBLIC_BASE_PATH']}${router.asPath}`
  )

  const actions = useMemo(() => {
    const items: MenuActionDescriptor[] = []

    if (showShareButton) {
      items.push({
        icon: ShareIcon,
        content: 'Share',
        onAction: () => {
          setCopied()
          toast.success('URL copied to clipboard')
        },
      })
    }

    return items
  }, [showShareButton, setCopied])

  return (
    <Page
      title={title}
      backAction={{
        content: 'Back',
        onAction: () => router.back(),
      }}
      secondaryActions={actions}
    >
      {children}
    </Page>
  )
}
