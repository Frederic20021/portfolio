export default function TransparencyCard() {
  return (
    <div className="bg-white p-6 text-gray-800 rounded-2xl shadow-lg space-y-3">
      <p>✅ Phala TEE Verification (last check: 10:32 UTC)</p>
      <p>
        🔗 LayerZero Proof{" "}
        <a href="#" className="text-indigo-600">
          View Tx
        </a>
      </p>
      <p>
        📊 Yield Breakdown{" "}
        <a href="#" className="text-indigo-600">
          Download CSV
        </a>
      </p>
    </div>
  );
}
