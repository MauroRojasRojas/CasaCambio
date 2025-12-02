"use client";

import { useState } from "react";
import Image from "next/image";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="min-h-screen w-full bg-[#C7C0BD] flex items-center justify-center">
      <div className="bg-white w-[90%] max-w-6xl rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">

        {/* ========================= */}
        {/*   COLUMNA IZQUIERDA       */}
        {/* ========================= */}
        <div className="px-10 py-14 flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold text-[#02254A]">
            Iniciar sesión
          </h1>

          <p className="mt-2 text-sm text-slate-600">
            ¿Aún no tienes cuenta?
            <a
              href="/register"
              className="text-[#0053A4] font-semibold hover:underline cursor-pointer"
            >
              {" "}
              Regístrate →
            </a>
          </p>

          {/* FORMULARIO */}
          <div className="mt-8 space-y-5">

            {/* CORREO */}
            <div>
              <label className="text-sm font-semibold text-[#02254A]">
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo"
                className="mt-1 w-full border border-slate-300 rounded-xl px-4 py-3 text-sm placeholder:text-slate-500 focus:border-blue-600 outline-none"
              />
            </div>

            {/* CONTRASEÑA */}
            <div>
              <label className="text-sm font-semibold text-[#02254A]">
                Contraseña
              </label>

              <div className="relative mt-1">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm placeholder:text-slate-500 focus:border-blue-600 outline-none"
                />

                <span
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-slate-500"
                >
                  {showPass ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </span>
              </div>
            </div>

            {/* RECORDAR & RECUPERAR */}
            <div className="flex items-center justify-between mt-1">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" />
                Recuérdame
              </label>

              <a
                href="/recuperar"
                className="text-sm text-[#0053A4] hover:underline font-semibold cursor-pointer"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {/* BOTÓN LOGIN */}
            <button className="w-full bg-yellow-400 text-[#02254A] py-3 rounded-xl font-bold shadow hover:bg-yellow-300 transition text-lg cursor-pointer">
              Iniciar sesión
            </button>

            {/* GOOGLE LOGIN */}
            <button className="w-full mt-3 border border-slate-300 text-slate-700 py-3 rounded-xl font-semibold shadow-sm hover:bg-slate-50 transition text-sm flex items-center justify-center gap-3">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Iniciar sesión con Google
            </button>

          </div>
        </div>

        {/* ========================= */}
        {/*   COLUMNA DERECHA IMAGEN  */}
        {/* ========================= */}
        <div className="hidden lg:flex items-center justify-center bg-white">
          <Image
            src="/assets/register.png"
            alt="Login banner"
            width={580}
            height={580}
            className="object-contain p-8"
          />
        </div>

      </div>
    </main>
  );
}
