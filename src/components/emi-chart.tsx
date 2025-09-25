import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box
} from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import type { EMI } from '@/type';
import { generateChartData } from '../utils/emi-calculations';

interface EmiChartProps {
  open: boolean;
  onClose: () => void;
  monthlyIncome: number;
  emis: EMI[];
}

const EmiChart: React.FC<EmiChartProps> = ({
  open,
  onClose,
  monthlyIncome,
  emis
}) => {
  const chartData = generateChartData(monthlyIncome, emis, 6);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Income vs EMI Projection (Next 6 Months)
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ width: '100%', height: 400, mt: 2 }}>
          <BarChart
            dataset={chartData}
            xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
            series={[
              {
                dataKey: 'income',
                label: 'Monthly Income',
                color: '#1976d2',
              },
              {
                dataKey: 'totalEmi',
                label: 'Total EMI',
                color: '#d32f2f',
              },
              {
                dataKey: 'remaining',
                label: 'Remaining',
                color: '#388e3c',
              },
            ]}
            width={800}
            height={400}
            margin={{ top: 20, bottom: 60, left: 80, right: 20 }}
            slotProps={{
              legend: {
                direction: 'row',
                position: { vertical: 'top', horizontal: 'middle' },
                padding: 0,
              },
            }}
          />
        </Box>

        <Box sx={{ mt: 3, p: 2, backgroundColor: 'grey.50', borderRadius: 2 }}>
          <Typography variant="body2" color="text.secondary">
            <strong>Chart Legend:</strong> Blue bars show monthly income, red bars show total EMI payments,
            and green bars show remaining balance after EMI deductions for each month.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmiChart;