export default function ActionPanel() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 flex justify-between items-center">
      <p className="text-gray-600">APY: ~4.5%</p>
      <div className="space-x-3">
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl">Mint</button>
        <button className="px-4 py-2 bg-gray-200 rounded-xl">Redeem</button>
        <button className="px-4 py-2 bg-green-500 text-white rounded-xl">
          Auto-Delegate
        </button>
      </div>
    </div>
  );
}
