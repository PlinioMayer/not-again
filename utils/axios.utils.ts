import { Objetivo, ObjetivoResponse } from "@/types";
import axios, { AxiosInstance } from "axios";

export type CustomAxiosInstance = AxiosInstance & {
  objetivos: {
    get: () => Promise<Objetivo[] | null>;
  };
  utils: {
    today: () => Promise<string | null>;
  };
};

export const axiosInstance = axios.create() as CustomAxiosInstance;

axiosInstance.objetivos = {
  get: async (): Promise<Objetivo[] | null> => {
    try {
      const objetivos = await axiosInstance.get<ObjetivoResponse>(
        process.env.EXPO_PUBLIC_CMS_HOST! + "/api/objetivos",
        {
          params: {
            plinio: true,
          },
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
          url:
            process.env.EXPO_PUBLIC_CMS_HOST + objetivo.plinio.conteudo[0].url,
        },
      }));
    } catch {
      return null;
    }
  },
};

axiosInstance.utils = {
  today: (): Promise<string | null> => {
    return axiosInstance
      .get<string>(process.env.EXPO_PUBLIC_CMS_HOST! + "/api/utils/today")
      .then((r) => r.data)
      .catch(() => null);
  },
};
