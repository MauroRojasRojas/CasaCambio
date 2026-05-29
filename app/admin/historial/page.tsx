'use client';

import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Tag } from 'primereact/tag';
import { obtenerOperacionesPorPersona } from '@/lib/services/operacionService';
import { obtenerCuentasPorPersona } from '@/lib/services/cuentaBancariaService';
import ConstanciaPDF from '@/components/ConstanciaPDF';
import type { BankAccountModel } from '@/data/bank-account.model';
import { OperationModel } from '@/data/operation.model';

interface OperacionConCuentas extends OperationModel {
	selectedCuentaOrigen?: BankAccountModel | null;
	selectedCuentaDestino?: BankAccountModel | null;
}

export default function Historial() {
	const [selectedOperaciones, setSelectedOperaciones] = useState<OperacionConCuentas[]>([]);
	const [operaciones, setOperaciones] = useState<OperacionConCuentas[]>([]);
	const [cuentas, setCuentas] = useState<BankAccountModel[]>([]);
	const [userName, setUserName] = useState('');
	const [filters, setFilters] = useState({
		global: { value: null as string | null, matchMode: FilterMatchMode.CONTAINS },
	});
	const [globalFilterValue, setGlobalFilterValue] = useState('');
	const [tiposOperacion] = useState(['COMPRA', 'VENTA']);
	const [monedas] = useState(['PEN', 'USD']);
	const [estados] = useState(['PENDIENTE', 'TRANSFERIDO', 'RECHAZADO']);

	useEffect(() => {
		const loadData = async () => {
			try {
				const user = JSON.parse(localStorage.getItem('user') || '{}');
				const codigoPersona = user.perfilCompleto;
				setUserName(user.fullName || 'Cliente');

				if (codigoPersona) {
					// Cargar cuentas
					const cuentasResponse = await obtenerCuentasPorPersona(codigoPersona);
					let cuentasData: BankAccountModel[] = [];
					if (cuentasResponse.ok) {
						const cuentasJson = await cuentasResponse.json();
						cuentasData = Array.isArray(cuentasJson.message) ? cuentasJson.message : [];
						setCuentas(cuentasData);
					}

					// Cargar operaciones
					const operacionesResponse = await obtenerOperacionesPorPersona(codigoPersona);
					if (operacionesResponse.ok) {
						const operacionesJson = await operacionesResponse.json();
						const operacionesData: OperationModel[] = Array.isArray(operacionesJson.message) ? operacionesJson.message : [];

						// Mapear operaciones con cuentas
						const operacionesConCuentas = operacionesData.map((op) => ({
							...op,
							selectedCuentaOrigen: cuentasData.find((c) => c.id === op.cuentaBancariaOrigenId) || null,
							selectedCuentaDestino: cuentasData.find((c) => c.id === op.cuentaBancariaDestinoId) || null,
						}));

						setOperaciones(operacionesConCuentas);
					} else {
						console.error('Error al obtener operaciones');
					}
				}
			} catch (error) {
				console.error('Error al cargar datos:', error);
			}
		};
		loadData();
	}, []);

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

	const formatDate = (value: Date) => {
		return value.toLocaleDateString('es-ES', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		});
	};

	const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		const _filters = { ...filters };
		_filters['global'].value = value;
		setFilters(_filters);
		setGlobalFilterValue(value);
	};

	const renderHeader = () => {
		return (
			<div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2'>
				<div className='w-full sm:w-auto flex-1 min-w-0'>
					<IconField iconPosition='left' className='w-full'>
						<InputIcon className='pi pi-search' />
						<InputText className='w-full' value={globalFilterValue} onChange={onGlobalFilterChange} placeholder='Buscar...' />
					</IconField>
				</div>
			</div>
		);
	};

	const estadoBodyTemplate = (rowData: OperationModel) => {
		return <Tag value={rowData.estado || 'Pendiente'} severity={getSeverity(rowData.estado || 'Pendiente')} />;
	};

	const estadoFilterTemplate = (options: any) => {
		return (
			<Dropdown
				value={options.value}
				options={estados}
				onChange={(e) => options.filterCallback(e.value, options.index)}
				itemTemplate={estadoItemTemplate}
				placeholder='Seleccionar'
				className='p-column-filter'
				showClear
			/>
		);
	};

	const estadoItemTemplate = (option: string) => {
		return <Tag value={option} severity={getSeverity(option)} />;
	};

	const fechaBodyTemplate = (rowData: OperationModel) => {
		return formatDate(new Date(rowData.fechaEmision));
	};

	const fechaFilterTemplate = (options: any) => {
		return (
			<Calendar
				value={options.value}
				onChange={(e) => options.filterCallback(e.value, options.index)}
				dateFormat='dd/mm/yy'
				placeholder='dd/mm/yyyy'
				mask='99/99/9999'
			/>
		);
	};

	const montoBodyTemplate = (rowData: OperationModel) => {
		return `${rowData.monedaEnviada === 'PEN' ? 'S/' : '$'} ${Number(rowData.montoEnviado).toFixed(2)}`;
	};

	const montoFilterTemplate = (options: any) => {
		return (
			<InputNumber
				value={options.value}
				onChange={(e) => options.filterCallback(e.value, options.index)}
				mode='decimal'
				minFractionDigits={2}
				maxFractionDigits={2}
			/>
		);
	};

	const tipoOperacionFilterTemplate = (options: any) => {
		return (
			<Dropdown
				value={options.value}
				options={tiposOperacion}
				onChange={(e) => options.filterCallback(e.value, options.index)}
				placeholder='Seleccionar'
				className='p-column-filter'
				showClear
			/>
		);
	};

	const monedaOrigenFilterTemplate = (options: any) => {
		return (
			<Dropdown
				value={options.value}
				options={monedas}
				onChange={(e) => options.filterCallback(e.value, options.index)}
				placeholder='Seleccionar'
				className='p-column-filter'
				showClear
			/>
		);
	};

	const monedaDestinoFilterTemplate = (options: any) => {
		return (
			<Dropdown
				value={options.value}
				options={monedas}
				onChange={(e) => options.filterCallback(e.value, options.index)}
				placeholder='Seleccionar'
				className='p-column-filter'
				showClear
			/>
		);
	};

	const actionBodyTemplate = (rowData: OperacionConCuentas) => {
		return (
			<ConstanciaPDF
				userName={userName}
				emissionDate={rowData.fechaEmision}
				operationCode={rowData.codigoOperacion}
				selectedCuentaOrigen={rowData.selectedCuentaOrigen || null}
				selectedCuentaDestino={rowData.selectedCuentaDestino || null}
				sentCurrency={rowData.monedaEnviada}
				transferAmount={rowData.montoEnviado}
				receivedCurrency={rowData.monedaRecibida}
				receivedAmount={rowData.montoRecibido}
				showLabel={false}
			/>
		);
	};

	const header = renderHeader();

	return (
		<div className='flex flex-col gap-6 px-4'>
			<h1 className='text-3xl font-bold text-[#02254A]'>Historial de operaciones</h1>

			<div className='bg-white rounded-lg shadow-sm border border-slate-200'>
				<DataTable
					value={operaciones}
					paginator
					header={header}
					rows={5}
					paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
					rowsPerPageOptions={[5, 10, 25, 50]}
					dataKey='id'
					selectionMode='checkbox'
					selection={selectedOperaciones}
					onSelectionChange={(e) => setSelectedOperaciones(e.value)}
					filters={filters}
					globalFilterFields={['tipoOperacion', 'monedaEnviada', 'monedaRecibida', 'estado', 'personaCode']}
					emptyMessage='No se encontraron operaciones.'
					currentPageReportTemplate='Mostrando {first} a {last} de {totalRecords} entradas'
					pt={{ thead: { style: { backgroundColor: '#02254A', color: 'white' } } }}
				>
					<Column selectionMode='multiple' headerStyle={{ width: '3rem' }}></Column>
					{/* <Column field='id' header='ID' sortable style={{ minWidth: '5rem' }} /> */}
					<Column field='codigoOperacion' header='Código' sortable style={{ minWidth: '10rem' }} />
					<Column field='fechaEmision' header='Fecha' sortable dataType='date' style={{ minWidth: '10rem' }} body={fechaBodyTemplate} />
					<Column field='tipoOperacion' header='Tipo de Operación' sortable style={{ minWidth: '12rem' }} />
					<Column field='montoEnviado' header='Monto Enviado' sortable dataType='numeric' style={{ minWidth: '10rem' }} body={montoBodyTemplate} />
					<Column field='montoRecibido' header='Monto Recibido' sortable dataType='numeric' style={{ minWidth: '10rem' }} body={(rowData) => `${rowData.monedaRecibida === 'PEN' ? 'S/' : '$'} ${Number(rowData.montoRecibido).toFixed(2)}`} />
					<Column field='monedaEnviada' header='Moneda Origen' sortable style={{ minWidth: '10rem' }} />
					<Column field='monedaRecibida' header='Moneda Destino' sortable style={{ minWidth: '10rem' }} />
					<Column
						header='Tasa de Cambio'
						dataType='numeric'
						style={{ minWidth: '10rem' }}
						body={(rowData) => {
							const tasa = rowData.tipoOperacion === 'COMPRA' ? rowData.tasaCompra : rowData.tasaVenta;
							return Number(tasa || 0).toFixed(4);
						}}
					/>
					<Column field='estado' header='Estado' sortable style={{ minWidth: '10rem' }} body={estadoBodyTemplate} />
					<Column headerStyle={{ width: '3rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
				</DataTable>
			</div>
		</div>
	);
}
