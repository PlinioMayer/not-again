import { Objetivo } from "@/types";
import axios, { AxiosInstance } from "axios";

export type CustomAxiosInstance = AxiosInstance & {
  objetivos: {
    get: () => Promise<Objetivo[] | null>;
  };
};

export const axiosInstance = axios.create() as CustomAxiosInstance;

axiosInstance.objetivos = {
  get: async (): Promise<Objetivo[] | null> => {
    try {
      const objetivos = {
        data: {
          data: [
            {
              documentId: "documentId",
              nome: "Nome",
              inicio: "2025-04-08",
              fim: "2025-04-08",
              createdAt: "2025-04-08",
              plinio: {
                nome: "Plínio",
                conteudo: {
                  url: "/assets/assets//images/react-logo.png",
                },
              },
            },
          ],
        },
      };

      // await axiosInstance.get<ObjetivoResponse>(
      //   process.env.EXPO_PUBLIC_CMS_HOST!,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${process.env.EXPO_PUBLIC_CMS_TOKEN}`,
      //     },
      //   },
      // );
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
