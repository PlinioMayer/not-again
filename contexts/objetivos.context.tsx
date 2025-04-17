import { Objetivo, Plinio } from "@/types";
import { axiosInstance } from "@/utils";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export const ObjetivosContext = createContext<{
  objetivos?: Objetivo[] | null;
  get: (id: string) => Objetivo | undefined;
  fetch: () => Promise<void>;
  create: (nome: string) => Promise<Plinio | undefined | null>;
  update: (
    id: string,
    data: Omit<Partial<Objetivo>, "fim"> & { fim: Date | "today" },
  ) => Promise<Plinio | undefined | null>;
  delette: (id: string) => Promise<boolean>;
}>({
  get: () => {
    throw new Error("ObjetivosContext.get não inicializado");
  },
  fetch: () => {
    throw new Error("ObjetivosContext.fetch não inicializado");
  },
  create: () => {
    throw new Error("ObjetivosContext.create não inicializado");
  },
  update: () => {
    throw new Error("ObjetivosContext.update não inicializado");
  },
  delette: () => {
    throw new Error("ObjetivosContext.delette não inicializado");
  },
});

export const ObjetivosProvider = ({ children }: { children: ReactNode }) => {
  const [objetivos, setObjetivos] = useState<Objetivo[] | undefined | null>();

  const fetch = useCallback(() => {
    setObjetivos(undefined);
    return axiosInstance.objetivos.get().then(setObjetivos);
  }, [setObjetivos]);

  const get = useCallback(
    (id: string): Objetivo | undefined => {
      return objetivos?.find((objetivo) => objetivo.documentId === id);
    },
    [objetivos],
  );

  const create = useCallback(
    async (nome: string): Promise<Plinio | undefined | null> => {
      const res = await axiosInstance.objetivos.create({
        nome: nome,
        inicio: new Date(),
        fim: new Date(),
      });

      return res;
    },
    [],
  );

  const update = useCallback(
    async (
      id: string,
      data: Omit<Partial<Objetivo>, "fim"> & { fim: Date | "today" },
    ): Promise<Plinio | undefined | null> => {
      const res = await axiosInstance.objetivos.update(id, data);

      return res;
    },
    [],
  );

  const delette = useCallback(
    async (id: string): Promise<boolean> => {
      const res = await axiosInstance.objetivos.delete(id);

      if (!res) {
        return false;
      }

      await fetch();
      return true;
    },
    [fetch],
  );

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <ObjetivosContext.Provider
      value={{ objetivos, fetch, create, update, get, delette }}
    >
      {children}
    </ObjetivosContext.Provider>
  );
};

export const useObjetivos = () => useContext(ObjetivosContext);
