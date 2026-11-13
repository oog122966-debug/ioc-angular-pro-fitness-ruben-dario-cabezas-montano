import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { API_URL } from '../config/api.config';
import { Rutina } from '../models/rutina.model';

@Injectable({
  providedIn: 'root'
})
export class RutinaService {
  private http = inject(HttpClient);

  cargando = signal<boolean>(false);

  getRutinas(): Observable<Rutina[]> {
    this.cargando.set(true);
    return this.http.get<Rutina[]>(API_URL).pipe(
      tap(() => this.cargando.set(false))
    );
  }
}
