import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Fab,
  Button,
  Grid,
  Alert,
  Snackbar,
  GridLegacy
} from '@mui/material';
import {
  Add,
  BarChart,
  TrendingUp
} from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { useLocalStorage } from './hooks/useLocalStorage';
import AddEmiDialog from './components/add-emi-dialog';
import EmiChart from './components/emi-chart';
import EmiItem from './components/emi-item';
import IncomeDialog from './components/income-dialog';
import SummaryCard from './components/summary-card';
import type { EMI, IncomeData } from './type';
import { sortEmis, isEmiActive } from './utils/emi-calculations';


const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#388e3c',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
});

const defaultEmis: EMI[] = [
  {
    id: '1',
    name: 'Home Loan',
    amount: 45000,
    startDate: '2023-01',
    endDate: '2043-01',
    deductionDate: 5,
    isActive: true,
  },
  {
    id: '2',
    name: 'Car Loan',
    amount: 18000,
    startDate: '2024-01',
    endDate: '2027-01',
    deductionDate: 10,
    isActive: true,
  },
  {
    id: '3',
    name: 'Personal Loan',
    amount: 8500,
    startDate: '2023-06',
    endDate: '2024-06',
    deductionDate: 15,
    isActive: false,
  },
];

function App() {
  const [emis, setEmis] = useLocalStorage<EMI[]>('emis', defaultEmis);
  const [income, setIncome] = useLocalStorage<IncomeData>('income', { monthlyIncome: 120000 });

  const [addEmiOpen, setAddEmiOpen] = useState(false);
  const [chartOpen, setChartOpen] = useState(false);
  const [incomeOpen, setIncomeOpen] = useState(false);
  const [editingEmi, setEditingEmi] = useState<EMI | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const sortedEmis = sortEmis(emis);

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleAddEmi = (emiData: Omit<EMI, 'id'>) => {
    const newEmi: EMI = {
      ...emiData,
      id: Date.now().toString(),
      isActive: isEmiActive({ ...emiData, id: '' }),
    };
    setEmis([...emis, newEmi]);
    showSnackbar('EMI added successfully!');
  };

  const handleEditEmi = (emi: EMI) => {
    setEditingEmi(emi);
    setAddEmiOpen(true);
  };

  const handleUpdateEmi = (emiData: Omit<EMI, 'id'>) => {
    if (editingEmi) {
      const updatedEmi: EMI = {
        ...emiData,
        id: editingEmi.id,
        isActive: isEmiActive({ ...emiData, id: editingEmi.id }),
      };
      setEmis(emis.map(emi => emi.id === editingEmi.id ? updatedEmi : emi));
      setEditingEmi(null);
      showSnackbar('EMI updated successfully!');
    }
  };

  const handleDeleteEmi = (id: string) => {
    setEmis(emis.filter(emi => emi.id !== id));
    showSnackbar('EMI deleted successfully!');
  };

  const handleCloseAddDialog = () => {
    setAddEmiOpen(false);
    setEditingEmi(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            EMI & Income Tracker
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Manage your monthly finances with ease
          </Typography>
        </Box>

        <SummaryCard monthlyIncome={income.monthlyIncome} emis={emis} />

        <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="outlined"
            startIcon={<TrendingUp />}
            onClick={() => setIncomeOpen(true)}
          >
            Update Income
          </Button>
          <Button
            variant="outlined"
            startIcon={<BarChart />}
            onClick={() => setChartOpen(true)}
            disabled={emis.length === 0}
          >
            View Chart
          </Button>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Your EMIs ({emis.length})
          </Typography>

          {emis.length === 0 ? (
            <Alert severity="info" sx={{ borderRadius: 2 }}>
              No EMIs found. Click the + button to add your first EMI.
            </Alert>
          ) : (
            <Grid container spacing={0}>
              {sortedEmis.map((emi) => (
                <GridLegacy item xs={12} key={emi.id}>
                  <EmiItem
                    emi={emi}
                    onEdit={handleEditEmi}
                    onDelete={handleDeleteEmi}
                  />
                </GridLegacy>
              ))}
            </Grid>
          )}
        </Box>

        <Fab
          color="primary"
          aria-label="add"
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            boxShadow: 3,
          }}
          onClick={() => setAddEmiOpen(true)}
        >
          <Add />
        </Fab>

        <AddEmiDialog
          open={addEmiOpen}
          onClose={handleCloseAddDialog}
          onSave={editingEmi ? handleUpdateEmi : handleAddEmi}
          editEmi={editingEmi}
        />

        <EmiChart
          open={chartOpen}
          onClose={() => setChartOpen(false)}
          monthlyIncome={income.monthlyIncome}
          emis={emis}
        />

        <IncomeDialog
          open={incomeOpen}
          onClose={() => setIncomeOpen(false)}
          currentIncome={income.monthlyIncome}
          onSave={(newIncome) => setIncome({ monthlyIncome: newIncome })}
        />

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;