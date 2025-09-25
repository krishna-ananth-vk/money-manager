import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box
} from '@mui/material';

interface IncomeDialogProps {
  open: boolean;
  onClose: () => void;
  currentIncome: number;
  onSave: (income: number) => void;
}

const IncomeDialog: React.FC<IncomeDialogProps> = ({
  open,
  onClose,
  currentIncome,
  onSave
}) => {
  const [income, setIncome] = useState(currentIncome.toString());

  const handleSave = () => {
    if (income && parseFloat(income) > 0) {
      onSave(parseFloat(income));
      onClose();
    }
  };

  const handleClose = () => {
    setIncome(currentIncome.toString());
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Update Monthly Income
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <TextField
            label="Monthly Income"
            type="number"
            fullWidth
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1 }}>₹</Typography>,
            }}
            helperText="Enter your total monthly income after taxes"
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!income || parseFloat(income) <= 0}
        >
          Update Income
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default IncomeDialog;