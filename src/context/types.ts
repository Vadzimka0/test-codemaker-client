export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  login: string
  pass: string
  method: string
  userAgent: string
  ip: string
  rememberMe?: boolean
}

export type UserDataType = {
  id: number
  login: string
  role?: string
  password: string
  avatar?: string | null
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
}
