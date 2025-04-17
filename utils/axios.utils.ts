import {
  Objetivo,
  ObjetivoResponse,
  Plinio,
  PlinioCollectionResponse,
  PlinioSingleResponse,
} from "@/types";
import axios, { AxiosInstance } from "axios";
import { format } from "./date.utils";

export type CustomAxiosInstance = AxiosInstance & {
  objetivos: {
    get: () => Promise<Objetivo[] | null>;
    create: (
      objetivo: Omit<Objetivo, "criadoEm" | "plinio" | "documentId">,
    ) => Promise<Plinio | undefined | null>;
    update: (
      id: string,
      data: Omit<Partial<Objetivo>, "fim"> & { fim: Date | "today" },
    ) => Promise<Plinio | undefined | null>;
    delete: (id: string) => Promise<boolean>;
  };
  plinios: {
    get: () => Promise<Plinio[] | null>;
  };
  utils: {
    today: () => Promise<Date | null>;
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
          documentId: objetivo.plinio.documentId,
          nome: objetivo.plinio.nome,
          url:
            process.env.EXPO_PUBLIC_CMS_HOST + objetivo.plinio.conteudo[0].url,
        },
      }));
    } catch {
      return null;
    }
  },
  create: async (
    objetivo: Omit<Objetivo, "criadoEm" | "plinio" | "documentId">,
  ): Promise<Plinio | undefined | null> => {
    try {
      const response = await axiosInstance.post<PlinioSingleResponse>(
        process.env.EXPO_PUBLIC_CMS_HOST + "/api/objetivos",
        {
          data: {
            ...objetivo,
            inicio: format(objetivo.inicio),
            fim: format(objetivo.fim),
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_CMS_TOKEN}`,
          },
        },
      );

      if (!response.data.documentId) {
        return undefined;
      }

      return {
        documentId: response.data.documentId,
        nome: response.data.nome,
        url: process.env.EXPO_PUBLIC_CMS_HOST + response.data.conteudo[0].url,
      };
    } catch {
      return null;
    }
  },
  update: async (
    id: string,
    data: Omit<Partial<Objetivo>, "fim"> & { fim: Date | "today" },
  ): Promise<Plinio | undefined | null> => {
    try {
      const response = await axiosInstance.put<PlinioSingleResponse>(
        `${process.env.EXPO_PUBLIC_CMS_HOST}/api/objetivos/${id}`,
        {
          data,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_CMS_TOKEN}`,
          },
        },
      );
      if (!response.data.documentId) {
        return undefined;
      }

      return {
        documentId: response.data.documentId,
        nome: response.data.nome,
        url: process.env.EXPO_PUBLIC_CMS_HOST + response.data.conteudo[0].url,
      };
    } catch {
      return null;
    }
  },
  delete: async (id: string): Promise<boolean> => {
    try {
      await axiosInstance.delete(
        `${process.env.EXPO_PUBLIC_CMS_HOST}/api/objetivos/${id}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_CMS_TOKEN}`,
          },
        },
      );
      return true;
    } catch {
      return false;
    }
  },
};

axiosInstance.plinios = {
  get: async (): Promise<Plinio[] | null> => {
    try {
      const plinios = await axiosInstance.get<PlinioCollectionResponse>(
        process.env.EXPO_PUBLIC_CMS_HOST! + "/api/plinios",
        {
          params: {
            byObjetivo: true,
            sort: "dias:desc",
            populate: "conteudo",
          },
          headers: {
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_CMS_TOKEN}`,
          },
        },
      );

      return plinios.data.data.map((plinio) => ({
        documentId: plinio.documentId,
        nome: plinio.nome,
        url: process.env.EXPO_PUBLIC_CMS_HOST + plinio.conteudo[0].url,
      }));
    } catch {
      return null;
    }
  },
};

axiosInstance.utils = {
  today: (): Promise<Date | null> => {
    return axiosInstance
      .get<string>(process.env.EXPO_PUBLIC_CMS_HOST! + "/api/utils/today")
      .then((r) => new Date(r.data))
      .catch(() => null);
  },
};
