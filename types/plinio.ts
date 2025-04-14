import { StrapiCollectionResponse } from "./strapi";

export type PlinioCollectionResponse = StrapiCollectionResponse<{
  documentId: string;
  nome: string;
  conteudo: {
    url: string;
  }[];
}>;

export type PlinioSingleResponse = {
  documentId: string;
  nome: string;
  conteudo: {
    url: string;
  }[];
};

export type Plinio = {
  documentId: string;
  nome: string;
  url: string;
};
