'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { ToggleButton } from 'primereact/togglebutton';
import { Tag } from 'primereact/tag';
import { bancosService } from '@/lib/services/bancosService';
import type { Banco } from '@/lib/services/bancosService';

const BANCOS_PREDEFINIDOS = [
  { nombre: 'BCP', logo: '/assets/bcp.png' },
  { nombre: 'BBVA', logo: '/assets/bbva.png' },
  { nombre: 'Pichincha', logo: '/assets/pichincha.svg' },
  { nombre: 'Banbif', logo: '/assets/banbif.png' },
  { nombre: 'Falabella', logo: '/assets/falabella.png' },
  { nombre: 'Interbank', logo: '/assets/interbank.png' },
  { nombre: 'Scotiabank', logo: '/assets/scotiabank.png' },
];

export default function BancosAdmin() {
  const [bancos, setBancos] = useState<Banco[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedBanco, setSelectedBanco] = useState<string>('');
  const [disponible, setDisponible] = useState(true);
  const [orden, setOrden] = useState(0);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const toast = useRef<Toast>(null);

  const loadBancos = useCallback(async () => {
    try {
      const data = await bancosService.getAll();
      setBancos(data);
    } catch {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los bancos', life: 3000 });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBancos();
  }, [loadBancos]);

  const selectedConfig = BANCOS_PREDEFINIDOS.find(b => b.nombre === selectedBanco);

  const handleSelectBanco = (nombre: string) => {
    setSelectedBanco(nombre);
    const existing = bancos.find(b => b.nombre === nombre);
    if (existing && existing.id) {
      setDisponible(existing.disponible === 1);
      setOrden(existing.orden);
      setEditingId(existing.id);
    } else {
      setDisponible(true);
      setOrden(0);
      setEditingId(null);
    }
  };

  const resetForm = () => {
    setSelectedBanco('');
    setDisponible(true);
    setOrden(0);
    setEditingId(null);
  };

  const handleSave = async () => {
    if (!selectedBanco) {
      toast.current?.show({ severity: 'warn', summary: 'Validación', detail: 'Selecciona un banco', life: 3000 });
      return;
    }
    const cfg = BANCOS_PREDEFINIDOS.find(b => b.nombre === selectedBanco);
    if (!cfg) return;

    try {
      setSaving(true);
      if (editingId) {
        await bancosService.update(editingId, { nombre: cfg.nombre, logo: cfg.logo, disponible, orden });
      } else {
        await bancosService.create({ nombre: cfg.nombre, logo: cfg.logo, disponible, orden, visible: true });
      }
      toast.current?.show({ severity: 'success', summary: 'Guardado', detail: 'Banco guardado correctamente', life: 3000 });
      resetForm();
      await loadBancos();
    } catch (err: any) {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: err.message || 'No se pudo guardar', life: 5000 });
    } finally {
      setSaving(false);
    }
  };

  const handleToggleVisible = async (id: number) => {
    try {
      await bancosService.toggleVisible(id);
      setBancos(prev => prev.map(b => b.id === id ? { ...b, visible: b.visible ? 0 : 1 } : b));
    } catch {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudo cambiar visibilidad', life: 3000 });
    }
  };

  const handleToggleDisponible = async (id: number) => {
    try {
      await bancosService.toggleDisponible(id);
      setBancos(prev => prev.map(b => b.id === id ? { ...b, disponible: b.disponible ? 0 : 1 } : b));
    } catch {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudo cambiar disponibilidad', life: 3000 });
    }
  };

  const confirmDelete = (id: number) => {
    setDeleteId(id);
    setShowDeleteDialog(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await bancosService.delete(deleteId);
      toast.current?.show({ severity: 'success', summary: 'Eliminado', detail: 'Banco eliminado', life: 3000 });
      setShowDeleteDialog(false);
      setDeleteId(null);
      if (editingId === deleteId) resetForm();
      await loadBancos();
    } catch {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar', life: 3000 });
    }
  };

  const configuradosCount = bancos.filter(b => b.id !== null).length;

  return (
    <div className="max-w-7xl mx-auto">
      <Toast ref={toast} />

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Bancos</h1>
        <p className="text-gray-500 mt-1">Administra los bancos que aparecen en el hero del sitio</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* FORMULARIO */}
        <div className="xl:col-span-2 xl:sticky xl:top-6 xl:self-start">
          <Card title="Agregar / editar banco">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Banco</label>
                <Dropdown
                  value={selectedBanco}
                  onChange={(e) => handleSelectBanco(e.value)}
                  options={BANCOS_PREDEFINIDOS}
                  optionLabel="nombre"
                  placeholder="Selecciona un banco"
                  className="w-full"
                  itemTemplate={(option) => (
                    <div className="flex items-center gap-3">
                      <img src={option.logo} alt={option.nombre} className="h-6 w-auto object-contain" />
                      <span>{option.nombre}</span>
                    </div>
                  )}
                  valueTemplate={selectedConfig ? (
                    <div className="flex items-center gap-3">
                      <img src={selectedConfig.logo} alt={selectedConfig.nombre} className="h-6 w-auto object-contain" />
                      <span>{selectedConfig.nombre}</span>
                    </div>
                  ) : undefined}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Orden</label>
                <InputNumber
                  value={orden}
                  onValueChange={(e) => setOrden(e.value ?? 0)}
                  min={0}
                  className="w-full"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Disponible</label>
                <ToggleButton
                  onLabel="Sí"
                  offLabel="No"
                  onIcon="pi pi-check"
                  offIcon="pi pi-times"
                  checked={disponible}
                  onChange={(e) => setDisponible(e.value)}
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

        {/* LISTA */}
        <div className="xl:col-span-3">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Bancos configurados ({configuradosCount}) / {BANCOS_PREDEFINIDOS.length}
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <i className="pi pi-spin pi-spinner text-4xl text-blue-500" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BANCOS_PREDEFINIDOS.map((cfg) => {
                const existing = bancos.find(b => b.nombre === cfg.nombre);
                const isConfigured = existing && existing.id !== null;

                if (!isConfigured) {
                  return (
                    <div
                      key={cfg.nombre}
                      className="bg-gray-100 rounded-xl border border-dashed border-gray-300 p-4 flex flex-col items-center justify-center min-h-[140px] cursor-pointer hover:bg-gray-200 transition-colors"
                      onClick={() => handleSelectBanco(cfg.nombre)}
                    >
                      <img src={cfg.logo} alt={cfg.nombre} className="h-8 w-auto object-contain opacity-50" />
                      <p className="text-sm font-semibold text-gray-500 mt-2">+ Agregar {cfg.nombre}</p>
                    </div>
                  );
                }

                const banco = existing!;

                return (
                  <div
                    key={banco.id}
                    className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gray-50 border border-slate-200 flex items-center justify-center p-1 shrink-0">
                        <img src={cfg.logo} alt={cfg.nombre} className="max-w-full max-h-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-800 text-sm">{cfg.nombre}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Tag
                            value={banco.disponible ? 'Disponible' : 'No disponible'}
                            severity={banco.disponible ? 'info' : 'warning'}
                          />
                          <span className="text-xs text-gray-400">Pos. {banco.orden}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          icon={banco.visible ? 'pi pi-eye' : 'pi pi-eye-slash'}
                          rounded
                          text
                          severity={banco.visible ? 'secondary' : 'contrast'}
                          tooltip={banco.visible ? 'Ocultar' : 'Mostrar'}
                          tooltipOptions={{ position: 'top' }}
                          onClick={() => handleToggleVisible(banco.id)}
                        />
                        <Button
                          icon="pi pi-pencil"
                          rounded
                          text
                          severity="info"
                          tooltip="Editar"
                          tooltipOptions={{ position: 'top' }}
                          onClick={() => handleSelectBanco(cfg.nombre)}
                        />
                        <Button
                          icon="pi pi-trash"
                          rounded
                          text
                          severity="danger"
                          tooltip="Eliminar"
                          tooltipOptions={{ position: 'top' }}
                          onClick={() => confirmDelete(banco.id)}
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
        header="Eliminar banco"
        visible={showDeleteDialog}
        onHide={() => setShowDeleteDialog(false)}
        style={{ width: '420px' }}
        draggable={false}
        footer={
          <div className="flex justify-end gap-2">
            <Button label="Cancelar" icon="pi pi-times" onClick={() => setShowDeleteDialog(false)} outlined severity="secondary" />
            <Button label="Eliminar" icon="pi pi-trash" onClick={handleDelete} severity="danger" />
          </div>
        }
      >
        <div className="flex items-start gap-3">
          <i className="pi pi-exclamation-triangle text-2xl text-red-500 mt-1" />
          <div>
            <p className="text-gray-700 font-medium">¿Eliminar este banco?</p>
            <p className="text-sm text-gray-500 mt-1">Esta acción no se puede deshacer.</p>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
