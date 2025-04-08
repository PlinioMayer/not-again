import { Objetivo, ObjetivoResponse } from "@/types";
import axios, { AxiosInstance } from "axios";
import { createContext, ReactNode, useContext } from "react";

export type CustomAxiosInstance = AxiosInstance & {
  objetivos: {
    get: () => Promise<Objetivo[] | null>;
  };
};

const axiosInstance = axios.create() as CustomAxiosInstance;

axiosInstance.objetivos = {
  get: async (): Promise<Objetivo[] | null> => {
    try {
      const objetivos = await axiosInstance.get<ObjetivoResponse>(
        process.env.EXPO_PUBLIC_CMS_HOST!,
        {
          headers: {
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_CMS_TOKEN}`,
          },
        },
      );
      return objetivos.data.data.map((objetivo) => ({
        documentId: objetivo.documentId,
        nome: objetivo.nome,
        inicio: new Date(objetivo.inicio),
        fim: new Date(objetivo.fim),
        criadoEm: new Date(objetivo.createdAt),
        plinio: {
          nome: objetivo.plinio.nome,
          url: process.env.EXPO_PUBLIC_CMS_HOST + objetivo.plinio.conteudo.url,
        },
      }));
    } catch {
      return null;
    }
  },
};

export const AxiosContext = createContext<CustomAxiosInstance>(axiosInstance);
export const AxiosProvider = ({ children }: { children: ReactNode }) => (
  <AxiosContext.Provider value={axiosInstance}>
    {children}
  </AxiosContext.Provider>
);
export const useAxios = () => useContext(AxiosContext);
