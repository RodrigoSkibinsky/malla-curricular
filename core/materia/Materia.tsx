// core/materia/Materia.ts
import { Padron } from "../padron/Padron";
import { Condicion } from "../condiciones/Condicion";
import { GestorHabilitacion } from "../gestor/GestorHabilitacion";
import { EstadoMateria } from "../padron/Padron";

export abstract class Materia {
  private creditos = 0;
  private gestor?: GestorHabilitacion;

  constructor(private nombre: string) {}

  getNombre(): string {
    return this.nombre;
  }

  setNombre(nombre: string): void {
    this.nombre = nombre;
  }

  getCreditos(): number {
    return this.creditos;
  }

  setCreditos(creditos: number): void {
    this.creditos = creditos;
  }

  getGestor(): GestorHabilitacion | undefined {
    return this.gestor;
  }

  setGestor(gestor: GestorHabilitacion): void {
    this.gestor = gestor;
  }

  // Usamos evaluarYPropagar para activar propagación
  isHabilitado(padron: Padron): boolean {
    return this.gestor ? this.gestor.evaluarYPropagar(padron) : true;
  }

  // Métodos abstractos para estados
  abstract getEstado(): EstadoMateria;
  abstract setEstado(estado: EstadoMateria): void;
  abstract isExonerado(): boolean;
  abstract avanzarEstado(): EstadoMateria;
  abstract isAprobado(): boolean;
  abstract esTaller(): boolean;
}