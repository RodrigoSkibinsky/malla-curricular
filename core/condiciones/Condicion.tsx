// core/condiciones/Condicion.ts

import { Padron } from "../padron/Padron";
import { Materia } from "../materia/Materia"; // ← esta línea es necesaria

export interface Condicion {
  evaluar(padron: Padron): boolean;

  getMateriasDependientes?(): Materia[];
}