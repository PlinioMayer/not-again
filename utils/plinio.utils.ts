import { Objetivo, Plinio } from "@/types";
import { daysBetween } from "./date.utils";

export const PLINIOS: Plinio[] = [
  {
    id: 0,
    nome: "Plínio Fetal",
    uri: require("@/assets/images/plinios/plinio_fetal.png"),
    dias: 0,
  },
  {
    id: 1,
    nome: "Plínio Magoado",
    uri: require("@/assets/images/plinios/plinio_magoado.png"),
    dias: 1,
  },
  {
    id: 2,
    nome: "Plínio Confiante",
    uri: require("@/assets/images/plinios/plinio_confiante.png"),
    dias: 3,
  },
  {
    id: 3,
    nome: "Plínio Esperançoso",
    uri: require("@/assets/images/plinios/plinio_esperancoso.png"),
    dias: 5,
  },
  {
    id: 4,
    nome: "Plínio Soninho",
    uri: require("@/assets/images/plinios/plinio_soninho.png"),
    dias: 7,
  },
  {
    id: 5,
    nome: "Plínio Soninho",
    uri: require("@/assets/images/plinios/plinio_filosofo.png"),
    dias: 14,
  },
  {
    id: 6,
    nome: "Plínio Maneiro",
    uri: require("@/assets/images/plinios/plinio_maneiro.png"),
    dias: 30,
  },
  {
    id: 7,
    nome: "Plínio Maromba",
    uri: require("@/assets/images/plinios/plinio_maromba.png"),
    dias: 60,
  },
  {
    id: 8,
    nome: "Plínio Espacial",
    uri: require("@/assets/images/plinios/plinio_espacial.png"),
    dias: 90,
  },
  {
    id: 9,
    nome: "Plínio Cangaceiro",
    uri: require("@/assets/images/plinios/plinio_cangaceiro.png"),
    dias: 120,
  },
  {
    id: 10,
    nome: "Plínio Bolsonarista",
    uri: require("@/assets/images/plinios/plinio_bolsonarista.png"),
    dias: 150,
  },
  {
    id: 11,
    nome: "Plínio Real",
    uri: require("@/assets/images/plinios/plinio_real.png"),
    dias: 180,
  },
];

export const getMaxPlinio = (objetivos: Objetivo[]): Plinio => {
  const maxObjetivo = objetivos
    .slice(0)
    .sort(
      (a, b) => daysBetween(b.inicio, b.fim) - daysBetween(a.inicio, a.fim),
    )[0];

  let plinio: Plinio = PLINIOS[0];
  for (const current of PLINIOS) {
    if (daysBetween(maxObjetivo.inicio, maxObjetivo.fim) >= current.dias) {
      plinio = current;
    } else {
      break;
    }
  }

  return plinio;
};

export const getAllPlinios = (objetivos: Objetivo[]): Plinio[] => {
  const plinios: Plinio[] = [];
  const maxObjetivo = objetivos
    .slice(0)
    .sort(
      (a, b) => daysBetween(b.inicio, b.fim) - daysBetween(a.inicio, a.fim),
    )[0];

  if (!maxObjetivo) {
    return [];
  }

  for (const plinio of PLINIOS) {
    if (daysBetween(maxObjetivo.inicio, maxObjetivo.fim) >= plinio.dias) {
      plinios.push(plinio);
    } else {
      break;
    }
  }

  return plinios;
};

export const getPlinioFromObjetivo = (objetivo: Objetivo): Plinio => {
  let plinio: Plinio = PLINIOS[0];
  for (const current of PLINIOS) {
    if (daysBetween(objetivo.inicio, objetivo.fim) >= current.dias) {
      plinio = current;
    } else {
      break;
    }
  }

  return plinio;
};
