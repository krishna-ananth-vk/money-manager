import type { EMI } from "@/type";
import dayjs from "dayjs";

export const calculateTotalEmis = (emi: EMI): number => {
  const start = dayjs(emi.startDate);
  const end = dayjs(emi.endDate);
  return end.diff(start, 'month') + 1;
};

export const calculateRemainingEmis = (emi: EMI): number => {
  const now = dayjs();
  const end = dayjs(emi.endDate);
  const currentMonth = now.format('YYYY-MM');

  if (currentMonth > emi.endDate) {
    return 0;
  }

  return Math.max(0, end.diff(now, 'month') + 1);
};

export const isEmiActive = (emi: EMI): boolean => {
  const now = dayjs();
  const currentMonth = now.format('YYYY-MM');
  return currentMonth >= emi.startDate && currentMonth <= emi.endDate;
};

export const sortEmis = (emis: EMI[]): EMI[] => {
  return [...emis].sort((a, b) => {
    const aActive = isEmiActive(a);
    const bActive = isEmiActive(b);

    // First sort by active status (active first)
    if (aActive && !bActive) return -1;
    if (!aActive && bActive) return 1;

    // Then sort by amount (descending)
    return b.amount - a.amount;
  });
};

export const calculateMonthlyEmiTotal = (emis: EMI[], month: string): number => {
  return emis
    .filter(emi => {
      return month >= emi.startDate && month <= emi.endDate;
    })
    .reduce((total, emi) => total + emi.amount, 0);
};

export const generateChartData = (
  monthlyIncome: number,
  emis: EMI[],
  monthsAhead: number = 6
): { month: string; income: number; totalEmi: number; remaining: number }[] => {
  const data = [];
  const now = dayjs();

  for (let i = 0; i < monthsAhead; i++) {
    const month = now.add(i, 'month');
    const monthStr = month.format('YYYY-MM');
    const totalEmi = calculateMonthlyEmiTotal(emis, monthStr);

    data.push({
      month: month.format('MMM YY'),
      income: monthlyIncome,
      totalEmi,
      remaining: monthlyIncome - totalEmi
    });
  }

  return data;
};