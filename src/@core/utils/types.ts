interface MonthYear {
  year: number
  month: number
}

interface Fns {
  cardType(cardNumber: string): string
  formatCardNumber(cardNumber: string): string
  validateCardNumber(cardNumber: string): boolean
  validateCardCVC(cvc: string, type?: string): boolean
  validateCardExpiry(monthYear: string, year?: string): boolean
  cardExpiryVal(monthYear: string | HTMLInputElement): MonthYear
}

export type PaymentTypes = {
  fns: Fns
  formatCardCVC(elem: HTMLInputElement): HTMLInputElement
  restrictNumeric(elem: HTMLInputElement): HTMLInputElement
  formatCardNumber(elem: HTMLInputElement): HTMLInputElement
  formatCardExpiry(elem: HTMLInputElement): HTMLInputElement
}

export type FilterValue = {
  value: string | number
  checked: boolean
}

export type Filters = {
  [key: string]: FilterValue[]
}

export type InitialFilters = {
  main_group: FilterValue[]
  status: FilterValue[]
  currency: FilterValue[]
}

export interface Parameters {
  [key: string]: string | number
}

export type UserData = {
  id: number
  login: string
  group: 0 | 1 | 2 | 3
  status: 0 | 1 | 2 | 3
  currency: 'USD' | 'EUR' | 'RUB'
  balance: string
  bonus_balance: string
  date_reg: string
}
