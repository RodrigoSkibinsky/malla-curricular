import { Condicion } from "./Condicion";
import { Padron } from "../padron/Padron";

export class CondicionCreditosPlan implements Condicion {
  constructor(
    public creditosMinimos: number,
    public planId: string
  ) {}

  evaluar(padron: Padron): boolean {
    return padron.creditosEnPlan(this.planId) >= this.creditosMinimos;
  }
}