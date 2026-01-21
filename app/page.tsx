"use client";
import Image from "next/image";
import Testimonios from "./components/Testimonials";
import { useState } from "react";
import ScrollAlertsHorizontal from "./components/ScrollAlertsHorizontal";
import { useRouter } from "next/navigation";
import ConverterCard from "./components/ConverterCard";

<ConverterCard />
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

      {/* ===== FRANJA LOGO (ENTRE HEADER Y HERO) ===== */}
      <div className="relative overflow-hidden">

        {/* Fondo gris */}
        <div className="absolute inset-0 bg-[#f2f2f2]" />
        {/* Caja blanca con diagonal */}
        <div
          className="
      absolute
      inset-y-0
      left-0
      w-[420px]
      bg-white
      clip-diagonal
      z-10
    "
        />
        <img
          src="/icons/logomejorado1.png"
          alt="Dollariza"
          className="
    absolute
    top-1/2
    left-72
    -translate-y-1/2
    z-50
    h-[90px]
    md:h-[200px]
    pointer-events-none
  "
        />
        <div className="relative max-w-6xl mx-auto px-6 py-12">

        </div>
      </div>

      {/* HERO con amarillo solo en la parte superior */}
      <section className="w-full">
        {/* ===== HERO AZUL ===== */}
        <div className="bg-[#263D68]">
          <div className="max-w-7xl mx-auto py-8">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

              {/* ===== TEXTO ===== */}
              <div>
                <h1 className="hero-title text-white text-4xl md:text-5xl tracking-wide
drop-shadow-[6px_6px_0_rgba(0,0,0,0.35)] leading-tight mb-10 font-anton">
                  OPERACIONES DE <br></br> CAMBIO
                  <span className="text-[#FAB73D]"> 100% ONLINE</span> <br />
                  CON EL MEJOR TIPO DE <br></br> CAMBIO DEL MERCADO
                </h1>

                <ul className="space-y-5 mt-8">
                  <li className="flex items-center gap-4">
                    <img src="/icons/protect.png" className="w-12 h-12" />
                    <span
                      className="
        text-[#FAB73D]
        text-xl
        font-bold
        tracking-wide
        font-anton
        drop-shadow-[3px_3px_0_rgba(0,0,0,0.35)]
      "
                    >
                      Seguridad
                    </span>
                  </li>

                  <li className="flex items-center gap-4">
                    <img src="/icons/speedy.png" className="w-12 h-12" />
                    <span
                      className="
        text-[#FAB73D]
        text-xl
        font-bold
        tracking-wide
        font-anton
        drop-shadow-[3px_3px_0_rgba(0,0,0,0.35)]
      "
                    >
                      Rapidez
                    </span>
                  </li>

                  <li className="flex items-center gap-4">
                    <img src="/icons/handshake.png" className="w-12 h-12" />
                    <span
                      className="
        text-[#FAB73D]
        text-xl
        font-bold
        tracking-wide
        font-anton
        drop-shadow-[3px_3px_0_rgba(0,0,0,0.35)]
      "
                    >
                      Transparencia
                    </span>
                  </li>
                </ul>

              </div>

              {/* ===== IMAGEN + CALCULADORA (SEPARADAS) ===== */}
              <div className="relative flex justify-end pr-10 lg:pr-17">

                {/* WOMENS */}
                <img
                  src="/assets/womens.png"
                  alt="Equipo Dollariza"
                  className="absolute -left-90 -bottom-8 h-[440px] hidden lg:block"
                />

                {/* CALCULADORA (SIN TOCAR) */}
                <div className="relative z-10 w-full max-w-md translate-x-6 lg:translate-x-12 flex flex-col items-center">

                  <ConverterCard />

                  {/* SBS DEBAJO DE LA CALCULADORA */}
                  <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-white/80">
                    <span>Registrados en:</span>
                    <img src="/icons/sbsblanco.png" className="h-12" />
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>

        {/* ===== FRANJA BLANCA INFERIOR ===== */}
        {/* ===== FRANJA TRANSFERENCIAS (ESTILO REFERENCIA) ===== */}
        <div className="relative bg-[#f2f2f2] overflow-hidden">

          {/* FONDO DIAGONAL (opcional pero recomendado) */}
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#f2f2f2_60%,#e9e9e9_60%)]" />

          <div className="relative max-w-6xl mx-auto px-6 py-10">

            <div className="flex items-center justify-between gap-10">

              {/* ===== IZQUIERDA ===== */}
              <div>
                {/* LABEL */}
                <span
                  className="
          inline-block
          bg-white
          text-[#02254A]
          font-bold
          px-6
          py-2
          rounded-full
          text-sm
          shadow-sm
        "
                >
                  TRANSFERENCIAS INMEDIATAS E INTERBANCARIAS
                </span>

                {/* TIEMPO */}
                <div className="flex items-center gap-3 mt-4 text-[#02254A] text-sm font-medium">
                  <span className="text-lg">🕒</span>
                  <span>DE 15 A 55 MINUTOS</span>
                </div>
              </div>

              {/* ===== DERECHA (LOGOS) ===== */}
              <div className="flex items-center justify-end gap-8">
                <img src="/assets/bcp.png" className="h-18 object-contain" />
                <img src="/assets/bbva.png" className="h-18 object-contain" />
                <img src="/assets/pichincha.svg" className="h-18 object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative py-24 px-4 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/texture.png')" }}
      >
        {/* TÍTULO (NO SE TOCA) */}
        <h2 className="text-center text-3xl md:text-4xl font-extrabold text-[#02254A] mb-20">
          REALIZA TU OPERACIÓN EN SOLO <span className="text-[#02254A]/80">4 PASOS</span>
        </h2>

        <div className="relative max-w-6xl mx-auto h-[640px] flex items-center justify-center">

  {/* FLECHAS (450px) */}
  <img
    src="/assets/flecha4.png"
    className="absolute left-[24%] top-[2%] w-[500px] opacity-80 z-10 pointer-events-none"
    alt=""
  />
  <img
    src="/assets/flecha2.png"
    className="absolute right-[24%] top-[2%] w-[450px] opacity-80 z-10 pointer-events-none"
    alt=""
  />
  <img
    src="/assets/flecha3.png"
    className="absolute right-[24%] bottom-[2%] w-[450px] opacity-80 z-10 pointer-events-none"
    alt=""
  />
  <img
    src="/assets/flecha1.png"
    className="absolute left-[24%] bottom-[2%] w-[450px] opacity-80 z-10 pointer-events-none"
    alt=""
  />

  {/* TEXTOS EN CAJAS (como referencia) */}
  <div className="absolute left-[2%] top-[12%] z-20">
  <div className="bg-white/95 rounded-md px-5 py-4 shadow-md max-w-[320px] hero-title
                  text-[#02254A] text-[15px] leading-relaxed
                  font-anton">
    Recibe tu dinero directamente <br />
    en tu cuenta bancaria en <br />
    minutos, con total seguridad y <br />
    sin complicaciones.
  </div>
</div>

<div className="absolute right-[6%] -top-[10%] z-20">
  <div className="bg-white/95 rounded-md px-5 py-4 shadow-md max-w-[340px] hero-title
                  text-[#02254A] text-[15px] leading-relaxed
                  font-anton">
    Crea tu cuenta en pocos minutos de <br />
    forma rápida y segura. Ingresa tus <br />
    datos y valida tu información para <br />
    empezar a operar con total <br />
    confianza.
  </div>
</div>

<div className="absolute -right-[8%] bottom-[18%] z-20">
  <div className="bg-white/95 rounded-md px-5 py-4 shadow-md max-w-[360px] hero-title
                  text-[#02254A] text-[15px] leading-relaxed
                  font-anton">
    Revisa el tipo de cambio en tiempo <br />
    real y define el monto a cambiar. <br />
    Sabrás exactamente cuánto <br />
    recibirás, de manera transparente <br />
    y sin costos ocultos.
  </div>
</div>

<div className="absolute left-[5%] -bottom-[8%] z-20">
  <div className="bg-white/95 rounded-md px-5 py-4 shadow-md max-w-[380px] hero-title
                  text-[#02254A] text-[15px] leading-relaxed
                  font-anton">
    Realiza el pago de forma simple y <br />
    segura a través de los medios <br />
    disponibles. Recibirás un correo <br />
    cuando tu operación haya sido <br />
    confirmada.
  </div>
</div>


  {/* PASO 1 (arriba) */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 text-center z-20">
    <div className="w-44 h-44 rounded-full bg-[#D1A24A] shadow-xl flex flex-col items-center justify-center gap-1">
      <span className="text-white text-lg font-extrabold">1</span>
      <img src="/icons/register.png" className="" alt="" />
      <p className="text-white font-extrabold tracking-wide text-xs">REGÍSTRATE</p>
    </div>
  </div>

  {/* PASO 2 (derecha) */}
  <div className="absolute right-[190px] top-1/2 -translate-y-1/2 text-center z-20">
    <div className="w-44 h-44 rounded-full bg-[#1F3A63] shadow-xl flex flex-col items-center justify-center gap-1">
      <span className="text-white text-lg font-extrabold">2</span>
      <img src="/icons/cotization.png" className="" alt="" />
      <p className="text-white font-extrabold tracking-wide text-xs">COTIZA</p>
    </div>
  </div>

  {/* PASO 3 (abajo) */}
  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center z-20">
    <div className="w-44 h-44 rounded-full bg-[#D1A24A] shadow-xl flex flex-col items-center justify-center gap-1">
      <span className="text-white text-lg font-extrabold">3</span>
      <img src="/icons/transfer.png" className="" alt="" />
      <p className="text-white font-extrabold tracking-wide text-xs">ABONA</p>
    </div>
  </div>

  {/* PASO 4 (izquierda) */}
  <div className="absolute left-[190px] top-1/2 -translate-y-1/2 text-center z-20">
    <div className="w-44 h-44 rounded-full bg-[#1F3A63] shadow-xl flex flex-col items-center justify-center gap-1">
      <span className="text-white text-lg font-extrabold">4</span>
      <img src="/icons/change.png" className="" alt="" />
      <p className="text-white font-extrabold tracking-wide text-xs">RECIBE</p>
    </div>
  </div>

  {/* IMAGEN CENTRAL */}
  <div className="absolute z-30">
    <img
      src="/assets/principal.png"
      alt="Operación"
      className="w-[320px] drop-shadow-[0_25px_40px_rgba(0,0,0,0.25)]"
    />
  </div>

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
          <div className="bg-linear-to-b from-[#B63A42] to-[#3A475F] rounded-3xl p-10 shadow-md">
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