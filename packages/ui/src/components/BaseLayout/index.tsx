import { useState, useCallback } from 'react'
import Link from 'next/link'
import translations from '@shopify/polaris/locales/en.json'
import { AppProvider, Frame, TopBar } from '@shopify/polaris'
import { Toaster } from 'react-hot-toast'

interface LayoutProps {
  children: React.ReactNode
  navigation: React.ReactNode
}

export const BaseLayout = ({ children, navigation }: LayoutProps) => {
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false)

  const logo = {
    width: 150,
    topBarSource: process.env['NEXT_PUBLIC_LOGO'],
    url: '/',
  }

  const toggleMobileNavigationActive = useCallback(() => {
    setMobileNavigationActive(mobileNavigationActive => !mobileNavigationActive)
  }, [])

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={null}
      onNavigationToggle={toggleMobileNavigationActive}
    />
  )

  return (
    <AppProvider i18n={translations} linkComponent={LinkWrapper} theme="light">
      <Frame
        logo={logo}
        topBar={topBarMarkup}
        navigation={navigation}
        showMobileNavigation={mobileNavigationActive}
        onNavigationDismiss={toggleMobileNavigationActive}
      >
        {children}
        <Toaster toastOptions={{ duration: 10000 }} />
      </Frame>
    </AppProvider>
  )
}

interface LinkWrapperProps extends React.HTMLProps<HTMLAnchorElement> {
  url: string
  children?: React.ReactNode
  external?: boolean
}

function LinkWrapper({ url, children, external, ...rest }: LinkWrapperProps) {
  if (external) {
    return (
      <a href={url} {...rest} target="_blank" rel="noreferrer">
        {children}
      </a>
    )
  }

  return (
    <Link href={url} legacyBehavior>
      <a {...rest}>{children}</a>
    </Link>
  )
}
