"use client";

import { useState } from "react";

const testimonios = [
  {
    id: 1,
    nombre: "Abdulaziz Ali",
    texto:
      "Gulf Exchange is a great model of professionalism in dealing with customers. I have been dealing with them for many years.",
    foto: "/testimonials/user1.jpg",
  },
  {
    id: 2,
    nombre: "Magesh John",
    texto:
      "Their services are always fast, accurate and extremely reliable. Looking forward to use them again.",
    foto: "/testimonials/user2.jpg",
  },
  {
    id: 3,
    nombre: "Laura Pérez",
    texto:
      "Excelente servicio, muy rápido y con el mejor tipo de cambio del mercado.",
    foto: "/testimonials/user3.jpg",
  },
  {
    id: 4,
    nombre: "Carlos Mendoza",
    texto:
      "Siempre me atienden rápido, seguro y sin complicaciones. Muy recomendado.",
    foto: "/testimonials/user4.jpg",
  },
  {
    id: 5,
    nombre: "Sandra Rojas",
    texto:
      "Lo uso para mis operaciones personales y de negocio. Excelente servicio.",
    foto: "/testimonials/user5.jpg",
  },
  {
    id: 6,
    nombre: "Ricardo Núñez",
    texto:
      "Me encanta lo rápido que es el proceso. El tipo de cambio siempre es muy bueno.",
    foto: "/testimonials/user6.jpg",
  },
];

export default function Testimonios() {
  const [index, setIndex] = useState(0);

  // Navegar de 2 en 2
  const next = () => {
    setIndex((prev) => (prev + 2) % testimonios.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 2 + testimonios.length) % testimonios.length);
  };

  return (
    <section className="mt-20 mb-24 px-4 max-w-6xl mx-auto">

      <h2 className="text-center text-4xl font-bold text-[#02254A] mb-12">
        Nuestros <span className="text-[#02254A]/90">clientes</span>
      </h2>

      <div className="relative flex items-center justify-center">

        {/* Flecha izquierda */}
        <button
          onClick={prev}
          className="absolute left-0 -ml-10 text-slate-400 hover:text-[#02254A] text-4xl"
        >
          ❮
        </button>

        {/* GRID DE 2 TESTIMONIOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto max-w-5xl">

          {/* Testimonio A */}
          <div className="bg-white rounded-3xl p-10 shadow-lg transition-all duration-500">
            <div className="text-red-600 text-8xl mb-1">“</div>

            <p className="text-slate-700 leading-relaxed mb-6">
              {testimonios[index].texto}
            </p>

            <div className="flex items-center justify-between">
              <span className="font-bold text-[#02254A] text-lg">
                {testimonios[index].nombre}
              </span>

              <img
                src={testimonios[index].foto}
                className="h-20 w-20 rounded-full object-cover shadow"
                alt="Foto"
              />
            </div>
          </div>

          {/* Testimonio B */}
          <div className="bg-white rounded-3xl p-10 shadow-lg transition-all duration-500">
            <div className="text-red-600 text-8xl mb-1">“</div>

            <p className="text-slate-700 leading-relaxed mb-6">
              {testimonios[index + 1]?.texto}
            </p>

            <div className="flex items-center justify-between">
              <span className="font-bold text-[#02254A] text-lg">
                {testimonios[index + 1]?.nombre}
              </span>

              <img
                src={testimonios[index + 1]?.foto}
                className="h-20 w-20 rounded-full object-cover shadow"
                alt="Foto"
              />
            </div>
          </div>

        </div>

        {/* Flecha derecha */}
        <button
          onClick={next}
          className="absolute right-0 -mr-10 text-slate-400 hover:text-[#02254A] text-4xl"
        >
          ❯
        </button>
      </div>

      {/* Íconos de paginación */}
      <div className="flex justify-center mt-6 space-x-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-2 w-6 rounded-full transition-all ${
              i === index / 2 ? "bg-red-600 w-8" : "bg-slate-300"
            }`}
          />
        ))}
      </div>

    </section>
  );
}
