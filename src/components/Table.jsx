// import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from "react";
import { collection, getDocs, getFirestore, initializeFirestore, limit, orderBy, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";
import { app, firestoreDB } from "../firebase/fb";
import { query } from "firebase/database";

const TableComp = ({data}) => {
  const [cntPage, setCntPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  // const [data, setData] = useState([])
  
  const columns = [
    {
      id: 'timestamp',
      label: 'Time Stamp',
      minWidth: 120,
      align: 'center',
      format: (value) => value.toDate().toString()
    },
    {
      id: 'temperature',
      label: 'Temperature',
      minWidth: 170,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'humidity',
      label: 'Humidity',
      minWidth: 170,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'air_quality',
      label: 'Air Quality',
      minWidth: 170,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
  ];



  if(!data || data.length === 0) return <>Loading ... </>
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(cntPage * rowsPerPage, cntPage * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.timestamp}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          { column.format(value)
                          }
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={cntPage}
        onPageChange={(e,newPage) => setCntPage(newPage)}
        onRowsPerPageChange={(e) => setRowsPerPage(e.target.value)}
      />
    </Paper>
  );
}

export default TableComp
