'use client';

import { useState } from "react";
import Header from "@/app/components/temp/components/Header";
import BalanceCard from "@/app/components/temp/components/BalanceCard";
import ChartCard from "@/app/components/temp/components/ChartCard";
import DonationCard from "@/app/components/temp/components/DonationCard";
import TransparencyCard from "@/app/components/temp/components/TransparencyCard";
import ActionPanel from "@/app/components/temp/components/ActionPanel";
import Hero from "@/app/components/temp/components/Hero";
import DailyRateCard from "@/app/components/temp/components/DailyRateCard";
import MissionCard from "@/app/components/temp/components/MissionCard";


export default function Home() {
  const [balance] = useState<number>(1234.56);
  const [adjustedValue] = useState<number>(1250.89);
  const [dailyYield] = useState<number>(4.32);
  const [dailyRate] = useState<number>(0.12); // daily inflation-adjusted rate

  const donations = [
    { id: 1, name: "Red Cross", impact: "150 meals", proof: "#" },
    { id: 2, name: "UNICEF", impact: "50 school kits", proof: "#" },
    { id: 3, name: "Doctors Without Borders", impact: "20 medical kits", proof: "#" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-6xl mx-auto p-4 space-y-12">
        {/* Hero */}
        <Hero />

        {/* Balance & Daily Rate */}
        <div className="grid md:grid-cols-2 gap-6">
          <BalanceCard
            balance={balance}
            adjustedValue={adjustedValue}
            dailyYield={dailyYield}
          />
          <DailyRateCard dailyRate={dailyRate} />
        </div>

        {/* Mission */}
        <MissionCard />

        {/* Donation Impact */}
        <section>
          <h2 className="text-xl font-bold mb-4 text-indigo-700">Charitable Organizations</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {donations.map((d) => (
              <DonationCard key={d.id} name={d.name} impact={d.impact} proof={d.proof} />
            ))}
          </div>
        </section>

        {/* Transparency */}
        <section>
          <h2 className="text-xl font-bold mb-4 text-indigo-700">Transparency</h2>
          <TransparencyCard />
        </section>
      </main>

      <ActionPanel />
    </div>
  );
}