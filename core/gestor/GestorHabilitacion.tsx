import { Condicion } from "../condiciones/Condicion";
import { Materia } from "../materia/Materia";
import { EstadoMateria, Padron } from "../padron/Padron";

export class GestorHabilitacion {
  private condiciones: Condicion[] = [];
  private materia: Materia;
  private suscriptores: Set<GestorHabilitacion> = new Set();
  private habilitado: boolean | null = null; // estado actual cacheado

  constructor(private mat: Materia) {
    this.materia = mat;
    mat.setGestor(this)
  }

  getMateria(): Materia {
    return this.materia;
  }

  agregarCondicion(condicion: Condicion): void {
    this.condiciones.push(condicion);
  }

  getCondiciones(): Condicion[] {
    return this.condiciones
  }

  // Permite que otro gestor se registre como suscriptor
  registrarSuscriptor(suscriptor: GestorHabilitacion) {
    this.suscriptores.add(suscriptor);
  }

  // Evalúa si está habilitado y propaga cambios si hubo cambio en el estado
  evaluarYPropagar(padron: Padron): boolean {
    const nuevaHabilitacion = this.condiciones.every(condicion => condicion.evaluar(padron));
    const cambio = this.habilitado !== nuevaHabilitacion;
    this.habilitado = nuevaHabilitacion;

    if (cambio) {
      // Notifico a todos los suscriptores para que se reevalúen
      this.suscriptores.forEach(suscriptor => {
        suscriptor.evaluarYPropagar(padron);
      });
    }
    return this.habilitado;
  }

  avanzarEstado(): EstadoMateria {
    // Aquí defines la lógica para avanzar el estado según el curso y si es taller
    // Ejemplo simple (deberías ajustar según tu lógica real):
    if (this.materia.getEstado() === "no_aprobado") {
      if (!this.materia.esTaller()) {
        return "aprobado";
      } else return "exonerado"
    }
    if (this.materia.getEstado() === "aprobado") return "exonerado";
    if (this.materia.getEstado() === "exonerado") return "no_aprobado";
    return this.materia.getEstado(); // si no cambia
  }

}