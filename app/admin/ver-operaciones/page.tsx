'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { obtenerOperacionesAdmin, obtenerEstadisticas, actualizarEstadoOperacion } from '@/lib/services/operacionService';
import ExportExcelButton from '@/components/ExportExcelButton';

const ESTADOS = ['PENDIENTE', 'TRANSFERIDO', 'RECHAZADO'];

interface OperacionAdmin {
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

interface Estadistica {
	periodo: string;
	totalOperaciones: number;
	totalCompraUSD: number;
	totalVentaPEN: number;
	totalEnviado: number;
	totalRecibido: number;
}

type Periodo = 'hoy' | 'ayer' | 'semana' | 'mes' | 'personalizado';

const PERIODOS: { value: Periodo; label: string }[] = [
	{ value: 'hoy', label: 'Hoy' },
	{ value: 'ayer', label: 'Ayer' },
	{ value: 'semana', label: 'Esta semana' },
	{ value: 'mes', label: 'Este mes' },
	{ value: 'personalizado', label: 'Rango personalizado' },
];

function getDateRange(periodo: Periodo): { desde: string; hasta: string } {
	const now = new Date();
	const y = now.getFullYear();
	const m = String(now.getMonth() + 1).padStart(2, '0');
	const d = String(now.getDate()).padStart(2, '0');
	const today = `${y}-${m}-${d}`;

	switch (periodo) {
		case 'hoy':
			return { desde: `${today} 00:00:00`, hasta: `${today} 23:59:59` };
		case 'ayer': {
			const ayer = new Date(now);
			ayer.setDate(ayer.getDate() - 1);
			const ay = ayer.getFullYear();
			const am = String(ayer.getMonth() + 1).padStart(2, '0');
			const ad = String(ayer.getDate()).padStart(2, '0');
			const ayerStr = `${ay}-${am}-${ad}`;
			return { desde: `${ayerStr} 00:00:00`, hasta: `${ayerStr} 23:59:59` };
		}
		case 'semana': {
			const inicio = new Date(now);
			inicio.setDate(inicio.getDate() - inicio.getDay());
			const iy = inicio.getFullYear();
			const im = String(inicio.getMonth() + 1).padStart(2, '0');
			const id = String(inicio.getDate()).padStart(2, '0');
			return { desde: `${iy}-${im}-${id} 00:00:00`, hasta: `${today} 23:59:59` };
		}
		case 'mes':
			return { desde: `${y}-${m}-01 00:00:00`, hasta: `${today} 23:59:59` };
		default:
			return { desde: `${today} 00:00:00`, hasta: `${today} 23:59:59` };
	}
}

export default function VerOperaciones() {
	const toast = useRef<Toast>(null);
	const [operaciones, setOperaciones] = useState<OperacionAdmin[]>([]);
	const [estadisticas, setEstadisticas] = useState<Estadistica[]>([]);
	const [periodo, setPeriodo] = useState<Periodo>('hoy');
	const [fechaDesde, setFechaDesde] = useState<Date>(new Date());
	const [fechaHasta, setFechaHasta] = useState<Date>(new Date());
	const [estados, setEstados] = useState<string[]>(['TRANSFERIDO']);
	const [loading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');

	const [desdeStr, setDesdeStr] = useState('');
	const [hastaStr, setHastaStr] = useState('');

	const [filters, setFilters] = useState({
		global: { value: null as string | null, matchMode: FilterMatchMode.CONTAINS },
	});
	const [globalFilterValue, setGlobalFilterValue] = useState('');

	const cargarDatos = useCallback(async () => {
		setLoading(true);
		setErrorMsg('');
		let desde: string, hasta: string;
		if (periodo === 'personalizado') {
			const d = fechaDesde ? `${fechaDesde.getFullYear()}-${String(fechaDesde.getMonth() + 1).padStart(2, '0')}-${String(fechaDesde.getDate()).padStart(2, '0')} 00:00:00` : '';
			const h = fechaHasta ? `${fechaHasta.getFullYear()}-${String(fechaHasta.getMonth() + 1).padStart(2, '0')}-${String(fechaHasta.getDate()).padStart(2, '0')} 23:59:59` : '';
			desde = d;
			hasta = h;
		} else {
			const range = getDateRange(periodo);
			desde = range.desde;
			hasta = range.hasta;
		}
		setDesdeStr(desde);
		setHastaStr(hasta);

		try {
			const opsRes = await obtenerOperacionesAdmin(desde, hasta, estados);
			if (opsRes.ok) {
				const json = await opsRes.json();
				setOperaciones(Array.isArray(json.message) ? json.message : []);
			} else {
				const json = await opsRes.json().catch(() => ({}));
				setErrorMsg(json.message || 'Error al cargar operaciones');
			}
		} catch (error) {
			setErrorMsg('Error de conexión al cargar operaciones');
		}

		try {
			const statsRes = await obtenerEstadisticas(desde, hasta, 'dia');
			if (statsRes.ok) {
				const json = await statsRes.json();
				setEstadisticas(Array.isArray(json.message) ? json.message : []);
			}
		} catch (error) {
			// estadísticas no críticas
		}

		setLoading(false);
	}, [periodo, fechaDesde, fechaHasta, estados]);

	useEffect(() => {
		cargarDatos();
	}, [cargarDatos]);

	const n = (v: unknown): number => {
		if (typeof v === 'number') return v;
		if (typeof v === 'string') return parseFloat(v) || 0;
		return 0;
	};

	const totalOperaciones = estadisticas.reduce((sum, s) => sum + n(s.totalOperaciones), 0);
	const totalCompraUSD = estadisticas.reduce((sum, s) => sum + n(s.totalCompraUSD), 0);
	const totalVentaPEN = estadisticas.reduce((sum, s) => sum + n(s.totalVentaPEN), 0);

	const getSeverity = (estado: string) => {
		switch (estado) {
			case 'TRANSFERIDO':
				return 'success';
			case 'PENDIENTE':
				return 'warning';
			case 'RECHAZADO':
				return 'danger';
			default:
				return null;
		}
	};

	const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setFilters((prev) => ({ ...prev, global: { ...prev.global, value } }));
		setGlobalFilterValue(value);
	};

	const renderHeader = () => (
		<div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2'>
			<div className='w-full sm:w-auto flex-1 min-w-0'>
				<IconField iconPosition='left' className='w-full'>
					<InputIcon className='pi pi-search' />
					<InputText className='w-full' value={globalFilterValue} onChange={onGlobalFilterChange} placeholder='Buscar...' />
				</IconField>
			</div>
		</div>
	);

	const cambiarEstado = async (rowData: OperacionAdmin, nuevoEstado: string) => {
		if (nuevoEstado === rowData.estado) return;
		try {
			const res = await actualizarEstadoOperacion(rowData.codigoOperacion, nuevoEstado);
			if (res.ok) {
				setOperaciones((prev) =>
					prev.map((op) => (op.codigoOperacion === rowData.codigoOperacion ? { ...op, estado: nuevoEstado } : op))
				);
				toast.current?.show({ severity: 'success', summary: 'Actualizado', detail: `Estado cambiado a ${nuevoEstado}`, life: 2000 });
			} else {
				toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el estado', life: 3000 });
			}
		} catch {
			toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Error de conexión', life: 3000 });
		}
	};

	const estadoBodyTemplate = (rowData: OperacionAdmin) => (
		<Dropdown
			value={rowData.estado}
			options={ESTADOS}
			onChange={(e) => cambiarEstado(rowData, e.value)}
			className='p-column-filter'
			style={{ minWidth: '10rem' }}
		/>
	);

	const fechaBodyTemplate = (rowData: OperacionAdmin) => {
		if (!rowData.fechaEmision) return '-';
		try {
			return new Date(rowData.fechaEmision).toLocaleDateString('es-ES', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric',
			});
		} catch {
			return '-';
		}
	};

	const montoBodyTemplate = (valor: unknown, moneda: string) =>
		`${moneda === 'PEN' ? 'S/' : '$'} ${n(valor).toFixed(2)}`;

	return (
		<div className='flex flex-col gap-6 px-4'>
			<Toast ref={toast} />
			<h1 className='text-3xl font-bold text-[#02254A]'>Ver operaciones</h1>

			{errorMsg && (
				<div className='bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm'>
					{errorMsg}
				</div>
			)}

			{/* FILTROS */}
			<div className='bg-white rounded-lg shadow-sm border border-slate-200 p-4'>
				<div className='flex flex-col sm:flex-row items-start sm:items-end gap-4'>
					<div className='flex flex-col gap-1'>
						<label className='text-xs font-semibold text-slate-500'>PERIODO</label>
						<Dropdown
							value={periodo}
							options={PERIODOS}
							onChange={(e) => setPeriodo(e.value)}
							className='w-44'
						/>
					</div>
					{periodo === 'personalizado' && (
						<>
							<div className='flex flex-col gap-1'>
								<label className='text-xs font-semibold text-slate-500'>DESDE</label>
								<Calendar value={fechaDesde} onChange={(e) => setFechaDesde(e.value as Date)} dateFormat='dd/mm/yy' />
							</div>
							<div className='flex flex-col gap-1'>
								<label className='text-xs font-semibold text-slate-500'>HASTA</label>
								<Calendar value={fechaHasta} onChange={(e) => setFechaHasta(e.value as Date)} dateFormat='dd/mm/yy' />
							</div>
						</>
					)}
					<div className='flex flex-col gap-1'>
						<label className='text-xs font-semibold text-slate-500'>ESTADO</label>
						<MultiSelect
							value={estados}
							options={ESTADOS}
							onChange={(e) => setEstados(e.value)}
							className='w-56'
							maxSelectedLabels={3}
							showSelectAll={false}
							selectedItemsLabel='{0} estados'
						/>
					</div>
					<Button label='Buscar' icon='pi pi-search' onClick={cargarDatos} loading={loading} className='p-button-sm' />
					<ExportExcelButton
						operaciones={operaciones}
						desde={desdeStr}
						hasta={hastaStr}
						estados={estados}
						label='Exportar Excel'
					/>
				</div>
			</div>

			{/* TARJETAS ESTADÍSTICAS */}
			<div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
				<div className='bg-white rounded-lg shadow-sm border border-slate-200 p-5'>
					<p className='text-xs font-semibold text-slate-500 uppercase tracking-wide'>Operaciones</p>
					<p className='text-3xl font-bold text-[#02254A] mt-1'>{totalOperaciones}</p>
					<p className='text-xs text-slate-400 mt-1'>Total del período</p>
				</div>
				<div className='bg-white rounded-lg shadow-sm border border-slate-200 p-5'>
					<p className='text-xs font-semibold text-slate-500 uppercase tracking-wide'>Compra USD</p>
					<p className='text-3xl font-bold text-green-600 mt-1'>$ {totalCompraUSD.toFixed(2)}</p>
					<p className='text-xs text-slate-400 mt-1'>Total compra de dólares</p>
				</div>
				<div className='bg-white rounded-lg shadow-sm border border-slate-200 p-5'>
					<p className='text-xs font-semibold text-slate-500 uppercase tracking-wide'>Venta PEN</p>
					<p className='text-3xl font-bold text-blue-600 mt-1'>S/ {totalVentaPEN.toFixed(2)}</p>
					<p className='text-xs text-slate-400 mt-1'>Total venta de soles</p>
				</div>
			</div>



			{/* TABLA ENRIQUECIDA */}
			<div className='bg-white rounded-lg shadow-sm border border-slate-200'>
				<DataTable
					value={operaciones}
					paginator
					header={renderHeader()}
					rows={5}
					paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
					rowsPerPageOptions={[5, 10, 25, 50]}
					dataKey='id'
					filters={filters}
					globalFilterFields={['cliente', 'documento', 'codigoOperacion', 'numeroCuenta', 'tipoOperacion', 'estado']}
					emptyMessage='No se encontraron operaciones.'
					currentPageReportTemplate='Mostrando {first} a {last} de {totalRecords} entradas'
					loading={loading}
					pt={{ thead: { style: { backgroundColor: '#02254A', color: 'white' } } }}
				>
					<Column field='codigoOperacion' header='Código' sortable style={{ minWidth: '9rem' }} />
					<Column field='cliente' header='Cliente' sortable style={{ minWidth: '14rem' }} />
					<Column field='documento' header='Documento' sortable style={{ minWidth: '10rem' }} />
					<Column field='telefono' header='Teléfono' sortable style={{ minWidth: '10rem' }} />
					<Column field='correo' header='Correo' sortable style={{ minWidth: '14rem' }} />
					<Column field='numeroCuenta' header='Cuenta Destino' sortable style={{ minWidth: '12rem' }} />
					<Column field='tipoOperacion' header='Tipo' sortable style={{ minWidth: '7rem' }} />
					<Column
						field='montoEnviado'
						header='Monto Enviado'
						sortable
						dataType='numeric'
						style={{ minWidth: '10rem' }}
						body={(row: OperacionAdmin) => montoBodyTemplate(row.montoEnviado, row.monedaEnviada)}
					/>
					<Column
						field='montoRecibido'
						header='Monto Recibido'
						sortable
						dataType='numeric'
						style={{ minWidth: '10rem' }}
						body={(row: OperacionAdmin) => montoBodyTemplate(row.montoRecibido, row.monedaRecibida)}
					/>
					<Column field='tasaCambio' header='Tasa Cambio' sortable dataType='numeric' style={{ minWidth: '8rem' }} body={(row: OperacionAdmin) => n(row.tasaCambio).toFixed(4)} />
					<Column field='fechaEmision' header='Fecha' sortable dataType='date' style={{ minWidth: '9rem' }} body={fechaBodyTemplate} />
					<Column field='estado' header='Estado' sortable style={{ minWidth: '12rem' }} body={estadoBodyTemplate} />
				</DataTable>
			</div>
		</div>
	);
}
