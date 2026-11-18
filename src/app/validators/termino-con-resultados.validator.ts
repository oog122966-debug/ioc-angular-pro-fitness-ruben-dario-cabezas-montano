import { inject } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, of, timer } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { API_URL } from '../config/api.config';
import { RutinaApi } from '../models/rutina-api.model';

export function terminoConResultados(http: HttpClient): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const termino = (control.value ?? '').trim();
    if (!termino || termino.length < 3) {
      return of(null); // La validación síncrona ya lo gestiona
    }

    // timer(300) actúa como debounce dentro del ciclo de vida del validador
    return timer(300).pipe(
      switchMap(() =>
        http.get<RutinaApi[]>(`${API_URL}?nombre_like=${encodeURIComponent(termino)}`).pipe(
          map(rutinas => (rutinas.length > 0 ? null : { sinResultados: true })),
          catchError(() => of(null)) // Si falla la API, no bloqueamos el formulario
        )
      )
    );
  };
}