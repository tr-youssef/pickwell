import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function generateBarcodeNumber() {
  // Simple random 12-digit number
  return Math.floor(100000000000 + Math.random() * 900000000000).toString();
}

export default function BarcodePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pickupDate, pickupTime, pickupLocation } = location.state || {};
  const barcodeNumber = React.useMemo(() => generateBarcodeNumber(), []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-8">
      <div className="bg-white rounded-xl shadow p-4 sm:p-6 md:p-8 w-full max-w-md flex flex-col items-center">
        <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-center">Pickup Confirmation</h2>
        {/* Barcode SVG */}
        <svg width="200" height="70" className="mb-3 sm:mb-4 w-full max-w-[220px]" viewBox="0 0 220 80">
          {/* Simple barcode lines */}
          {barcodeNumber.split("").map((digit, idx) => (
            <rect
              key={idx}
              x={10 + idx * 16}
              y={10}
              width={8}
              height={60}
              fill={idx % 2 === 0 ? "#222" : "#888"}
              opacity={0.9}
            />
          ))}
        </svg>
        <div className="text-base sm:text-lg font-mono mb-2">{barcodeNumber}</div>
        <div className="text-green-700 font-semibold text-center mt-3 sm:mt-4 text-sm sm:text-base">
          Your hamper will be ready on <br />
          <span className="font-bold">{pickupDate} at {pickupTime}</span><br />
          at <span className="font-bold">{pickupLocation}</span>.
        </div>
        <button
          className="mt-6 sm:mt-8 px-4 sm:px-6 py-2 text-sm sm:text-base bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => navigate("/")}
        >Back to Home</button>
      </div>
    </div>
  );
}
