export default {
  meEndpoint: process.env.NEXT_PUBLIC_API_URL + '/admins/me',
  loginEndpoint: process.env.NEXT_PUBLIC_API_URL + '/admins',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
