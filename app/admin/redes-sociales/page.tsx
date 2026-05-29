'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { ToggleButton } from 'primereact/togglebutton';
import { Badge } from 'primereact/badge';
import { redesSocialesService } from '@/lib/services/redesSocialesService';
import type { RedSocial } from '@/lib/services/redesSocialesService';

const REDES_CONFIG: {
  value: string;
  label: string;
  color: string;
  path: string;
  placeholder: string;
}[] = [
  { value: 'Instagram', label: 'Instagram', color: '#E1306C', path: 'M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077', placeholder: 'https://instagram.com/tuusuario' },
  { value: 'TikTok', label: 'TikTok', color: '#000000', path: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z', placeholder: 'https://tiktok.com/@tuusuario' },
  { value: 'Facebook', label: 'Facebook', color: '#1877F2', path: 'M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z', placeholder: 'https://facebook.com/tuusuario' },
  { value: 'Twitter', label: 'Twitter / X', color: '#1DA1F2', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z', placeholder: 'https://twitter.com/tuusuario' },
  { value: 'YouTube', label: 'YouTube', color: '#FF0000', path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z', placeholder: 'https://youtube.com/@tucanal' },
  { value: 'LinkedIn', label: 'LinkedIn', color: '#0A66C2', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z', placeholder: 'https://linkedin.com/company/tuempresa' },
  { value: 'WhatsApp', label: 'WhatsApp', color: '#25D366', path: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z', placeholder: 'https://wa.me/51XXXXXXXXX' },
  { value: 'Telegram', label: 'Telegram', color: '#2AABEE', path: 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z', placeholder: 'https://t.me/tuusuario' },
];

function FlaticonIcon({ path, color, size }: { path: string; color: string; size?: number }) {
  const s = size ?? 20;
  const circle = Math.round(s * 1.6);
  return (
    <div
      className='rounded-full flex items-center justify-center shrink-0'
      style={{ width: circle, height: circle, backgroundColor: color }}
    >
      <svg viewBox="0 0 24 24" width={s} height={s} fill="#ffffff">
        <path d={path} />
      </svg>
    </div>
  );
}

export default function RedesSocialesAdmin() {
  const [redes, setRedes] = useState<RedSocial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedRed, setSelectedRed] = useState<string>('');
  const [url, setUrl] = useState('');
  const [orden, setOrden] = useState<number>(0);
  const [activa, setActiva] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const toast = useRef<Toast>(null);

  const loadRedes = useCallback(async () => {
    try {
      const data = await redesSocialesService.getRedes();
      setRedes(data);
    } catch {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar las redes sociales', life: 3000 });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRedes();
  }, [loadRedes]);

  const selectedConfig = REDES_CONFIG.find(r => r.value === selectedRed);

  const handleSelectRed = (value: string) => {
    setSelectedRed(value);
    const existing = redes.find(r => r.red === value);
    if (existing && existing.id) {
      setUrl(existing.url);
      setOrden(existing.orden);
      setActiva(existing.activa === 1);
      setEditingId(existing.id);
    } else {
      setUrl('');
      setOrden(0);
      setActiva(true);
      setEditingId(null);
    }
  };

  const resetForm = () => {
    setSelectedRed('');
    setUrl('');
    setOrden(0);
    setActiva(true);
    setEditingId(null);
  };

  const handleSave = async () => {
    if (!selectedRed) {
      toast.current?.show({ severity: 'warn', summary: 'Validación', detail: 'Selecciona una red social', life: 3000 });
      return;
    }
    if (!url.trim()) {
      toast.current?.show({ severity: 'warn', summary: 'Validación', detail: 'La URL es obligatoria', life: 3000 });
      return;
    }
    try {
      setSaving(true);
      await redesSocialesService.upsertRed({ red: selectedRed, url: url.trim(), activa, orden });
      toast.current?.show({ severity: 'success', summary: 'Guardado', detail: 'Red social guardada correctamente', life: 3000 });
      resetForm();
      await loadRedes();
    } catch (err: any) {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: err.message || 'No se pudo guardar', life: 5000 });
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActiva = async (id: number) => {
    try {
      await redesSocialesService.toggleActiva(id);
      setRedes(prev => prev.map(r => r.id === id ? { ...r, activa: r.activa ? 0 : 1 } : r));
    } catch {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudo cambiar el estado', life: 3000 });
    }
  };

  const confirmDelete = (id: number) => {
    setDeleteId(id);
    setShowDeleteDialog(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await redesSocialesService.deleteRed(deleteId);
      toast.current?.show({ severity: 'success', summary: 'Eliminada', detail: 'Red social eliminada', life: 3000 });
      setShowDeleteDialog(false);
      setDeleteId(null);
      if (editingId === deleteId) resetForm();
      await loadRedes();
    } catch {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar', life: 3000 });
    }
  };

  const configuradasCount = redes.filter(r => r.id !== null).length;

  return (
    <div className="max-w-7xl mx-auto">
      <Toast ref={toast} />

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Redes Sociales</h1>
        <p className="text-gray-500 mt-1">Administra las redes sociales que aparecen en el footer del sitio</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* === COLUMNA IZQUIERDA: FORMULARIO === */}
        <div className="xl:col-span-2 xl:sticky xl:top-6 xl:self-start">
          <Card title="Agregar / editar red social">
            <div className="flex flex-col gap-5">
              {/* Red social dropdown */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Red social</label>
                <Dropdown
                  value={selectedRed}
                  onChange={(e) => handleSelectRed(e.value)}
                  options={REDES_CONFIG}
                  placeholder="Selecciona una red"
                  className="w-full"
                  itemTemplate={(option) => (
                    <div className="flex items-center gap-3">
                      <FlaticonIcon path={option.path} color={option.color} size={16} />
                      <span>{option.label}</span>
                    </div>
                  )}
                  valueTemplate={selectedConfig ? (
                    <div className="flex items-center gap-3">
                      <FlaticonIcon path={selectedConfig.path} color={selectedConfig.color} size={16} />
                      <span>{selectedConfig.label}</span>
                    </div>
                  ) : undefined}
                />
              </div>

              {/* URL */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">URL</label>
                <InputText
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder={selectedConfig?.placeholder ?? 'https://...'}
                  className="w-full"
                />
              </div>

              {/* Orden */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Orden</label>
                <InputNumber
                  value={orden}
                  onValueChange={(e) => setOrden(e.value ?? 0)}
                  min={0}
                  className="w-full"
                />
              </div>

              {/* Activa */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Activa</label>
                <ToggleButton
                  onLabel="Sí"
                  offLabel="No"
                  onIcon="pi pi-check"
                  offIcon="pi pi-times"
                  checked={activa}
                  onChange={(e) => setActiva(e.value)}
                  className="w-full"
                />
              </div>

              <Button
                label="Guardar"
                icon="pi pi-save"
                onClick={handleSave}
                loading={saving}
                className="w-full"
                severity="success"
              />

              {editingId && (
                <Button
                  label="Cancelar"
                  icon="pi pi-times"
                  onClick={resetForm}
                  className="w-full"
                  outlined
                  severity="secondary"
                />
              )}
            </div>
          </Card>
        </div>

        {/* === COLUMNA DERECHA: LISTA === */}
        <div className="xl:col-span-3">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Redes configuradas ({configuradasCount}) / 8
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <i className="pi pi-spin pi-spinner text-4xl text-blue-500" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {REDES_CONFIG.map((cfg) => {
                const existing = redes.find(r => r.red === cfg.value);
                const isConfigured = existing && existing.id !== null;

                if (!isConfigured) {
                  return (
                    <div
                      key={cfg.value}
                      className="bg-gray-100 rounded-xl border border-dashed border-gray-300 p-4 flex flex-col items-center justify-center min-h-[140px] cursor-pointer hover:bg-gray-200 transition-colors"
                      onClick={() => handleSelectRed(cfg.value)}
                    >
                      <FlaticonIcon path={cfg.path} color={cfg.color} size={24} />
                      <p className="text-sm font-semibold text-gray-500 mt-2">+ Agregar {cfg.label}</p>
                    </div>
                  );
                }

                const red = existing!;
                const truncatedUrl = red.url.length > 30 ? red.url.substring(0, 30) + '...' : red.url;

                return (
                  <div
                    key={red.id}
                    className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <FlaticonIcon path={cfg.path} color={cfg.color} size={22} />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-800 text-sm">{cfg.label}</p>
                        <p className="text-xs text-blue-500 truncate">{truncatedUrl}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge
                            value={red.activa ? 'Activa' : 'Inactiva'}
                            severity={red.activa ? 'success' : 'secondary'}
                          />
                          <span className="text-xs text-gray-400">Pos. {red.orden}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <Button
                          icon={red.activa ? 'pi pi-eye' : 'pi pi-eye-slash'}
                          rounded
                          text
                          severity="secondary"
                          tooltip={red.activa ? 'Desactivar' : 'Activar'}
                          tooltipOptions={{ position: 'top' }}
                          onClick={() => handleToggleActiva(red.id!)}
                        />
                        <Button
                          icon="pi pi-trash"
                          rounded
                          text
                          severity="danger"
                          tooltip="Eliminar"
                          tooltipOptions={{ position: 'top' }}
                          onClick={() => confirmDelete(red.id!)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Dialog
        header="Eliminar red social"
        visible={showDeleteDialog}
        onHide={() => setShowDeleteDialog(false)}
        style={{ width: '420px' }}
        draggable={false}
        footer={
          <div className="flex justify-end gap-2">
            <Button
              label="Cancelar"
              icon="pi pi-times"
              onClick={() => setShowDeleteDialog(false)}
              outlined
              severity="secondary"
            />
            <Button
              label="Eliminar"
              icon="pi pi-trash"
              onClick={handleDelete}
              severity="danger"
            />
          </div>
        }
      >
        <div className="flex items-start gap-3">
          <i className="pi pi-exclamation-triangle text-2xl text-red-500 mt-1" />
          <div>
            <p className="text-gray-700 font-medium">¿Eliminar esta red social?</p>
            <p className="text-sm text-gray-500 mt-1">
              Esta acción no se puede deshacer. La red social se eliminará permanentemente.
            </p>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
