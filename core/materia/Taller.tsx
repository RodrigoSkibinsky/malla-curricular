// Taller.ts
import { Materia } from "./Materia";
import { EstadoMateria } from "../padron/Padron";

export class Taller extends Materia {
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
        return this.estado = "exonerado";
        break;
      case "exonerado":
        return this.estado = "no_aprobado";
        break;
    }
    return "no_aprobado"
  }

  isAprobado(): boolean {
    return this.isExonerado();
  }

  toggleExonerado(): void {
    this.estado = this.estado === "exonerado"
      ? "no_aprobado"
      : "exonerado";
  }

  isExonerado(): boolean {
    return this.estado === "exonerado";
  }

  esTaller(): boolean {
      return true
  }

}