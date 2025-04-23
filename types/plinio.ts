import { StrapiCollectionResponse } from "./strapi";

export type PlinioCollectionResponse = StrapiCollectionResponse<{
  documentId: string;
  nome: string;
  dias: string;
  conteudo: {
    url: string;
  }[];
}>;

export type PlinioSingleResponse = {
  documentId: string;
  nome: string;
  dias: string;
  conteudo: {
    url: string;
  }[];
};

export type Plinio = {
  documentId: string;
  nome: string;
  url: string;
  dias: number;
};
