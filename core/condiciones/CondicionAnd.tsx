import { Condicion } from "./Condicion";
import { Padron } from "../padron/Padron";

export class CondicionAnd implements Condicion {
  constructor(private condiciones: Condicion[]) {}

  evaluar(padron: Padron): boolean {
    return this.condiciones.every(cond => cond.evaluar(padron));
  }
}