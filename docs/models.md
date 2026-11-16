# Models i adaptador — Pro Fitness

## Models TypeScript

| Fitxer | Tipus | Propòsit |
|--------|-------|----------|
| `src/app/models/rutina-api.model.ts` | `RutinaApi` | Estructura exacta que retorna l'API (`json-server`) |
| `src/app/models/rutina.model.ts` | `Rutina` | Model intern que utilitza l'aplicació |

## Adaptador

| Fitxer | Funció | Propòsit |
|--------|--------|----------|
| `src/app/adapters/rutina.adapter.ts` | `adaptarRutina()` / `adaptarRutinas()` | Transforma i normalitza les dades de l'API al model intern |

## Taula de mapatge API → model intern

| Camp API (`RutinaApi`) | Tipus API | Camp intern (`Rutina`) | Tipus intern | Normalització aplicada |
|------------------------|-----------|------------------------|--------------|------------------------|
| `id` | `number` | `id` | `number` | Copia directa |
| `nombre` | `string` | `nombre` | `string` | `trim()` + eliminació d'espais múltiples |
| `descripcion` | `string` | `descripcion` | `string` | `trim()` + eliminació d'espais múltiples |
| `categoria` | `string` | `categoria` | `string` | `trim()` + capitalització + valor per defecte `'Sin categoría'` |
| `nivel` | `string` | `nivel` | `string` | `trim()` + capitalització + valor per defecte `'Principiante'` |
| `fechaCreacion` | `string` | `fechaCreacion` | `Date` | Conversió a `Date` amb validació (`isNaN`) i fallback a data actual |
| `duracionMinutos` | `number` | `duracionMinutos` | `number` | Conversió segura a número + fallback a `0` si és invàlid o negatiu |
| `destacada` | `boolean` | `destacada` | `boolean` | Valor per defecte `false` si falta |

## Accions de normalització aplicades

1. **Neteja d'espais**: `trim()` i substitució d'espais múltiples a `nombre`, `descripcion`, `categoria` i `nivel`.
2. **Conversió segura de números**: `convertirNumero()` a `duracionMinutos`.
3. **Valors per defecte**: `destacada ?? false`, `'Sin categoría'`, `'Principiante'`, `new Date()`.
4. **Normalització de categories i nivells**: capitalització de la primera lletra.
5. **Transformació de dates**: string → `Date` amb validació.
6. **Eliminació de textos buits**: `limpiarTexto()` retorna `''` si el valor és `null`/`undefined`.