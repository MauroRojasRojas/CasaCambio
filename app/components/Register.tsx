"use client";

import { useState, Fragment } from "react";
import Image from "next/image";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Combobox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";

// DATAS
import { countries } from "../../data/countries";
import { peruUbigeo } from "../../data/peru-ubigeo";
import type { Country } from "../../data/countries";

export default function Register() {
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [profile, setProfile] = useState<"persona" | "empresa" | null>(null);

  // Paso 3
  const [dni, setDni] = useState("");
  const [docType, setDocType] = useState("DNI");
  const [fullName, setFullName] = useState("");
  const [loadingDni, setLoadingDni] = useState(false);
  const [dniError, setDniError] = useState("");

  // País / Teléfono / Ubigeo
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [countryQuery, setCountryQuery] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");

  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [foreignState, setForeignState] = useState("");

  const filteredCountries =
    countryQuery === ""
      ? countries
      : countries.filter((c) =>
          c.name.toLowerCase().includes(countryQuery.toLowerCase())
        );

  const isPeru = selectedCountry?.code === "PE" || selectedCountry === null;


  const regions = peruUbigeo.map((r) => r.nombre);

  const provinces =
    peruUbigeo.find((r) => r.nombre === selectedRegion)?.provincias || [];

  const districts =
    provinces.find((p) => p.nombre === selectedProvince)?.distritos || [];

  return (
    <main className="min-h-screen w-full bg-[#C7C0BD] flex items-center justify-center">
      <div className="bg-white w-[90%] max-w-6xl rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">

        {/* ============================ */}
        {/*      PASO 1 — PERFIL         */}
        {/* ============================ */}
        {step === 1 && (
          <div className="px-10 py-12 flex flex-col justify-center">
            <h1 className="text-4xl font-extrabold text-[#02254A]">
              Regístrate
            </h1>

            <p className="mt-2 text-sm text-slate-600">
              ¿Ya tienes una cuenta?
              <a className="text-[#0053A4] font-semibold hover:underline cursor-pointer">
                {" "}Iniciar sesión →
              </a>
            </p>

            <p className="mt-6 text-sm text-slate-700 font-medium">
              Elige un perfil para continuar con el registro
            </p>

            {/* PERSONA */}
            <div
              onClick={() => setProfile("persona")}
              className={`mt-5 flex items-center gap-3 cursor-pointer border rounded-xl px-5 py-4 transition 
                ${
                  profile === "persona"
                    ? "border-[#004084] bg-[#E6F1FF] shadow-md scale-[1.02]"
                    : "border-slate-300 hover:border-[#0053A4] hover:bg-slate-100"
                }`}
            >
              <div className="text-slate-500 text-xl">👤</div>
              <span className="text-[#02254A] font-semibold text-lg">
                Persona
              </span>
            </div>

            {/* EMPRESA */}
            <div
              onClick={() => setProfile("empresa")}
              className={`mt-4 flex items-center gap-3 cursor-pointer border rounded-xl px-5 py-4 transition 
                ${
                  profile === "empresa"
                    ? "border-[#004084] bg-[#E6F1FF] shadow-md scale-[1.02]"
                    : "border-slate-300 hover:border-[#0053A4] hover:bg-slate-100"
                }`}
            >
              <div className="text-slate-500 text-xl">🏢</div>
              <span className="text-[#02254A] font-semibold text-lg">
                Empresa
              </span>
            </div>

            {/* BOTÓN */}
            <button
              disabled={!profile}
              onClick={() => profile && setStep(2)}
              className={`mt-8 py-3 rounded-xl shadow font-bold transition text-lg
                ${
                  profile
                    ? "bg-[#FFE27A] text-[#02254A] hover:bg-[#ffd94a] cursor-pointer"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
            >
              Registrarme
            </button>
          </div>
        )}

        {/* ============================ */}
        {/*      PASO 2 — CUENTA          */}
        {/* ============================ */}
        {step === 2 && (
          <div className="px-10 py-12 flex flex-col justify-center">
            <h1 className="text-4xl font-extrabold text-[#02254A]">
              Empecemos tu registro
            </h1>

            <p className="mt-2 text-sm text-slate-600">
              ¿Ya tienes una cuenta?
              <a className="text-[#0053A4] font-semibold hover:underline cursor-pointer">
                {" "}Iniciar sesión →
              </a>
            </p>

            <div className="mt-8">
              {/* CORREO */}
              <input
                placeholder="Correo"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-[#000000] mb-4
                focus:border-blue-600 outline-none placeholder:text-[#000000] placeholder:font-medium"
              />

              {/* CONTRASEÑAS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Contraseña"
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-[#000000] focus:border-blue-600 outline-none placeholder:text-[#000000]"
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

                <div className="relative">
                  <input
                    type={showPass2 ? "text" : "password"}
                    placeholder="Confirmar contraseña"
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-[#000000] focus:border-blue-600 outline-none placeholder:text-[#000000]"
                  />
                  <span
                    onClick={() => setShowPass2(!showPass2)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-slate-500"
                  >
                    {showPass2 ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </span>
                </div>
              </div>

              {/* CAPTCHA */}
              <div className="mt-5 h-20 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 text-sm">
                [ reCAPTCHA ]
              </div>

              {/* TERMINOS */}
              <div className="flex items-start gap-2 mt-5 text-sm text-slate-700">
                <input type="checkbox" className="mt-1" />
                <span>
                  Acepto los{" "}
                  <a className="text-blue-700 underline cursor-pointer">
                    Términos y Condiciones
                  </a>{" "}
                  y la{" "}
                  <a className="text-blue-700 underline cursor-pointer">
                    Política de Privacidad
                  </a>
                  .
                </span>
              </div>

              {/* BOTÓN */}
              <button
                onClick={() => setStep(3)}
                className="w-full mt-6 bg-yellow-400 text-[#02254A] py-3 cursor-pointer rounded-xl font-bold shadow hover:bg-yellow-300 transition text-lg"
              >
                Registrarme
              </button>

              <button
                onClick={() => setStep(1)}
                className="mt-6 px-5 py-2 rounded-xl border border-[#0053A4] text-[#0053A4] font-semibold shadow-sm cursor-pointer hover:bg-blue-50 transition"
              >
                ← Atrás
              </button>
            </div>
          </div>
        )}

        {/* ============================ */}
        {/*      PASO 3 — IDENTIDAD       */}
        {/* ============================ */}
        {step === 3 && (
          <div className="col-span-1 lg:col-span-2 px-10 py-12">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-extrabold text-[#02254A]">
                  Verifica tu identidad
                </h1>
                <p className="mt-2 text-sm text-slate-600">
                  Completa tus datos para continuar.
                </p>
              </div>

              <button
                onClick={() => setStep(2)}
                className="px-5 py-2 rounded-xl border border-[#0053A4] text-[#0053A4] font-semibold shadow-sm cursor-pointer hover:bg-blue-50 transition"
              >
                ← Atrás
              </button>
            </div>

            {/* 2 COLUMNAS */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* IZQUIERDA */}
              <div className="space-y-4">

                {/* Tipo doc */}
                <label className="text-sm font-semibold text-slate-700">
                  Tipo de documento
                </label>
                <select
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                  className="w-full border border-slate-700 rounded-xl px-4 py-3 text-sm"
                >
                  <option value="DNI">DNI</option>
                  <option value="CE">Carnet de Extranjería</option>
                  <option value="PAS">Pasaporte</option>
                </select>

                {/* Número + verificar */}
                <label className="text-sm font-semibold text-slate-700">
                  Número de documento
                </label>
                <div className="flex items-center gap-3">
                  <input
                    value={dni}
                    onChange={(e) => {
                      const v = e.target.value;
                      if (/^\d*$/.test(v)) setDni(v);
                    }}
                    maxLength={docType === "DNI" ? 8 : 12}
                    placeholder="Ingresa tu documento"
                    className="w-1/2 border border-slate-700 rounded-xl px-4 py-3 text-sm"
                  />

                  <button
                    disabled={
                      loadingDni ||
                      (docType === "DNI" && dni.length !== 8) ||
                      dni.length === 0
                    }
                    onClick={async () => {
                      setLoadingDni(true);
                      setDniError("");
                      setFullName("");

                      try {
                        const TOKEN = process.env.NEXT_PUBLIC_DECOLECTA_TOKEN;

                        const res = await fetch(
                          `https://api.decolecta.com/v1/reniec/dni?numero=${dni}`,
                          {
                            headers: {
                              Accept: "application/json",
                              Authorization: `Bearer ${TOKEN}`,
                            },
                          }
                        );

                        const data = await res.json();

                        if (!data?.data?.nombreCompleto) {
                          setDniError("No se encontró información.");
                        } else {
                          setFullName(data.data.nombreCompleto);
                        }
                      } catch {
                        setDniError("Error al verificar documento.");
                      }

                      setLoadingDni(false);
                    }}
                    className={`w-1/2 py-3 rounded-xl text-sm font-semibold transition 
                      ${
                        loadingDni ||
                        (docType === "DNI" && dni.length !== 8)
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-[#FFE27A] text-[#02254A] hover:bg-[#ffd94a]"
                      }`}
                  >
                    {loadingDni ? "Verificando..." : "Verificar documento"}
                  </button>
                </div>

                {dniError && (
                  <p className="text-xs text-red-600">{dniError}</p>
                )}

                {/* Nombre */}
                <label className="text-sm font-semibold text-slate-700">
                  Nombre completo
                </label>
                <input
                  value={fullName}
                  readOnly
                  className="w-full border border-slate-700 rounded-xl px-4 py-3 bg-slate-100 text-sm"
                />

                {/* TELÉFONO */}
                <div>
                  <label className="text-sm font-semibold text-[#02254A]">
                    Teléfono
                  </label>

                  <div className="mt-1 flex items-center border border-slate-700 rounded-xl bg-white px-3 py-2">

                    {/* SELECTOR PAÍSES */}
                    <Combobox
                      value={selectedCountry}
                      onChange={(c: Country | null) => {
                        setSelectedCountry(c);
                      }}
                    >
                      <div className="relative w-32">
                        <Combobox.Button className="flex items-center gap-2 cursor-pointer w-full pr-6">

                          {selectedCountry ? (
                            <img
                              src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${selectedCountry.code.toLowerCase()}.svg`}
                              className="w-6 h-4 object-cover rounded-sm"
                            />
                          ) : (
                            <span className="text-xs text-gray-500">
                              País
                            </span>
                          )}

                          <span className="font-semibold text-sm">
                            {selectedCountry?.dialCode || ""}
                          </span>

                          <ChevronUpDownIcon className="h-4 w-4 text-slate-500 absolute right-0" />
                        </Combobox.Button>

                        {/* OPCIONES */}
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Combobox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 text-sm shadow-lg ring-1 ring-black/5">
                            <div className="px-3 pb-1">
                              <input
                                autoFocus
                                placeholder="Buscar..."
                                className="w-full rounded-lg border border-slate-300 px-2 py-1 text-xs outline-none"
                                value={countryQuery}
                                onChange={(e) =>
                                  setCountryQuery(e.target.value)
                                }
                              />
                            </div>

                            {filteredCountries.map((country) => (
                              <Combobox.Option
                                key={country.code}
                                value={country}
                                className={({ active }) =>
                                  `flex cursor-pointer items-center gap-2 px-3 py-1 ${
                                    active ? "bg-blue-50" : ""
                                  }`
                                }
                              >
                                <img
                                  src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${country.code.toLowerCase()}.svg`}
                                  className="w-5 h-3 rounded-sm object-cover"
                                />
                                <span className="flex-1 truncate">
                                  {country.name}
                                </span>
                                <span className="text-xs text-slate-500">
                                  {country.dialCode}
                                </span>
                              </Combobox.Option>
                            ))}
                          </Combobox.Options>
                        </Transition>
                      </div>
                    </Combobox>

                    {/* INPUT NÚMERO */}
                    <input
                      value={phone}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (/^\d*$/.test(val)) setPhone(val);
                      }}
                      placeholder="Teléfono"
                      className="flex-1 ml-3 text-sm outline-none"
                    />
                  </div>
                </div>

                {/* GÉNERO */}
                <div>
                  <label className="text-sm font-semibold text-[#02254A]">
                    Género
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="mt-1 w-full border border-slate-700 rounded-xl px-4 py-2.5 text-sm"
                  >
                    <option value="">Seleccionar</option>
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                    <option value="X">Sin especificar</option>
                  </select>
                </div>
              </div>

              {/* DERECHA */}
              <div className="space-y-4">
                {/* País */}
                <div>
                  <label className="text-sm font-semibold text-[#02254A]">
                    País
                  </label>
                  <select
                    value={selectedCountry?.code || ""}
                    onChange={(e) => {
                      const c = countries.find(
                        (x) => x.code === e.target.value
                      );
                      setSelectedCountry(c || null);

                      if (c?.code !== "PE") {
                        setSelectedRegion("");
                        setSelectedProvince("");
                        setSelectedDistrict("");
                      }
                    }}
                    className="mt-1 w-full border border-slate-700 rounded-xl px-4 py-3 text-sm"
                  >
                    <option value="">Seleccionar</option>
                    {countries.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Ubigeo Perú */}
                {/* Ubigeo Perú o vacío (mostrar SIEMPRE al inicio) */}
{!selectedCountry || selectedCountry.code === "PE" ? (
  <>
    {/* Región */}
    <div>
      <label className="text-sm font-semibold text-[#02254A]">
        Región
      </label>
      <select
        value={selectedRegion}
        onChange={(e) => {
          setSelectedRegion(e.target.value);
          setSelectedProvince("");
          setSelectedDistrict("");
        }}
        className="mt-1 w-full border border-slate-700 rounded-xl px-4 py-3 text-sm"
      >
        <option value="">Seleccionar</option>
        {regions.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>
    </div>

    {/* Provincia */}
    <div>
      <label className="text-sm font-semibold text-[#02254A]">
        Provincia
      </label>
      <select
        value={selectedProvince}
        onChange={(e) => {
          setSelectedProvince(e.target.value);
          setSelectedDistrict("");
        }}
        disabled={!selectedRegion}
        className="mt-1 w-full border border-slate-700 rounded-xl px-4 py-3 text-sm"
      >
        <option value="">Seleccionar</option>
        {provinces.map((p) => (
          <option key={p.nombre} value={p.nombre}>
            {p.nombre}
          </option>
        ))}
      </select>
    </div>

    {/* Distrito */}
    <div>
      <label className="text-sm font-semibold text-[#02254A]">
        Distrito
      </label>
      <select
        value={selectedDistrict}
        onChange={(e) => setSelectedDistrict(e.target.value)}
        disabled={!selectedProvince}
        className="mt-1 w-full border border-slate-700 rounded-xl px-4 py-3 text-sm"
      >
        <option value="">Seleccionar</option>
        {districts.map((d) => (
          <option key={d.nombre} value={d.nombre}>
            {d.nombre}
          </option>
        ))}
      </select>
    </div>
  </>
) : (
  /* Estado / Provincia SOLO si no es Perú */
  <div>
    <label className="text-sm font-semibold text-[#02254A]">
      Estado / Provincia
    </label>
    <input
      value={foreignState}
      onChange={(e) => setForeignState(e.target.value)}
      placeholder="Ingresa tu estado o provincia"
      className="mt-1 w-full border border-slate-700 rounded-xl px-4 py-3 text-sm"
    />
  </div>
)}

              </div>
            </div>

            {/* FINALIZAR */}
            <div className="flex justify-center">
              <button className="mt-8 bg-yellow-400 text-[#02254A] py-3 px-16 rounded-xl font-bold shadow hover:bg-yellow-300 transition text-lg">
                Finalizar registro
              </button>
            </div>
          </div>
        )}

        {/* IMAGEN SOLO PASO 1 Y 2 */}
        {(step === 1 || step === 2) && (
          <div className="hidden lg:flex items-center justify-center bg-white">
            <Image
              src="/assets/reggggg.svg"
              alt="Registro banner"
              width={600}
              height={600}
              className="object-contain p-3 rounded-xl"
            />
          </div>
        )}
      </div>
    </main>
  );
}