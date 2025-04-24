"use client";

import { useState } from "react";

export default function Home() {
  const [capital, setCapital] = useState(1000);
  const [risk, setRisk] = useState(1);
  const [entryPrice, setEntryPrice] = useState(100);
  const [targetPrice, setTargetPrice] = useState(110);
  const [stopLossPrice, setStopLossPrice] = useState(95);
  const [positionType, setPositionType] = useState("long");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const riskAmount = (capital * risk) / 100;
    const entry = parseFloat(entryPrice.toString());
    const target = parseFloat(targetPrice.toString());
    const stop = parseFloat(stopLossPrice.toString());

    const diff =
      positionType === "long"
        ? Math.abs(entry - stop)
        : Math.abs(stop - entry);

    const positionSize = riskAmount / diff;
    const positionValue = positionSize * entry;
    const pnl =
      positionType === "long"
        ? positionSize * (target - entry)
        : positionSize * (entry - target);
    const leverage = positionValue / capital;

    setResult({
      riskAmount,
      positionSize,
      positionValue,
      pnl,
      leverage,
    });
  };

  return (
    <main style={{ padding: 20, fontFamily: "Arial" }}>
      <h1 style={{ fontSize: 24 }}>Trade Calculator</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 400 }}>
        <label>Capital ($):</label>
        <input type="number" value={capital} onChange={(e) => setCapital(Number(e.target.value))} />

        <label>Risk (%):</label>
        <input type="number" value={risk} onChange={(e) => setRisk(Number(e.target.value))} />

        <label>Entry Price:</label>
        <input type="number" value={entryPrice} onChange={(e) => setEntryPrice(Number(e.target.value))} />

        <label>Target Price:</label>
        <input type="number" value={targetPrice} onChange={(e) => setTargetPrice(Number(e.target.value))} />

        <label>Stop Loss Price:</label>
        <input type="number" value={stopLossPrice} onChange={(e) => setStopLossPrice(Number(e.target.value))} />

        <label>Position Type:</label>
        <select value={positionType} onChange={(e) => setPositionType(e.target.value)}>
          <option value="long">Long</option>
          <option value="short">Short</option>
        </select>

        <button onClick={calculate} style={{ marginTop: 10, padding: 10 }}>Calculate</button>

        {result && (
          <div style={{ marginTop: 20 }}>
            <p>Risk Amount: ${result.riskAmount.toFixed(2)}</p>
            <p>Position Size: {result.positionSize.toFixed(2)}</p>
            <p>Position Value: ${result.positionValue.toFixed(2)}</p>
            <p>PNL: ${result.pnl.toFixed(2)}</p>
            <p>Leverage: x{result.leverage.toFixed(2)}</p>
          </div>
        )}
      </div>
    </main>
  );
}
