import { Objetivo } from "@/types";
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
  update: (id: string, data: Partial<Objetivo>) => Promise<boolean>;
  delette: (id: string) => Promise<boolean>;
}>({
  get: () => {
    throw new Error("ObjetivosContext.get não inicializado");
  },
  fetch: () => {
    throw new Error("ObjetivosContext.fetch não inicializado");
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
      if (!objetivos) {
        throw new Error("Objetivos não inicializados");
      }

      return objetivos.find((objetivo) => objetivo.documentId === id);
    },
    [objetivos],
  );

  const update = useCallback(
    async (id: string, data: Partial<Objetivo>): Promise<boolean> => {
      if (!objetivos) {
        throw new Error("Objetivos não inicializados");
      }

      if (!(await axiosInstance.objetivos.update(id, data))) {
        return false;
      }

      const objetivo = get(id);

      if (!objetivo) {
        throw new Error(`Objetivo com id ${id} não encontrado`);
      }

      for (const key in data) {
        (objetivo as Record<string, unknown>)[key] = (
          data as Record<string, unknown>
        )[key];
      }

      setObjetivos([...objetivos]);

      return true;
    },
    [objetivos, get],
  );

  const delette = useCallback(
    async (id: string): Promise<boolean> => {
      if (!objetivos) {
        throw new Error("Objetivos não inicializados");
      }

      if (!(await axiosInstance.objetivos.delete(id))) {
        return false;
      }

      const index = objetivos.findIndex(
        (objetivo) => objetivo.documentId === id,
      );

      if (index < 0) {
        throw new Error(`Objetivo com id ${id} não encontrado`);
      }

      objetivos.splice(index, 1);
      setObjetivos([...objetivos]);
      return true;
    },
    [objetivos],
  );

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <ObjetivosContext.Provider
      value={{ objetivos, fetch, update, get, delette }}
    >
      {children}
    </ObjetivosContext.Provider>
  );
};

export const useObjetivos = () => useContext(ObjetivosContext);
