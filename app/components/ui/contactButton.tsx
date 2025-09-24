import Link from "next/link";

export default function ContactButton() {
  return (
    <div className="bg-white flex justify-center py-8">
      <Link
        href="/contact"
        className="bg-blue-600 hover:bg-blue-700 text-white p-4 font-bold rounded-lg transition-colors duration-300 shadow-lg"
      >
        お問い合わせ・ご相談はこちら
      </Link>
    </div>
  );
}
