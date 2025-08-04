// components/CursoCard.tsx
'use client';
import React from 'react';
import { Materia } from '@/core/materia/Materia';
import { Padron } from '@/core/padron/Padron'; // Asegurate de importar esto

type CursoCardProps = {
  curso: Materia;
  onClick: () => void;
  padron: Padron;
  habilitado: boolean;
  style?: React.CSSProperties; // Permite pasar estilos personalizados
};

const CursoCard: React.FC<CursoCardProps> = ({ curso, onClick, padron, habilitado, style }) => {
  const estado = curso.getEstado();

  const getColor = () => {
    if (!curso.isHabilitado(padron)) {
      return "bg-gray-200";
    } else {
      switch (estado) {
        case "no_aprobado":
          return 'bg-red-400';
        case "aprobado":
          return 'bg-yellow-300';
        case "exonerado":
          return 'bg-green-400';
        default:
          return 'bg-white';
      }
    }
  };

  return (
    <div
      className={`cursor-pointer p-4 m-2 select-none rounded shadow ${getColor()}`}
      onClick={habilitado ? onClick : undefined} style={style}
    >
      <h6 className="text-xs font-bold">{`${curso.getNombre()} (${curso.getCreditos()} cr.)`}</h6>
    </div>
  );
};

export default CursoCard;