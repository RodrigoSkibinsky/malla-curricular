export type EstadoMateria = "no_aprobado" | "aprobado" | "exonerado";

export class Padron {
  constructor(
    public materiasAprobadas: Map<string, EstadoMateria>,
    public creditosPorPlan: Record<string, number>,
    public creditosPorGrupo: Record<string, number>
  ) {}

  creditosEnPlan(planId: string): number {
    return this.creditosPorPlan[planId] ?? 0;
  }

  creditosEnGrupo(grupoId: string): number {
    return this.creditosPorGrupo[grupoId] ?? 0;
  }

  tieneMateria(materiaId: string): boolean {
    return this.materiasAprobadas.has(materiaId);
  }

  estaAprobada(materiaId: string): boolean {
    const estado = this.materiasAprobadas.get(materiaId);
    return estado === "aprobado" || estado === "exonerado";
  }

  estaExonerada(materiaId: string): boolean {
    return this.materiasAprobadas.get(materiaId) === "exonerado";
  }

  estadoDe(materiaId: string): EstadoMateria {
    // Si no está en el map, consideramos no aprobado.
    return this.materiasAprobadas.get(materiaId) ?? "no_aprobado";
  }

  aprobarMateria(materiaId: string) {
    this.materiasAprobadas.set(materiaId, "aprobado");
  }

  exonerarMateria(materiaId: string) {
    this.materiasAprobadas.set(materiaId, "exonerado");
  }

  desaprobarMateria(materiaId: string) {
    // Opción A: Eliminar del mapa, para indicar que no está aprobada ni exonerada
    this.materiasAprobadas.delete(materiaId);
    
    // Opción B: si querés mantener registro explícito:
    // this.materiasAprobadas.set(materiaId, "no_aprobado");
  }
}