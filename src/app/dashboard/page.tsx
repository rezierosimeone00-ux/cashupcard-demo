"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Dashboard() {
  const [drops, setDrops] = useState<any[]>([]);
  const [agents, setAgents] = useState<any[]>([]);
  const [kpi, setKpi] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const { data: dropsData } = await supabase.from("drops").select("*");
      const { data: agentsData } = await supabase.from("agents").select("*");
      const { data: kpiData } = await supabase.from("kpi").select("*");
      setDrops(dropsData || []);
      setAgents(agentsData || []);
      setKpi(kpiData || []);
    })();
  }, []);

  return (
    <main className="bg-gray-50 min-h-screen font-sans">
      <header className="bg-black text-white py-6 px-10 flex justify-between items-center shadow-lg">
        <h1 className="text-lg font-semibold tracking-tight">
          Cashup Card — TRL-5.5 Live Demo
        </h1>
        <p className="text-sm text-gray-300">
          Pay 80 → Get 100 · 25 % uplift · 8 % fee
        </p>
      </header>

      <section className="max-w-6xl mx-auto p-10">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-6 py-4 rounded-2xl mb-8 shadow-md">
          <h2 className="text-xl font-semibold">
            GTA Pilot — Live Metrics & Agent Logs
          </h2>
          <p className="text-sm text-gray-300">
            Dataset target 83 333 pop · cap 3 % → ≈ 2 500 cards · 25 % uplift (Pay 80 / Get 100)
          </p>
        </div>

        <h3 className="text-lg font-semibold mb-4 text-gray-900">
          Key Metrics (Simulated)
        </h3>
        <div className="grid grid-cols-6 gap-4 mb-12">
          {kpi.map((m) => (
            <div key={m.id} className="rounded-xl bg-white border border-gray-300 p-5 text-center shadow hover:shadow-lg transition">
              <div className="text-xs text-gray-600 uppercase tracking-wide">{m.metric}</div>
              <div className="text-2xl font-bold text-gray-900 mt-1">
                {m.category === "money" ? "$" : ""}
                {m.value?.toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-semibold mb-3 text-gray-900">Active Drop Cells (GTA)</h3>
        <table className="w-full border-collapse overflow-hidden rounded-2xl shadow-md mb-12">
          <thead className="bg-gray-200 text-gray-800 text-sm">
            <tr>
              <th className="p-3 text-left">Cell</th>
              <th className="p-3 text-left">Area</th>
              <th className="p-3 text-right">Population</th>
              <th className="p-3 text-right">Cap%</th>
              <th className="p-3 text-right">Cards</th>
              <th className="p-3 text-left">Anchor Merchant</th>
              <th className="p-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white text-sm text-gray-900">
            {drops.map((d) => (
              <tr key={d.id} className="border-t border-gray-300 hover:bg-gray-50">
                <td className="p-3 font-medium">{d.cell}</td>
                <td className="p-3">{d.area}</td>
                <td className="p-3 text-right">{d.population?.toLocaleString()}</td>
                <td className="p-3 text-right">{d.cap_percent}%</td>
                <td className="p-3 text-right">{d.cards}</td>
                <td className="p-3">{d.merchant}</td>
                <td className="p-3 text-center text-green-600 font-semibold">{d.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="text-lg font-semibold mb-3 text-gray-900">Agentic AI — Live Log</h3>
        <div className="grid grid-cols-3 gap-4">
          {agents.map((a) => (
            <div key={a.id} className="rounded-xl bg-white border border-gray-300 p-5 shadow hover:shadow-lg transition">
              <div className="font-semibold text-gray-900">{a.name}</div>
              <div className="text-sm text-gray-700 mt-1">{a.event}</div>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs text-green-700 font-semibold">{a.confidence}%</span>
                <span className="text-xs text-gray-500">ok</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
