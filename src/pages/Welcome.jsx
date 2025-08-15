import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-emerald-50 via-white to-green-50 px-6 text-center">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="text-6xl mb-4">💰</div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4 leading-tight">
            Expense Tracker
          </h1>
          <div className="w-24 h-1 bg-emerald-500 mx-auto mb-6"></div>
        </div>

        <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-lg mx-auto">
          Take control of your finances with our simple yet powerful expense
          tracking tool. Monitor your spending, set budgets, and achieve your
          financial goals.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/login"
            className="px-8 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="px-8 py-3 bg-white text-emerald-600 border-2 border-emerald-600 rounded-lg font-medium hover:bg-emerald-600 hover:text-white transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Get Started
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-4">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-800 mb-2">Track Daily</h3>
            <p className="text-gray-600 text-sm">
              Monitor your daily expenses and income effortlessly
            </p>
          </div>
          <div className="p-4">
            <div className="text-3xl mb-2">📈</div>
            <h3 className="font-semibold text-gray-800 mb-2">Analyze Trends</h3>
            <p className="text-gray-600 text-sm">
              View detailed reports and spending patterns
            </p>
          </div>
          <div className="p-4">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="font-semibold text-gray-800 mb-2">Reach Goals</h3>
            <p className="text-gray-600 text-sm">
              Set budgets and achieve your financial targets
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
