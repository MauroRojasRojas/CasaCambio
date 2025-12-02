"use client";

import Image from "next/image";
import Testimonios from "./components/Testimonials";
import { useState } from "react";
import ScrollAlertsHorizontal from "./components/ScrollAlertsHorizontal";
import { useRouter } from "next/navigation";


// =============================================================
// 🚀 COMPONENTE CONVERTIDOR (TÚ ENVÍAS / TÚ RECIBES)
// =============================================================
function ConverterCard() {

  const compra = 3.3465;
  const venta = 3.3765;

  const [mode, setMode] = useState<"compra" | "venta">("venta");
  const [rate, setRate] = useState(venta);

  const [fromCurrency, setFromCurrency] = useState("PEN");
  const [toCurrency, setToCurrency] = useState("USD");

  const [amount, setAmount] = useState(100);
  const [converted, setConverted] = useState(amount / rate);

  // 🔄 NUEVO: estado para animar la flecha
  const [rotating, setRotating] = useState(false);

  // CAMBIAR ENTRE COMPRA / VENTA
  const changeMode = (newMode: "compra" | "venta") => {
    setMode(newMode);

    // también girar la flecha cuando cambia compra/venta
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

  // AL ESCRIBIR
  const handleAmountChange = (e: any) => {
    const val = Number(e.target.value);
    setAmount(val);

    if (mode === "compra") {
      setConverted(val * rate);
    } else {
      setConverted(val / rate);
    }
  };

  // INTERCAMBIO FLECHA
  const swapCurrencies = () => {

    // 🔄 activar animación
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
          className={`px-4 py-1 rounded-full cursor-pointer border transition ${mode === "compra"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-slate-600"
            }`}
        >
          Compra: {compra}
        </button>

        <button
          onClick={() => changeMode("venta")}
          className={`px-4 py-1 cursor-pointer rounded-full border transition ${mode === "venta"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-slate-600"
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

        {/* FLECHA INTERCAMBIO */}
        <button
          onClick={swapCurrencies}
          className="
            absolute 
            left-[calc(50%-20px)]
            top-[105px]
            w-[55px] h-[55px]
            rounded-full 
            shadow-lg
            flex items-center justify-center
            cursor-pointer
            bg-[linear-gradient(145deg,#c1122f,#02254A)]
            transition-transform duration-500
          "
        >
          <img
            src="/icons/arrows.png"
            alt="swap"
            className={`w-[26px] h-[26px] transition-transform duration-500 ${rotating ? "rotate-180" : ""
              }`}
          />
        </button>

        {/* TÚ RECIBES */}
        <div className="">
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
        <button className="w-full mt-4 bg-gradient-to-b from-[#B63A42] to-[#3A475F] text-[#ffffff] py-3 rounded-xl text-base font-semibold shadow cursor-pointer hover:bg-yellow-300">
          Iniciar operación
        </button>

        <p className="text-[10px] text-slate-400 mt-2 text-center">
          * Las tasas pueden variar según horario o banco.
        </p>
      </div>
    </div>
  );
}


export default function Home() {

  const router = useRouter();

  const goRegister = () => {
    router.push("/register");
  };

  const goLogin = () => {
    router.push("/login");
  }
  return (
    <main className="min-h-screen bg-[#F5F7FF] text-slate-900">
      {/* NAVBAR */}
      <div className="w-full bg-white border border-b-gray-200">
  <div className="max-w-6xl mx-auto flex space-x-10 relative xl:-left-5 px-4 md:px-0 h-9">
      <nav className="flex items-center gap-6 text-sm font-medium text-slate-700">
        <div className="flex flex-col justify-between items-center h-9 pt-2">
          <p className="hover:text-[#0053A4] text-sm text-tc-blue-500 font-bold">Personas</p>
        </div>
        <div className="flex flex-col justify-between items-center h-9 pt-2">
          <p className="hover:text-[#0053A4] text-sm text-tc-blue-500 font-bold">Empresas</p>
        </div>
      </nav>
  </div>
</div>

      <header className="w-full border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:px-0">
          {/* Left links */}
          <nav className="flex items-center gap-6 text-sm font-medium text-slate-700">
            <button className="hover:text-[#0053A4] font-extrabold cursor-pointer">¿Quiénes somos?</button>
            <button className="hover:text-[#0053A4] font-extrabold cursor-pointer">Contacto</button>
          </nav>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFC700]">
            </div>
            <span className="text-lg font-semibold text-[#003566]">
              Dollariza
            </span>
          </div>

          {/* Right links */}
          <div className="flex items-center gap-4 text-sm font-medium">

            {/* Botón Regístrate */}
            <button onClick={goRegister}
              className="
      px-5 py-2
      rounded-full
      border border-[#0053A4]
      text-[#0053A4]
      bg-white
      cursor-pointer
      shadow-sm
      hover:bg-[#0053A4]
      hover:text-white
      hover:shadow-md
      transition-all
      duration-300
      text-[15px]
      font-semibold
    "
            >
              Regístrate
            </button>

            {/* Botón Iniciar Sesión */}
            <button onClick={goLogin}
              className="
      px-5 py-2
      rounded-full
      bg-[#0053A4]
      text-white
      shadow-sm
      hover:bg-[#003f7c]
      hover:shadow-md
      transition-all
      duration-300
      cursor-pointer
      text-[15px]
      font-semibold
    "
            >
              Iniciar sesión
            </button>

          </div>

        </div>
      </header>

      {/* HERO con amarillo solo en la parte superior */}
      <section className="w-full bg-[#F5F7FF]">
        {/* Contenedor principal */}
        <div className="w-[1200px] mx-auto relative pb-8">

          {/* Parte superior del corte */}
          <div
            className="bg-[#02254A] rounded-b-[60px] shadow-md relative z-10"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 100%, 50% 60%, 0 60%)',
              borderRadius: '0 0 40px 40px'
            }}
          >
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 lg:flex-row lg:items-start pb-10">
              {/* IZQUIERDA */}
              <div className="flex-1 pt-10">
                <h1 className="mb-4 text-4xl font-bold pb-7 leading-tight text-[#ffffff] lg:text-4xl">
                  Dollariza{" "}
                  <span className="text-[#F5F7FF]">
                    cambia moneda extranjera 100% online y obtén el mejor tipo de cambio del mercado
                  </span>
                </h1>

                <p className="mb-6 text-lg text-[#F5F7FF]">
                  al mejor precio en
                  <br />
                  nuestra casa de cambio online
                </p>
              </div>

              {/* DERECHA: TARJETA CALCULADORA */}
              <div className="w-full max-w-md flex flex-col gap-6 pt-3 pb-20">
                <ConverterCard />
              </div>
            </div>
          </div>

          {/* Parte inferior separada - LA CAJITA PEQUEÑA */}
          <div
            className="bg-[#FFC700] shadow-md absolute z-0 rounded-[40px]"
            style={{
              width: '49%',
              height: '223px',
              top: '57%',
              left: 0,
              marginTop: '8px'
            }}
          >
            <div className="flex items-center justify-center h-full px-12">
              <p className="text-[#003566] text-lg leading-relaxed">
                Si requieres atención personalizada comunícate con nosotros al teléfono{" "}
                <span className="font-bold text-xl text-[#003566]">956-767-180</span>
                {" "}estaremos respondiendo tus consultas
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* FRANJA BANCOS + KPIs */}
      <section className="mx-auto mt-16 max-w-6xl px-4 pb-5 lg:px-0">

        <div className="grid gap-6 md:grid-cols-3">

          {/* BLOQUE 1 — BANCOS */}
          <div className="rounded-3xl bg-white p-8 shadow-md border border-slate-100">
            <h3 className="text-xl font-bold text-[#02254A]">
              Transferencias a todos los bancos
            </h3>

            <p className="mt-1 flex items-center gap-2 text-sm text-slate-600">
              <span className="h-2 w-2 rounded-full bg-[#0053A4]" />
              Entre <strong>30 y 55 minutos</strong>
            </p>

            {/* Lista de bancos */}
            <div className="mt-5 grid grid-cols-3 gap-4">
              {[
                "bcp.png",
                "bbva.png",
                "pichincha.svg",
              ].map((banco, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center rounded-2xl bg-slate-50 py-3 shadow-sm"
                >
                  <img
                    src={`/assets/${banco}`}
                    className="h-[50px] w-[50px] object-contain"
                    alt={banco}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* BLOQUE 2 — KPI MILLONES */}
          <div className="rounded-3xl bg-white p-8 shadow-md border border-slate-100 flex flex-col justify-center">
            <p className="text-3xl font-bold text-[#02254A] leading-tight">
              + S/ 5,120 millones
            </p>
            <p className="text-slate-600 mt-1 text-sm">
              cambiados de manera segura y rápida
            </p>
          </div>

          {/* BLOQUE 3 — KPI USUARIOS */}
          <div className="rounded-3xl bg-white p-8 shadow-md border border-slate-100 flex flex-col justify-center">
            <p className="text-3xl font-bold text-[#02254A] leading-tight">
              + 100 mil usuarios
            </p>
            <p className="text-slate-600 text-sm">
              y más de <strong>5,000 empresas</strong> que confían en nosotros
            </p>
          </div>

        </div>

        {/* EXTRA: UNA FILA COMPLEMENTARIA OPCIONAL */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">

          {/* Beneficio 1 */}
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100">
            <p className="text-lg font-bold text-[#02254A]">Seguridad garantizada</p>
            <p className="text-sm text-slate-600 mt-1">
              Procesos auditados y cifrado de nivel bancario.
            </p>
          </div>

          {/* Beneficio 2 */}
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100">
            <p className="text-lg font-bold text-[#02254A]">Atención inmediata</p>
            <p className="text-sm text-slate-600 mt-1">
              Soporte humano para ayudarte en cualquier operación.
            </p>
          </div>

          {/* Beneficio 3 */}
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100">
            <p className="text-lg font-bold text-[#02254A]">Horario de atención</p>
            <div className="text-sm text-slate-600 mt-2 leading-relaxed">
              <p><strong>Lunes a viernes:</strong> 8:30 am – 6:30 pm</p>
              <p className="mt-1"><strong>Sábado:</strong> 9:00 am – 1:00 pm</p>
            </div>
          </div>

        </div>

      </section>


      {/* SECCIÓN 1 — ¿Cómo funciona? */}
      <section className="mt-28 mb-25 px-4">
        <h2 className="text-center text-5xl font-extrabold text-[#02254A] mb-16">
          ¿<span className="text-[#02254A]/90">Cómo</span> funciona en Dollariza?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">

          {/* CARD */}
          <div className="group relative bg-[#f5f7ff] rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.05)] 
                    hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-all duration-300 
                    hover:-translate-y-2 cursor-pointer">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 h-14 w-14 rounded-2xl 
                      bg-gradient-to-br from-yellow-400 to-yellow-500 
                      shadow-lg flex items-center justify-center text-white text-xl 
                      group-hover:scale-110 transition-transform duration-300">
              <img
                src="/icons/register.png"
                alt="registro"
                className="mx-auto w-[60px] h-[65px]"
              />
            </div>

            <h3 className="mt-10 text-2xl font-bold text-[#02254A]">Regístrate</h3>
            <p className=" text-slate-600 mt-2 text-sm">
              Crea tu cuenta personal o empresa.
            </p>
          </div>

          {/* CARD */}
          <div className="group relative bg-[#f5f7ff] rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.05)] 
                    hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-all duration-300 
                    hover:-translate-y-2 cursor-pointer">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 h-14 w-14 rounded-2xl 
                      bg-gradient-to-br from-blue-400 to-blue-600 
                      shadow-lg flex items-center justify-center text-white text-xl 
                      group-hover:scale-110 transition-transform duration-300">
              <img
                src="/icons/cotization.png"
                alt="cotizacion"
                className="mx-auto w-[60px] h-[65px]"
              />
            </div>

            <h3 className="mt-10 text-2xl font-bold text-[#02254A]">Cotiza</h3>
            <p className=" text-slate-600 mt-2 text-sm">
              Cotiza el monto que deseas cambiar en segundos y empieza a cambiar.
            </p>
          </div>

          {/* CARD */}
          <div className="group relative bg-[#f5f7ff] rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.05)] 
                    hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-all duration-300 
                    hover:-translate-y-2 cursor-pointer">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 h-14 w-14 rounded-2xl 
                      bg-gradient-to-br from-yellow-400 to-yellow-500 
                      shadow-lg flex items-center justify-center text-white text-xl 
                      group-hover:scale-110 transition-transform duration-300">
              <img
                src="/icons/transfer.png"
                alt="transferencia"
                className="mx-auto w-[60px] h-[65px]"
              />
            </div>

            <h3 className="mt-10 text-2xl font-bold text-[#02254A]">Transfiere a Dollariza</h3>
            <p className=" text-slate-600 mt-2 text-sm">
              Transfiere el monto desde tu banca de manera segura.
            </p>
          </div>

          {/* CARD */}
          <div className="group relative bg-[#f5f7ff] rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.05)] 
                    hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-all duration-300 
                    hover:-translate-y-2 cursor-pointer">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 h-14 w-14 rounded-2xl 
                      bg-gradient-to-br from-blue-400 to-blue-600 
                      shadow-lg flex items-center justify-center text-white text-xl 
                      group-hover:scale-110 transition-transform duration-300">
              <img
                src="/icons/change.png"
                alt="cambio"
                className="mx-auto w-[60px] h-[65px]"
              />
            </div>

            <h3 className="mt-10 text-2xl font-bold text-[#02254A]">Recibe tu cambio</h3>
            <p className=" text-slate-600 mt-2 text-sm">
              Recibe tu dinero en tu cuenta bancaria en minutos.
            </p>
          </div>

        </div>

        {/* BOTÓN / CTA */}
        <div className="text-center mt-12">
          <button onClick={goRegister} className="bg-[#D1391D] text-[#ffffff] cursor-pointer font-semibold px-8 py-3 rounded-xl shadow-md 
                       hover:bg-yellow-300 hover:shadow-lg transition-all duration-200">
            Regístrate ahora
          </button>
        </div>
      </section>

      {/* SECCIÓN 3 — Tipo de cambio en vivo */}
      <section className="mt-20 mb-32 px-4">

        <h2 className="text-center text-4xl font-bold text-[#02254A] mb-2">
          Sigue el tipo de <span className="text-[#02254A]/90">cambio en vivo</span>
        </h2>

        <p className="text-center text-slate-500 mb-10 text-sm">
          Última actualización: 14 noviembre, 14:50hrs
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto gap-10">

          {/* Tabla */}
          <div className="bg-white p-6 rounded-3xl shadow-md">
            <h3 className="text-lg font-semibold text-slate-700 mb-4">Cambio online</h3>

            <div className="flex justify-between items-center bg-[#02254A] text-white px-4 py-3 rounded-xl mb-4">
              <span className="font-bold">Dollariza</span>
              <span>3.354</span>
              <span>3.379</span>
            </div>

            <div className="flex justify-between py-2 text-slate-600 text-sm">
              <span className="font-semibold">Ka</span>
              <span>3.349</span>
              <span>3.381</span>
            </div>

            <div className="flex justify-between py-2 text-slate-600 text-sm">
              <span className="font-semibold">Re</span>
              <span>3.352</span>
              <span>3.382</span>
            </div>

            <div className="flex justify-between py-2 text-slate-600 text-sm">
              <span className="font-semibold">Tk</span>
              <span>3.354</span>
              <span>3.379</span>
            </div>

            <button className="mt-6 bg-yellow-400 text-[#02254A] font-semibold px-5 py-2 rounded-xl shadow">
              Regístrate
            </button>
          </div>

          {/* Gráfico */}
          <div className="bg-white p-6 rounded-3xl shadow-md">
            <h3 className="text-lg font-bold text-[#0053A4]">Histórico de Tipo de cambio</h3>

            <div className="h-64 w-full bg-blue-100 rounded-xl mt-4"></div>

            <div className="flex mt-6 gap-3">
              <button className="px-4 py-2 rounded-lg border text-slate-700 text-sm">Día</button>
              <button className="px-4 py-2 rounded-lg bg-[#02254A] text-white text-sm">Semana</button>
              <button className="px-4 py-2 rounded-lg border text-slate-700 text-sm">Mes</button>
              <button className="px-4 py-2 rounded-lg border text-slate-700 text-sm">Año</button>
            </div>
          </div>

        </div>
      </section>

      {/* SECCIÓN — Alertas de tipo de cambio (Banner + Slider + Texto) */}

      <ScrollAlertsHorizontal />


      {/* SECCIÓN 4 — Alertas + Beneficios */}
      <section className="mt-30 px-4 max-w-6xl mx-auto mb-20">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Alertas */}
          <div className="bg-gradient-to-b from-[#B63A42] to-[#3A475F] rounded-3xl p-10 shadow-md">
            <h3 className="text-3xl font-bold text-white mb-4">
              Tu dinero vale más aquí, porque cada cambio suma más para ti.
            </h3>

            <p className="text-white/90 text-sm mb-6">
              ¡Te avisamos cuando el tipo de cambio sea el que más te beneficie!
            </p>

            <button onClick={goRegister} className="bg-yellow-400 text-[#02254A] font-semibold px-6 py-2 rounded-xl shadow mt-10 mb-5 cursor-pointer">
              Regístrate
            </button>

            {/* LOGOS DE SBS Y SUNAT */}
            <div className="flex items-center justify-center gap-6 mt-8">
              <img
                src="/icons/sbs.png"
                alt="SBS"
                className="h-[38px] w-auto opacity-90"
              />
              <img
                src="/icons/sunat.png"
                alt="SUNAT"
                className="h-[38px] w-auto opacity-90"
              />
            </div>
          </div>



          {/* Por qué elegirnos */}
          <div>
            <h3 className="text-4xl font-bold text-[#02254A] mb-3">
              ¿Por qué <span className="text-[#02254A]/90">elegirnos?</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* AHORRO */}
              <div className="bg-yellow-400 rounded-3xl p-6 shadow">

                <div className="relative w-[45px] h-[45px] mb-3 mx-auto">
                  <div className="absolute inset-0 rounded-full bg-[linear-gradient(145deg,#c1122f,#02254A)] opacity-95"></div>

                  <img
                    src="/icons/saving.png"
                    alt="ahorro"
                    className="absolute inset-0 m-auto w-[22px] h-[22px]"
                  />
                </div>

                <h4 className="font-bold text-[#02254A] text-xl">Ahorro</h4>
                <p className="text-sm text-slate-600 mt-1">
                  +40 millones de soles ahorrados por nuestros clientes
                </p>
              </div>

              {/* RAPIDEZ */}
              <div className="bg-yellow-100 rounded-3xl p-6 shadow">

                <div className="relative w-[45px] h-[45px] mb-3 mx-auto">
                  <div className="absolute inset-0 rounded-full bg-[linear-gradient(145deg,#c1122f,#02254A)] opacity-95"></div>

                  <img
                    src="/icons/speed.png"
                    alt="rapidez"
                    className="absolute inset-0 m-auto w-[22px] h-[22px]"
                  />
                </div>

                <h4 className="font-bold text-[#02254A] text-xl">Rapidez</h4>
                <p className="text-sm text-slate-600 mt-1">
                  Transferencias entre 15 y 40 min
                </p>
              </div>

              {/* CONFIANZA */}
              <div className="bg-yellow-200 rounded-3xl p-6 shadow">

                <div className="relative w-[45px] h-[45px] mb-3 mx-auto">
                  <div className="absolute inset-0 rounded-full bg-[linear-gradient(145deg,#c1122f,#02254A)] opacity-95"></div>

                  <img
                    src="/icons/trust.png"
                    alt="confianza"
                    className="absolute inset-0 m-auto w-[22px] h-[22px]"
                  />
                </div>

                <h4 className="font-bold text-[#02254A] text-xl">Confianza</h4>
                <p className="text-sm text-slate-600 mt-1">
                  Confianza que se siente en cada cambio
                </p>
              </div>

              {/* SEGURIDAD */}
              <div className="bg-[#02254A] text-white rounded-3xl p-6 shadow">

                <div className="relative w-[45px] h-[45px] mb-3 mx-auto">
                  <div className="absolute inset-0 rounded-full bg-[linear-gradient(145deg,#c1122f,#02254A)] opacity-95"></div>

                  <img
                    src="/icons/security.png"
                    alt="seguridad"
                    className="absolute inset-0 m-auto w-[22px] h-[22px]"
                  />
                </div>

                <h4 className="font-bold text-xl">Seguridad</h4>
                <p className="text-sm mt-1">
                  Respaldados por SBS y SUNAT
                </p>
              </div>

            </div>
          </div>


        </div>

      </section>
      {/* SECCIÓN 5 — Clientes */}

      <Testimonios />

      

      {/* FOOTER */}
      <footer className="bg-[#02254A] text-white py-8 mt-10">
  <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

    {/* --- Columna 1: Marca --- */}
    <div>
      <h2 className="text-2xl font-bold mb-3">Ayuda</h2>
      <ul className="space-y-2 text-gray-300 text-sm">
        <li>
          <a href="#" className="hover:text-white transition">Política de privacidad</a>
        </li>
        <li>
          <a href="#" className="hover:text-white transition">Términos y condiciones</a>
        </li>
        <li>
          <a href="#" className="hover:text-white transition">Libro de reclamaciones</a>
        </li>
      </ul>
    </div>

    {/* --- Columna 2: Navegación --- */}
    <div>
      <h3 className="text-lg font-semibold mb-3">Enlaces</h3>
      <ul className="space-y-2 text-gray-300 text-sm">
        <li>
          <a href="#" className="hover:text-white transition">Inicio</a>
        </li>
        <li>
          <a href="#" className="hover:text-white transition">Quiénes somos</a>
        </li>
        <li>
          <a href="#" className="hover:text-white transition">Preguntas frecuentes</a>
        </li>
      </ul>
    </div>

    {/* --- Columna 3: Contacto --- */}
    <div>
      <h3 className="text-lg font-semibold mb-3">Contáctanos</h3>
      <ul className="space-y-2 text-gray-300 text-sm">
        <li>
          <span className="font-medium">Teléfono:</span> 956-767-180
        </li>
        <li>
          <span className="font-medium">Correo:</span> info.dollariza@gmail.com
        </li>
      </ul>
    </div>
  </div>

  {/* --- línea inferior --- */}
  <div className="border-t border-[#ffffff33] mt-12 pt-6 text-center text-gray-400 text-sm">
    © {new Date().getFullYear()} Dollariza — Todos los derechos reservados.
  </div>
</footer>


    </main>
  );
}
