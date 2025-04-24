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
    
    // Calcul du levier
    let leverage = positionValue / capital;
    leverage = Math.round(leverage); // Arrondi du levier à l'entier le plus proche
    leverage = leverage > 100 ? 100 : leverage; // Limite du levier à 100 maximum

    setResult({
      riskAmount,
      positionSize,
      positionValue,
      pnl,
      leverage,
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

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <label style={{ fontSize: 16, color: "#666" }}>Capital ($):</label>
          <input
            type="number"
            value={capital}
            onChange={(e) => setCapital(Number(e.target.value))}
            style={{
              padding: "10px 15px",
              borderRadius: 8,
              border: "1px solid #ddd",
              fontSize: 16,
              outline: "none",
              transition: "border 0.3s ease-in-out",
            }}
            onFocus={(e) => e.target.style.border = "1px solid #4CAF50"}
            onBlur={(e) => e.target.style.border = "1px solid #ddd"}
          />

          <label style={{ fontSize: 16, color: "#666" }}>Risk (%):</label>
          <input
            type="number"
            value={risk}
            onChange={(e) => setRisk(Number(e.target.value))}
            style={{
              padding: "10px 15px",
              borderRadius: 8,
              border: "1px solid #ddd",
              fontSize: 16,
              outline: "none",
              transition: "border 0.3s ease-in-out",
            }}
            onFocus={(e) => e.target.style.border = "1px solid #4CAF50"}
            onBlur={(e) => e.target.style.border = "1px solid #ddd"}
          />

          <label style={{ fontSize: 16, color: "#666" }}>Entry Price:</label>
          <input
            type="number"
            value={entryPrice}
            onChange={(e) => setEntryPrice(Number(e.target.value))}
            style={{
              padding: "10px 15px",
              borderRadius: 8,
              border: "1px solid #ddd",
              fontSize: 16,
              outline: "none",
              transition: "border 0.3s ease-in-out",
            }}
            onFocus={(e) => e.target.style.border = "1px solid #4CAF50"}
            onBlur={(e) => e.target.style.border = "1px solid #ddd"}
          />

          <label style={{ fontSize: 16, color: "#666" }}>Target Price:</label>
          <input
            type="number"
            value={targetPrice}
            onChange={(e) => setTargetPrice(Number(e.target.value))}
            style={{
              padding: "10px 15px",
              borderRadius: 8,
              border: "1px solid #ddd",
              fontSize: 16,
              outline: "none",
              transition: "border 0.3s ease-in-out",
            }}
            onFocus={(e) => e.target.style.border = "1px solid #4CAF50"}
            onBlur={(e) => e.target.style.border = "1px solid #ddd"}
          />

          <label style={{ fontSize: 16, color: "#666" }}>Stop Loss Price:</label>
          <input
            type="number"
            value={stopLossPrice}
            onChange={(e) => setStopLossPrice(Number(e.target.value))}
            style={{
              padding: "10px 15px",
              borderRadius: 8,
              border: "1px solid #ddd",
              fontSize: 16,
              outline: "none",
              transition: "border 0.3s ease-in-out",
            }}
            onFocus={(e) => e.target.style.border = "1px solid #4CAF50"}
            onBlur={(e) => e.target.style.border = "1px solid #ddd"}
          />

          <label style={{ fontSize: 16, color: "#666" }}>Position Type:</label>
          <select
            value={positionType}
            onChange={(e) => setPositionType(e.target.value)}
            style={{
              padding: "10px 15px",
              borderRadius: 8,
              border: "1px solid #ddd",
              fontSize: 16,
              outline: "none",
              backgroundColor: "#fff",
              transition: "border 0.3s ease-in-out",
            }}
          >
            <option
              value="long"
              style={{ backgroundColor: "#4CAF50", color: "#fff" }}
            >
              Long
            </option>
            <option
              value="short"
              style={{ backgroundColor: "#F44336", color: "#fff" }}
            >
              Short
            </option>
          </select>

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
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#45a049"}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#4CAF50"}
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
              <p style={{ color: "#333", fontSize: 16 }}>
                <strong>Risk Amount:</strong> ${result.riskAmount.toFixed(2)}
              </p>
              <p style={{ color: "#333", fontSize: 16 }}>
                <strong>Position Size:</strong> {result.positionSize.toFixed(2)}
              </p>
              <p style={{ color: "#333", fontSize: 16 }}>
                <strong>Position Value:</strong> ${result.positionValue.toFixed(2)}
              </p>
              <p style={{ color: "#333", fontSize: 16 }}>
                <strong>PNL:</strong> ${result.pnl.toFixed(2)}
              </p>
              <p style={{ color: "#333", fontSize: 16 }}>
                <strong>Leverage:</strong> x{result.leverage}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
