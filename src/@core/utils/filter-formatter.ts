import { FilterValue } from './types'

export const filterFormatter = <T>(array: T[]) => array.map(value => ({ value, checked: false } as FilterValue))
