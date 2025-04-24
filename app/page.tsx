"use client";

import { useState } from "react";

export default function Home() {
  const [capital, setCapital] = useState(1000);
  const [risk, setRisk] = useState(1);
  const [entryPrice, setEntryPrice] = useState(100);
  const [targetPrice, setTargetPrice] = useState(110);
  const [stopLossPrice, setStopLossPrice] = useState(95);
  const [positionType, setPositionType] = useState("long");
  const [maxMargin, setMaxMargin] = useState(100);
  const [maxLeverage, setMaxLeverage] = useState(50); // Nouveau champ
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

    // Calcul du levier
    let leverage = positionValue / maxMargin;
    leverage = Math.min(Math.round(leverage), maxLeverage); // Cap sur le levier max autorisé

    const realMargin = positionValue / leverage; // Montant à investir sans levier

    // Calcul du Risk-Reward ratio
    let rr = 0;
    if (positionType === "long") {
      rr = (target - entry) / (entry - stop);
    } else {
      rr = (entry - target) / (stop - entry);
    }

    setResult({
      riskAmount,
      positionSize,
      positionValue,
      pnl,
      leverage,
      realMargin,
      rr,
    });
  };

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f4f8",
        fontFamily: "'Roboto', sans-serif",
        padding: 20,
      }}
    >
      <div
        style={{
          maxWidth: 500,
          width: "100%",
          backgroundColor: "#ffffff",
          borderRadius: 12,
          padding: 30,
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease-in-out",
          transform: result ? "scale(1.05)" : "scale(1)",
        }}
      >
        <h1
          style={{
            fontSize: 28,
            textAlign: "center",
            color: "#333",
            marginBottom: 30,
            fontWeight: "bold",
            letterSpacing: "0.5px",
          }}
        >
          Trade Calculator
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <label style={labelStyle}>Capital ($):</label>
          <input
            type="number"
            value={capital}
            onChange={(e) => setCapital(Number(e.target.value))}
            style={inputStyle}
          />

          <label style={labelStyle}>Risk (%):</label>
          <input
            type="number"
            value={risk}
            onChange={(e) => setRisk(Number(e.target.value))}
            style={inputStyle}
          />

          <label style={labelStyle}>Entry Price:</label>
          <input
            type="number"
            value={entryPrice}
            onChange={(e) => setEntryPrice(Number(e.target.value))}
            style={inputStyle}
          />

          <label style={labelStyle}>Target Price:</label>
          <input
            type="number"
            value={targetPrice}
            onChange={(e) => setTargetPrice(Number(e.target.value))}
            style={inputStyle}
          />

          <label style={labelStyle}>Stop Loss Price:</label>
          <input
            type="number"
            value={stopLossPrice}
            onChange={(e) => setStopLossPrice(Number(e.target.value))}
            style={inputStyle}
          />

          <label style={labelStyle}>Position Type:</label>
          <select
            value={positionType}
            onChange={(e) => setPositionType(e.target.value)}
            style={inputStyle}
          >
            <option value="long">Long</option>
            <option value="short">Short</option>
          </select>

          <label style={labelStyle}>Max Margin ($):</label>
          <input
            type="number"
            value={maxMargin}
            onChange={(e) => setMaxMargin(Number(e.target.value))}
            style={inputStyle}
          />

          <label style={labelStyle}>Max Leverage (x):</label>
          <input
            type="number"
            value={maxLeverage}
            onChange={(e) => setMaxLeverage(Number(e.target.value))}
            style={inputStyle}
          />

          <button
            onClick={calculate}
            style={{
              marginTop: 20,
              padding: "12px 20px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontSize: 18,
              cursor: "pointer",
              transition: "all 0.3s ease-in-out",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#45a049")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#4CAF50")
            }
          >
            Calculate
          </button>

          {result && (
            <div
              style={{
                marginTop: 30,
                padding: 20,
                backgroundColor: "#f4f4f9",
                borderRadius: 8,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <p style={resultTextStyle}>
                <strong>Risk Amount:</strong> ${result.riskAmount.toFixed(2)}
              </p>
              <p style={resultTextStyle}>
                <strong>Position Size:</strong> {result.positionSize.toFixed(2)}
              </p>
              <p style={resultTextStyle}>
                <strong>Position Value:</strong> ${result.positionValue.toFixed(2)}
              </p>
              <p style={resultTextStyle}>
                <strong>PNL:</strong> ${result.pnl.toFixed(2)}
              </p>
              <p style={resultTextStyle}>
                <strong>Leverage:</strong> x{result.leverage}
              </p>
              <p style={resultTextStyle}>
                <strong>Real Margin (Without Leverage):</strong> ${result.realMargin.toFixed(2)}
              </p>
              <p style={resultTextStyle}>
                <strong>Risk-Reward Ratio (RR):</strong> {result.rr.toFixed(2)}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

const inputStyle = {
  padding: "10px 15px",
  borderRadius: 8,
  border: "1px solid #ddd",
  fontSize: 16,
  outline: "none",
  transition: "border 0.3s ease-in-out",
  color: "#000",
};

const labelStyle = {
  fontSize: 16,
  color: "#666",
};

const resultTextStyle = {
  color: "#333",
  fontSize: 16,
};
