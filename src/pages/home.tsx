import { useEffect, useState } from "react";
import { addExpense, getExpenses } from "../utils/db";
import type { Expense } from "../type/types";

const Home = () => {

  const [expenses, setExpenses] = useState<Array<Expense>>([]);

  useEffect(() => {
    getExpenses().then(setExpenses);
  }, []);

  const handleAdd = async () => {
    await addExpense({ description: "Coffee", amount: 120 });
    setExpenses(await getExpenses());
  }
  return (
    <div className="p-4">
      <button onClick={handleAdd} className="bg-blue-500 text-white px-3 py-1 rounded">
        Add Expense
      </button>
      <ul>
        {expenses.map(e => (
          <li key={e.id}>{e.description} - ₹{e.amount}</li>
        ))}
      </ul>
    </div>
  );
}


export default Home;