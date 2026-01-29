'use client';

import React, { useState } from 'react';
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
import { historialDefault, OperacionHistorial } from '../../../data/historial';

export default function Historial() {
	const [selectedOperaciones, setSelectedOperaciones] = useState<OperacionHistorial[]>([]);
	const [filters, setFilters] = useState({
		global: { value: null as string | null, matchMode: FilterMatchMode.CONTAINS },
	});
	const [globalFilterValue, setGlobalFilterValue] = useState('');
	const [tiposOperacion] = useState(['Compra', 'Venta', 'Transferencia']);
	const [monedas] = useState(['PEN', 'USD']);
	const [estados] = useState(['Completada', 'Pendiente', 'Cancelada']);

	const getSeverity = (estado: string) => {
		switch (estado) {
			case 'Completada':
				return 'success';
			case 'Pendiente':
				return 'warning';
			case 'Cancelada':
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
			<div className='flex flex-wrap gap-2 justify-content-between align-items-center'>
				<IconField iconPosition='left'>
					<InputIcon className='pi pi-search' />
					<InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder='Buscar...' />
				</IconField>
			</div>
		);
	};

	const estadoBodyTemplate = (rowData: OperacionHistorial) => {
		return <Tag value={rowData.estado} severity={getSeverity(rowData.estado)} />;
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

	const fechaBodyTemplate = (rowData: OperacionHistorial) => {
		return formatDate(new Date(rowData.fecha));
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

	const montoBodyTemplate = (rowData: OperacionHistorial) => {
		return `${rowData.monedaOrigen === 'PEN' ? 'S/' : '$'} ${rowData.monto.toFixed(2)}`;
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

	const actionBodyTemplate = () => {
		return <Button type='button' icon='pi pi-eye' rounded></Button>;
	};

	const header = renderHeader();

	return (
		<div className='flex flex-col gap-6'>
			<h1 className='text-3xl font-bold text-[#02254A]'>Historial de operaciones</h1>

			<div className='bg-white rounded-lg p-6 shadow-sm border border-slate-200'>
				<DataTable
					value={historialDefault}
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
					globalFilterFields={['tipoOperacion', 'monedaOrigen', 'monedaDestino', 'estado', 'descripcion']}
					emptyMessage='No se encontraron operaciones.'
					currentPageReportTemplate='Mostrando {first} a {last} de {totalRecords} entradas'
					pt={{ thead: { style: { backgroundColor: '#02254A', color: 'white' } } }}
				>
					<Column selectionMode='multiple' headerStyle={{ width: '3rem' }}></Column>
					<Column field='codigo' header='Código' sortable style={{ minWidth: '10rem' }} />
					<Column field='id' header='ID' sortable style={{ minWidth: '5rem' }} />
					<Column field='fecha' header='Fecha' sortable dataType='date' style={{ minWidth: '10rem' }} body={fechaBodyTemplate} />
					<Column field='tipoOperacion' header='Tipo de Operación' sortable style={{ minWidth: '12rem' }} />
					<Column field='monto' header='Monto' sortable dataType='numeric' style={{ minWidth: '10rem' }} body={montoBodyTemplate} />
					<Column field='monedaOrigen' header='Moneda Origen' sortable style={{ minWidth: '10rem' }} />
					<Column field='monedaDestino' header='Moneda Destino' sortable style={{ minWidth: '10rem' }} />
					<Column
						field='tasaCambio'
						header='Tasa de Cambio'
						sortable
						dataType='numeric'
						style={{ minWidth: '10rem' }}
						body={(rowData) => rowData.tasaCambio.toFixed(4)}
					/>
					<Column field='estado' header='Estado' sortable style={{ minWidth: '10rem' }} body={estadoBodyTemplate} />
					<Column field='descripcion' header='Descripción' sortable style={{ minWidth: '15rem' }} />
					<Column headerStyle={{ width: '5rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
				</DataTable>
			</div>
		</div>
	);
}
