// two charts: calories per recipe and price per serving

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function RecipeCharts({ recipes }) {
  const data = recipes.map((r) => ({
    name: r.title.slice(0, 12),
    calories: Number(r.calories || 0),
    price: r.pricePerServing ? r.pricePerServing / 100 : 0,
  }));

  return (
    <section className="charts-row">
      {/* calories chart */}
      <div className="chart-card">
        <h3 className="chart-title">Calories per recipe</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(148, 163, 184, 0.4)"
            />
            <XAxis dataKey="name" hide />
            <YAxis tick={{ fill: "#ffffff", fontSize: 11 }} />
            <Tooltip />
            <Bar dataKey="calories" fill="#9f7aea" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* price chart */}
      <div className="chart-card">
        <h3 className="chart-title">Price per serving ($)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(148, 163, 184, 0.4)"
            />
            <XAxis dataKey="name" hide />
            <YAxis tick={{ fill: "#ffffff", fontSize: 11 }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#63b3ed"
              dot={false}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
