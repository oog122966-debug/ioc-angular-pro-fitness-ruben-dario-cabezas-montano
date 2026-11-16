export interface Rutina {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  fechaCreacion: Date;
  nivel: string;
  duracionMinutos: number;
  destacada: boolean;
}