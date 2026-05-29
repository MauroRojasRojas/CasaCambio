'use client';

import React, { useState, useCallback, useRef } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { API_BASE_URL } from '@/lib/utils/constants';

interface OperacionRow {
  id: number;
  cliente: string;
  documento: string;
  telefono: string;
  correo: string;
  codigoOperacion: string;
  numeroCuenta: string;
  tasaCambio: number;
  tipoOperacion: string;
  montoEnviado: number;
  monedaEnviada: string;
  montoRecibido: number;
  monedaRecibida: string;
  fechaEmision: string;
  estado: string;
}

interface ExportExcelButtonProps {
  operaciones: OperacionRow[];
  desde: string;
  hasta: string;
  estados: string[];
  label?: string;
}

const ExportExcelButton: React.FC<ExportExcelButtonProps> = ({
  operaciones,
  desde,
  hasta,
  estados,
  label,
}) => {
  const toast = useRef<Toast>(null);
  const [loading, setLoading] = useState(false);

  const exportToExcel = useCallback(async () => {
    if (operaciones.length === 0) {
      toast.current?.show({ severity: 'warn', summary: 'Sin datos', detail: 'No hay operaciones para exportar', life: 3000 });
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams();
      if (desde) params.append('desde', desde);
      if (hasta) params.append('hasta', hasta);
      if (estados && estados.length > 0) params.append('estados', estados.join(','));

      const response = await fetch(`${API_BASE_URL}/operaciones/admin/export?${params.toString()}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const now = new Date();
      const pad = (n: number) => n.toString().padStart(2, '0');
      const ts = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;
      a.download = `REPORTE_OPERACIONES_${ts}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast.current?.show({ severity: 'success', summary: 'Exportado', detail: 'Excel descargado correctamente', life: 3000 });
    } catch (err) {
      console.error('Error al exportar Excel:', err);
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudo exportar el Excel. Verifica la conexión con el servidor.', life: 5000 });
    } finally {
      setLoading(false);
    }
  }, [operaciones, desde, hasta, estados]);

  return (
    <>
      <Toast ref={toast} />
      <Button
        label={label ?? 'Exportar Excel'}
        icon='pi pi-file-excel'
        onClick={exportToExcel}
        loading={loading}
        disabled={operaciones.length === 0}
        className='p-button-sm p-button-success'
      />
    </>
  );
};

export default ExportExcelButton;
