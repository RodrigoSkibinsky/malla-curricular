import { Condicion } from "./Condicion";
import { Materia } from "../materia/Materia";
import { Curso } from "../materia/Curso";
import { Taller } from "../materia/Taller";
import { Padron } from "../padron/Padron";

export class CondicionSimple implements Condicion {
  constructor(
    private materia: Materia,
    private tipo: "habilitado" | "exonerado"
  ) {}

  evaluar(padron: Padron): boolean {
    if (this.tipo === "habilitado") {
      return this.materia.isHabilitado(padron);
    }

    // Evaluar si está exonerado, según el tipo de materia
    if (this.materia instanceof Curso) {
      return this.materia.isExonerado();
    }

    if (this.materia instanceof Taller) {
      return this.materia.isExonerado();
    }

    // Por defecto, no exonerado
    return false;
  }
}