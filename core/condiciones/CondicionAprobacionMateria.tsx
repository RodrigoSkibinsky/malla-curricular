import { Condicion } from "./Condicion";
import { Padron } from "../padron/Padron";
import { Materia } from "../materia/Materia";

export class CondicionAprobacionMateria implements Condicion {
  constructor(private materia: Materia) {}

  evaluar(padron: Padron): boolean {
    return padron.estaAprobada(this.materia.getNombre());
  }
}