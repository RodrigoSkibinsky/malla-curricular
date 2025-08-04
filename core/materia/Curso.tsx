// Curso.ts
import { EstadoMateria } from "../padron/Padron";
import { Materia } from "./Materia";


export class Curso extends Materia {
  private estado: EstadoMateria = "no_aprobado";

  getEstado(): EstadoMateria {
    return this.estado;
  }

  setEstado(nuevoEstado: EstadoMateria): void {
    this.estado = nuevoEstado;
  }

  avanzarEstado(): EstadoMateria {
    switch (this.estado) {
      case "no_aprobado":
        return this.estado = "aprobado";
        break;
      case "aprobado":
        return this.estado = "exonerado";
        break;
      case "exonerado":
        return this.estado = "no_aprobado";
        break;
    }
    return "no_aprobado"
  }

  isAprobado(): boolean {
    return this.estado === "aprobado" || this.estado === "exonerado";
  }

  isExonerado(): boolean {
    return this.estado === "exonerado";
  }

  esTaller(): boolean {
      return false
  }
}