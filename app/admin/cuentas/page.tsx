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
import { BankAccountModel } from '@/data/bank-account.model';
import AddEditCuentaModal from '@/components/AddEditCuentaModal';
import { obtenerCuentasPorPersona } from '@/lib/services/cuentaBancariaService';

export default function Cuentas() {
	const [selectedCuentas, setSelectedCuentas] = useState<BankAccountModel[]>([]);
	const [cuentas, setCuentas] = useState<BankAccountModel[]>([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [cuentaToEdit, setCuentaToEdit] = useState<BankAccountModel | null>(null);
	const [filters, setFilters] = useState({
		global: { value: null as string | null, matchMode: FilterMatchMode.CONTAINS },
	});
	const [globalFilterValue, setGlobalFilterValue] = useState('');
	const [tiposCuenta] = useState(['Ahorros', 'Corriente']);
	const [monedas] = useState(['PEN', 'USD', 'EUR']);
	const [estados] = useState(['Activa', 'Inactiva']);


	const loadCuentas = async () => {
		try {
			const user = JSON.parse(localStorage.getItem('user') || '{}');
			const codigoPersona = user.perfilCompleto;
			if (codigoPersona) {
				const response = await obtenerCuentasPorPersona(codigoPersona);
				if (response.ok) {
					const data = await response.json();
					setCuentas(Array.isArray(data.message) ? data.message : []);
				} else {
					console.error('Error al obtener cuentas');
				}
			}
		} catch (error) {
			console.error('Error al cargar cuentas:', error);
		}
	};

	useEffect(() => {
		loadCuentas();
	}, []);

	const getSeverity = (estado: string) => {
		switch (estado) {
			case 'Activa':
				return 'success';
			case 'Inactiva':
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

	const estadoBodyTemplate = (rowData: BankAccountModel) => {
		const estadoStr = rowData.estado ? 'Activa' : 'Inactiva';
		return <Tag value={estadoStr} severity={getSeverity(estadoStr)} />;
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

	const fechaBodyTemplate = (rowData: BankAccountModel) => {
		return formatDate(new Date(rowData.fechaRegistro));
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

	const tipoCuentaFilterTemplate = (options: any) => {
		return (
			<Dropdown
				value={options.value}
				options={tiposCuenta}
				onChange={(e) => options.filterCallback(e.value, options.index)}
				placeholder='Seleccionar'
				className='p-column-filter'
				showClear
			/>
		);
	};

	const monedaFilterTemplate = (options: any) => {
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

	const actionBodyTemplate = (rowData: BankAccountModel) => {
		return <Button type='button' icon='pi pi-pencil' rounded onClick={() => { setCuentaToEdit(rowData); setModalVisible(true); }}></Button>;
	};

	const header = renderHeader();

	return (
		<div className='flex flex-col gap-6 px-4'>
				<div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-y-4'>
					<h1 className='text-3xl font-bold text-[#02254A]'>Mis cuentas</h1>
					<Button className='w-full sm:w-auto' raised size='small' label="Registrar Cuenta" icon="pi pi-plus" onClick={() => { setCuentaToEdit(null); setModalVisible(true); }} />
				</div>

			<div className='bg-white rounded-lg shadow-sm border border-slate-200'>
				<DataTable
					value={cuentas}
					paginator
					header={header}
					rows={5}
					paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
					rowsPerPageOptions={[5, 10, 25, 50]}
					dataKey='id'
					selectionMode='checkbox'
					selection={selectedCuentas}
					onSelectionChange={(e) => setSelectedCuentas(e.value)}
					filters={filters}
					globalFilterFields={['banco', 'numeroCuenta', 'tipoCuenta', 'moneda', 'titular', 'estado']}
					emptyMessage='No se encontraron cuentas.'
					currentPageReportTemplate='Mostrando {first} a {last} de {totalRecords} entradas'
					pt={{ thead: { style: { backgroundColor: '#02254A', color: 'white' } } }}
				>
					<Column selectionMode='multiple' headerStyle={{ width: '3rem' }}></Column>
					{/* <Column field='id' header='ID' sortable style={{ minWidth: '5rem' }} /> */}
					<Column field='banco' header='Banco' sortable style={{ minWidth: '10rem' }} />
					<Column field='numeroCuenta' header='Número de Cuenta' sortable style={{ minWidth: '12rem' }} />
					<Column field='tipoCuenta' header='Tipo de Cuenta' sortable style={{ minWidth: '10rem' }} />
					<Column field='moneda' header='Moneda' sortable style={{ minWidth: '8rem' }} />
					<Column field='titular' header='Titular' sortable style={{ minWidth: '12rem' }} />
					<Column field='fechaRegistro' header='Fecha de Registro' sortable dataType='date' style={{ minWidth: '12rem' }} body={fechaBodyTemplate} />
					<Column headerStyle={{ width: '5rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
				</DataTable>
			</div>

			<AddEditCuentaModal
				visible={modalVisible}
				onHide={() => setModalVisible(false)}
				cuenta={cuentaToEdit}
				onSave={async () => {
					// After registering/editing a cuenta, reload the list from server
					await loadCuentas();
				}}
			/>
		</div>
	);
}
