export interface EMI {
  id: string;
  name: string;
  amount: number;
  startDate: string; // YYYY-MM format
  endDate: string; // YYYY-MM format
  deductionDate: number; // day of month (1-31)
  isActive: boolean;
}

export interface IncomeData {
  monthlyIncome: number;
}

export interface ChartData {
  month: string;
  income: number;
  totalEmi: number;
  remaining: number;
}