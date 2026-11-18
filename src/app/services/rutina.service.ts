import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap, map, catchError, of, switchMap, startWith, shareReplay } from 'rxjs';
import { API_URL } from '../config/api.config';
import { RutinaApi } from '../models/rutina-api.model';
import { Rutina } from '../models/rutina.model';
import { adaptarRutinas, adaptarRutina } from '../adapters/rutina.adapter';

@Injectable({ providedIn: 'root' })
export class RutinaService {
  private http = inject(HttpClient);

  // Estados reactivos
  cargando = signal<boolean>(false);
  error = signal<string | null>(null);

  // Trigger para reintentar / recargar con switchMap
  private recargarTrigger$ = new Subject<void>();

  // Flujo principal con switchMap (se dispara al iniciar y al reintentar)
  readonly rutinas$: Observable<Rutina[]> = this.recargarTrigger$.pipe(
    startWith(void 0),
    tap(() => {
      this.cargando.set(true);
      this.error.set(null);
    }),
    switchMap(() =>
      this.http.get<RutinaApi[]>(API_URL).pipe(
        map(adaptarRutinas),
        catchError(() => {
          this.error.set("No s'han pogut carregar les rutines.");
          return of([]);
        })
      )
    ),
    tap(() => this.cargando.set(false)),
    shareReplay(1)
  );

  // POST: crea una rutina nueva
  crearRutina(rutina: Omit<Rutina, 'id'>): Observable<Rutina> {
    const body: Omit<RutinaApi, 'id'> = {
      nombre: rutina.nombre,
      descripcion: rutina.descripcion,
      categoria: rutina.categoria,
      nivel: rutina.nivel,
      fechaCreacion: rutina.fechaCreacion.toISOString().split('T')[0],
      duracionMinutos: rutina.duracionMinutos,
      destacada: rutina.destacada
    };
    return this.http.post<RutinaApi>(API_URL, body).pipe(
      map(adaptarRutina)
    );
  }

  // Reintentar última consulta (dispara switchMap)
  reintentar(): void {
    this.recargarTrigger$.next();
  }
}