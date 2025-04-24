"use client";

import { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa"; // Icônes soleil et lune

export default function Home() {
  const [capital, setCapital] = useState(1000);
  const [risk, setRisk] = useState(2);
  const [entryPrice, setEntryPrice] = useState(90000);
  const [targetPrices, setTargetPrices] = useState([{ targetPrice: 94000, percentage: 100 }]);
  const [stopLossPrice, setStopLossPrice] = useState(88000);
  const [positionType, setPositionType] = useState("long");
  const [maxMargin, setMaxMargin] = useState(100);
  const [maxLeverage, setMaxLeverage] = useState(50);
  const [result, setResult] = useState<any>(null);
  const [isNightMode, setIsNightMode] = useState(false); // État pour gérer le mode nuit

  const addTargetPrice = () => {
    setTargetPrices([...targetPrices, { targetPrice: 0, percentage: 0 }]);
  };

  const handleTargetPriceChange = (index: number, field: string, value: number) => {
    const updatedTargetPrices = [...targetPrices];
    updatedTargetPrices[index] = { ...updatedTargetPrices[index], [field]: value };
    setTargetPrices(updatedTargetPrices);
  };

  const removeTargetPrice = (index: number) => {
    const updatedTargetPrices = targetPrices.filter((_, i) => i !== index);
    setTargetPrices(updatedTargetPrices);
  };

  const calculate = () => {
    const riskAmount = (capital * risk) / 100;
    const entry = parseFloat(entryPrice.toString());
    const stop = parseFloat(stopLossPrice.toString());

    const diff =
      positionType === "long"
        ? Math.abs(entry - stop)
        : Math.abs(stop - entry);

    const positionSize = riskAmount / diff;
    const positionValue = positionSize * entry;

    let totalPnL = 0;
    let totalPercentage = 0;
    targetPrices.forEach((target) => {
      const targetPrice = parseFloat(target.targetPrice.toString());
      const pnl =
        positionType === "long"
          ? positionSize * (targetPrice - entry)
          : positionSize * (entry - targetPrice);
      totalPnL += pnl * (target.percentage / 100);
      totalPercentage += target.percentage;
    });

    let leverage = positionValue / maxMargin;
    leverage = Math.min(Math.round(leverage), maxLeverage);

    const realMargin = positionValue / leverage;

    let rr = 0;
    targetPrices.forEach((target) => {
      const targetPrice = parseFloat(target.targetPrice.toString());
      const rrPartial =
        positionType === "long"
          ? (targetPrice - entry) / (entry - stop)
          : (entry - targetPrice) / (stop - entry);
      rr += rrPartial * (target.percentage / 100);
    });

    setResult({
      riskAmount,
      positionSize,
      positionValue,
      pnl: totalPnL,
      leverage,
      realMargin,
      rr,
    });
  };

  const toggleNightMode = () => {
    setIsNightMode(!isNightMode); // Bascule entre le mode jour et le mode nuit
  };

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: isNightMode ? "#121212" : "#f0f4f8", // Fond différent selon le mode
        color: isNightMode ? "#ffffff" : "#000000", // Texte différent selon le mode
        fontFamily: "'Roboto', sans-serif",
        padding: 20,
      }}
    >
      <div
        style={{
          maxWidth: 500,
          width: "100%",
          backgroundColor: isNightMode ? "#333" : "#ffffff", // Fond du bloc
          borderRadius: 12,
          padding: 30,
          boxShadow: isNightMode ? "0 10px 20px rgba(255, 255, 255, 0.1)" : "0 10px 20px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease-in-out",
          transform: result ? "scale(1.05)" : "scale(1)",
          position: "relative", // Pour le bouton de bascule
        }}
      >
        {/* Bouton pour basculer le mode */}
        <button
          onClick={toggleNightMode}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: 30,
            color: isNightMode ? "#fff" : "#000",
            transition: "all 0.3s ease-in-out",
          }}
        >
          {isNightMode ? <FaSun /> : <FaMoon />}
        </button>

        <h1
          style={{
            fontSize: 28,
            textAlign: "center",
            color: isNightMode ? "#ffffff" : "#333", // Couleur du titre
            marginBottom: 30,
            fontWeight: "bold",
            letterSpacing: "0.5px",
          }}
        >
          Trade Calculator by{" "}
          <a
            href="https://www.x.com/0xlem_eth"
            target="_blank"
            style={{ color: "#007bff", textDecoration: "none" }}
          >
            @0xLem_eth
          </a>
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <label style={{ ...labelStyle, color: isNightMode ? "#ffffff" : "#000000" }}>Capital ($):</label>
          <input
            type="number"
            value={capital}
            onChange={(e) => setCapital(Number(e.target.value))}
            style={inputStyle(isNightMode)}
          />

          <label style={{ ...labelStyle, color: isNightMode ? "#ffffff" : "#000000" }}>Risque en (%):</label>
          <input
            type="number"
            value={risk}
            onChange={(e) => setRisk(Number(e.target.value))}
            style={inputStyle(isNightMode)}
          />

          <label style={{ ...labelStyle, color: isNightMode ? "#ffffff" : "#000000" }}>Marge maximale pour ce trade ($):</label>
          <input
            type="number"
            value={maxMargin}
            onChange={(e) => setMaxMargin(Number(e.target.value))}
            style={inputStyle(isNightMode)}
          />

          <label style={{ ...labelStyle, color: isNightMode ? "#ffffff" : "#000000" }}>Levier maximal pour ce trade :</label>
          <input
            type="number"
            value={maxLeverage}
            onChange={(e) => setMaxLeverage(Number(e.target.value))}
            style={inputStyle(isNightMode)}
          />

          <label style={{ ...labelStyle, color: isNightMode ? "#ffffff" : "#000000" }}>Type de position:</label>
          <select
            value={positionType}
            onChange={(e) => setPositionType(e.target.value)}
            style={inputStyle(isNightMode)}
          >
            <option value="long" style={{ color: "green" }}>Long</option>
            <option value="short" style={{ color: "red" }}>Short</option>
          </select>

          <label style={{ ...labelStyle, color: isNightMode ? "#ffffff" : "#000000" }}>Prix d'achat:</label>
          <input
            type="number"
            value={entryPrice}
            onChange={(e) => setEntryPrice(Number(e.target.value))}
            style={inputStyle(isNightMode)}
          />

          {targetPrices.map((target, index) => (
            <div key={index} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <label style={{ ...labelStyle, color: isNightMode ? "#ffffff" : "#000000" }}>TP {index + 1} Prix:</label>
              <input
                type="number"
                value={target.targetPrice}
                onChange={(e) =>
                  handleTargetPriceChange(index, "targetPrice", Number(e.target.value))
                }
                style={inputStyle(isNightMode)}
              />
              <label style={{ ...labelStyle, color: isNightMode ? "#ffffff" : "#000000" }}>TP {index + 1} Pourcentage:</label>
              <input
                type="number"
                value={target.percentage}
                onChange={(e) =>
                  handleTargetPriceChange(index, "percentage", Number(e.target.value))
                }
                style={inputStyle(isNightMode)}
              />
              
              {/* Le bouton "Supprimer ce TP" s'affiche seulement si l'index est >= 1 */}
              {index >= 1 && (
                <button
                  onClick={() => removeTargetPrice(index)}
                  style={{
                    marginTop: 10,
                    padding: "12px 20px",
                    backgroundColor: "#f44336",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    fontSize: 16,
                    cursor: "pointer",
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  Supprimer ce TP
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addTargetPrice}
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
          >
            Ajouter un TP
          </button>

          <label style={{ ...labelStyle, color: isNightMode ? "#ffffff" : "#000000" }}>SL:</label>
          <input
            type="number"
            value={stopLossPrice}
            onChange={(e) => setStopLossPrice(Number(e.target.value))}
            style={inputStyle(isNightMode)}
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
          >
            Calculer
          </button>

          {result && (
            <div
              style={{
                marginTop: 30,
                padding: 20,
                backgroundColor: isNightMode ? "#333" : "#f4f4f9",
                borderRadius: 8,
                boxShadow: isNightMode ? "0 4px 8px rgba(255, 255, 255, 0.1)" : "0 4px 8px rgba(0, 0, 0, 0.1)",
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

const inputStyle = (isNightMode: boolean) => ({
  padding: "10px 15px",
  borderRadius: 8,
  border: "1px solid #ddd",
  fontSize: 16,
  outline: "none",
  transition: "border 0.3s ease-in-out",
  color: isNightMode ? "#fff" : "#000",
  backgroundColor: isNightMode ? "#121212" : "#fff",
});

const labelStyle = {
  fontSize: 16,
  fontWeight: "bold",
};

const resultTextStyle = {
  color: "#333",
  fontSize: 16,
};
