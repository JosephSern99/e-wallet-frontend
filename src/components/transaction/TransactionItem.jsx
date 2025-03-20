import React from 'react';
import {
  TableCell,
  TableRow,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  VisibilityOutlined as ViewIcon,
  ArrowUpward as SendIcon,
  ArrowDownward as ReceiveIcon,
  SwapHoriz as TransferIcon
} from '@mui/icons-material';

const TransactionItem = ({ transaction, onView }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED':
        return 'success';
      case 'PENDING':
        return 'warning';
      case 'FAILED':
        return 'error';
      default:
        return 'default';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'DEPOSIT':
        return <ReceiveIcon fontSize="small" />;
      case 'WITHDRAWAL':
        return <SendIcon fontSize="small" />;
      case 'TRANSFER':
        return <TransferIcon fontSize="small" />;
      default:
        return null;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'DEPOSIT':
        return 'success';
      case 'WITHDRAWAL':
        return 'error';
      case 'TRANSFER':
        return 'info';
      default:
        return 'default';
    }
  };

  const formatAmount = (type, amount) => {
    const prefix = type === 'DEPOSIT' ? '+' : type === 'WITHDRAWAL' ? '-' : '';
    return `${prefix}$${parseFloat(amount).toFixed(2)}`;
  };

  const formattedDate = new Date(transaction.createdAt).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <TableRow
      hover
      role="checkbox"
      tabIndex={-1}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell>{formattedDate}</TableCell>
      <TableCell>
        <Chip 
          icon={getTypeIcon(transaction.type)}
          label={transaction.type}
          color={getTypeColor(transaction.type)}
          size="small"
          variant="outlined"
        />
      </TableCell>
      <TableCell>{transaction.transactionReference}</TableCell>
      <TableCell>{transaction.description || '—'}</TableCell>
      <TableCell align="right" 
        sx={{ 
          color: transaction.type === 'DEPOSIT' 
            ? 'success.main' 
            : transaction.type === 'WITHDRAWAL' 
              ? 'error.main' 
              : 'text.primary',
          fontWeight: 'medium'
        }}
      >
        {formatAmount(transaction.type, transaction.amount)}
      </TableCell>
      <TableCell>
        <Chip 
          label={transaction.status}
          color={getStatusColor(transaction.status)}
          size="small"
        />
      </TableCell>
      <TableCell>
        <Tooltip title="View Details">
          <IconButton size="small" onClick={onView}>
            <ViewIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export default TransactionItem;