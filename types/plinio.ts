import { StrapiCollectionResponse } from "./strapi";

export type PlinioResponse = StrapiCollectionResponse<{
  documentId: string;
  nome: string;
  conteudo: {
    url: string;
  }[];
}>;

export type Plinio = {
  documentId: string;
  nome: string;
  url: string;
};
