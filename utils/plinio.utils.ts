import { Objetivo, Plinio } from "@/types";
import { Image } from "react-native";
import { daysBetween } from "./date.utils";

const PLINIOS: Plinio[] = [
  {
    id: require("@/assets/images/plinios/plinio_fetal.png"),
    nome: "Plínio Fetal",
    uri: Image.resolveAssetSource(
      require("@/assets/images/plinios/plinio_fetal.png"),
    ).uri,
    dias: 0,
  },
  {
    id: require("@/assets/images/plinios/plinio_magoado.png"),
    nome: "Plínio Magoado",
    uri: Image.resolveAssetSource(
      require("@/assets/images/plinios/plinio_magoado.png"),
    ).uri,
    dias: 1,
  },
  {
    id: require("@/assets/images/plinios/plinio_confiante.png"),
    nome: "Plínio Confiante",
    uri: Image.resolveAssetSource(
      require("@/assets/images/plinios/plinio_confiante.png"),
    ).uri,
    dias: 3,
  },
  {
    id: require("@/assets/images/plinios/plinio_esperancoso.png"),
    nome: "Plínio Esperançoso",
    uri: Image.resolveAssetSource(
      require("@/assets/images/plinios/plinio_esperancoso.png"),
    ).uri,
    dias: 5,
  },
  {
    id: require("@/assets/images/plinios/plinio_soninho.png"),
    nome: "Plínio Soninho",
    uri: Image.resolveAssetSource(
      require("@/assets/images/plinios/plinio_soninho.png"),
    ).uri,
    dias: 7,
  },
  {
    id: require("@/assets/images/plinios/plinio_filosofo.png"),
    nome: "Plínio Soninho",
    uri: Image.resolveAssetSource(
      require("@/assets/images/plinios/plinio_filosofo.png"),
    ).uri,
    dias: 14,
  },
  {
    id: require("@/assets/images/plinios/plinio_maneiro.png"),
    nome: "Plínio Maneiro",
    uri: Image.resolveAssetSource(
      require("@/assets/images/plinios/plinio_maneiro.png"),
    ).uri,
    dias: 30,
  },
  {
    id: require("@/assets/images/plinios/plinio_maromba.png"),
    nome: "Plínio Maromba",
    uri: Image.resolveAssetSource(
      require("@/assets/images/plinios/plinio_maromba.png"),
    ).uri,
    dias: 60,
  },
  {
    id: require("@/assets/images/plinios/plinio_espacial.png"),
    nome: "Plínio Espacial",
    uri: Image.resolveAssetSource(
      require("@/assets/images/plinios/plinio_espacial.png"),
    ).uri,
    dias: 90,
  },
  {
    id: require("@/assets/images/plinios/plinio_cangaceiro.png"),
    nome: "Plínio Cangaceiro",
    uri: Image.resolveAssetSource(
      require("@/assets/images/plinios/plinio_cangaceiro.png"),
    ).uri,
    dias: 120,
  },
  {
    id: require("@/assets/images/plinios/plinio_bolsonarista.png"),
    nome: "Plínio Bolsonarista",
    uri: Image.resolveAssetSource(
      require("@/assets/images/plinios/plinio_bolsonarista.png"),
    ).uri,
    dias: 150,
  },
  {
    id: require("@/assets/images/plinios/plinio_real.png"),
    nome: "Plínio Real",
    uri: Image.resolveAssetSource(
      require("@/assets/images/plinios/plinio_real.png"),
    ).uri,
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
