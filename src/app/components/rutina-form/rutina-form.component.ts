import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Rutina } from '../../models/rutina.model';

@Component({
  selector: 'app-rutina-form',
  imports: [FormsModule],
  templateUrl: './rutina-form.component.html',
  styleUrl: './rutina-form.component.scss'
})
export class RutinaFormComponent {
  @Output() crear = new EventEmitter<Omit<Rutina, 'id'>>();

  nombre = '';
  descripcion = '';
  categoria = 'Fuerza';
  nivel = 'Principiante';
  duracionMinutos = 30;
  destacada = false;

  onCrear(): void {
    if (!this.nombre.trim()) return;
    const nueva: Omit<Rutina, 'id'> = {
      nombre: this.nombre.trim(),
      descripcion: this.descripcion.trim() || 'Sense descripció',
      categoria: this.categoria,
      nivel: this.nivel,
      fechaCreacion: new Date(),
      duracionMinutos: Number(this.duracionMinutos) || 0,
      destacada: this.destacada
    };
    this.crear.emit(nueva);
    this.resetForm();
  }

  private resetForm(): void {
    this.nombre = '';
    this.descripcion = '';
    this.categoria = 'Fuerza';
    this.nivel = 'Principiante';
    this.duracionMinutos = 30;
    this.destacada = false;
  }
}