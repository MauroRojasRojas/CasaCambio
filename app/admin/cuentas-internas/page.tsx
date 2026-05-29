'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { SelectButton } from 'primereact/selectbutton';
import { ToggleButton } from 'primereact/togglebutton';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { Divider } from 'primereact/divider';
import { cuentasInternasService, CuentaInterna } from '@/lib/services/cuentasInternasService';

const BANCOS = [
  { label: 'BCP', value: 'BCP' },
  { label: 'BBVA', value: 'BBVA' },
  { label: 'Interbank', value: 'Interbank' },
  { label: 'Scotiabank', value: 'Scotiabank' },
  { label: 'BanBif', value: 'Banbif' },
  { label: 'Pichincha', value: 'Pichincha' },
  { label: 'Banco de la Nación', value: 'Banco de la Nación' },
];

const TIPOS_CUENTA = [
  { label: 'Cuenta Corriente', value: 'Cuenta Corriente' },
  { label: 'Cuenta Ahorro', value: 'Cuenta Ahorro' },
  { label: 'Cuenta Empresarial', value: 'Cuenta Empresarial' },
];

const MONEDAS = [
  { label: 'S/ Soles (PEN)', value: 'PEN' },
  { label: '$ Dólares (USD)', value: 'USD' },
];

const BANCO_COLORS: Record<string, string> = {
  'BCP': '#FF7A00', // BCP is actually orange/blue, let's use orange
  'BBVA': '#072146',
  'Interbank': '#009939',
  'Scotiabank': '#EC111A',
  'Banbif': '#00A1DF',
  'Pichincha': '#FFDD00',
  'Banco de la Nación': '#D00010',
};

export default function CuentasInternasAdmin() {
  const [cuentas, setCuentas] = useState<CuentaInterna[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    banco: '',
    tipo_cuenta: '',
    numero_cuenta: '',
    cci: '',
    moneda: 'PEN',
    activa: true
  });

  const toast = useRef<Toast>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const loadCuentas = useCallback(async () => {
    try {
      setLoading(true);
      const data = await cuentasInternasService.getCuentasInternas();
      setCuentas(data);
    } catch (error: any) {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCuentas();
  }, [loadCuentas]);

  const resetForm = () => {
    setFormData({ banco: '', tipo_cuenta: '', numero_cuenta: '', cci: '', moneda: 'PEN', activa: true });
    setEditingId(null);
  };

  const handleEdit = (c: CuentaInterna) => {
    setFormData({
      banco: c.banco,
      tipo_cuenta: c.tipo_cuenta,
      numero_cuenta: c.numero_cuenta,
      cci: c.cci || '',
      moneda: c.moneda,
      activa: Boolean(c.activa)
    });
    setEditingId(c.id);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSave = async () => {
    if (!formData.banco || !formData.tipo_cuenta || !formData.numero_cuenta) {
      toast.current?.show({ severity: 'warn', summary: 'Validación', detail: 'Banco, Tipo y Número son obligatorios', life: 3000 });
      return;
    }
    try {
      setSaving(true);
      const dataToSave = {
        ...formData,
        activa: formData.activa ? 1 : 0
      };

      if (editingId) {
        await cuentasInternasService.updateCuenta(editingId, dataToSave as any);
        toast.current?.show({ severity: 'success', summary: 'Actualizado', detail: 'Cuenta actualizada correctamente', life: 3000 });
      } else {
        await cuentasInternasService.createCuenta(dataToSave as any);
        toast.current?.show({ severity: 'success', summary: 'Creado', detail: 'Cuenta creada correctamente', life: 3000 });
      }

      resetForm();
      await loadCuentas();
    } catch (err: any) {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: err.message || 'No se pudo guardar la cuenta', life: 3000 });
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = (id: number) => {
    setDeleteId(id);
    setShowDeleteDialog(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await cuentasInternasService.deleteCuenta(deleteId);
      toast.current?.show({ severity: 'success', summary: 'Eliminada', detail: 'Cuenta eliminada', life: 3000 });
      setShowDeleteDialog(false);
      setDeleteId(null);
      if (editingId === deleteId) resetForm();
      await loadCuentas();
    } catch (error: any) {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: error.message || 'No se pudo eliminar la cuenta', life: 3000 });
    }
  };

  const handleToggleVisible = async (id: number) => {
    try {
      await cuentasInternasService.toggleActiva(id);
      setCuentas((prev) =>
        prev.map((c) => (c.id === id ? { ...c, activa: c.activa ? 0 : 1 } : c))
      );
      toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Estado actualizado', life: 2000 });
    } catch (error: any) {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: error.message || 'No se pudo cambiar estado', life: 3000 });
    }
  };

  const renderCuentaCard = (c: CuentaInterna) => (
    <div key={c.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col h-full relative overflow-hidden group">
      {!c.activa && (
        <div className="absolute inset-0 bg-slate-50/50 backdrop-blur-[1px] z-0" />
      )}
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-3">
          <div 
            className="px-3 py-1 rounded-md text-white font-bold text-xs"
            style={{ backgroundColor: BANCO_COLORS[c.banco] || '#64748b' }}
          >
            {c.banco}
          </div>
          <div className="flex gap-2">
            <Tag 
              value={c.moneda === 'PEN' ? 'PEN S/' : 'USD $'} 
              severity={c.moneda === 'PEN' ? 'info' : 'success'} 
              className="text-xs"
            />
            <Tag 
              value={c.activa ? 'Activa' : 'Inactiva'} 
              severity={c.activa ? 'success' : 'secondary'} 
              className="text-xs"
            />
          </div>
        </div>

        <div className="mb-4 flex-1">
          <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wide">{c.tipo_cuenta}</p>
          <p className="text-xl font-bold text-slate-800 tracking-tight">{c.numero_cuenta}</p>
          <p className="text-sm text-slate-500 mt-1 font-mono">CCI: {c.cci || 'No registrado'}</p>
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
          <Button 
            icon={c.activa ? 'pi pi-eye' : 'pi pi-eye-slash'} 
            rounded text 
            severity={c.activa ? "secondary" : "warning"}
            tooltip={c.activa ? 'Desactivar' : 'Activar'}
            tooltipOptions={{ position: 'top' }}
            onClick={() => handleToggleVisible(c.id)}
          />
          <Button 
            icon="pi pi-pencil" 
            rounded text severity="info"
            tooltip="Editar" tooltipOptions={{ position: 'top' }}
            onClick={() => handleEdit(c)}
          />
          <Button 
            icon="pi pi-trash" 
            rounded text severity="danger"
            tooltip="Eliminar" tooltipOptions={{ position: 'top' }}
            onClick={() => confirmDelete(c.id)}
          />
        </div>
      </div>
    </div>
  );

  const cuentasPEN = cuentas.filter(c => c.moneda === 'PEN');
  const cuentasUSD = cuentas.filter(c => c.moneda === 'USD');

  return (
    <div className="max-w-7xl mx-auto">
      <Toast ref={toast} />

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Cuentas Internas de la Empresa</h1>
        <p className="text-gray-500 mt-1">Administra las cuentas bancarias donde los clientes realizarán los depósitos</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* LADO IZQUIERDO: FORMULARIO */}
        <div ref={formRef} className="xl:col-span-4 xl:sticky xl:top-6 xl:self-start">
          <Card title={editingId ? 'Editar cuenta bancaria' : 'Nueva cuenta bancaria'} className="shadow-md rounded-xl">
            <div className="flex flex-col gap-4">
              
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">Banco</label>
                <Dropdown 
                  value={formData.banco} 
                  onChange={(e) => setFormData({...formData, banco: e.value})} 
                  options={BANCOS} 
                  placeholder="Selecciona el banco" 
                  className="w-full"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">Tipo de Cuenta</label>
                <Dropdown 
                  value={formData.tipo_cuenta} 
                  onChange={(e) => setFormData({...formData, tipo_cuenta: e.value})} 
                  options={TIPOS_CUENTA} 
                  placeholder="Ej: Cuenta Corriente" 
                  className="w-full"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">Número de Cuenta</label>
                <InputText 
                  value={formData.numero_cuenta} 
                  onChange={(e) => setFormData({...formData, numero_cuenta: e.target.value})} 
                  placeholder="Ej: 191-12345678-0-12" 
                  className="w-full font-mono text-sm"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">Código de Cuenta Interbancario (CCI)</label>
                <InputText 
                  value={formData.cci} 
                  onChange={(e) => setFormData({...formData, cci: e.target.value})} 
                  placeholder="Opcional" 
                  className="w-full font-mono text-sm"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">Moneda</label>
                <SelectButton 
                  value={formData.moneda} 
                  onChange={(e) => e.value && setFormData({...formData, moneda: e.value})} 
                  options={MONEDAS}
                  className="w-full"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200 mt-2">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-800">Cuenta Activa</span>
                  <span className="text-xs text-gray-500">Visible para los clientes</span>
                </div>
                <ToggleButton 
                  checked={formData.activa} 
                  onChange={(e) => setFormData({...formData, activa: e.value})} 
                  onLabel="Sí" offLabel="No" 
                  onIcon="pi pi-check" offIcon="pi pi-times"
                  className="w-24"
                />
              </div>

              <Button 
                label={editingId ? 'Guardar Cambios' : 'Registrar Cuenta'} 
                icon="pi pi-save" 
                severity="success" 
                onClick={handleSave} 
                loading={saving}
                className="w-full mt-2"
              />

              {editingId && (
                <Button 
                  label="Cancelar edición" 
                  icon="pi pi-times" 
                  outlined 
                  severity="secondary" 
                  onClick={resetForm} 
                  className="w-full"
                />
              )}
            </div>
          </Card>
        </div>

        {/* LADO DERECHO: LISTA DE CUENTAS */}
        <div className="xl:col-span-8">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Cuentas registradas ({cuentas.length})</h2>
          </div>

          {loading ? (
             <div className="flex justify-center items-center h-64">
               <i className="pi pi-spin pi-spinner text-4xl text-[#0053A4]" />
             </div>
          ) : cuentas.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400 bg-white rounded-xl border border-dashed border-gray-300">
              <i className="pi pi-wallet text-6xl mb-4 text-gray-300" />
              <p className="text-lg font-medium text-gray-500">No hay cuentas registradas</p>
              <p className="text-sm">Agrega una nueva cuenta desde el formulario</p>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              
              {/* Sección PEN */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-100 text-[#0053A4] p-2 rounded-lg">
                    <i className="pi pi-money-bill text-xl"></i>
                  </div>
                  <h3 className="text-lg font-bold text-gray-700">Cuentas en Soles (PEN)</h3>
                </div>
                
                {cuentasPEN.length === 0 ? (
                  <p className="text-sm text-slate-500 italic px-4">No hay cuentas en soles registradas.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cuentasPEN.map(renderCuentaCard)}
                  </div>
                )}
              </div>

              <Divider align="center">
                <span className="text-slate-400 text-sm"><i className="pi pi-sort-alt"></i></span>
              </Divider>

              {/* Sección USD */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-100 text-green-700 p-2 rounded-lg">
                    <i className="pi pi-dollar text-xl"></i>
                  </div>
                  <h3 className="text-lg font-bold text-gray-700">Cuentas en Dólares (USD)</h3>
                </div>

                {cuentasUSD.length === 0 ? (
                  <p className="text-sm text-slate-500 italic px-4">No hay cuentas en dólares registradas.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cuentasUSD.map(renderCuentaCard)}
                  </div>
                )}
              </div>

            </div>
          )}
        </div>
      </div>

      <Dialog 
        header="Confirmar Eliminación" 
        visible={showDeleteDialog} 
        style={{ width: '450px' }} 
        modal 
        onHide={() => setShowDeleteDialog(false)}
        footer={
          <div className="flex justify-end gap-2">
            <Button label="Cancelar" icon="pi pi-times" onClick={() => setShowDeleteDialog(false)} outlined severity="secondary" />
            <Button label="Eliminar" icon="pi pi-trash" onClick={handleDelete} severity="danger" />
          </div>
        }
      >
        <div className="flex items-center gap-4">
          <i className="pi pi-exclamation-triangle text-red-500 text-3xl" />
          <p className="m-0 text-slate-700">
            ¿Estás seguro de que deseas eliminar esta cuenta bancaria? Esta acción no se puede deshacer.
          </p>
        </div>
      </Dialog>
    </div>
  );
}
