// src/app/page.tsx
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F7FF] text-slate-900">
      {/* NAVBAR */}
      <header className="w-full border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:px-0">
          {/* Left links */}
          <nav className="flex items-center gap-6 text-sm font-medium text-slate-700">
            <button className="hover:text-[#0053A4]">Personas</button>
            <button className="hover:text-[#0053A4]">Empresas</button>
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
            <button className="rounded-full border border-[#0053A4] px-4 py-1 text-[#0053A4] hover:bg-[#0053A4] hover:text-white">
              Regístrate
            </button>
            <button className="rounded-full border border-[#0053A4] px-4 py-1 text-[#0053A4] hover:bg-[#0053A4] hover:text-white">
              Iniciar sesión
            </button>
          </div>
        </div>
      </header>

      {/* HERO con amarillo solo en la parte superior */}
      <section className="w-full bg-[#F5F7FF]">

        {/* BLOQUE AMARILLO con bordes inferiores redondeados */}
        <div className="w-[1200px] mx-auto bg-[#FFC700] rounded-b-[60px] shadow-md pb-20">

          {/* Contenido centrado */}
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 lg:flex-row lg:items-start">

            {/* IZQUIERDA */}
            <div className="flex-1 pt-10">

              <h1 className="mb-4 text-4xl font-bold leading-tight text-[#003566] lg:text-5xl">
                Dollariza{" "}
                <span className="text-black">rapidez, seguridad y confianza</span>
              </h1>

              <p className="mb-6 text-lg text-[#003566]">
                al mejor precio
                <br />
                en nuestra casa de cambio online
              </p>

              {/* Aliados */}
              <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center">
                <div>
                  <p className="text-sm text-black">Nuestros</p>
                  <p className="text-sm font-semibold text-black">aliados</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-8 w-16 rounded-full bg-[#6D6015]/40" />
                  <div className="h-8 w-16 rounded-full bg-[#6D6015]/40" />
                  <div className="h-8 w-16 rounded-full bg-[#6D6015]/40" />
                </div>
              </div>

              {/* Banner rojo */}
              <div className="flex items-center justify-between rounded-2xl bg-[#D1391D] px-6 py-4 text-white shadow-lg">
                <div>
                  <p className="text-xs font-bold uppercase">
                    ¡Por tiempo limitado!
                  </p>
                  <p className="text-xs">
                    Usa el cupón: <span className="font-semibold">NOVIEMBRE</span>
                    <br />
                    y aprovecha este descuento
                  </p>
                </div>
                <button className="rounded-full bg-[#003566] px-6 py-2 text-xs font-semibold text-white">
                  NOVIEMBRE
                </button>
              </div>

            </div>

            {/* DERECHA: TARJETA CALCULADORA */}
            <div className="flex w-full max-w-md flex-col gap-4 pt-10">

              <div className="self-end text-xs font-medium text-[#003566] hover:underline cursor-pointer">
                Ver precio histórico &gt;&gt;
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.15)]">
                <h2 className="mb-4 text-lg font-semibold text-slate-900">
                  Tipo de cambio hoy
                </h2>

                {/* Compra / Venta */}
                <div className="mb-4 flex items-center justify-between rounded-full bg-slate-100 p-1 text-xs font-medium">
                  <button className="flex-1 rounded-full bg-white py-2 text-center shadow">
                    <span className="text-slate-500">Compra:</span>{" "}
                    <span className="font-semibold text-slate-900">3.354</span>
                  </button>
                  <button className="flex-1 rounded-full py-2 text-center text-white bg-[#0053A4]">
                    <span className="text-slate-100">Venta:</span>{" "}
                    <span className="font-semibold">3.379</span>
                  </button>
                </div>

                {/* Tú recibes */}
                <div className="mb-3">
                  <label className="mb-1 block text-xs font-semibold text-slate-600">
                    Tu recibes dólares
                  </label>
                  <div className="flex items-center rounded-xl border border-slate-200 px-3 py-2">
                    <input
                      type="number"
                      defaultValue={500}
                      className="w-full bg-transparent text-lg font-semibold text-[#0053A4] outline-none"
                    />
                    <span className="ml-2 text-xs font-semibold text-slate-500">
                      USD
                    </span>
                  </div>
                </div>

                {/* Tú envías */}
                <div className="mb-3">
                  <label className="mb-1 block text-xs font-semibold text-slate-600">
                    Tú envías soles
                  </label>
                  <div className="flex items-center rounded-xl border border-slate-200 px-3 py-2">
                    <input
                      type="number"
                      defaultValue={1689.5}
                      className="w-full bg-transparent text-lg font-semibold text-slate-900 outline-none"
                    />
                    <span className="ml-2 text-xs font-semibold text-slate-500">
                      PEN
                    </span>
                  </div>
                </div>

                {/* Cupón */}
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-slate-600">Usar cupón</span>
                  <span className="cursor-pointer text-[#0053A4] underline">
                    Agregar
                  </span>
                </div>

                <button className="mt-4 w-full rounded-full bg-[#D1391D] py-3 text-sm font-semibold text-white shadow hover:bg-[#b32d17]">
                  Iniciar operación
                </button>

              </div>

              {/* Registrados */}
              <div className="mt-4 flex flex-col items-center gap-2 text-xs text-slate-700">
                <span>Registrados en:</span>
                <div className="h-10 w-48 rounded-lg border border-slate-300 bg-white" />
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* FRANJA BANCOS + KPIs */}
      <section className="mx-auto mt-10 max-w-6xl px-4 pb-16 lg:px-0">
        <div className="grid gap-4 md:grid-cols-[2fr_1fr_1fr]">
          {/* Bancos */}
          <div className="rounded-3xl bg-white p-4 shadow-sm">
            <p className="text-sm">
              <span className="font-semibold">A todos los bancos,</span>{" "}
              en minutos
            </p>
            <p className="mt-1 flex items-center gap-2 text-xs text-slate-500">
              <span className="h-2 w-2 rounded-full bg-[#0053A4]" />
              Entre 15 y 40 min
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-lg bg-slate-100"
                />
              ))}
            </div>
          </div>

          {/* KPI 1 */}
          <div className="rounded-3xl bg-white p-4 text-sm shadow-sm">
            <p className="font-semibold">+ de S/ 7,090 millones cambiados</p>
          </div>

          {/* KPI 2 */}
          <div className="rounded-3xl bg-white p-4 text-sm shadow-sm">
            <p className="font-semibold">
              + 156 mil usuarios y + 8,600 empresas
            </p>
          </div>
        </div>
      </section>

      {/* SECCIÓN 1 — ¿Cómo funciona? */}
      <section className="mt-28 mb-24 px-4">
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
              📝
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
              💱
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
              💳
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
              💵
            </div>

            <h3 className="mt-10 text-2xl font-bold text-[#02254A]">Recibe tu cambio</h3>
            <p className=" text-slate-600 mt-2 text-sm">
              Recibe tu dinero en tu cuenta bancaria en minutos.
            </p>
          </div>

        </div>

        {/* BOTÓN / CTA */}
        <div className="text-center mt-12">
          <button className="bg-[#D1391D] text-[#ffffff] font-semibold px-8 py-3 rounded-xl shadow-md 
                       hover:bg-yellow-300 hover:shadow-lg transition-all duration-200">
            Regístrate ahora
          </button>
        </div>
      </section>


      {/* SECCIÓN 2 — Descarga nuestra app */}
      <section className="mt-10 mb-20 px-4">
        <div className="bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-3xl max-w-6xl mx-auto p-10 flex flex-col md:flex-row items-center gap-10">

          {/* Mockup teléfono */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="h-96 w-48 bg-slate-100 rounded-3xl shadow-inner"></div>
          </div>

          {/* Info */}
          <div className="w-full md:w-1/2">
            <h3 className="text-3xl font-bold text-[#02254A] mb-3">
              Descarga nuestra app
            </h3>
            <p className="text-slate-700 mb-5">
              y cambia tus soles y dólares donde quieras, cuando quieras
            </p>

            <div className="flex gap-4 mb-6">
              <div className="h-12 w-36 bg-black rounded-xl"></div>
              <div className="h-12 w-36 bg-black rounded-xl"></div>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-32 w-32 bg-white rounded-xl shadow"></div>
              <span className="text-sm text-slate-700">¡Escanea el QR y descarga la app!</span>
            </div>
          </div>

        </div>
      </section>
      {/* SECCIÓN 3 — Tipo de cambio en vivo */}
      <section className="mt-20 mb-20 px-4">

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
      <section className="mt-20 px-4 max-w-6xl mx-auto mb-20">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* IZQUIERDA: Banner + Slider */}
          <div>
            {/* Banner amarillo */}
            <div className="relative bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-[40px] p-10 shadow-lg flex items-center gap-6">

              {/* Imagen megáfono (puedes reemplazar la caja por un <Image />) */}
              <div className="hidden md:block h-36 w-36 bg-yellow-600/20 rounded-3xl"></div>

              {/* Texto */}
              <div>
                <h3 className="text-3xl font-extrabold text-[#02254A] leading-tight">
                  ALERTAS <span className="block text-blue-600">de TIPO DE CAMBIO</span>
                </h3>

                <p className="bg-white text-[#02254A] text-sm mt-4 px-5 py-3 rounded-2xl shadow font-medium">
                  ¡Te avisamos cuando el tipo de cambio sea el que <span className="font-bold">más te beneficie!</span>
                </p>
              </div>

              {/* Barra vertical a la derecha */}
              <div className="absolute right-[-30px] top-1/2 -translate-y-1/2 h-40 w-10 bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-full shadow-md flex items-end justify-center pb-2">
                <div className="h-10 w-10 bg-white rounded-full shadow-lg"></div>
              </div>
            </div>

            {/* Slider azul (las 3 barritas) */}
            <div className="flex justify-center mt-4 gap-2">
              <span className="h-2 w-10 rounded-full bg-blue-700"></span>
              <span className="h-2 w-10 rounded-full bg-blue-300"></span>
              <span className="h-2 w-10 rounded-full bg-slate-200"></span>
            </div>
          </div>

          {/* DERECHA: Texto y botón */}
          <div className="pl-6">
            <h3 className="text-4xl font-bold text-[#02254A] leading-tight mb-4">
              Regístrate y accede<br />a los beneficios que<br />tenemos para ti
            </h3>

            <button className="bg-yellow-400 text-[#02254A] font-semibold px-6 py-3 rounded-xl shadow hover:bg-yellow-300 mt-3">
              Regístrate
            </button>
          </div>

        </div>

      </section>


      {/* SECCIÓN 4 — Alertas + Beneficios */}
      <section className="mt-20 px-4 max-w-6xl mx-auto mb-20">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Alertas */}
          <div className="bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-3xl p-10 shadow-md">
            <h3 className="text-3xl font-bold text-[#02254A] mb-4">Alertas de tipo de cambio</h3>
            <p className="text-slate-700 text-sm mb-6">
              ¡Te avisamos cuando el tipo de cambio sea el que más te beneficie!
            </p>
            <button className="bg-white text-[#02254A] font-semibold px-6 py-2 rounded-xl shadow">
              Regístrate
            </button>
          </div>

          {/* Por qué elegirnos */}
          <div>
            <h3 className="text-4xl font-bold text-[#02254A] mb-3">
              ¿Por qué <span className="text-[#02254A]/90">elegirnos?</span>
            </h3>
            <p className="text-slate-700 mb-8">
              Te ofrecemos una experiencia segura, rápida y sin comisiones.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="bg-yellow-200 rounded-3xl p-6 shadow">
                <h4 className="font-bold text-[#02254A]">Ahorro</h4>
                <p className="text-sm text-slate-600 mt-1">+36 millones de soles ahorrados por nuestros clientes</p>
              </div>

              <div className="bg-yellow-100 rounded-3xl p-6 shadow">
                <h4 className="font-bold text-[#02254A]">Rapidez</h4>
                <p className="text-sm text-slate-600 mt-1">Transferencias entre 15 y 40 min</p>
              </div>

              <div className="bg-yellow-200 rounded-3xl p-6 shadow">
                <h4 className="font-bold text-[#02254A]">Horario extendido</h4>
                <p className="text-sm text-slate-600 mt-1">Lunes - Sábado 8:30am a 7:30pm</p>
              </div>

              <div className="bg-[#02254A] text-white rounded-3xl p-6 shadow">
                <h4 className="font-bold">Seguridad</h4>
                <p className="text-sm mt-1">Respaldados por SBS y SUNAT</p>
              </div>

            </div>
          </div>

        </div>

      </section>
      {/* SECCIÓN 5 — Clientes */}
      <section className="mt-10 mb-20 px-4 max-w-6xl mx-auto">

        <h2 className="text-center text-4xl font-bold text-[#02254A] mb-10">
          Nuestros <span className="text-[#02254A]/90">clientes</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 shadow">Testimonio 1</div>
          <div className="bg-white rounded-3xl p-6 shadow">Testimonio 2</div>
          <div className="bg-white rounded-3xl p-6 shadow">Testimonio 3</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#02254A] text-white py-12 mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-center">TU FOOTER AQUÍ</p>
        </div>
      </footer>

    </main>
  );
}
