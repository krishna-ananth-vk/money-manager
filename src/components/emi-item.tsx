import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  IconButton,
  Box,
  LinearProgress,
  GridLegacy
} from '@mui/material';
import { Edit, Delete, CheckCircle, Schedule } from '@mui/icons-material';
import {
  calculateTotalEmis,
  calculateRemainingEmis,
  isEmiActive
} from '../utils/emi-calculations';
import type { EMI } from '@/type';

interface EmiItemProps {
  emi: EMI;
  onEdit: (emi: EMI) => void;
  onDelete: (id: string) => void;
}

const EmiItem: React.FC<EmiItemProps> = ({ emi, onEdit, onDelete }) => {
  const totalEmis = calculateTotalEmis(emi);
  const remainingEmis = calculateRemainingEmis(emi);
  const isActive = isEmiActive(emi);
  const completedEmis = totalEmis - remainingEmis;
  const progressPercentage = (completedEmis / totalEmis) * 100;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr + '-01').toLocaleDateString('en-IN', {
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <Card
      sx={{
        mb: 2,
        transition: 'all 0.3s ease',
        opacity: isActive ? 1 : 0.7,
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 4
        }
      }}
    >
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <GridLegacy item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mr: 1 }}>
                {emi.name}
              </Typography>
              <Chip
                icon={isActive ? <CheckCircle /> : <Schedule />}
                label={isActive ? 'Active' : 'Inactive'}
                size="small"
                color={isActive ? 'success' : 'default'}
                variant={isActive ? 'filled' : 'outlined'}
              />
            </Box>
            <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>
              {formatCurrency(emi.amount)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Due on {emi.deductionDate}{emi.deductionDate === 1 ? 'st' :
                emi.deductionDate === 2 ? 'nd' : emi.deductionDate === 3 ? 'rd' : 'th'}
              {' '}of every month
            </Typography>
          </GridLegacy>

          <Grid >
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Duration
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {formatDate(emi.startDate)} - {formatDate(emi.endDate)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {totalEmis} months total
            </Typography>
          </Grid>

          <GridLegacy item xs={12} sm={6} md={4}>
            <Box sx={{ mb: 1 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Progress: {completedEmis} / {totalEmis} EMIs completed
              </Typography>
              <LinearProgress
                variant="determinate"
                value={progressPercentage}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                  }
                }}
              />
            </Box>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {remainingEmis} EMIs remaining
            </Typography>
          </GridLegacy>

          <GridLegacy item xs={12} sm={6} md={2}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <IconButton
                onClick={() => onEdit(emi)}
                color="primary"
                size="small"
                sx={{ '&:hover': { backgroundColor: 'primary.light', color: 'white' } }}
              >
                <Edit />
              </IconButton>
              <IconButton
                onClick={() => onDelete(emi.id)}
                color="error"
                size="small"
                sx={{ '&:hover': { backgroundColor: 'error.light', color: 'white' } }}
              >
                <Delete />
              </IconButton>
            </Box>
          </GridLegacy>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default EmiItem;