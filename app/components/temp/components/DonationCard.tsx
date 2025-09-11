type DonationCardProps = {
  name: string;
  impact: string;
  proof: string;
};

export default function DonationCard({ name, impact, proof }: DonationCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
      <h3 className="text-gray-800 text-lg font-semibold">{name}</h3>
      <p className="text-gray-500">Impact: {impact}</p>
      <a
        href={proof}
        className="mt-3 inline-block text-indigo-600 font-medium hover:underline"
      >
        View Proof →
      </a>
    </div>
  );
}
