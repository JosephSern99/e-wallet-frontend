import React from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';

const DashboardCard = ({ title, content, actionText, onActionClick }) => {
  return (
    <Card sx={{ minWidth: 275, mb: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      {actionText && onActionClick && (
        <CardActions>
          <Button size="small" onClick={onActionClick}>
            {actionText}
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default DashboardCard;