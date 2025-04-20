import {
  CreateObjetivo,
  CreateObjetivoResponse,
  Objetivo,
  ObjetivoStrapiResponse,
  Plinio,
  PlinioCollectionResponse,
  PlinioSingleResponse,
} from "@/types";
import axios, { AxiosInstance } from "axios";
import { format } from "./date.utils";
import { CMS_HOST, CMS_TOKEN } from "./environment.utils";

export type CustomAxiosInstance = AxiosInstance & {
  objetivos: {
    get: () => Promise<Objetivo[] | null>;
    create: (
      objetivo: Omit<Objetivo, "criadoEm" | "plinio" | "documentId">,
    ) => Promise<CreateObjetivo | null>;
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
      const objetivos = await axiosInstance.get<ObjetivoStrapiResponse>(
        CMS_HOST! + "/api/objetivos",
        {
          params: {
            plinio: true,
          },
          headers: {
            Authorization: `Bearer ${CMS_TOKEN}`,
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
          url: CMS_HOST + objetivo.plinio.conteudo[0].url,
        },
      }));
    } catch {
      return null;
    }
  },
  create: async (
    objetivo: Omit<Objetivo, "criadoEm" | "plinio" | "documentId">,
  ): Promise<CreateObjetivo | null> => {
    try {
      const response = await axiosInstance.post<CreateObjetivoResponse>(
        CMS_HOST + "/api/objetivos",
        {
          data: {
            ...objetivo,
            inicio: format(objetivo.inicio),
            fim: format(objetivo.fim),
          },
        },
        {
          headers: {
            Authorization: `Bearer ${CMS_TOKEN}`,
          },
        },
      );
      const result: CreateObjetivo = {
        objetivo: {
          documentId: response.data.objetivo.documentId,
          nome: response.data.objetivo.nome,
          inicio: new Date(response.data.objetivo.inicio),
          fim: new Date(response.data.objetivo.fim),
          criadoEm: new Date(response.data.objetivo.createdAt),
        },
      };

      if (response.data.plinio?.documentId) {
        result.plinio = {
          documentId: response.data.plinio!.documentId,
          nome: response.data.plinio!.nome,
          url: CMS_HOST + response.data.plinio!.conteudo[0].url,
        };
      }

      return result;
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
        `${CMS_HOST}/api/objetivos/${id}`,
        {
          data,
        },
        {
          headers: {
            Authorization: `Bearer ${CMS_TOKEN}`,
          },
        },
      );
      if (!response.data.documentId) {
        return undefined;
      }

      return {
        documentId: response.data.documentId,
        nome: response.data.nome,
        url: CMS_HOST + response.data.conteudo[0].url,
      };
    } catch {
      return null;
    }
  },
  delete: async (id: string): Promise<boolean> => {
    try {
      await axiosInstance.delete(`${CMS_HOST}/api/objetivos/${id}`, {
        headers: {
          Authorization: `Bearer ${CMS_TOKEN}`,
        },
      });
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
        CMS_HOST! + "/api/plinios",
        {
          params: {
            byObjetivo: true,
            sort: "dias:desc",
            populate: "conteudo",
          },
          headers: {
            Authorization: `Bearer ${CMS_TOKEN}`,
          },
        },
      );

      return plinios.data.data.map((plinio) => ({
        documentId: plinio.documentId,
        nome: plinio.nome,
        url: CMS_HOST + plinio.conteudo[0].url,
      }));
    } catch {
      return null;
    }
  },
};

axiosInstance.utils = {
  today: (): Promise<Date | null> => {
    return axiosInstance
      .get<string>(CMS_HOST! + "/api/utils/today")
      .then((r) => new Date(r.data))
      .catch(() => null);
  },
};
