export interface Rutina {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  fechaCreacion: Date;
  duracionMinutos: number;
  destacada: boolean;
}