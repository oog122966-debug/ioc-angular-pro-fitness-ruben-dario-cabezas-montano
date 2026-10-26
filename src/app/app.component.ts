import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Rutina } from './models/rutina.model';
import { RUTINAS_MOCK } from './models/rutina.mock';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { ItemListComponent } from './components/item-list/item-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FilterBarComponent, ItemListComponent, DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class App {
  appName: string = 'Pro Fitness';
  rutinas: Rutina[] = RUTINAS_MOCK;
  rutinasFiltradas: Rutina[] = [...RUTINAS_MOCK];
  rutinaSeleccionada: Rutina | null = null;

  onFiltrar(filtros: { texto: string; categoria: string }): void {
    const texto = filtros.texto.toLowerCase().trim();
    this.rutinasFiltradas = this.rutinas.filter(r => {
      const coincideTexto = !texto || r.nombre.toLowerCase().includes(texto) || r.descripcion.toLowerCase().includes(texto);
      const coincideCategoria = !filtros.categoria || r.categoria === filtros.categoria;
      return coincideTexto && coincideCategoria;
    });
  }

  onSeleccionar(rutina: Rutina): void {
    this.rutinaSeleccionada = rutina;
  }

  onRestablir(): void {
    this.rutinasFiltradas = [...this.rutinas];
  }
}
