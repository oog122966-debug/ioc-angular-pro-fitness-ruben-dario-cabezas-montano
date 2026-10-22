import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-bar',
  imports: [FormsModule],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.scss'
})
export class FilterBarComponent {
  @Output() filtrar = new EventEmitter<{ texto: string; categoria: string }>();

  texto: string = '';
  categoria: string = '';

  onFiltrar(): void {
    this.filtrar.emit({ texto: this.texto, categoria: this.categoria });
  }
}
