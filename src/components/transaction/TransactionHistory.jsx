import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Paper,
  Chip,
  CircularProgress,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import TransactionItem from './TransactionItem';
import { visuallyHidden } from '@mui/utils';

const headCells = [
  { id: 'date', label: 'Date', numeric: false },
  { id: 'type', label: 'Type', numeric: false },
  { id: 'reference', label: 'Reference', numeric: false },
  { id: 'description', label: 'Description', numeric: false },
  { id: 'amount', label: 'Amount', numeric: true },
  { id: 'status', label: 'Status', numeric: false },
  { id: 'actions', label: 'Actions', numeric: false, sortable: false }
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const TransactionHistory = ({ transactions = [], loading = false, onViewTransaction }) => {
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('date');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterText, setFilterText] = useState('');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const searchText = filterText.toLowerCase();
    return (
      transaction.transactionReference.toLowerCase().includes(searchText) ||
      (transaction.description && transaction.description.toLowerCase().includes(searchText)) ||
      transaction.type.toLowerCase().includes(searchText) ||
      transaction.status.toLowerCase().includes(searchText)
    );
  });

  // Avoid a layout jump when reaching the last page with empty rows
  const emptyRows = page > 0 
    ? Math.max(0, (1 + page) * rowsPerPage - filteredTransactions.length) 
    : 0;

  return (
    <Card>
      <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="h6" component="div">
            Transaction History
          </Typography>
          
          <TextField
            size="small"
            placeholder="Search transactions..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Filter Options">
                    <IconButton size="small">
                      <FilterIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              )
            }}
            sx={{ width: { xs: '100%', sm: 250 } }}
          />
        </Box>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : filteredTransactions.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <InfoIcon color="disabled" sx={{ fontSize: 40, mb: 2 }} />
            <Typography color="text.secondary">
              {transactions.length === 0 
                ? "No transactions yet" 
                : "No transactions match your search"}
            </Typography>
          </Box>
        ) : (
          <Paper sx={{ width: '100%', mb: 2 }}>
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="transactionTable"
                size="medium"
              >
                <TableHead>
                  <TableRow>
                    {headCells.map((headCell) => (
                      <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        sortDirection={orderBy === headCell.id ? order : false}
                      >
                        {headCell.sortable !== false ? (
                          <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={(event) => handleRequestSort(event, headCell.id)}
                          >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                              <Box component="span" sx={visuallyHidden}>
                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                              </Box>
                            ) : null}
                          </TableSortLabel>
                        ) : (
                          headCell.label
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stableSort(filteredTransactions, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((transaction) => (
                      <TransactionItem 
                        key={transaction.transactionReference} 
                        transaction={transaction}
                        onView={() => onViewTransaction && onViewTransaction(transaction)}
                      />
                    ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={7} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredTransactions.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;
