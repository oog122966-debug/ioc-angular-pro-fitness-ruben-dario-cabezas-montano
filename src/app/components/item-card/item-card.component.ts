import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Rutina } from '../../models/rutina.model';
import { TagComponent } from '../tag/tag.component';

@Component({
  selector: 'app-item-card',
  imports: [TagComponent, DatePipe],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss'
})
export class ItemCardComponent {
  @Input() rutina!: Rutina;
  @Output() seleccionar = new EventEmitter<Rutina>();

  onSeleccionar(): void {
    this.seleccionar.emit(this.rutina);
  }
}