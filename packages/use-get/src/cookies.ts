import cookies from 'js-cookie'

export const getCloudflareAuthCookie = () => {
  return cookies.get('CF_Authorization')
}
