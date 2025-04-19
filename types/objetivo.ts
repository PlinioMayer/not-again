import { Plinio, PlinioSingleResponse } from "./plinio";
import { StrapiCollectionResponse } from "./strapi";

type ObjetivoResponse = {
  documentId: string;
  nome: string;
  inicio: string;
  fim: string;
  createdAt: string;
  plinio: {
    documentId: string;
    nome: string;
    conteudo: {
      url: string;
    }[];
  };
};

export type ObjetivoForm = {
  nome: string;
};

export type ObjetivoStrapiResponse = StrapiCollectionResponse<ObjetivoResponse>;

export type Objetivo = {
  documentId: string;
  nome: string;
  inicio: Date;
  fim: Date;
  criadoEm: Date;
  plinio: Plinio;
};

export type CreateObjetivoResponse = {
  objetivo: ObjetivoResponse;
  plinio?: PlinioSingleResponse;
};

export type CreateObjetivo = {
  objetivo: Omit<Objetivo, "plinio">;
  plinio?: Plinio;
};
