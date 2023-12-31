import React from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { HeaderTypography, StyledTableContainer, DataTypography } from "./cart-table.styled";
import amountToFixed from "../../helper/amountToFixed";
  
  export default function CartTable({selectedProducts}) {
    return (
      <StyledTableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell><HeaderTypography>Cantidad</HeaderTypography></TableCell>
              <TableCell align="left"><HeaderTypography>Products</HeaderTypography></TableCell>
              <TableCell align="left"><HeaderTypography>Subtotal</HeaderTypography></TableCell>
              <TableCell align="left"><HeaderTypography>Impuesto</HeaderTypography></TableCell>
              <TableCell align="left"><HeaderTypography>10% Servicio</HeaderTypography></TableCell>
              <TableCell align="left"><HeaderTypography>Efectivo / Tarjeta</HeaderTypography></TableCell>
              <TableCell align="left"><HeaderTypography>Beneficios</HeaderTypography></TableCell>
              <TableCell align="left"><HeaderTypography>Total</HeaderTypography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedProducts.map((row) => (
              <TableRow
                key={row.combo ? row.key : row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.quantity}
                </TableCell>
                <TableCell align="left"><DataTypography>{row.name}</DataTypography></TableCell>
                <TableCell align="left"><DataTypography>{`RD$ ${amountToFixed(row.price * row.quantity,2)}`}</DataTypography></TableCell>
                <TableCell align="left"><DataTypography>{`ITBIS (${row.taxTypes[0] * 1 || 0}%) RD$ ${amountToFixed(row.taxTypes[0] ? row.taxTypes[0] * row.price * row.quantity /100 : 0.00, 2)}`}</DataTypography></TableCell>
                <TableCell align="left"><DataTypography>{`RD$ ${0}`}</DataTypography></TableCell>
                <TableCell align="left"><DataTypography>{`RD$ ${amountToFixed(row.cashOrCardValue,2) || '0.00'}`}</DataTypography></TableCell>
                <TableCell align="left"><DataTypography>{`RD$ ${amountToFixed(row.benefits,2) || '0.00'}`}</DataTypography></TableCell>
                <TableCell align="left"><DataTypography>{`RD$ ${amountToFixed(((+row.price * row.quantity) + (row.taxTypes[0] ? row.taxTypes[0] * row.price * row.quantity /100 : 0.00)) - (row.benefits || 0) - (row.cashOrCardValue || 0), 2)}`}</DataTypography></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    );
  }