import { Component, inject, OnInit, Output, EventEmitter, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { HistorialService } from '../../services/historial.service';
import { terminoConResultados } from '../../validators/termino-con-resultados.validator';

@Component({
  selector: 'app-buscador-reactivo',
  imports: [ReactiveFormsModule],
  templateUrl: './buscador-reactivo.component.html',
  styleUrl: './buscador-reactivo.component.scss'
})
export class BuscadorReactivoComponent implements OnInit {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private historialService = inject(HistorialService);
  private destroyRef = inject(DestroyRef);

  @Output() buscar = new EventEmitter<{ texto: string; categoria: string }>();

  form!: FormGroup;
  historial: string[] = [];
  buscando = false;

  ngOnInit(): void {
    this.form = this.fb.group({
      texto: ['', {
        validators: [Validators.minLength(3)],
        asyncValidators: [terminoConResultados(this.http)],
        updateOn: 'change'
      }],
      categoria: ['']
    });

    this.historial = this.historialService.obtener();

    // Debounce + emisión de criterios
    this.form.get('texto')!.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      filter(() => this.form.get('texto')!.valid),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(texto => {
      this.buscando = true;
      this.emitirBusqueda();
    });

    // Categoría: emisión inmediata
    this.form.get('categoria')!.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.emitirBusqueda();
    });
  }

  private emitirBusqueda(): void {
    const texto = (this.form.get('texto')!.value ?? '').trim();
    const categoria = this.form.get('categoria')!.value ?? '';
    this.buscar.emit({ texto, categoria });
    this.buscando = false;

    // Guardar en historial si es válido
    if (texto.length >= 3) {
      this.historialService.guardar(texto);
      this.historial = this.historialService.obtener();
    }
  }

  get textoControl(): AbstractControl {
    return this.form.get('texto')!;
  }

  usarDelHistorial(termino: string): void {
    this.form.get('texto')!.setValue(termino);
  }

  limpiar(): void {
    this.form.reset({ texto: '', categoria: '' });
    this.historialService.limpiar();
    this.historial = [];
  }

  // Para mostrar el estado PENDING del validador asíncrono
  get validando(): boolean {
    return this.textoControl.pending;
  }
}