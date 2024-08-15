import { useEffect, useState } from 'react'

import axios from 'axios'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Pagination from '@mui/material/Pagination'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import { filterFormatter } from 'src/@core/utils/filter-formatter'
import { toStringFilterFormatter } from 'src/@core/utils/to-string-filter-formatter'
import { InitialFilters, Parameters, UserData } from 'src/@core/utils/types'
import UserTable from 'src/@core/components/user-table'
import FilterAside from 'src/@core/components/filter-aside'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

const GROUPS = [0, 1, 2, 3]
const STATUSES = [0, 1, 2, 3]
const CURRENCIES = ['USD', 'EUR', 'RUB']

const initialFilters: InitialFilters = {
  main_group: filterFormatter(GROUPS),
  status: filterFormatter(STATUSES),
  currency: filterFormatter(CURRENCIES)
}

const Home = () => {
  const [sorting, setSorting] = useState({ column: 'id', order: 'DESC' })
  const [filters, setFilters] = useState(initialFilters)
  const [paginator, setPaginator] = useState({ page: 1, limit: 10 })

  const [users, setUsers] = useState<UserData[]>([])

  const [meta, setMeta] = useState({ totalPages: 10 })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)

      const params: Parameters = {
        sortBy: `${sorting.column}:${sorting.order}`,
        page: paginator.page,
        limit: paginator.limit
      }

      Object.keys(filters).forEach(category => {
        if (toStringFilterFormatter(filters[category as keyof typeof filters]).length) {
          params[`filter.${category}`] = `$in:${toStringFilterFormatter(filters[category as keyof typeof filters])}`
        }
      })

      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
          params,
          withCredentials: true
        })
        setUsers(data.data)
        setMeta(data.meta)
        if (data.meta.currentPage > data.meta.totalPages && data.meta.totalPages > 0) {
          setPaginator({ ...paginator, page: 1 })
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [sorting, filters, paginator])

  const handleSortingChange = (column: string) => {
    if (column === sorting.column) {
      setSorting({ ...sorting, order: sorting.order === 'ASC' ? 'DESC' : 'ASC' })
    } else {
      setSorting({ column: column, order: 'DESC' })
    }
  }

  const handleFilterChange = (category: string, value: string | number) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [category]: prevFilters[category as keyof typeof prevFilters].map((filter: any) =>
        filter.value === value ? { ...filter, checked: !filter.checked } : filter
      )
    }))
  }

  const handlePaginatorChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPaginator({ ...paginator, page: value })
  }

  const handleSelectChange = (event: SelectChangeEvent) => {
    setPaginator({ ...paginator, limit: +event.target.value })
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <FilterAside filters={filters} handleFilterChange={handleFilterChange} disabled={loading} />
      </Grid>
      <Grid item xs={9}>
        {loading ? (
          <Backdrop open={loading} style={{ zIndex: 1 }}>
            <CircularProgress color='inherit' />
          </Backdrop>
        ) : (
          <>
            <UserTable users={users} handleSorting={handleSortingChange} sorting={sorting} />
            <Grid container direction='row' justifyContent='flex-end' marginTop={5} columnGap={5}>
              <Pagination count={meta.totalPages} page={paginator.page} onChange={handlePaginatorChange} size='small' />
              <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
                <InputLabel id='demo-select-small-label'>Per page</InputLabel>
                <Select
                  size='small'
                  labelId='demo-select-small-label'
                  id='demo-select-small'
                  value={paginator.limit.toString()}
                  label='Per page'
                  onChange={handleSelectChange}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                  <MenuItem value={100}>100</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  )
}

export default Home
