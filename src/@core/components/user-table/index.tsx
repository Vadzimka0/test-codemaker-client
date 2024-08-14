import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link } from '@mui/material'

import { UserData } from 'src/@core/utils/types'

const columns = ['id', 'login', 'main_group', 'status', 'currency', 'balance', 'bonus_balance', 'register_at']

type UserTableProps = {
  users: UserData[]
  handleSorting: (c: string) => void
  sorting: { column: string; order: string }
}

const UserTable = ({ users, handleSorting, sorting }: UserTableProps) => {
  const { column: sortingColumn, order } = sorting

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map(column => {
              const isArrowColumn = column === sortingColumn

              return (
                <TableCell key={column} onClick={() => handleSorting(column)} style={{ cursor: 'pointer' }}>
                  {column}
                  {isArrowColumn ? order === 'ASC' ? <span>&#8593;</span> : <span>&#8595;</span> : ''}
                </TableCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user: UserData) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>
                <Link href={`/user/${user.id}`}>{user.login}</Link>
              </TableCell>
              <TableCell>{user.main_group}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>{user.currency}</TableCell>
              <TableCell>{user.balance}</TableCell>
              <TableCell>{user.bonus_balance}</TableCell>
              <TableCell>{user.register_at.slice(0, 10)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UserTable
