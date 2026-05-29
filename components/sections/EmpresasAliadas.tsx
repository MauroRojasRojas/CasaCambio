'use client';

import { useEffect, useState } from 'react';
import { getEmpresasPublic, buildLogoUrl, EmpresaAliada } from '@/lib/services/empresasAliadasService';

export default function EmpresasAliadas() {
  const [empresas, setEmpresas] = useState<EmpresaAliada[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getEmpresasPublic()
      .then(setEmpresas)
      .catch(() => setEmpresas([]))
      .finally(() => setLoaded(true));
  }, []);

  if (!loaded || empresas.length === 0) return null;

  return (
    <section className="w-full py-20 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#02254A]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#0053A4]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-[#0053A4] bg-[#0053A4]/10 px-4 py-1.5 rounded-full mb-4">
            Casos de Éxito
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#02254A] leading-tight">
            Organizaciones que{' '}
            <span className="bg-gradient-to-r from-[#0053A4] to-[#02254A] bg-clip-text text-transparent">
              ya trabajan con nosotros             </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-500 max-w-2xl mx-auto">
            Conoce algunas de las empresas que han elegido Dollariza para sus operaciones de cambio.
          </p>
        </div>

          <div
            className="mx-auto grid justify-items-center justify-center"
            style={{
              maxWidth: 960,
              gridTemplateColumns: 'repeat(auto-fit, 200px)',
              gap: '2rem',
            }}
          >
            {empresas.map((empresa) => {
              const logoSrc = buildLogoUrl(empresa.logo_url);
              const hasLink = Boolean(empresa.url_web);
              const content = (
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 text-center flex flex-col items-center justify-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 w-48">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#0053A4]/10 rounded-full blur-2xl scale-110" />
                    <img
                      src={logoSrc}
                      alt={empresa.nombre}
                      className="relative w-24 h-24 object-contain drop-shadow-lg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                  <h3 className="text-sm font-bold text-[#02254A] mt-3 leading-tight">{empresa.nombre}</h3>
                </div>
              );

            return hasLink ? (
              <a
                key={empresa.id}
                href={empresa.url_web!}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {content}
              </a>
            ) : (
              <div key={empresa.id}>{content}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
