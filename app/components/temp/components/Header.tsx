export default function Header() {
  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-indigo-600">YumeUSD</h1>
      {/* Wallet login (placeholder for wagmi connect) */}
      <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700">
        Login / Connect Wallet
      </button>
    </header>
  );
}
