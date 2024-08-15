import React from 'react'
import { FormControl, FormGroup, FormControlLabel, Checkbox, Paper } from '@mui/material'

import { FilterValue, InitialFilters } from 'src/@core/utils/types'

type FilterAsideProps = {
  filters: InitialFilters
  handleFilterChange: (category: string, value: string | number) => void
  disabled: boolean
}

const FilterAside = ({ filters, handleFilterChange, disabled }: FilterAsideProps) => {
  return (
    <Paper style={{ padding: '16px', marginRight: '16px' }}>
      <FormControl component='fieldset'>
        <FormGroup>
          {Object.keys(filters).map(filterCategory => (
            <div key={filterCategory}>
              <h3>{filterCategory}</h3>
              {filters[filterCategory as keyof typeof filters].map((filter: FilterValue) => (
                <FormControlLabel
                  key={filter.value}
                  control={
                    <Checkbox
                      checked={filter.checked}
                      onChange={() => handleFilterChange(filterCategory, filter.value)}
                      disabled={disabled}
                    />
                  }
                  label={filter.value}
                />
              ))}
            </div>
          ))}
        </FormGroup>
      </FormControl>
    </Paper>
  )
}

export default FilterAside
