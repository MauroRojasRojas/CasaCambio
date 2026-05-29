'use client';

import { useState, useEffect, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { noticiasService } from '@/lib/services/noticiasService';
import type { Noticia } from '@/lib/services/noticiasService';

const API_STORAGE = process.env.NEXT_PUBLIC_API_BASE_URL?.replace('/api', '') || 'http://localhost:3001';

export default function TickerNoticias() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [selected, setSelected] = useState<Noticia | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    noticiasService.getNoticiasTicker()
      .then(setNoticias)
      .catch(() => {});
  }, []);

  if (noticias.length === 0) return null;

  return (
    <>
      <div
        className="w-full bg-[#02254A] text-white flex items-center h-10 overflow-hidden select-none mt-[68px] md:mt-[76px] lg:mt-[136px]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="flex items-center gap-3 px-4 shrink-0 bg-[#02254A] z-10 h-full">
          <span className="text-yellow-400 font-bold text-sm whitespace-nowrap">📰 ÚLTIMAS NOTICIAS</span>
          <div className="w-px h-5 bg-white/30" />
        </div>

        <div className="overflow-hidden relative flex-1 h-full">
          <div
            ref={tickerRef}
            className="flex items-center h-full whitespace-nowrap animate-ticker"
            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
          >
            <span className="inline-flex items-center gap-2 px-4">
              {noticias.map((n, i) => (
                <span key={n.id} className="inline-flex items-center gap-1">
                  {i > 0 && <span className="mx-2 text-white/40">·</span>}
                  <button
                    onClick={() => setSelected(n)}
                    className="text-xs hover:text-yellow-400 transition-colors cursor-pointer bg-transparent border-none text-white"
                  >
                    🔸 {n.titulo}
                  </button>
                </span>
              ))}
            </span>
            <span className="inline-flex items-center gap-2 px-4">
              {noticias.map((n, i) => (
                <span key={`dup-${n.id}`} className="inline-flex items-center gap-1">
                  {i > 0 && <span className="mx-2 text-white/40">·</span>}
                  <button
                    onClick={() => setSelected(n)}
                    className="text-xs hover:text-yellow-400 transition-colors cursor-pointer bg-transparent border-none text-white"
                  >
                    🔸 {n.titulo}
                  </button>
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>

      <Dialog
        header={selected?.titulo}
        visible={!!selected}
        onHide={() => setSelected(null)}
        style={{ width: '90vw', maxWidth: '700px' }}
        breakpoints={{ '960px': '95vw', '641px': '100vw' }}
        draggable={false}
      >
        {selected && (
          <div className="flex flex-col gap-4">
            {selected.imagen_url && (
              <img
                src={`${API_STORAGE}${selected.imagen_url}`}
                alt={selected.titulo}
                className="w-full h-64 object-cover rounded-lg"
              />
            )}
            <div className="flex items-center gap-3">
              <span
                className="text-xs font-bold px-3 py-1 rounded-full text-white"
                style={{ backgroundColor: selected.color_acento }}
              >
                {selected.categoria}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(selected.fecha_publicacion).toLocaleDateString('es-PE', {
                  day: 'numeric', month: 'short', year: 'numeric'
                })}
              </span>
            </div>
            {selected.subtitulo && (
              <p className="text-gray-500 text-sm">{selected.subtitulo}</p>
            )}
            {selected.cuerpo && (
              <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {selected.cuerpo}
              </div>
            )}
            {selected.link_externo && (
              <Button
                label="Ver fuente"
                icon="pi pi-external-link"
                severity="info"
                onClick={() => window.open(selected.link_externo!, '_blank')}
                className="w-fit"
              />
            )}
          </div>
        )}
      </Dialog>
    </>
  );
}
