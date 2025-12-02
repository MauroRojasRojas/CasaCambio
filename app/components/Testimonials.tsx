"use client";

import { useState } from "react";

const testimonios = [
  {
    id: 1,
    nombre: "María Fernanda Salazar",
    texto:
      "Cambié dólares para un viaje y me sorprendió lo rápido que fue todo. El tipo de cambio fue mejor que en cualquier banco y me llegó el dinero en minutos. Totalmente recomendado.",
    foto: "/assets/rostro1.jpg",
  },
  {
    id: 2,
    nombre: "Ricardo Méndez",
    texto:
      "Uso Dollariza desde hace meses para mis pagos del negocio. Es seguro, confiable y siempre encuentro un tipo de cambio competitivo. El servicio al cliente también es excelente.",
    foto: "/assets/rostro2.jpg",
  },
  {
    id: 3,
    nombre: "Valeria Ortiz",
    texto:
      "Mi experiencia fue muy buena. Me gusta que la plataforma sea simple y clara, sin pasos innecesarios. El dinero llegó súper rápido y el proceso fue seguro.",
    foto: "/assets/rostro3.jpg",
  },
  {
    id: 4,
    nombre: "Jorge Ramírez",
    texto:
      "He probado varias casas de cambio online, pero Dollariza es la que me generó más confianza. Todo el proceso es transparente y se nota que cuidan mucho la seguridad.",
    foto: "/assets/rostro4.jpg",
  },
  {
    id: 5,
    nombre: "Carolina Rivas",
    texto:
      "Cambio constantemente por motivos de trabajo y Dollariza me ha facilitado la vida. Es rápido, seguro y los tipos de cambio son realmente buenos.",
    foto: "/assets/rostro5.jpg",
  },
  {
    id: 6,
    nombre: "Sebastián Aguilar",
    texto:
      "Me llegó el depósito en menos de 10 minutos. Nunca pensé que cambiar dinero online fuera tan sencillo. Sin dudas seguiré usándolo.",
    foto: "/assets/rostro6.jpg",
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
          <div className="bg-white rounded-lg p-10 shadow-lg transition-all duration-500">
            <div className="text-red-600 text-5xl mb-1">“</div>

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
                alt={testimonios[index].nombre}
              />
            </div>
          </div>

          {/* Testimonio B */}
          <div className="bg-white rounded-lg p-10 shadow-lg transition-all duration-500">
            <div className="text-red-600 text-5xl mb-1">“</div>

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
                alt={testimonios[index + 1]?.nombre}
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
