import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HistorialService {
  private readonly KEY = 'pro_fitness_historial_cerques';
  private readonly MAX_ITEMS = 5;

  obtener(): string[] {
    try {
      const raw = localStorage.getItem(this.KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  guardar(termino: string): void {
    const limpio = termino.trim();
    if (!limpio) return;
    try {
      const actual = this.obtener();
      // Evitar duplicados consecutivos
      if (actual.length > 0 && actual[0] === limpio) return;
      // Eliminar duplicados no consecutivos y añadir al principio
      const nuevo = [limpio, ...actual.filter(t => t !== limpio)].slice(0, this.MAX_ITEMS);
      localStorage.setItem(this.KEY, JSON.stringify(nuevo));
    } catch {
      // Silencioso: localStorage puede fallar (modo privado, cuota llena, etc.)
    }
  }

  limpiar(): void {
    try {
      localStorage.removeItem(this.KEY);
    } catch {
      // Silencioso
    }
  }
}