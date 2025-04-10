import { Plinio } from "./plinio";
import { StrapiCollectionResponse } from "./strapi";

export type ObjetivoForm = {
  nome: string;
};

export type ObjetivoResponse = StrapiCollectionResponse<{
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
}>;

export type Objetivo = {
  documentId: string;
  nome: string;
  inicio: Date;
  fim: Date;
  criadoEm: Date;
  plinio: Plinio;
};
