// CondicionExoneracionMateria.ts
import { Padron } from "../padron/Padron";
import { Condicion } from "./Condicion";
import { Materia } from "../materia/Materia";

export class CondicionExoneracionMateria implements Condicion {
  constructor(private materia: Materia) {}

  evaluar(padron: Padron): boolean {
    return padron.estaExonerada(this.materia.getNombre());
  }

  getMateriasDependientes(): Materia[] {
    return [this.materia];
  }
}