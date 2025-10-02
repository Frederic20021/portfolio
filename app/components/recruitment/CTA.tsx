import Link from "next/link";

export default function CTA() {
  return (
    <>
    {/* CTA Section */}
      <section className="py-20 px-6 text-center text-white">
        <h2 className="text-3xl font-bold mb-6">
          世界と日本をつなぐ新しいキャリアの第一歩を
        </h2>
        <p className="mb-8 max-w-2xl mx-auto">
          あなたの未来を共に創り上げましょう。
        </p>
        <Link href="https://empowerandlink.com/contact/" className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold shadow hover:bg-gray-100">
          お問い合わせはこちら
        </Link>
      </section>
    </>
  )
}