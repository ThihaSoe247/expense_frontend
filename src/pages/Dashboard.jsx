import { useEffect, useState } from "react";
import axios from "../helpers/axios";
import dayjs from "dayjs";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

const COLORS = ["#00C49F", "#FF8042", "#FFBB28", "#8884d8", "#82ca9d"];

export default function Dashboard() {
  const [month, setMonth] = useState(dayjs().format("YYYY-MM")); // format: 2025-08
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchMonthlyExpenses = async () => {
    try {
      setLoading(true);
      const daysInMonth = dayjs(month).daysInMonth();
      const year = month.split("-")[0];
      const monthIndex = month.split("-")[1];

      const allPromises = [];

      for (let day = 1; day <= daysInMonth; day++) {
        const dayStr = String(day).padStart(2, "0");
        const date = `${year}-${monthIndex}-${dayStr}`;
        allPromises.push(axios.get(`/?date=${date}`));
      }

      const responses = await Promise.all(allPromises);
      const allExpenses = responses.flatMap((res) => res.data.expenses || []);
      setExpenses(allExpenses);
    } catch (err) {
      console.error("Error fetching monthly expenses:", err);
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonthlyExpenses();
  }, [month]);

  const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const categoryData = Object.values(
    expenses.reduce((acc, exp) => {
      acc[exp.category] = acc[exp.category] || {
        name: exp.category,
        value: 0,
      };
      acc[exp.category].value += exp.amount;
      return acc;
    }, {})
  );

  const dailyData = Object.values(
    expenses.reduce((acc, exp) => {
      const day = dayjs(exp.date).format("D");
      acc[day] = acc[day] || { day, total: 0 };
      acc[day].total += exp.amount;
      return acc;
    }, {})
  );

  const formatTHB = (amount) =>
    new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(amount);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-2">
        Monthly Analytics
      </h1>

      <div className="mb-4">
        <label className="mr-2 font-medium text-gray-700">Select Month:</label>
        <input
          type="month"
          className="border px-3 py-2 rounded"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : expenses.length === 0 ? (
        <p className="text-gray-500">No expenses found for this month.</p>
      ) : (
        <div className="space-y-6">
          {/* Total */}
          <p className="text-xl font-semibold text-green-800">
            Total Spent: {formatTHB(totalAmount)}
          </p>

          {/* Pie Chart */}
          <div className="w-full md:w-[600px] h-[300px]">
            <h2 className="text-lg font-bold mb-2">By Category</h2>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {categoryData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="w-full md:w-[700px] h-[300px]">
            <h2 className="text-lg font-bold mb-2">Daily Spending</h2>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#8884d8" name="Total Spent" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Expense List */}
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-2">
              All Expenses – {dayjs(month).format("MMMM YYYY")}
            </h2>
            <ul className="space-y-3">
              {expenses
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((exp) => (
                  <li
                    key={exp._id}
                    className="border p-4 rounded shadow flex justify-between items-center"
                  >
                    <div>
                      <p className="font-semibold">{exp.title}</p>
                      <p className="text-sm text-gray-600">
                        {dayjs(exp.date).format("MMMM D, YYYY")} •{" "}
                        {exp.category}
                      </p>
                    </div>
                    <span className="font-bold text-red-600">
                      {formatTHB(exp.amount)}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
