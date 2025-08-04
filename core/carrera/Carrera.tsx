// core/carrera/Carrera.ts
import { Materia } from "../materia/Materia";
import { Padron } from "../padron/Padron";

export class Carrera {
  constructor(
    private nombre: string,
    private materias: Materia[]
  ) {}

  getNombre(): string {
    return this.nombre;
  }

  getMaterias(): Materia[] {
    return this.materias;
  }

  // Devuelve true si el padron cumple todos los requisitos
  estaCompleta(padron: Padron): boolean {
    return this.materias.every(m => m.isHabilitado(padron));
  }

  // Devuelve una lista de materias faltantes
  getMateriasFaltantes(padron: Padron): Materia[] {
    return this.materias.filter(m => !m.isHabilitado(padron));
  }

  getPorcentajeAvance(padron: Padron): number {
    const total = this.materias.length;
    const aprobadas = this.materias.filter(m => m.isHabilitado(padron)).length;
    return (aprobadas / total) * 100;
  }
}