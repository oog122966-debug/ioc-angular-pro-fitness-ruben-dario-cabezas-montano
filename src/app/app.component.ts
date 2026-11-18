import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Rutina } from './models/rutina.model';
import { BuscadorReactivoComponent } from './components/buscador-reactivo/buscador-reactivo.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { RutinaFormComponent } from './components/rutina-form/rutina-form.component';
import { RutinaService } from './services/rutina.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BuscadorReactivoComponent, ItemListComponent, RutinaFormComponent, DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class App implements OnInit {
  appName: string = 'Pro Fitness';

  private rutinaService = inject(RutinaService);

  cargando = this.rutinaService.cargando;
  error = this.rutinaService.error;

  rutinas = signal<Rutina[]>([]);
  rutinasFiltradas = signal<Rutina[]>([]);
  rutinaSeleccionada = signal<Rutina | null>(null);

  ngOnInit(): void {
    this.rutinaService.rutinas$.subscribe(data => {
      this.rutinas.set(data);
      this.rutinasFiltradas.set(data);
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

  onReintentar(): void {
    this.rutinaService.reintentar();
  }

  onCrearRutina(nueva: Omit<Rutina, 'id'>): void {
    this.rutinaService.crearRutina(nueva).subscribe({
      next: () => {
        this.rutinaService.reintentar();
        this.rutinaSeleccionada.set(null);
      },
      error: () => this.error.set('No s\'ha pogut crear la rutina.')
    });
  }

  onBuscar(filtros: { texto: string; categoria: string }): void {
  this.onFiltrar(filtros);
  }
}