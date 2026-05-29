'use client';

import { useState, useEffect, useRef } from 'react';
//import { getConfigTasas, updateConfigTasas, forzarActualizacionTasa } from '@/lib/services/configTasasService';
import { getTasaActual } from '@/lib/services/tasaCambioService';
import type { ConfigTasas } from '@/lib/services/configTasasService';
import type { TasaCambio } from '@/lib/services/tasaCambioService';
import { Toast } from 'primereact/toast';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { SelectButton } from 'primereact/selectbutton';
import { Divider } from 'primereact/divider';
import { Tag } from 'primereact/tag';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primeicons/primeicons.css';
import { getConfigTasas, updateConfigTasas, forzarActualizacionTasa, getTasaApi } from '@/lib/services/configTasasService';
export default function ConfigTasasPage() {
    const toast = useRef<Toast>(null);
    const [config, setConfig] = useState<ConfigTasas | null>(null);
    const [tasaActual, setTasaActual] = useState<TasaCambio | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [tasaApi, setTasaApi] = useState<number | null>(null);
    // Form state
    const [modo, setModo] = useState<'AUTO' | 'MANUAL'>('AUTO');
    const [margenCompra, setMargenCompra] = useState<number>(0.0015);
    const [margenVenta, setMargenVenta] = useState<number>(0.0020);
    const [tasaCompraManual, setTasaCompraManual] = useState<number>(3.770);
    const [tasaVentaManual, setTasaVentaManual] = useState<number>(3.800);

    const modoOpciones = [
        { label: ' Automático', value: 'AUTO' },
        { label: ' Manual', value: 'MANUAL' }
    ];

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        try {
            setLoading(true);
            const [cfg, tasa, api] = await Promise.all([
                getConfigTasas(),
                getTasaActual(),
                getTasaApi()
            ]);
            setConfig(cfg);
            setTasaActual(tasa);
            setTasaApi(api);
            // Cargar valores en el form
            setModo(cfg.modo);
            setMargenCompra(cfg.margen_compra);
            setMargenVenta(cfg.margen_venta);
            if (cfg.tasa_compra_usd_manual) setTasaCompraManual(cfg.tasa_compra_usd_manual);
            if (cfg.tasa_venta_usd_manual) setTasaVentaManual(cfg.tasa_venta_usd_manual);
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo cargar la configuración',
                life: 3000
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGuardar = async () => {
        try {
            setSaving(true);

            // 1. Guardar config
            await updateConfigTasas(
                modo === 'AUTO'
                    ? { modo, margen_compra: margenCompra, margen_venta: margenVenta }
                    : { modo, tasa_compra_usd_manual: tasaCompraManual, tasa_venta_usd_manual: tasaVentaManual }
            );

            // 2. Aplicar inmediatamente
            await forzarActualizacionTasa();

            // 3. Recargar tasa actual
            const tasa = await getTasaActual();
            setTasaActual(tasa);

            toast.current?.show({
                severity: 'success',
                summary: 'Guardado',
                detail: 'Configuración aplicada correctamente',
                life: 3000
            });
        } catch (error: any) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: error.message || 'No se pudo guardar',
                life: 3000
            });
        } finally {
            setSaving(false);
        }
    };

    // Preview del cálculo en tiempo real
    

    const previewCompra = modo === 'MANUAL'
        ? tasaCompraManual
         : tasaApi ? tasaApi * (1 - margenCompra) : null;

    const previewVenta = modo === 'MANUAL'
        ? tasaVentaManual
        : tasaApi ? tasaApi * (1 + margenVenta) : null;

    if (loading) {
        return (
            <div className='flex justify-center items-center h-64'>
                <i className='pi pi-spin pi-spinner text-4xl text-blue-500'></i>
            </div>
        );
    }

    return (
        <div className='max-w-3xl mx-auto'>
            <Toast ref={toast} />

            <div className='mb-6'>
                <h1 className='text-2xl font-bold text-gray-800'>⚙️ Configuración de Tasas</h1>
                <p className='text-gray-500 mt-1'>Administra el modo de actualización de tasas USD/PEN</p>
            </div>

            {/* Tasa actual */}
            <Card className='mb-6'>
                <div className='flex items-center justify-between mb-3'>
                    <h2 className='text-lg font-semibold text-gray-700'>Tasa vigente</h2>
                    <Tag
                        value={config?.modo === 'MANUAL' ? 'Manual' : 'Automático'}
                        severity={config?.modo === 'MANUAL' ? 'warning' : 'success'}
                    />
                </div>
                <Divider />
                {tasaActual && (
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='bg-green-50 rounded-xl p-4 text-center'>
                            <p className='text-sm text-gray-500 mb-1'>Compra USD</p>
                            <p className='text-3xl font-bold text-green-600'>
                                S/ {Number(tasaActual.tasa_compra_usd).toFixed(4)}
                            </p>
                        </div>
                        <div className='bg-blue-50 rounded-xl p-4 text-center'>
                            <p className='text-sm text-gray-500 mb-1'>Venta USD</p>
                            <p className='text-3xl font-bold text-blue-600'>
                                S/ {Number(tasaActual.tasa_venta_usd).toFixed(4)}
                            </p>
                        </div>
                    </div>
                )}
            </Card>

            {/* Formulario */}
            <Card>
                <h2 className='text-lg font-semibold text-gray-700 mb-4'>Configuración</h2>
                <Divider />

                {/* Selector de modo */}
                <div className='mb-6'>
                    <label className='block text-sm font-semibold text-gray-600 mb-2'>
                        Modo de actualización
                    </label>
                    <SelectButton
                        value={modo}
                        onChange={(e) => setModo(e.value)}
                        options={modoOpciones}
                        className='w-full'
                    />
                </div>

                {/* Modo API */}
                {modo === 'AUTO' && (
                    <div className='flex flex-col gap-5'>
                        <div className='bg-blue-50 rounded-lg p-3 text-sm text-blue-700'>
                            💡 Tasa base actual de la API:{' '}
                            <strong>
                                {tasaApi ? `S/ ${tasaApi.toFixed(4)}` : 'No disponible'}
                            </strong>
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                            <div className='flex flex-col gap-2'>
                                <label className='text-sm font-semibold text-gray-600'>
                                    Margen Compra
                                </label>
                                <InputNumber
                                    value={margenCompra}
                                    onValueChange={(e) => setMargenCompra(e.value ?? 0)}
                                    mode='decimal'
                                    minFractionDigits={4}
                                    maxFractionDigits={4}
                                    min={0}
                                    max={0.10}
                                    step={0.0001}
                                    className='w-full'
                                />
                                <small className='text-gray-400'>Ej: 0.0015 = 0.15%</small>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label className='text-sm font-semibold text-gray-600'>
                                    Margen Venta
                                </label>
                                <InputNumber
                                    value={margenVenta}
                                    onValueChange={(e) => setMargenVenta(e.value ?? 0)}
                                    mode='decimal'
                                    minFractionDigits={4}
                                    maxFractionDigits={4}
                                    min={0}
                                    max={0.10}
                                    step={0.0001}
                                    className='w-full'
                                />
                                <small className='text-gray-400'>Ej: 0.0020 = 0.20%</small>
                            </div>
                        </div>

                        {/* Preview */}
                        {previewCompra && previewVenta && (
                            <div className='bg-gray-50 rounded-xl p-4'>
                                <p className='text-sm font-semibold text-gray-600 mb-3'>
                                    📊 Vista previa con estos márgenes
                                </p>
                                <div className='grid grid-cols-2 gap-3'>
                                    <div className='text-center'>
                                        <p className='text-xs text-gray-400'>Compra resultante</p>
                                        <p className='text-xl font-bold text-green-600'>
                                            S/ {previewCompra.toFixed(4)}
                                        </p>
                                    </div>
                                    <div className='text-center'>
                                        <p className='text-xs text-gray-400'>Venta resultante</p>
                                        <p className='text-xl font-bold text-blue-600'>
                                            S/ {previewVenta.toFixed(4)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Modo MANUAL */}
                {modo === 'MANUAL' && (
                    <div className='flex flex-col gap-5'>
                        <div className='bg-yellow-50 rounded-lg p-3 text-sm text-yellow-700'>
                            ⚠️ En modo manual las tasas serán fijas hasta que cambies la configuración.
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                            <div className='flex flex-col gap-2'>
                                <label className='text-sm font-semibold text-gray-600'>
                                    Tasa Compra USD
                                </label>
                                <InputNumber
                                    value={tasaCompraManual}
                                    onValueChange={(e) => setTasaCompraManual(e.value ?? 0)}
                                    mode='decimal'
                                    minFractionDigits={3}
                                    maxFractionDigits={4}
                                    min={1}
                                    max={10}
                                    step={0.001}
                                    prefix='S/ '
                                    className='w-full'
                                />
                                <small className='text-gray-400'>Precio al que compras USD</small>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label className='text-sm font-semibold text-gray-600'>
                                    Tasa Venta USD
                                </label>
                                <InputNumber
                                    value={tasaVentaManual}
                                    onValueChange={(e) => setTasaVentaManual(e.value ?? 0)}
                                    mode='decimal'
                                    minFractionDigits={3}
                                    maxFractionDigits={4}
                                    min={1}
                                    max={10}
                                    step={0.001}
                                    prefix='S/ '
                                    className='w-full'
                                />
                                <small className='text-gray-400'>Precio al que vendes USD</small>
                            </div>
                        </div>

                        {/* Preview manual */}
                        <div className='bg-gray-50 rounded-xl p-4'>
                            <p className='text-sm font-semibold text-gray-600 mb-3'>
                                📊 Vista previa
                            </p>
                            <div className='grid grid-cols-2 gap-3'>
                                <div className='text-center'>
                                    <p className='text-xs text-gray-400'>Compra</p>
                                    <p className='text-xl font-bold text-green-600'>
                                        S/ {tasaCompraManual.toFixed(4)}
                                    </p>
                                </div>
                                <div className='text-center'>
                                    <p className='text-xs text-gray-400'>Venta</p>
                                    <p className='text-xl font-bold text-blue-600'>
                                        S/ {tasaVentaManual.toFixed(4)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <Divider />

                <Button
                    label='Guardar y aplicar'
                    icon='pi pi-save'
                    onClick={handleGuardar}
                    loading={saving}
                    className='w-full'
                    severity='success'
                />
            </Card>
        </div>
    );
}