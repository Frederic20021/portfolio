import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: "Mon", value: 1200 },
  { day: "Tue", value: 1210 },
  { day: "Wed", value: 1225 },
  { day: "Thu", value: 1230 },
  { day: "Fri", value: 1240 },
];

export default function ChartCard() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-lg font-bold mb-4">Inflation Adjustments</h2>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
