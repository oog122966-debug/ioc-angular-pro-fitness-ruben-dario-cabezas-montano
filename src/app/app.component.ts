import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Rutina } from './models/rutina.model';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { RutinaService } from './services/rutina.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FilterBarComponent, ItemListComponent, DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class App implements OnInit {
  appName: string = 'Pro Fitness';

  private rutinaService = inject(RutinaService);

  cargando = this.rutinaService.cargando;
  rutinas = signal<Rutina[]>([]);
  rutinasFiltradas = signal<Rutina[]>([]);
  rutinaSeleccionada = signal<Rutina | null>(null);

  ngOnInit(): void {
    this.rutinaService.getRutinas().subscribe({
      next: (data) => {
        this.rutinas.set(data);
        this.rutinasFiltradas.set(data);
      },
      error: (err) => console.error('Error al cargar rutinas:', err)
    });
  }

  onFiltrar(filtros: { texto: string; categoria: string }): void {
    const texto = filtros.texto.toLowerCase().trim();
    const filtradas = this.rutinas().filter(r => {
      const coincideTexto = !texto || r.nombre.toLowerCase().includes(texto) || r.descripcion.toLowerCase().includes(texto);
      const coincideCategoria = !filtros.categoria || r.categoria === filtros.categoria;
      return coincideTexto && coincideCategoria;
    });
    this.rutinasFiltradas.set(filtradas);
  }

  onSeleccionar(rutina: Rutina): void {
    this.rutinaSeleccionada.set(rutina);
  }

  onRestablir(): void {
    this.rutinasFiltradas.set([...this.rutinas()]);
  }
}