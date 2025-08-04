// src/core/materia/OrdenamientoMaterias.tsx

import { Materia } from "./Materia";

// Función para ordenar materias según sus dependencias
export function ordenarMateriasTopologicamente(materias: Materia[]): Materia[] {
  const visitado = new Set<Materia>();
  const resultado: Materia[] = [];

  function visitar(materia: Materia) {
    if (visitado.has(materia)) return;
    visitado.add(materia);

    const gestor = materia.getGestor();
    if (!gestor) return;

    const condiciones = gestor.getCondiciones?.() || [];
    const prerequisitos = condiciones.flatMap(c => c.getMateriasDependientes?.() || []);
    
    for (const prereq of prerequisitos) {
      visitar(prereq);
    }

    resultado.push(materia);
  }

  for (const materia of materias) {
    visitar(materia);
  }

  return resultado;
}