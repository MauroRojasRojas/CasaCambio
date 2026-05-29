'use client';

import { useState, useEffect } from 'react';
import ConverterCard from '../ConverterCard';
import { bancosService } from '@/lib/services/bancosService';
import type { Banco } from '@/lib/services/bancosService';

export default function Hero() {
  const [bancos, setBancos] = useState<Banco[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bancosService.getBancosPublic()
      .then(setBancos)
      .catch(() => setBancos([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className='w-full flex flex-col justify-between items-center bg-[#02254A]'>
      {/* Parte superior */}
      <div className='w-full mx-auto pt-36 px-4 sm:px-6 md:px-8 lg:px-8 xl:px-12 4k:px-16 pb-0 shadow-md relative z-10 overflow-hidden'>
        <div className='max-w-[1440px] mx-auto'>
          {/* 3 BLOQUES: TEXTO | IMAGEN | CARD */}
          <div className='flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-4 md:pt-6 lg:pt-8'>

            {/* BLOQUE 1: TEXTO */}
            <div className='text-center lg:text-left pb-4 lg:pb-0 shrink lg:self-start md:pr-2 lg:pr-0 lg:mt-10 xl:mt-0 lg:mr-8 xl:mr-0'>
              <h1 className='text-white text-xl sm:text-2xl lg:text-3xl xl:text-4xl 4k:text-5xl font-bold tracking-wide leading-tight mb-4 lg:mb-6 xl:mb-10'>
                OPERACIONES DE <br /> CAMBIO
                <span className='text-[#FAB73D]'> 100% ONLINE</span> <br />
                AL MEJOR TIPO DE <br /> CAMBIO DEL <br /> MERCADO
              </h1>

              <ul className='space-y-3 xl:space-y-5 mt-4 lg:mt-5 xl:mt-8'>
                <li className='flex items-center gap-3 justify-center lg:justify-start'>
                  <img src='/icons/protect.png' className='w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12' alt='Seguridad' />
                  <span className='text-[#FAB73D] text-base lg:text-lg xl:text-xl font-bold tracking-wide drop-shadow-[3px_3px_0_rgba(0,0,0,0.35)]'>Seguridad</span>
                </li>
                <li className='flex items-center gap-3 justify-center lg:justify-start'>
                  <img src='/icons/speedy.png' className='w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12' alt='Rapidez' />
                  <span className='text-[#FAB73D] text-base lg:text-lg xl:text-xl font-bold tracking-wide drop-shadow-[3px_3px_0_rgba(0,0,0,0.35)]'>Rapidez</span>
                </li>
                <li className='flex items-center gap-3 justify-center lg:justify-start'>
                  <img src='/icons/handshake.png' className='w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12' alt='Transparencia' />
                  <span className='text-[#FAB73D] text-base lg:text-lg xl:text-xl font-bold tracking-wide drop-shadow-[3px_3px_0_rgba(0,0,0,0.35)]'>Transparencia</span>
                </li>
              </ul>
            </div>

            {/* BLOQUE 2: IMAGEN — visible en todos los tamaños */}
            <div className='flex items-center justify-center min-w-0 self-center lg:self-end'>
              <img
                src='/assets/womens.png'
                alt='Equipo Dollariza'
                className='h-[200px] sm:h-[250px] md:h-[300px] lg:h-[500px] lg:min-w-[530px] object-bottom block'
              />
            </div>

            {/* BLOQUE 3: CARD */}
            <div className='w-full lg:w-auto lg:min-w-[300px] lg:max-w-[320px] xl:max-w-[400px] shrink-0 self-center lg:self-auto pb-4 lg:pb-6'>
              <ConverterCard />
            </div>

          </div>
        </div>
      </div>

      {/* ===== FRANJA INFERIOR: REGULACIÓN + TRANSFERENCIAS + BANCOS ===== */}
      {!loading && bancos.length > 0 && (
        <div className='w-full bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.08)]'>
          <div className='max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-8 xl:px-12'>
            <div className='grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200'>

              {/* COLUMNA 1: REGULACIÓN */}
              <div className='flex flex-col items-center justify-center gap-3 py-5 md:py-6 px-4'>
                <span className='text-[11px] uppercase tracking-[0.15em] font-semibold text-gray-400'>
                  Regulados por
                </span>
                <div className='flex items-center gap-6'>
                  <img src='/icons/sbsblanco.png' alt='SBS' className='h-12 w-auto object-contain' />
                  <img
                    src='/icons/sunat.png'
                    alt='SUNAT'
                    className='h-12 w-auto object-contain bg-amber-900 rounded-md p-2 border border-slate-300'
                  />
                </div>
              </div>

              {/* COLUMNA 2: TRANSFERENCIAS */}
              <div className='flex flex-col items-center justify-center gap-2 py-5 md:py-6 px-4'>
                <div className='flex items-center gap-2'>
                  <span className='text-yellow-500 text-base'>⚡</span>
                  <span className='bg-[#02254A] text-white font-bold px-4 py-1.5 rounded-lg text-[11px] xl:text-xs shadow-sm whitespace-nowrap tracking-wide'>
                    TRANSFERENCIAS INMEDIATAS E INTERBANCARIAS
                  </span>
                </div>
                <div className='flex items-center gap-2 bg-gray-100 px-4 py-1 rounded-md text-[#02254A] text-xs font-medium'>
                  <span>🕒</span>
                  <span>DE 15 a 40 MINUTOS</span>
                </div>
              </div>

              {/* COLUMNA 3: BANCOS */}
              <div className='flex flex-col items-center justify-center gap-3 py-5 md:py-6 px-4'>
                <span className='text-[11px] uppercase tracking-[0.15em] font-semibold text-gray-400'>
                  Operamos con
                </span>
                <div className='flex items-center gap-5 lg:gap-6 xl:gap-8'>
                  {bancos.map((banco) => (
                    <div key={banco.id} className='flex flex-col items-center gap-0.5'>
                      <img
                        src={banco.logo}
                        alt={banco.nombre}
                        className={`object-contain h-10 lg:h-12 xl:h-14 w-auto transition-all duration-200 ${
                          banco.disponible ? '' : 'grayscale opacity-40'
                        }`}
                      />
                      {!banco.disponible && (
                        <span className='text-[9px] text-red-500 font-semibold whitespace-nowrap'>
                          No disponible
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}
