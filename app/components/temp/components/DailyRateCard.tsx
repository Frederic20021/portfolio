type DailyRateCardProps = { dailyRate: number };

export default function DailyRateCard({ dailyRate }: DailyRateCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-gray-800 text-lg font-bold mb-2">Daily Rate</h2>
      <p className="text-gray-500 text-2xl font-semibold">{dailyRate}%</p>
      <p className="text-gray-500">Inflation-adjusted daily return</p>
    </div>
  );
}
