import { FilterValue } from './types'

export const toStringFilterFormatter = <T>(array: FilterValue[]) =>
  array
    .filter(value => Boolean(value.checked))
    .map(item => item.value)
    .join()
