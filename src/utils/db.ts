
import { openDB } from "idb";
import type { Expense } from "../type/types";

const DB_NAME = "money-manager";
const EXPENSE_STORE_NAME = "expenses";
// const INCOME_STORE_NAME = "income";
// const UTILS_STORE_NAME = "utils";
// const EMI_STORE_NAME = "emi";




const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(EXPENSE_STORE_NAME)) {
        db.createObjectStore(EXPENSE_STORE_NAME, { keyPath: "id", autoIncrement: true });
      }
    },
  });
}

const addExpense = async (expense: Expense) => {
  const db = await initDB();
  await db.add(EXPENSE_STORE_NAME, { ...expense, createdAt: new Date().toISOString() });
}

const getExpenses = async () => {
  const db = await initDB();
  return db.getAll(EXPENSE_STORE_NAME);
}

export {
  addExpense,
  getExpenses
};