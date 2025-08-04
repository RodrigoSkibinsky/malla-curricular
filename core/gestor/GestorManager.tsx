import { Materia } from "../materia/Materia";
import { GestorHabilitacion } from "./GestorHabilitacion";

export class GestorManager {
  private static gestoresPorCurso: Map<string, GestorHabilitacion> = new Map();

  public static registrarGestor(cursoNombre: string, gestor: GestorHabilitacion) {
    this.gestoresPorCurso.set(cursoNombre, gestor);
  }

  public static obtenerGestorParaCurso(curso: Materia): GestorHabilitacion | undefined {
    console.log("Gestores registrados:", Array.from(this.gestoresPorCurso.keys()));
    console.log("Buscando gestor para curso:", curso.getNombre());
    return this.gestoresPorCurso.get(curso.getNombre());
  }

}