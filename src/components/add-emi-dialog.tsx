import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  GridLegacy
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import type { EMI } from '@/type';

interface AddEmiDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (emi: Omit<EMI, 'id'>) => void;
  editEmi?: EMI | null;
}

const AddEmiDialog: React.FC<AddEmiDialogProps> = ({
  open,
  onClose,
  onSave,
  editEmi
}) => {
  const [name, setName] = useState(editEmi?.name || '');
  const [amount, setAmount] = useState(editEmi?.amount?.toString() || '');
  const [startDate, setStartDate] = useState<Dayjs | null>(
    editEmi ? dayjs(editEmi.startDate) : dayjs()
  );
  const [endDate, setEndDate] = useState<Dayjs | null>(
    editEmi ? dayjs(editEmi.endDate) : dayjs().add(12, 'month')
  );
  const [deductionDate, setDeductionDate] = useState(
    editEmi?.deductionDate?.toString() || '1'
  );

  const handleSave = () => {
    if (!name || !amount || !startDate || !endDate) return;

    const emiData: Omit<EMI, 'id'> = {
      name,
      amount: parseFloat(amount),
      startDate: startDate.format('YYYY-MM'),
      endDate: endDate.format('YYYY-MM'),
      deductionDate: parseInt(deductionDate),
      isActive: true
    };

    onSave(emiData);
    handleClose();
  };

  const handleClose = () => {
    setName('');
    setAmount('');
    setStartDate(dayjs());
    setEndDate(dayjs().add(12, 'month'));
    setDeductionDate('1');
    onClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {editEmi ? 'Edit EMI' : 'Add New EMI'}
          </Typography>
        </DialogTitle>

        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={3}>
              <GridLegacy item xs={12}>
                <TextField
                  label="EMI Name"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Home Loan, Car Loan"
                />
              </GridLegacy>

              <GridLegacy item xs={12} sm={6}>
                <TextField
                  label="EMI Amount"
                  type="number"
                  fullWidth
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  InputProps={{
                    startAdornment: <Typography sx={{ mr: 1 }}>₹</Typography>,
                  }}
                />
              </GridLegacy>

              <GridLegacy item xs={12} sm={6}>
                <TextField
                  label="Deduction Date"
                  type="number"
                  fullWidth
                  value={deductionDate}
                  onChange={(e) => setDeductionDate(e.target.value)}
                  inputProps={{ min: 1, max: 31 }}
                  helperText="Day of month (1-31)"
                />
              </GridLegacy>

              <Grid >
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={setStartDate}
                  views={['year', 'month']}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Grid>

              <Grid >
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={setEndDate}
                  views={['year', 'month']}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={!name || !amount || !startDate || !endDate}
            sx={{ minWidth: 100 }}
          >
            {editEmi ? 'Update' : 'Add EMI'}
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default AddEmiDialog;