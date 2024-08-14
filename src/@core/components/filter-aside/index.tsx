import React from 'react'
import { FormControl, FormGroup, FormControlLabel, Checkbox, Paper } from '@mui/material'

const FilterAside = ({ filters, handleFilterChange }: any) => {
  return (
    <Paper style={{ padding: '16px', marginRight: '16px' }}>
      <FormControl component='fieldset'>
        <FormGroup>
          {Object.keys(filters).map(filterCategory => (
            <div key={filterCategory}>
              <h3>{filterCategory}</h3>
              {filters[filterCategory].map((filter: any) => (
                <FormControlLabel
                  key={filter.value}
                  control={
                    <Checkbox
                      checked={filter.checked}
                      onChange={() => handleFilterChange(filterCategory, filter.value)}
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
