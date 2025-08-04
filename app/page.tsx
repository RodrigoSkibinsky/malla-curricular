'use client';
import React, { useState } from 'react';
import { Curso } from '@/core/materia/Curso';
import { Taller } from '@/core/materia/Taller';
import { GestorHabilitacion } from '@/core/gestor/GestorHabilitacion';
import { CondicionAprobacionMateria } from '@/core/condiciones/CondicionAprobacionMateria';
import { EstadoMateria, Padron } from '@/core/padron/Padron';
import CursoCard from '@/components/CursoCard';
import { CondicionExoneracionMateria } from '@/core/condiciones/CondicionExoneracionMateria';
import { CondicionAnd } from '@/core/condiciones/CondicionAnd';
import { CondicionOr } from '@/core/condiciones/CondicionOr';
import { Materia } from '@/core/materia/Materia';
import { ordenarMateriasTopologicamente } from '@/core/materia/OrdenamientoMaterias';
import { GestorManager } from '@/core/gestor/GestorManager';
import { CondicionCreditosTotales } from '@/core/condiciones/CondicionCreditosTotales';

const carreras = [
  'Analista en Computación',
  'Licenciatura en Computación',
  'Ingeniería en Computación',
];

// La función crearSemestres() la dejamos tal cual está:
const gestores = new Map<string, GestorHabilitacion>();

let semPar: Materia[] = [];
let semImpar: Materia[] = [];

function crearSemestres(): Materia[][] {

  const cdiv = new Curso('Cálculo Diferencial e Integral en una Variable');
  const cdivGestor = new GestorHabilitacion(cdiv);
  gestores.set(cdiv.getNombre(), cdivGestor);
  cdiv.setCreditos(13);
  const condCdivAprobado = new CondicionAprobacionMateria(cdiv);
  const condCdivExonerado = new CondicionExoneracionMateria(cdiv);

  const gal1 = new Curso('Geometría y Álgebra Lineal 1');
  const gal1Gestor = new GestorHabilitacion(gal1);
  gestores.set(gal1.getNombre(), gal1Gestor);
  gal1.setCreditos(9);
  const condGal1Aprobado = new CondicionAprobacionMateria(gal1);
  const condGal1Exonerado = new CondicionExoneracionMateria(gal1);

  const prog1 = new Curso('Programación 1');
  const prog1Gestor = new GestorHabilitacion(prog1);
  gestores.set(prog1.getNombre(), prog1Gestor);
  prog1.setCreditos(10);
  const condProg1Aprobado = new CondicionAprobacionMateria(prog1);
  const condProg1Exonerado = new CondicionExoneracionMateria(prog1);

  const md1 = new Curso('Matemática Discreta 1');
  const md1Gestor = new GestorHabilitacion(md1);
  gestores.set(md1.getNombre(), md1Gestor);
  md1.setCreditos(9);
  const condMd1Aprobado = new CondicionAprobacionMateria(md1);
  const condMd1Exonerado = new CondicionExoneracionMateria(md1);

  const cdivv = new Curso('Cálculo Diferencial e Integral en Varias Variables');
  const cdivvGestor = new GestorHabilitacion(cdivv);
  gestores.set(cdivv.getNombre(), cdivvGestor);
  cdivv.setCreditos(13);
  const condCdivvAprobado = new CondicionAprobacionMateria(cdivv);
  const condCdivvExonerado = new CondicionExoneracionMateria(cdivv);

  cdivvGestor.agregarCondicion(condCdivAprobado);

  const gal2 = new Curso('Geometría y Álgebra Lineal 2');
  const gal2Gestor = new GestorHabilitacion(gal2);
  gestores.set(gal2.getNombre(), gal2Gestor);
  gal2.setCreditos(9);
  const condGal2Aprobado = new CondicionAprobacionMateria(gal2);
  const condGal2Exonerado = new CondicionExoneracionMateria(gal2);

  gal2Gestor.agregarCondicion(condGal1Aprobado);

  const prog2 = new Curso('Programación 2');
  const prog2Gestor = new GestorHabilitacion(prog2);
  gestores.set(prog2.getNombre(), prog2Gestor);
  prog2.setCreditos(12);
  const condProg2Aprobado = new CondicionAprobacionMateria(prog2);
  const condProg2Exonerado = new CondicionExoneracionMateria(prog2);

  prog2Gestor.agregarCondicion(condProg1Aprobado);

  const md2 = new Curso('Matemática Discreta 2');
  const md2Gestor = new GestorHabilitacion(md2);
  gestores.set(md2.getNombre(), md2Gestor);
  md2.setCreditos(9);
  md2Gestor.agregarCondicion(condMd1Aprobado);
  md2Gestor.agregarCondicion(condGal1Aprobado);
  const condMd2Aprobado = new CondicionAprobacionMateria(md2);
  const condMd2Exonerado = new CondicionExoneracionMateria(md2);

  const logica = new Curso('Lógica');
  const logicaGestor = new GestorHabilitacion(logica);
  gestores.set(logica.getNombre(), logicaGestor);
  logica.setCreditos(12);
  logicaGestor.agregarCondicion(condMd1Aprobado);
  const condLogicaAprobado = new CondicionAprobacionMateria(logica);
  const condLogicaExonerado = new CondicionExoneracionMateria(logica);

  const pye = new Curso('Probabilidad y Estadística');
  const pyeGestor = new GestorHabilitacion(pye);
  gestores.set(pye.getNombre(), pyeGestor);
  pye.setCreditos(10);
  pyeGestor.agregarCondicion(condCdivExonerado);
  pyeGestor.agregarCondicion(condGal1Exonerado);
  const condPyeAprobado = new CondicionAprobacionMateria(pye);
  const condPyeExonerado = new CondicionExoneracionMateria(pye);

  const prog3 = new Curso('Programación 3');
  const prog3Gestor = new GestorHabilitacion(prog3);
  gestores.set(prog3.getNombre(), prog3Gestor);
  prog3.setCreditos(15);
  const condProg3Aprobado = new CondicionAprobacionMateria(prog3);
  const condProg3Exonerado = new CondicionExoneracionMateria(prog3);
  prog3Gestor.agregarCondicion(condProg2Aprobado);
  prog3Gestor.agregarCondicion(condProg1Exonerado);
  prog3Gestor.agregarCondicion(condMd1Exonerado);

  const arqComp = new Curso('Arquitectura de Computadoras');
  const arqCompGestor = new GestorHabilitacion(arqComp);
  gestores.set(arqComp.getNombre(), arqCompGestor);
  arqComp.setCreditos(10);
  const condArqCompAprobado = new CondicionAprobacionMateria(arqComp);
  arqCompGestor.agregarCondicion(condMd1Aprobado);
  arqCompGestor.agregarCondicion(condLogicaAprobado);
  arqCompGestor.agregarCondicion(condProg2Aprobado);
  arqCompGestor.agregarCondicion(condCdivExonerado);
  arqCompGestor.agregarCondicion(condProg1Exonerado);

  const metNum = new Curso('Métodos Numéricos');
  const metNumGestor = new GestorHabilitacion(metNum);
  gestores.set(metNum.getNombre(), metNumGestor);
  metNum.setCreditos(8);
  metNumGestor.agregarCondicion(condCdivvExonerado);
  metNumGestor.agregarCondicion(condCdivExonerado);
  metNumGestor.agregarCondicion(condGal1Exonerado);
  metNumGestor.agregarCondicion(condProg1Exonerado);
  metNumGestor.agregarCondicion(condGal2Exonerado);

  const prog4 = new Curso('Programación 4');
  const prog4Gestor = new GestorHabilitacion(prog4);
  gestores.set(prog4.getNombre(), prog4Gestor);
  prog4.setCreditos(15);
  const condProg4Aprobado = new CondicionAprobacionMateria(prog4);
  const condProg4Exonerado = new CondicionExoneracionMateria(prog4);
  prog4Gestor.agregarCondicion(condProg2Exonerado);
  prog4Gestor.agregarCondicion(condCdivExonerado);
  prog4Gestor.agregarCondicion(condGal1Exonerado);
  prog4Gestor.agregarCondicion(condMd1Exonerado);

  const iio = new Curso('Introducción a la Investigación de Operaciones');
  const iioGestor = new GestorHabilitacion(iio);
  gestores.set(iio.getNombre(), iioGestor);
  iio.setCreditos(10);
  iioGestor.agregarCondicion(condPyeExonerado);
  iioGestor.agregarCondicion(condGal2Exonerado);
  iioGestor.agregarCondicion(condCdivvExonerado);
  iioGestor.agregarCondicion(condCdivExonerado);
  iioGestor.agregarCondicion(condGal1Exonerado);
  
  const sistOper = new Curso('Sistemas Operativos');
  const sistOperGestor = new GestorHabilitacion(sistOper);
  gestores.set(sistOper.getNombre(), sistOperGestor);
  sistOper.setCreditos(12);
  sistOperGestor.agregarCondicion(condArqCompAprobado);
  sistOperGestor.agregarCondicion(condProg2Exonerado);
  sistOperGestor.agregarCondicion(condGal1Exonerado);
  sistOperGestor.agregarCondicion(condMd1Exonerado);
  sistOperGestor.agregarCondicion(condCdivExonerado);
  const condSistOperAprobacion = new CondicionAprobacionMateria(sistOper);

  const teoLeng = new Curso('Teoría de Lenguajes');
  const teoLengGestor = new GestorHabilitacion(teoLeng);
  gestores.set(teoLeng.getNombre(), teoLengGestor);
  teoLeng.setCreditos(12);
  teoLengGestor.agregarCondicion(condLogicaExonerado);
  teoLengGestor.agregarCondicion(condProg3Aprobado);
  teoLengGestor.agregarCondicion(condMd1Exonerado);
  teoLengGestor.agregarCondicion(condGal1Exonerado);
  teoLengGestor.agregarCondicion(condCdivExonerado);
  const condTeoLengAprobacion = new CondicionAprobacionMateria(teoLeng);
  const condTeoLengExonerado = new CondicionExoneracionMateria(teoLeng);

  const agpi = new Curso('Administración General para Ingenieros');
  const agpiGestor = new GestorHabilitacion(agpi);
  gestores.set(agpi.getNombre(), agpiGestor);
  agpi.setCreditos(5);
  const condAgpiExonerado = new CondicionExoneracionMateria(agpi);

  const fbd = new Curso('Fundamentos de Bases de Datos');
  const fbdGestor = new GestorHabilitacion(fbd);
  gestores.set(fbd.getNombre(), fbdGestor);
  fbd.setCreditos(15);
  const condFbdAprobado = new CondicionAprobacionMateria(fbd);
  const condFbdExonerado = new CondicionExoneracionMateria(fbd);
  fbdGestor.agregarCondicion(condLogicaExonerado);
  fbdGestor.agregarCondicion(condMd2Exonerado);
  fbdGestor.agregarCondicion(condProg3Exonerado);

  const tprog = new Taller('Taller de Programación');
  const tprogGestor = new GestorHabilitacion(tprog);
  gestores.set(tprog.getNombre(), tprogGestor);
  tprog.setCreditos(15);
  const ruta1Tprog = new CondicionAnd([condProg3Exonerado, condProg4Aprobado]);
  const tprogRutas = new CondicionOr([ruta1Tprog, condProg4Exonerado]);
  tprogGestor.agregarCondicion(tprogRutas);
  const condTprogExonerado = new CondicionExoneracionMateria(tprog);

  const redesComp = new Curso('Redes de Computadoras');
  const redesCompGestor = new GestorHabilitacion(redesComp);
  gestores.set(redesComp.getNombre(), redesCompGestor);
  redesComp.setCreditos(12);
  redesCompGestor.agregarCondicion(condSistOperAprobacion);

  const pai = new Curso('Prácticas de Administración para Ingenieros');
  const paiGestor = new GestorHabilitacion(pai);
  gestores.set(pai.getNombre(), paiGestor);
  pai.setCreditos(5);
  paiGestor.agregarCondicion(condAgpiExonerado)

  const tiis = new Taller('Taller Introductorio de Ingeniería de Software');
  const tiisGestor = new GestorHabilitacion(tiis);
  gestores.set(tiis.getNombre(), tiisGestor);
  tiis.setCreditos(10);
  tiisGestor.agregarCondicion(condProg4Aprobado);
  tiisGestor.agregarCondicion(condFbdAprobado);
  tiisGestor.agregarCondicion(condTprogExonerado);
  const condTiisExonerado = new CondicionExoneracionMateria(tiis);

  const progLog = new Curso('Programación Lógica');
  const progLogGestor = new GestorHabilitacion(progLog);
  gestores.set(progLog.getNombre(), progLogGestor);
  progLog.setCreditos(10);
  progLogGestor.agregarCondicion(condTeoLengExonerado);
  progLogGestor.agregarCondicion(condLogicaExonerado);
  progLogGestor.agregarCondicion(condProg3Exonerado);
  progLogGestor.agregarCondicion(condMd2Exonerado);

  const progFunc = new Curso('Programación Funcional');
  const progFuncGestor = new GestorHabilitacion(progFunc);
  gestores.set(progFunc.getNombre(), progFuncGestor);
  progFunc.setCreditos(10);
  progFuncGestor.agregarCondicion(condTeoLengExonerado);
  progFuncGestor.agregarCondicion(condProg2Exonerado);
  progFuncGestor.agregarCondicion(condMd1Exonerado);
  progFuncGestor.agregarCondicion(condLogicaExonerado);

  const fis1 = new Curso('Física 1');
  const fis1Gestor = new GestorHabilitacion(fis1);
  gestores.set(fis1.getNombre(), fis1Gestor);
  fis1.setCreditos(10);
  const condFis1Aprobado = new CondicionAprobacionMateria(fis1);
  const condFis1Exonerado = new CondicionExoneracionMateria(fis1);

  const pis = new Curso('Proyecto de Ingeniería de Software');
  const pisGestor = new GestorHabilitacion(pis);
  gestores.set(pis.getNombre(), pisGestor);
  pis.setCreditos(15);
  pisGestor.agregarCondicion(condTiisExonerado);

  const econ = new Curso('Economía');
  const econGestor = new GestorHabilitacion(econ);
  gestores.set(econ.getNombre(), econGestor);
  econ.setCreditos(7);
  const condEconAprobado = new CondicionAprobacionMateria(econ);
  const condEconExonerado = new CondicionExoneracionMateria(econ);

  const pol = new Curso('Políticas Científicas en Información y Computación');
  const polGestor = new GestorHabilitacion(pol);
  gestores.set(pol.getNombre(), polGestor);
  pol.setCreditos(3);
  const condPolAprobado = new CondicionAprobacionMateria(pol);
  const condPolExonerado = new CondicionExoneracionMateria(pol);

  const tutPar = new Taller('Tutoría Entre Pares');
  const tutParGestor = new GestorHabilitacion(tutPar);
  gestores.set(tutPar.getNombre(), tutParGestor);
  tutPar.setCreditos(8);

  const sem1 = [gal1, md1, prog1];
  const sem2 = [cdiv, gal2, md2, prog2];
  const sem3 = [cdivv, logica, prog4];
  const sem4 = [pye, prog3, arqComp, metNum];
  const sem5 = [iio, sistOper, teoLeng, agpi]
  const sem6 = [fbd, tprog, redesComp, pai];
  const sem7 = [tiis, progLog, progFunc, fis1];
  const sem8 = [pis, econ, pol];
  const opt = [tutPar]

  semImpar = [sem1, sem2, sem3, sem5, sem7].flat();
  semPar = [sem1, sem2, sem4, sem6, sem8].flat();
  semPar.push(fis1, tutPar);
  semImpar.push(pye);

  const todasMaterias = [sem1, sem2, sem3, sem4, sem5, sem6, sem7, sem8, opt].flat();

  const cond140CreditosTotales = new CondicionCreditosTotales(140, todasMaterias);
  agpiGestor.agregarCondicion(cond140CreditosTotales);

  return [sem1, sem2, sem3, sem4, sem5, sem6, sem7, sem8, opt];
}

function avanzarEstado(materia: Materia): EstadoMateria {
  if (materia.esTaller()) {
    // Solo alterna entre "no_aprobado" y "exonerado"
    switch (materia.getEstado()) {
      case "no_aprobado":
        return "exonerado";
      case "exonerado":
        return "no_aprobado";
      default:
        return "no_aprobado"; // fallback seguro
    }
  } else {
    // Para materias regulares (cursos)
    switch (materia.getEstado()) {
      case "no_aprobado":
        return "aprobado";
      case "aprobado":
        return "exonerado";
      case "exonerado":
        return "no_aprobado";
      default:
        return "no_aprobado"; // fallback seguro
    }
  }
}

const Page = () => {
  const [tipoSemestre, setTipoSemestre] = useState<'par' | 'impar'>('par');
  const [materiasHabilitadas, setMateriasHabilitadas] = useState<Materia[]>([]);
  const [semestres, setSemestres] = useState<Materia[][]>(crearSemestres());
  const materiasIniciales = new Map<string, EstadoMateria>();
  const creditosPlan = {};
  const creditosGrupo = {};

  const [padron, setPadron] = useState<Padron>(new Padron(materiasIniciales, creditosPlan, creditosGrupo));

  function actualizarEstadosPorHabilitacion(padron: Padron, semestres: Materia[][]) {
    const todasLasMaterias = semestres.flat();
    const ordenadas = ordenarMateriasTopologicamente(todasLasMaterias);

    // Primero, resetea todas a "no_aprobado"
    for (const materia of ordenadas) {
      materia.setEstado("no_aprobado");
    }

    // Luego, recorre en orden topológico y habilita solo las que correspondan
    for (const materia of ordenadas) {
      if (materia.isHabilitado(padron)) {
        // Si la materia ya estaba aprobada/exonerada en el padron, mantenla así
        const estadoPadron = padron.materiasAprobadas.get(materia.getNombre());
        if (estadoPadron) {
          materia.setEstado(estadoPadron);
        }
      } else {
        // Si no está habilitada, quítala del padrón
        padron.materiasAprobadas.delete(materia.getNombre());
      }
    }
  }

const handleCursoClick = (curso: Materia) => {
  console.log("Click en materia:", curso.getNombre());
  const gestor = GestorManager.obtenerGestorParaCurso(curso);

  // Registrar gestores si es necesario (esto normalmente solo una vez, no en cada click)
  for (const [nombre, gestor] of gestores.entries()) {
    GestorManager.registrarGestor(nombre, gestor);
  }

  console.log("Gestor obtenido:", gestor);
  if (!gestor) return;

  const habilitado = gestor.evaluarYPropagar(padron);
  console.log("Habilitado?", habilitado);
  if (!habilitado) return;

  const nuevoEstado = avanzarEstado(curso);

  // NO modificar el objeto original, crear uno nuevo
  const materiaActualizada = Object.create(Object.getPrototypeOf(curso));
  Object.assign(materiaActualizada, curso);
  materiaActualizada.setEstado(nuevoEstado);

  const materiaId = curso.getNombre();

  if (nuevoEstado === "aprobado") {
    padron.aprobarMateria(materiaId);
  } else if (nuevoEstado === "exonerado") {
    padron.exonerarMateria(materiaId);
  } else {
    padron.materiasAprobadas.delete(materiaId);
  }

  // Crear nuevo objeto Padron para forzar actualización
  const nuevoPadron = new Padron(
    new Map(padron.materiasAprobadas),
    { ...padron.creditosPorPlan },
    { ...padron.creditosPorGrupo }
  );

  // Actualizar semestres clonando y reemplazando el curso modificado
  const nuevosSemestres = semestres.map(semestre =>
    semestre.map(c =>
      c.getNombre() === curso.getNombre() ? materiaActualizada : c
    )
  );

  // ACTUALIZAR ESTADOS POR HABILITACIÓN
  actualizarEstadosPorHabilitacion(nuevoPadron, nuevosSemestres);

  setPadron(nuevoPadron);
  setSemestres(nuevosSemestres);
};

  function creditosTotales(semestres: Materia[][]) {
    return semestres.flat().reduce(
      (acc, materia) => acc + (materia.getEstado() === "exonerado" ? materia.getCreditos() : 0),
      0
    );
  }

  function creditosSemestre(semestre: Materia[]) {
    return semestre.reduce(
      (acc, materia) => acc + (materia.getEstado() === "exonerado" ? materia.getCreditos() : 0),
      0
    );
  }

  function calcularMateriasHabilitadas() {
    // Selecciona los semestres según el tipo
    const seleccion = tipoSemestre === 'par'
      ? semPar
      : semImpar;

    // Filtra materias habilitadas y no aprobadas
    const resultado = seleccion
      .flat()
      .filter(m => m.isHabilitado(padron) && m.getEstado() === "no_aprobado");

    setMateriasHabilitadas(resultado);
  }

  return (
    <main style={{ padding: 24 }}>
      <div style={{ marginBottom: 32, fontWeight: 'bold', fontSize: 18 }}>
        Créditos totales exonerados: {creditosTotales(semestres)}
      </div>
      {semestres.map((semestre, i) => (
        <section key={i} style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: '8px 0', fontWeight: 'bold' }}>
              {i < 8 ? `Semestre ${i + 1}` : 'Optativas'}
            </h3>
            <span style={{ fontWeight: 'bold', color: '#555' }}>
              Créditos exonerados: {creditosSemestre(semestre)}
            </span>
          </div>
          <div style={{
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
            justifyContent: 'center',
            background: i % 2 === 0 ? '#f7f7f7' : '#fff',
            padding: 12,
            borderRadius: 8
          }}>
            {semestre.map((curso) => (
              <CursoCard
                habilitado={curso.isHabilitado(padron)}
                key={curso.getNombre()}
                curso={curso}
                padron={padron}
                onClick={() => handleCursoClick(curso)}
                style={{
                  minWidth: 160,
                  maxWidth: 180,
                  flex: '1 0 160px'
                }}
              />
            ))}
          </div>
        </section>
      ))}
      <div style={{ marginTop: 40, textAlign: 'center' }}>
        <div style={{ marginBottom: 12 }}>
          <label>
            <input
              type="radio"
              checked={tipoSemestre === 'par'}
              onChange={() => setTipoSemestre('par')}
            /> Semestre Par
          </label>
          <label style={{ marginLeft: 16 }}>
            <input
              type="radio"
              checked={tipoSemestre === 'impar'}
              onChange={() => setTipoSemestre('impar')}
            /> Semestre Impar
          </label>
        </div>
        <button className='bg-blue-500 text-white'
          style={{ padding: '8px 20px', fontWeight: 'bold', borderRadius: 6, cursor: 'pointer' }}
          onClick={calcularMateriasHabilitadas}
        >
          Generar Semestre
        </button>
        {materiasHabilitadas.length > 0 && (
          <div style={{ marginTop: 24 }}>
            <h4 className='font-bold'>Materias habilitadas y no aprobadas ({tipoSemestre}):</h4>
            <ul>
              {materiasHabilitadas.map(m => (
                <li className='my-2' key={m.getNombre()}>{m.getNombre()}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
};

export default Page;