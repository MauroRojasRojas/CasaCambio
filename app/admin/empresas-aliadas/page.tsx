'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { InputText } from 'primereact/inputtext';
import { ToggleButton } from 'primereact/togglebutton';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Tag } from 'primereact/tag';
import {
  getEmpresas,
  createEmpresa,
  updateEmpresa,
  deleteEmpresa,
  toggleActivaEmpresa,
  buildLogoUrl,
  EmpresaAliada,
} from '@/lib/services/empresasAliadasService';

export default function EmpresasAliadasAdmin() {
  const [empresas, setEmpresas] = useState<EmpresaAliada[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form state
  const [nombre, setNombre] = useState('');
  const [urlWeb, setUrlWeb] = useState('');
  const [activa, setActiva] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [currentLogoUrl, setCurrentLogoUrl] = useState<string | null>(null);

  // Delete dialog
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const toast = useRef<Toast>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const loadEmpresas = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getEmpresas();
      setEmpresas(data);
    } catch (err: any) {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: err.message, life: 3000 });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadEmpresas(); }, [loadEmpresas]);

  const resetForm = () => {
    setNombre('');
    setUrlWeb('');
    setActiva(true);
    setSelectedFile(null);
    setPreviewUrl(null);
    setCurrentLogoUrl(null);
    setEditingId(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.current?.show({ severity: 'warn', summary: 'Archivo muy grande', detail: 'El logo no puede superar 2MB', life: 3000 });
      return;
    }
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleEdit = (emp: EmpresaAliada) => {
    setEditingId(emp.id);
    setNombre(emp.nombre);
    setUrlWeb(emp.url_web || '');
    setActiva(Boolean(emp.activa));
    setSelectedFile(null);
    setPreviewUrl(null);
    setCurrentLogoUrl(buildLogoUrl(emp.logo_url));
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSave = async () => {
    if (!nombre.trim()) {
      toast.current?.show({ severity: 'warn', summary: 'Validación', detail: 'El nombre es obligatorio', life: 3000 });
      return;
    }
    if (!editingId && !selectedFile) {
      toast.current?.show({ severity: 'warn', summary: 'Validación', detail: 'Debes seleccionar un logo', life: 3000 });
      return;
    }

    try {
      setSaving(true);
      const fd = new FormData();
      fd.append('nombre', nombre.trim());
      fd.append('url_web', urlWeb.trim());
      fd.append('activa', activa ? '1' : '0');
      if (selectedFile) fd.append('logo', selectedFile);

      if (editingId) {
        await updateEmpresa(editingId, fd);
        toast.current?.show({ severity: 'success', summary: 'Actualizado', detail: 'Empresa actualizada correctamente', life: 3000 });
      } else {
        await createEmpresa(fd);
        toast.current?.show({ severity: 'success', summary: 'Creado', detail: 'Empresa aliada registrada', life: 3000 });
      }
      resetForm();
      await loadEmpresas();
    } catch (err: any) {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: err.message || 'No se pudo guardar', life: 4000 });
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = (id: number) => { setDeleteId(id); setShowDeleteDialog(true); };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteEmpresa(deleteId);
      toast.current?.show({ severity: 'success', summary: 'Eliminado', detail: 'Empresa eliminada', life: 3000 });
      setShowDeleteDialog(false);
      setDeleteId(null);
      if (editingId === deleteId) resetForm();
      await loadEmpresas();
    } catch (err: any) {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: err.message, life: 3000 });
    }
  };

  const handleToggle = async (id: number) => {
    try {
      await toggleActivaEmpresa(id);
      setEmpresas(prev => prev.map(e => e.id === id ? { ...e, activa: e.activa ? 0 : 1 } : e));
    } catch (err: any) {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: err.message, life: 3000 });
    }
  };

  const displayLogo = previewUrl || currentLogoUrl;

  return (
    <div className="max-w-7xl mx-auto">
      <Toast ref={toast} />

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#02254A]">Empresas Aliadas</h1>
        <p className="text-slate-500 mt-1 text-sm">Gestiona los logos que aparecen en la página principal</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">

        {/* ─── FORMULARIO ─── */}
        <div ref={formRef} className="xl:col-span-4 xl:sticky xl:top-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-[#02254A] mb-5">
              {editingId ? 'Editar empresa' : 'Nueva empresa aliada'}
            </h2>

            {/* Logo picker */}
            <div className="mb-5">
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Logo</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative w-full h-28 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center cursor-pointer hover:border-[#0053A4] hover:bg-blue-50 transition-all group overflow-hidden"
              >
                {displayLogo ? (
                  <>
                    <img src={displayLogo} alt="preview" className="max-h-20 max-w-[140px] object-contain" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <i className="pi pi-camera text-white text-2xl" />
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center text-slate-400 group-hover:text-[#0053A4] transition-colors">
                    <i className="pi pi-image text-4xl mb-2" />
                    <span className="text-sm font-medium">Haz clic para subir logo</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-1.5 text-center">PNG, JPG, SVG, WEBP · Máx. 2MB</p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png,.webp,.svg"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            {/* Nombre */}
            <div className="flex flex-col gap-1 mb-4">
              <label className="text-sm font-semibold text-slate-700">Nombre de la empresa</label>
              <InputText
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                placeholder="Ej: Banco Continental"
                className="w-full"
              />
            </div>

            {/* URL web */}
            <div className="flex flex-col gap-1 mb-4">
              <label className="text-sm font-semibold text-slate-700">URL web</label>
              <InputText
                value={urlWeb}
                onChange={e => setUrlWeb(e.target.value)}
                placeholder="https://empresa.com"
                className="w-full"
              />
              <p className="text-xs text-slate-400">Dejar vacío si no tiene web</p>
            </div>

            {/* Toggle activa */}
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 mb-5">
              <div>
                <p className="text-sm font-semibold text-slate-800">Mostrar en web</p>
                <p className="text-xs text-slate-500">Visible en la página principal</p>
              </div>
              <ToggleButton
                checked={activa}
                onChange={e => setActiva(e.value)}
                onLabel="Sí" offLabel="No"
                onIcon="pi pi-check" offIcon="pi pi-times"
                className="w-20"
              />
            </div>

            <Button
              label={editingId ? 'Guardar cambios' : 'Registrar empresa'}
              icon="pi pi-save"
              severity="success"
              onClick={handleSave}
              loading={saving}
              className="w-full"
            />
            {editingId && (
              <Button
                label="Cancelar edición"
                icon="pi pi-times"
                outlined severity="secondary"
                onClick={resetForm}
                className="w-full mt-2"
              />
            )}
          </div>
        </div>

        {/* ─── LISTA ─── */}
        <div className="xl:col-span-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-800">
              Empresas registradas <span className="text-[#0053A4]">({empresas.length})</span>
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <i className="pi pi-spin pi-spinner text-4xl text-[#0053A4]" />
            </div>
          ) : empresas.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl border border-dashed border-slate-300 text-slate-400">
              <i className="pi pi-building text-6xl mb-4 text-slate-300" />
              <p className="text-lg font-medium text-slate-500">No hay empresas aliadas</p>
              <p className="text-sm">Agrega la primera desde el formulario</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {empresas.map(emp => (
                <div
                  key={emp.id}
                  className={`bg-white rounded-2xl border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col ${!emp.activa ? 'opacity-60' : ''}`}
                >
                  {/* Logo area */}
                  <div className="bg-slate-50 flex items-center justify-center h-28 border-b border-slate-100 px-4">
                    <img
                      src={buildLogoUrl(emp.logo_url)}
                      alt={emp.nombre}
                      className="max-h-20 max-w-[140px] object-contain"
                      onError={e => { (e.target as HTMLImageElement).src = '/icons/logogo.png'; }}
                    />
                  </div>

                  {/* Info */}
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-bold text-[#02254A] text-base leading-tight">{emp.nombre}</h3>
                      <Tag
                        value={emp.activa ? 'Visible' : 'Oculta'}
                        severity={emp.activa ? 'success' : 'secondary'}
                        className="text-xs flex-shrink-0"
                      />
                    </div>

                    {emp.url_web ? (
                      <a
                        href={emp.url_web}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#0053A4] hover:underline truncate block mb-3"
                      >
                        {emp.url_web}
                      </a>
                    ) : (
                      <p className="text-xs text-slate-400 mb-3">Sin web</p>
                    )}

                    {/* Actions */}
                    <div className="flex justify-end gap-1 mt-auto pt-2 border-t border-slate-100">
                      <Button
                        icon={emp.activa ? 'pi pi-eye' : 'pi pi-eye-slash'}
                        rounded text
                        severity={emp.activa ? 'secondary' : 'warning'}
                        tooltip={emp.activa ? 'Ocultar' : 'Mostrar'}
                        tooltipOptions={{ position: 'top' }}
                        onClick={() => handleToggle(emp.id)}
                      />
                      <Button
                        icon="pi pi-pencil"
                        rounded text severity="info"
                        tooltip="Editar"
                        tooltipOptions={{ position: 'top' }}
                        onClick={() => handleEdit(emp)}
                      />
                      <Button
                        icon="pi pi-trash"
                        rounded text severity="danger"
                        tooltip="Eliminar"
                        tooltipOptions={{ position: 'top' }}
                        onClick={() => confirmDelete(emp.id)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete dialog */}
      <Dialog
        header="Confirmar eliminación"
        visible={showDeleteDialog}
        style={{ width: '440px' }}
        modal
        onHide={() => setShowDeleteDialog(false)}
        footer={
          <div className="flex justify-end gap-2">
            <Button label="Cancelar" icon="pi pi-times" outlined severity="secondary" onClick={() => setShowDeleteDialog(false)} />
            <Button label="Eliminar" icon="pi pi-trash" severity="danger" onClick={handleDelete} />
          </div>
        }
      >
        <div className="flex items-center gap-4 py-2">
          <i className="pi pi-exclamation-triangle text-red-500 text-3xl" />
          <p className="text-slate-700 m-0">¿Eliminar esta empresa aliada? Esta acción no se puede deshacer.</p>
        </div>
      </Dialog>
    </div>
  );
}
