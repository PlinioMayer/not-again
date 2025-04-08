import { Plinio, PlinioResponse } from "./plinio";
import { StrapiCollectionResponse } from "./strapi";

export type ObjetivoResponse = StrapiCollectionResponse<{
  documentId: string;
  nome: string;
  inicio: string;
  fim: string;
  createdAt: string;
  plinio: PlinioResponse;
}>;

export type Objetivo = {
  documentId: string;
  nome: string;
  inicio: Date;
  fim: Date;
  criadoEm: Date;
  plinio: Plinio;
};
