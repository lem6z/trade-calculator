'use client'; // Directive pour spécifier que ce fichier utilise des hooks Re
// pages/index.tsx
import { useState } from "react";

export default function Home() {
  const [capital, setCapital] = useState(100);
  const [risk, setRisk] = useState(3);
  const [marginMax, setMarginMax] = useState(20);
  const [entry, setEntry] = useState(94000);
  const [sl, setSL] = useState(91000);
  const [tp, setTP] = useState(98000);
  const [positionType, setPositionType] = useState("long");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const riskAmount = (capital * risk) / 100;
    const isLong = positionType === "long";
    const stopDistance = isLong ? entry - sl : sl - entry;
    const targetDistance = isLong ? tp - entry : entry - tp;

    if (stopDistance <= 0) {
      alert("Le stop loss n'est pas logique pour cette position.");
      return;
    }

    const positionSize = riskAmount / stopDistance;
    const positionValue = positionSize * entry;
    const leverage = positionValue / marginMax;
    const pnl = targetDistance * positionSize;
    const rr = pnl / riskAmount;

    setResult({
      capital,
      riskAmount,
      positionSize,
      positionValue,
      leverage,
      pnl,
      rr,
      maxTrades: Math.floor(capital / marginMax),
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg bg-gray-800 shadow-2xl rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6">📊 Calculateur de Trade</h2>
        <div className="space-y-4">
          <div>
            <label className="block">💰 Capital ($)</label>
            <input
              type="number"
              value={capital}
              onChange={(e) => setCapital(+e.target.value)}
              className="w-full p-2 mt-1 bg-gray-700 rounded"
            />
          </div>
          <div>
            <label className="block">⚠️ Risque (%)</label>
            <input
              type="number"
              value={risk}
              onChange={(e) => setRisk(+e.target.value)}
              className="w-full p-2 mt-1 bg-gray-700 rounded"
            />
          </div>
          <div>
            <label className="block">📊 Marge max / trade ($)</label>
            <input
              type="number"
              value={marginMax}
              onChange={(e) => setMarginMax(+e.target.value)}
              className="w-full p-2 mt-1 bg-gray-700 rounded"
            />
          </div>
          <div>
            <label className="block">📈 Prix d'achat</label>
            <input
              type="number"
              value={entry}
              onChange={(e) => setEntry(+e.target.value)}
              className="w-full p-2 mt-1 bg-gray-700 rounded"
            />
          </div>
          <div>
            <label className="block">🛑 Stop Loss</label>
            <input
              type="number"
              value={sl}
              onChange={(e) => setSL(+e.target.value)}
              className="w-full p-2 mt-1 bg-gray-700 rounded"
            />
          </div>
          <div>
            <label className="block">🎯 Take Profit</label>
            <input
              type="number"
              value={tp}
              onChange={(e) => setTP(+e.target.value)}
              className="w-full p-2 mt-1 bg-gray-700 rounded"
            />
          </div>
        </div>

        <div className="pt-4">
          <label className="block">⚖️ Type de position</label>
          <div className="flex gap-4 pt-2">
            <button
              onClick={() => setPositionType("long")}
              className={`${
                positionType === "long" ? "bg-blue-500" : "bg-gray-700"
              } px-4 py-2 rounded`}
            >
              Long
            </button>
            <button
              onClick={() => setPositionType("short")}
              className={`${
                positionType === "short" ? "bg-red-500" : "bg-gray-700"
              } px-4 py-2 rounded`}
            >
              Short
            </button>
          </div>
        </div>

        <button
          onClick={calculate}
          className="w-full mt-4 py-2 bg-green-500 rounded-lg text-white"
        >
          Calculer
        </button>

        {result && (
          <div className="pt-4 border-t border-white/10 mt-6 space-y-2 text-sm">
            <p>💼 Capital total : {result.capital.toFixed(2)} $</p>
            <p>📉 Risque par trade : {result.riskAmount.toFixed(2)} $</p>
            <p>📏 Taille de position : {result.positionSize.toFixed(4)} unités</p>
            <p>💰 Valeur position : {result.positionValue.toFixed(2)} $</p>
            <p>📊 Levier conseillé : {result.leverage.toFixed(2)}x</p>
            <p>📈 PNL potentiel : {result.pnl.toFixed(2)} $</p>
            <p>🔁 R:R ratio : {result.rr.toFixed(2)} </p>
            <p>🧮 Trades possibles en parallèle : {result.maxTrades}</p>
          </div>
        )}
      </div>
    </div>
  );
}
