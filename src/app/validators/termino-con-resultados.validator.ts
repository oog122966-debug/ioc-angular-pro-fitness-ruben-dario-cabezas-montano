import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, of, timer, forkJoin } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { API_URL } from '../config/api.config';
import { RutinaApi } from '../models/rutina-api.model';

export function terminoConResultados(http: HttpClient): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const termino = (control.value ?? '').trim();
    if (!termino || termino.length < 3) {
      return of(null);
    }

    return timer(300).pipe(
      switchMap(() =>
        forkJoin({
          porNombre: http
            .get<RutinaApi[]>(`${API_URL}?nombre_like=${encodeURIComponent(termino)}`)
            .pipe(catchError(() => of([]))),
          porCategoria: http
            .get<RutinaApi[]>(`${API_URL}?categoria_like=${encodeURIComponent(termino)}`)
            .pipe(catchError(() => of([]))),
          porDescripcion: http
            .get<RutinaApi[]>(`${API_URL}?descripcion_like=${encodeURIComponent(termino)}`)
            .pipe(catchError(() => of([])))
        }).pipe(
          map(({ porNombre, porCategoria, porDescripcion }) => {
            const hayResultados =
              porNombre.length > 0 || porCategoria.length > 0 || porDescripcion.length > 0;
            return hayResultados ? null : { sinResultados: true };
          })
        )
      )
    );
  };
}