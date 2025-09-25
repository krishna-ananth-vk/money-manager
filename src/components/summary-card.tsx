import React from 'react';
import { Card, GridLegacy, CardContent, Typography, Grid, Box, Chip } from '@mui/material';
import { TrendingUp, AccountBalance, Savings } from '@mui/icons-material';
import { calculateMonthlyEmiTotal, isEmiActive } from '../utils/emi-calculations';
import dayjs from 'dayjs';
import type { EMI } from '@/type';

interface SummaryCardProps {
  monthlyIncome: number;
  emis: EMI[];
}

const SummaryCard: React.FC<SummaryCardProps> = ({ monthlyIncome, emis }) => {
  const currentMonth = dayjs().format('YYYY-MM');
  const totalCurrentEmi = calculateMonthlyEmiTotal(emis, currentMonth);
  const remaining = monthlyIncome - totalCurrentEmi;
  const activeEmisCount = emis.filter(emi => isEmiActive(emi)).length;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Card sx={{ mb: 3, background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)' }}>
      <CardContent sx={{ color: 'white' }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Financial Overview
        </Typography>

        <Grid container spacing={3}>
          <GridLegacy item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <TrendingUp sx={{ mr: 1, opacity: 0.9 }} />
              <Typography variant="subtitle2" sx={{ opacity: 0.9 }}>
                Monthly Income
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {formatCurrency(monthlyIncome)}
            </Typography>
          </GridLegacy>

          <GridLegacy item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <AccountBalance sx={{ mr: 1, opacity: 0.9 }} />
              <Typography variant="subtitle2" sx={{ opacity: 0.9 }}>
                Total EMIs ({activeEmisCount} active)
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {formatCurrency(totalCurrentEmi)}
            </Typography>
          </GridLegacy>

          <GridLegacy item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Savings sx={{ mr: 1, opacity: 0.9 }} />
              <Typography variant="subtitle2" sx={{ opacity: 0.9 }}>
                Remaining Balance
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {formatCurrency(remaining)}
            </Typography>
            <Chip
              label={`${((remaining / monthlyIncome) * 100).toFixed(1)}% of income`}
              size="small"
              sx={{
                mt: 1,
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                fontWeight: 500
              }}
            />
          </GridLegacy>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;