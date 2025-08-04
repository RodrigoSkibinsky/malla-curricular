import { Condicion } from "./Condicion";
import { Padron } from "../padron/Padron";

export class CondicionOr implements Condicion {
  constructor(private condiciones: Condicion[]) {}

  evaluar(padron: Padron): boolean {
    return this.condiciones.some(cond => cond.evaluar(padron));
  }
}