import { RutinaApi } from '../models/rutina-api.model';
import { Rutina } from '../models/rutina.model';

export function adaptarRutina(api: RutinaApi): Rutina {
  return {
    id: api.id,
    nombre: limpiarTexto(api.nombre),
    descripcion: limpiarTexto(api.descripcion),
    categoria: normalizarCategoria(api.categoria),
    nivel: normalizarNivel(api.nivel),
    fechaCreacion: parsearFecha(api.fechaCreacion),
    duracionMinutos: convertirNumero(api.duracionMinutos),
    destacada: api.destacada ?? false
  };
}

export function adaptarRutinas(api: RutinaApi[]): Rutina[] {
  return api.map(adaptarRutina);
}

// --- Funciones auxiliares de normalización ---

function limpiarTexto(texto: string | null | undefined): string {
  return (texto ?? '').trim().replace(/\s+/g, ' ');
}

function normalizarCategoria(categoria: string | null | undefined): string {
  const limpia = limpiarTexto(categoria).toLowerCase();
  if (!limpia) return 'Sin categoría';
  return limpia.charAt(0).toUpperCase() + limpia.slice(1);
}

function normalizarNivel(nivel: string | null | undefined): string {
  const limpio = limpiarTexto(nivel).toLowerCase();
  if (!limpio) return 'Principiante';
  return limpio.charAt(0).toUpperCase() + limpio.slice(1);
}

function parsearFecha(fecha: string | null | undefined): Date {
  if (!fecha) return new Date();
  const parsed = new Date(fecha);
  return isNaN(parsed.getTime()) ? new Date() : parsed;
}

function convertirNumero(valor: number | string | null | undefined): number {
  const num = Number(valor);
  return isNaN(num) || num < 0 ? 0 : num;
}