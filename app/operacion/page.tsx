"use client";

import ConverterCard from "../components/ConverterCard";

export default function Operacion() {
    return (
        <main className="min-h-screen w-full bg-[#F5F7FF]">

            {/* ===================================================== */}
            {/*                  HEADER FULL WIDTH                    */}
            {/* ===================================================== */}
            <header className="w-full bg-white h-16 shadow-sm px-25 flex items-center justify-between border-b border-slate-200">

                {/* LOGO */}
                <div className="flex items-center gap-3">
                    <img src="/icons/logomejorado1.png" alt="logo" className="h-24 w-24 rounded-full" />
                </div>

                {/* USUARIO */}
                <div className="flex items-center gap-5">
                    {/* Notificación */}
                    <div className="relative">
                        <img src="/icons/user.png" alt="user" />
                    </div>

                    {/* Nombre usuario */}
                    <div className="flex items-center gap-2 cursor-pointer">
                        <span className="font-semibold text-[#02254A]">Diego Antonio Moscol</span>
                        <img src="/icons/low-arrow.png" alt="low" className="w-5 h-5" />
                    </div>
                </div>

            </header>

            {/* ===================================================== */}
            {/*               LAYOUT PRINCIPAL (SIDEBAR + BODY)       */}
            {/* ===================================================== */}
            <div className="flex w-full">

                {/* ===================================================== */}
                {/*                        SIDEBAR                        */}
                {/* ===================================================== */}
                <aside className="
                    w-72 bg-white h-[calc(100vh-64px)] shadow-lg border-r border-slate-200 
                    flex flex-col justify-between
                ">

                    <div>
                        {/* CAJITA BRAND — ESTILO AHORRO */}
                        <div className="bg-[#FFC700] rounded-md p-3 shadow-md mt-10 mx-6">

                            {/* FILA: ICONO + DOLLARIZA */}
                            <div className="flex items-center gap-3">

                                {/* ICONO REDONDO DEGRADADO */}
                                <div className="relative w-[50px] h-[50px]">
                                    <div className="absolute inset-0 rounded-full bg-[linear-gradient(145deg,#c1122f,#02254A)] opacity-95"></div>
                                    <img
                                        src="/icons/change.png"
                                        alt="logo"
                                        className="absolute inset-0 m-auto w-[44] h-[44]"
                                    />
                                </div>

                                {/* TEXTO PRINCIPAL */}
                                <h1 className="text-2xl font-extrabold tracking-tight text-[#02254A] leading-tight">
                                    Dollariza
                                </h1>

                            </div>

                            {/* SUBTÍTULO */}
                            <p className="text-[14px] text-slate-800 mt-4 leading-tight">
                                Plataforma segura de cambio online
                            </p>

                        </div>



                        {/* MENU */}
                        <nav className="px-4 space-y-3 pt-15 text-[15px] font-semibold">

                            {/* NUEVA OPERACIÓN */}
                            <button className="
                                flex items-center w-full px-4 py-3 rounded-xl
                                hover:bg-[#F5F7FF] hover:text-[#0053A4]
                                transition-all cursor-pointer text-[#02254A] gap-3
                            ">
                                <div className="w-6 flex justify-center">
                                    <img src="/icons/plus.png" alt="plus" />
                                </div>

                                <span className="text-sm font-semibold">Nueva operación</span>
                            </button>

                            {/* HISTORIAL */}
                            <button className="
                                flex items-center w-full px-4 py-3 rounded-xl
                                hover:bg-[#F5F7FF] hover:text-[#0053A4]
                                transition-all cursor-pointer text-[#02254A] gap-3
                            ">
                                <div className="w-6 flex justify-center">
                                    <img src="/icons/historial.png" alt="historial" />
                                </div>

                                <span className="text-sm font-semibold">Historial de operaciones</span>
                            </button>

                            {/* CUENTAS */}
                            <button className="
                                flex items-center w-full px-4 py-3 rounded-xl
                                hover:bg-[#F5F7FF] hover:text-[#0053A4]
                                transition-all cursor-pointer text-[#02254A] gap-3
                            ">
                                <div className="w-6 flex justify-center">
                                    <img src="/icons/cuenta.png" alt="cuentas" />
                                </div>

                                <span className="text-sm font-semibold">Cuentas</span>
                            </button>

                        </nav>
                    </div>

                    {/* FOOTER MENU */}
                    <div className="px-8 py-8 text-sm mb-20 text-[#02254A] space-y-5 border-t border-slate-200">

                        {/* Horario */}
                        <div>
                            <p className="font-bold text-[14px]">Horario de atención</p>
                            <p className="text-slate-600 text-xs mt-1 leading-tight">
                                Lunes a Viernes: 8:30 am - 6:30 pm<br />
                                Sábado: 9:00 am - 1:00 pm
                            </p>
                        </div>

                        {/* Contacto */}
                        <div>
                            <p className="font-bold text-[14px]">Contáctanos</p>
                            <p className="text-slate-600 text-xs mt-1 leading-normal">
                                📞 956-767-180<br />
                                📧 info.dollariza@gmail.com
                            </p>
                        </div>
                    </div>
                </aside>

                {/* ===================================================== */}
                {/*                       PANEL BODY                      */}
                {/* ===================================================== */}
                <section className="flex-1 px-16 py-10">

                    {/* PASOS CENTRADOS */}
                    <div className="flex justify-center gap-16 mb-8 pt-4 text-[#02254A]">
                        <div className="flex flex-col items-center">
                            <span className="font-bold">1. Cotiza</span>
                            <div className="w-20 h-2px bg-[#FFC700] mt-1"></div>
                        </div>

                        <div className="flex flex-col items-center opacity-40">
                            <span className="font-semibold">2. Registra</span>
                            <div className="w-20 h-2px bg-slate-300 mt-1"></div>
                        </div>

                        <div className="flex flex-col items-center opacity-40">
                            <span className="font-semibold">3. Transfiere</span>
                            <div className="w-20 h-2px bg-slate-300 mt-1"></div>
                        </div>
                    </div>

                    {/* BANNER */}
                    <div className="
                        bg-[#02254A] text-white px-6 py-3 rounded-xl shadow 
                        text-sm font-medium w-fit mx-auto
                    ">
                        ⚡ Transferencias inmediatas y seguridad a varios bancos
                    </div>

                    {/* COTIZADOR */}
                    <div className="flex justify-center mt-10">
                        <ConverterCard />
                    </div>

                    {/* SBS + SUNAT (CON TU DISEÑO ORIGINAL) */}
                    <div className="flex justify-center mt-14 opacity-90 gap-6">
                        <img
                            src="/icons/sbs.png"
                            alt="sbs"
                            className="h-[44] w-auto"
                        />

                        {/* RESPETANDO TU BORDE + TU COLOR + TU TAMAÑO */}
                        <img
                            src="/icons/sunat.png"
                            alt="sunat"
                            className="h-[44] w-auto bg-amber-900 p-1 border border-slate-300 rounded-md"
                        />
                    </div>

                </section>

            </div>
        </main>
    );
}
