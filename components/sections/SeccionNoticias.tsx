'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { noticiasService } from '@/lib/services/noticiasService';
import type { Noticia } from '@/lib/services/noticiasService';

const API_STORAGE = process.env.NEXT_PUBLIC_API_BASE_URL?.replace('/api', '') || 'http://localhost:3001';

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function getAnimationClass(animacion: string): string {
  switch (animacion) {
    case 'FADE': return 'animate-fade-in';
    case 'SLIDE': return 'animate-slide-up';
    case 'ZOOM': return 'animate-zoom-in';
    default: return '';
  }
}

function useIntersectionObserver(
  ref: React.RefObject<HTMLElement | null>,
  options?: IntersectionObserverInit
): boolean {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, options]);

  return isVisible;
}

function NoticiaCard({ noticia, index }: { noticia: Noticia; index: number }) {
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(cardRef);

  const handleClick = () => {
    if (noticia.link_externo) {
      window.open(noticia.link_externo, '_blank');
    } else {
      setOpen(true);
    }
  };

  const sizeClass = noticia.tamanio === 'GRANDE'
    ? 'md:col-span-2 md:row-span-2'
    : noticia.tamanio === 'MEDIANA'
    ? 'md:col-span-1 md:row-span-2'
    : 'md:col-span-1 md:row-span-1';

  const animClass = getAnimationClass(noticia.animacion);

  const renderContent = () => {
    switch (noticia.posicion_imagen) {
      case 'ARRIBA':
        return (
          <div className="flex flex-col h-full">
            {noticia.imagen_url && (
              <div className="w-full h-48 overflow-hidden shrink-0">
                <img src={`${API_STORAGE}${noticia.imagen_url}`} alt={noticia.titulo} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-4 flex flex-col flex-1">
              {renderBadge()}
              {renderTitle()}
              {renderResumen()}
              {renderDate()}
            </div>
          </div>
        );
      case 'IZQUIERDA':
        return (
          <div className="flex h-full">
            {noticia.imagen_url && (
              <div className="w-2/5 shrink-0 overflow-hidden">
                <img src={`${API_STORAGE}${noticia.imagen_url}`} alt={noticia.titulo} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-4 flex flex-col flex-1 min-w-0">
              {renderBadge()}
              {renderTitle()}
              {renderResumen()}
              {renderDate()}
            </div>
          </div>
        );
      case 'DERECHA':
        return (
          <div className="flex h-full">
            <div className="p-4 flex flex-col flex-1 min-w-0">
              {renderBadge()}
              {renderTitle()}
              {renderResumen()}
              {renderDate()}
            </div>
            {noticia.imagen_url && (
              <div className="w-2/5 shrink-0 overflow-hidden">
                <img src={`${API_STORAGE}${noticia.imagen_url}`} alt={noticia.titulo} className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        );
      case 'FONDO':
        return (
          <div
            className="relative h-full flex items-end"
            style={noticia.imagen_url ? {
              backgroundImage: `url(${API_STORAGE}${noticia.imagen_url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            } : undefined}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
            <div className="relative z-10 p-4 text-white">
              {renderBadge()}
              {renderTitle()}
              {renderResumen()}
              {renderDate()}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const isFondo = noticia.posicion_imagen === 'FONDO';

  const renderBadge = () => (
    <span
      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide mb-2 w-fit ${isFondo ? 'text-white' : 'text-white'}`}
      style={{ backgroundColor: noticia.color_acento }}
    >
      {noticia.categoria}
    </span>
  );

  const titleSize = noticia.tamanio === 'GRANDE' ? 'text-xl' : noticia.tamanio === 'MEDIANA' ? 'text-lg' : 'text-base';
  const resumenLines = noticia.tamanio === 'GRANDE' ? 'line-clamp-4' : noticia.tamanio === 'MEDIANA' ? 'line-clamp-3' : 'line-clamp-2';

  const renderTitle = () => (
    <h3 className={`${titleSize} font-bold leading-tight mb-1 ${isFondo ? 'text-white' : 'text-[#02254A]'}`}>
      {noticia.titulo}
    </h3>
  );

  const renderResumen = () => {
    if (!noticia.resumen) return null;
    return (
      <p className={`text-sm ${isFondo ? 'text-white/90' : 'text-gray-600'} ${resumenLines} mb-2`}>
        {noticia.resumen}
      </p>
    );
  };

  const renderDate = () => (
    <span className={`text-xs ${isFondo ? 'text-white/70' : 'text-gray-400'} mt-auto`}>{formatDate(noticia.fecha_publicacion)}</span>
  );

  return (
    <>
      <div
        ref={cardRef}
        onClick={handleClick}
        className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${sizeClass} ${isVisible ? animClass : 'opacity-0'}`}
        style={{
          borderLeft: noticia.posicion_imagen !== 'ARRIBA' && noticia.posicion_imagen !== 'FONDO'
            ? `4px solid ${noticia.color_acento}`
            : undefined,
          borderTop: noticia.posicion_imagen === 'ARRIBA' || noticia.posicion_imagen === 'FONDO'
            ? `4px solid ${noticia.color_acento}`
            : undefined,
        }}
      >
        {renderContent()}
      </div>

      <Dialog
        header={noticia.titulo}
        visible={open}
        onHide={() => setOpen(false)}
        style={{ width: '90vw', maxWidth: '700px' }}
        breakpoints={{ '960px': '95vw', '641px': '100vw' }}
        draggable={false}
      >
        {noticia && (
          <div className="flex flex-col gap-4">
            {noticia.imagen_url && (
              <img
                src={`${API_STORAGE}${noticia.imagen_url}`}
                alt={noticia.titulo}
                className="w-full h-64 object-cover rounded-lg"
              />
            )}
            <div className="flex items-center gap-3">
              <span
                className="text-xs font-bold px-3 py-1 rounded-full text-white"
                style={{ backgroundColor: noticia.color_acento }}
              >
                {noticia.categoria}
              </span>
              <span className="text-xs text-gray-500">{formatDate(noticia.fecha_publicacion)}</span>
            </div>
            {noticia.subtitulo && (
              <p className="text-gray-500 text-sm">{noticia.subtitulo}</p>
            )}
            {noticia.cuerpo && (
              <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {noticia.cuerpo}
              </div>
            )}
            {noticia.link_externo && (
              <Button
                label="Ver fuente"
                icon="pi pi-external-link"
                severity="info"
                onClick={() => window.open(noticia.link_externo!, '_blank')}
                className="w-fit"
              />
            )}
          </div>
        )}
      </Dialog>
    </>
  );
}

export default function SeccionNoticias() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [tickerNoticias, setTickerNoticias] = useState<Noticia[]>([]);
  const [tickerSelected, setTickerSelected] = useState<Noticia | null>(null);
  const [tickerPaused, setTickerPaused] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      noticiasService.getNoticiasPublic(),
      noticiasService.getNoticiasTicker()
    ])
      .then(([publicas, ticker]) => {
        setNoticias(publicas);
        setTickerNoticias(ticker);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-4 sm:px-6 md:px-8 lg:px-12 max-w-[1240px] mx-auto">
        <div className="flex justify-center items-center h-48">
          <i className="pi pi-spin pi-spinner text-4xl text-[#0053A4]" />
        </div>
      </section>
    );
  }

  if (noticias.length === 0) return null;

  return (
    <section className="relative py-16 sm:py-20 overflow-hidden px-4 sm:px-6 md:px-8 lg:px-12 max-w-[1240px] mx-auto">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#02254A]/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#0053A4]/5 rounded-full blur-3xl" />

      <div className="relative text-center mb-10">
        <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-[#0053A4] bg-[#0053A4]/10 px-4 py-1.5 rounded-full mb-4">
          Noticias y novedades
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#02254A] leading-tight">
          Mantente informado{' '}
          <span className="bg-gradient-to-r from-[#0053A4] to-[#02254A] bg-clip-text text-transparent">
            sobre el mercado
          </span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-500 max-w-2xl mx-auto">
          Las últimas noticias y novedades del mundo de las divisas y la economía.
        </p>
      </div>

      {tickerNoticias.length > 0 && (
        <div
          className="w-full relative flex items-center h-10 mb-8 select-none"
          onMouseEnter={() => setTickerPaused(true)}
          onMouseLeave={() => setTickerPaused(false)}
        >
          <div className="flex items-center gap-2 pl-0 shrink-0 z-10 h-full">
            <span className="text-xs font-bold text-[#0053A4] whitespace-nowrap">📰 ÚLTIMAS NOTICIAS</span>
            <div className="w-px h-4 bg-slate-300" />
          </div>
          <div className="overflow-hidden relative flex-1 h-full">
            <div
              className="flex items-center h-full whitespace-nowrap animate-ticker"
              style={{ animationPlayState: tickerPaused ? 'paused' : 'running' }}
            >
              <span className="inline-flex items-center gap-2 px-3">
                {tickerNoticias.map((n, i) => (
                  <span key={n.id} className="inline-flex items-center gap-1">
                    {i > 0 && <span className="mx-2 text-slate-300">·</span>}
                    <button
                      onClick={() => setTickerSelected(n)}
                      className="text-xs text-slate-600 hover:text-[#0053A4] transition-colors cursor-pointer bg-transparent border-none"
                    >
                      🔸 {n.titulo}
                    </button>
                  </span>
                ))}
              </span>
              <span className="inline-flex items-center gap-2 px-3">
                {tickerNoticias.map((n, i) => (
                  <span key={`dup-${n.id}`} className="inline-flex items-center gap-1">
                    {i > 0 && <span className="mx-2 text-slate-300">·</span>}
                    <button
                      onClick={() => setTickerSelected(n)}
                      className="text-xs text-slate-600 hover:text-[#0053A4] transition-colors cursor-pointer bg-transparent border-none"
                    >
                      🔸 {n.titulo}
                    </button>
                  </span>
                ))}
              </span>
            </div>
          </div>
          <div className="absolute left-0 top-0 bottom-0 w-32 pointer-events-none bg-gradient-to-r from-[#F5F7FF] via-[#F5F7FF]/80 to-transparent" />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[200px]">
        {noticias.map((n, i) => (
          <NoticiaCard key={n.id} noticia={n} index={i} />
        ))}
      </div>

      <Dialog
        header={tickerSelected?.titulo}
        visible={!!tickerSelected}
        onHide={() => setTickerSelected(null)}
        style={{ width: '90vw', maxWidth: '700px' }}
        breakpoints={{ '960px': '95vw', '641px': '100vw' }}
        draggable={false}
      >
        {tickerSelected && (
          <div className="flex flex-col gap-4">
            {tickerSelected.imagen_url && (
              <img
                src={`${API_STORAGE}${tickerSelected.imagen_url}`}
                alt={tickerSelected.titulo}
                className="w-full h-64 object-cover rounded-lg"
              />
            )}
            <div className="flex items-center gap-3">
              <span
                className="text-xs font-bold px-3 py-1 rounded-full text-white"
                style={{ backgroundColor: tickerSelected.color_acento }}
              >
                {tickerSelected.categoria}
              </span>
              <span className="text-xs text-gray-500">{formatDate(tickerSelected.fecha_publicacion)}</span>
            </div>
            {tickerSelected.subtitulo && (
              <p className="text-gray-500 text-sm">{tickerSelected.subtitulo}</p>
            )}
            {tickerSelected.cuerpo && (
              <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {tickerSelected.cuerpo}
              </div>
            )}
            {tickerSelected.link_externo && (
              <Button
                label="Ver fuente"
                icon="pi pi-external-link"
                severity="info"
                onClick={() => window.open(tickerSelected.link_externo!, '_blank')}
                className="w-fit"
              />
            )}
          </div>
        )}
      </Dialog>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        :global(.animate-fade-in) {
          animation: fadeIn 0.6s ease-out forwards;
        }
        :global(.animate-slide-up) {
          animation: slideUp 0.5s ease-out forwards;
        }
        :global(.animate-zoom-in) {
          animation: zoomIn 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
