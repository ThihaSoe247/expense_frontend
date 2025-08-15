import { useEffect, useState } from "react";
import axios from "../helpers/axios";
import dayjs from "dayjs";

export default function ExpenseTrack() {
  const today = dayjs().format("YYYY-MM-DD");
  const [selectedDate, setSelectedDate] = useState(today);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    type: "expense",
    date: today,
  });

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      let url = "/";
      if (selectedDate) {
        url += `?date=${selectedDate}`;
      }
      const res = await axios.get(url);
      setExpenses(res.data.expenses || []);
    } catch (err) {
      console.error("Failed to fetch expenses", err);
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [selectedDate]);

  const handleAddExpense = async () => {
    try {
      await axios.post("/add", form);
      setShowModal(false);
      setForm({
        title: "",
        amount: "",
        category: "",
        type: "expense",
        date: selectedDate,
      });
      fetchExpenses();
    } catch (err) {
      console.error("Failed to add expense", err);
    }
  };

  const daysInMonth = dayjs().daysInMonth();
  const dateOptions = Array.from({ length: daysInMonth }, (_, i) => {
    const date = dayjs()
      .date(i + 1)
      .format("YYYY-MM-DD");
    return (
      <option key={date} value={date}>
        {dayjs(date).format("MMMM D, YYYY")}
      </option>
    );
  });

  const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-1">Expenses</h1>
      <p className="text-gray-600 mb-6">
        {dayjs(selectedDate).format("dddd, MMMM D, YYYY")}
      </p>

      <div className="mb-4">
        <select
          className="px-4 py-2 rounded border border-gray-300"
          value={selectedDate}
          onChange={(e) => {
            setLoading(true);
            setSelectedDate(e.target.value);
          }}
        >
          <option value={today}>Today</option>
          {dateOptions}
        </select>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => {
            setForm((prev) => ({ ...prev, date: selectedDate }));
            setShowModal(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          ➕ Add Expense
        </button>
      </div>

      {!loading && expenses.length > 0 && (
        <p className="text-lg font-semibold mb-4">
          Total: ฿{totalAmount.toFixed(2)}
        </p>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : expenses.length === 0 ? (
        <p className="text-gray-500">
          No expenses for {dayjs(selectedDate).format("MMMM D, YYYY")}.
        </p>
      ) : (
        <ul className="space-y-3">
          {expenses.map((exp) => (
            <li
              key={exp._id}
              className="border p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{exp.title}</p>
                <p className="text-sm text-gray-600">
                  {exp.category} –{" "}
                  {exp.type === "income" ? "Income" : "Expense"}
                </p>
              </div>
              <span
                className={`font-bold ${
                  exp.type === "income" ? "text-green-600" : "text-red-600"
                }`}
              >
                ฿{exp.amount}
              </span>
            </li>
          ))}
        </ul>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white text-black rounded-xl p-6 w-[95%] max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add Expense</h2>

            <input
              type="text"
              placeholder="Title"
              className="w-full mb-2 p-2 border rounded"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <input
              type="number"
              placeholder="Amount"
              className="w-full mb-2 p-2 border rounded"
              value={form.amount}
              onChange={(e) =>
                setForm({ ...form, amount: parseFloat(e.target.value) || "" })
              }
            />

            <input
              type="text"
              placeholder="Category"
              className="w-full mb-2 p-2 border rounded"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />

            <select
              className="w-full mb-2 p-2 border rounded"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>

            <input
              type="date"
              className="w-full mb-4 p-2 border rounded"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddExpense}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
