"use client";

import { useState } from "react";

export default function ConverterCard() {
  const compra = 3.3465;
  const venta = 3.3765;

  const [mode, setMode] = useState<"compra" | "venta">("venta");
  const [rate, setRate] = useState(venta);

  const [fromCurrency, setFromCurrency] = useState("PEN");
  const [toCurrency, setToCurrency] = useState("USD");

  const [amount, setAmount] = useState(100);
  const [converted, setConverted] = useState(amount / rate);

  const [rotating, setRotating] = useState(false);

  const changeMode = (newMode: "compra" | "venta") => {
    setMode(newMode);

    setRotating(true);
    setTimeout(() => setRotating(false), 400);

    if (newMode === "compra") {
      setRate(compra);
      setFromCurrency("USD");
      setToCurrency("PEN");
      setConverted(amount * compra);
    } else {
      setRate(venta);
      setFromCurrency("PEN");
      setToCurrency("USD");
      setConverted(amount / venta);
    }
  };

  const handleAmountChange = (e: any) => {
    const val = Number(e.target.value);
    setAmount(val);

    if (mode === "compra") {
      setConverted(val * rate);
    } else {
      setConverted(val / rate);
    }
  };

  const swapCurrencies = () => {
    setRotating(true);
    setTimeout(() => setRotating(false), 400);

    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);

    if (mode === "compra") {
      setConverted(amount / rate);
    } else {
      setConverted(amount * rate);
    }

    setMode(mode === "compra" ? "venta" : "compra");
    setRate(mode === "compra" ? venta : compra);
  };

  return (
    <div className="rounded-3xl overflow-hidden shadow-xl">

      {/* HEADER */}
      <div className="bg-gradient-to-b from-[#B63A42] to-[#3A475F] px-6 py-5 text-center">
        <h2 className="text-white text-xl font-bold">Realiza tu conversión</h2>
      </div>

      {/* COMPRA / VENTA */}
      <div className="flex justify-center gap-3 bg-white px-6 pt-4 text-sm font-semibold">

        <button
          onClick={() => changeMode("compra")}
          className={`px-4 py-1 rounded-full cursor-pointer border transition ${
            mode === "compra" ? "bg-blue-600 text-white" : "bg-gray-100 text-slate-600"
          }`}
        >
          Compra: {compra}
        </button>

        <button
          onClick={() => changeMode("venta")}
          className={`px-4 py-1 cursor-pointer rounded-full border transition ${
            mode === "venta" ? "bg-blue-600 text-white" : "bg-gray-100 text-slate-600"
          }`}
        >
          Venta: {venta}
        </button>
      </div>

      {/* CUERPO */}
      <div className="bg-white p-6 pb-1 relative space-y-4">
        
        {/* TÚ ENVÍAS */}
        <div>
          <label className="text-xs text-slate-500 font-semibold">Tú envías</label>

          <div className="mt-1 flex items-center rounded-xl border border-slate-300 px-4 py-3 shadow-sm">
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              className="w-full bg-transparent text-2xl font-bold text-[#11334D] outline-none"
            />

            <span className="mr-2 text-lg font-bold">{fromCurrency}</span>

            <img
              src={`/flags/${fromCurrency.toLowerCase()}.png`}
              className="h-6 w-6 rounded-full"
            />
          </div>
        </div>

        {/* FLECHA */}
        <button
          onClick={swapCurrencies}
          className="
            absolute left-[calc(50%-20px)] top-[105px]
            w-[55px] h-[55px] rounded-full shadow-lg flex items-center justify-center
            cursor-pointer
            bg-[linear-gradient(145deg,#c1122f,#02254A)]
            transition-transform duration-500
          "
        >
          <img
            src="/icons/arrows.png"
            alt="swap"
            className={`w-[26px] h-[26px] transition-transform duration-500 ${
              rotating ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* TÚ RECIBES */}
        <div>
          <label className="text-xs text-slate-500 font-semibold">Tú recibes</label>

          <div className="mt-1 flex items-center rounded-xl border border-slate-300 px-4 py-3 shadow-sm">
            <input
              type="text"
              readOnly
              value={converted.toFixed(2)}
              className="w-full bg-transparent text-2xl font-bold text-[#11334D] outline-none"
            />

            <span className="mr-2 text-lg font-bold">{toCurrency}</span>

            <img
              src={`/flags/${toCurrency.toLowerCase()}.png`}
              className="h-6 w-6 rounded-full"
            />
          </div>
        </div>

        {/* BOTÓN */}
        <button className="w-full mt-4 bg-gradient-to-b from-[#B63A42] to-[#3A475F] text-[#ffffff] py-3 rounded-xl text-base font-semibold shadow cursor-pointer">
          Iniciar operación
        </button>

        <p className="text-[10px] text-slate-400 mt-2 text-center">
          * Las tasas pueden variar según horario o banco.
        </p>
      </div>
    </div>
  );
}
