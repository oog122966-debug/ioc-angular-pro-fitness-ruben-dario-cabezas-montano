import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';
import { API_URL } from '../config/api.config';
import { RutinaApi } from '../models/rutina-api.model';
import { Rutina } from '../models/rutina.model';
import { adaptarRutinas } from '../adapters/rutina.adapter';

@Injectable({
  providedIn: 'root'
})
export class RutinaService {
  private http = inject(HttpClient);

  cargando = signal<boolean>(false);

  getRutinas(): Observable<Rutina[]> {
    this.cargando.set(true);
    return this.http.get<RutinaApi[]>(API_URL).pipe(
      map(adaptarRutinas),
      tap(() => this.cargando.set(false))
    );
  }
}