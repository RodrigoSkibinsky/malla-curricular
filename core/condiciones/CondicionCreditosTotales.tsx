import { Condicion } from "./Condicion";
import { Padron } from "../padron/Padron";
import { Materia } from "../materia/Materia";

export class CondicionCreditosTotales implements Condicion {
  constructor(public creditosMinimos: number, public materias: Materia[]) {}

  evaluar(padron: Padron): boolean {
    // Suma los créditos de todas las materias exoneradas
    let total = 0;
    for (const materia of this.materias) {
      if (padron.materiasAprobadas.get(materia.getNombre()) === "exonerado") {
        total += materia.getCreditos();
      }
    }
    return total >= this.creditosMinimos;
  }
}