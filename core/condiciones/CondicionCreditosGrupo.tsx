import { Condicion } from "./Condicion";
import { Padron } from "../padron/Padron";

export class CondicionCreditosGrupo implements Condicion {
  constructor(
    private creditosRequeridos: number,
    private grupoNombre: string
  ) {}

  evaluar(padron: Padron): boolean {
    return padron.creditosEnGrupo(this.grupoNombre) >= this.creditosRequeridos;
  }
}