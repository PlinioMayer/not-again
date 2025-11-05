import { Plinio } from "./plinio";

export type ObjetivoForm = {
  nome: string;
};

export type Objetivo = {
  nome: string;
  inicio: Date;
  fim: Date;
  plinio?: Plinio;
  excluido?: Date;
};
