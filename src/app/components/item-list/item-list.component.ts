import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Rutina } from '../../models/rutina.model';
import { ItemCardComponent } from '../item-card/item-card.component';

@Component({
  selector: 'app-item-list',
  imports: [ItemCardComponent],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss'
})
export class ItemListComponent {
  @Input() rutinas: Rutina[] = [];
  @Output() seleccionar = new EventEmitter<Rutina>();

  onSeleccionar(rutina: Rutina): void {
    this.seleccionar.emit(rutina);
  }
}
