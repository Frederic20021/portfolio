type BalanceCardProps = {
  balance: number;
  adjustedValue: number;
  dailyYield: number;
};

export default function BalanceCard({ balance, adjustedValue, dailyYield }: BalanceCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-gray-800 text-lg font-bold mb-2">Your Balance</h2>
      <p className="text-gray-500 text-2xl font-semibold">{balance} YumeUSD</p>
      <p className="text-gray-500">= ${adjustedValue} (Inflation-proof)</p>
      <p className="mt-4 text-green-600 font-medium">+ ${dailyYield} today</p>
    </div>
  );
}