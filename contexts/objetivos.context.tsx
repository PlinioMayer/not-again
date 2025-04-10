import { ErrorComponent, LoadingComponent } from "@/components";
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
  objetivos: Objetivo[];
  getObjetivo: (id: string) => Objetivo | undefined;
  fetchObjetivos: () => Promise<void>;
  updateObjetivo: (id: string, data: Partial<Objetivo>) => Objetivo;
}>({
  objetivos: [],
  getObjetivo: () => {
    throw new Error("getObjetivo não inicializado");
  },
  fetchObjetivos: () => {
    throw new Error("fetchObjetivos não inicializado");
  },
  updateObjetivo: () => {
    throw new Error("updateObjetivo não inicializado");
  },
});

export const ObjetivosProvider = ({ children }: { children: ReactNode }) => {
  const [objetivos, setObjetivos] = useState<Objetivo[] | undefined | null>();
  const fetchObjetivos = useCallback(() => {
    return axiosInstance.objetivos.get().then(setObjetivos);
  }, [setObjetivos]);
  const getObjetivo = useCallback(
    (id: string): Objetivo | undefined => {
      if (!objetivos) {
        throw new Error("Objetivos não inicializados");
      }

      return objetivos.find((objetivo) => objetivo.documentId === id);
    },
    [objetivos],
  );
  const updateObjetivo = useCallback(
    (id: string, data: Partial<Objetivo>): Objetivo => {
      if (!objetivos) {
        throw new Error("Objetivos não inicializados");
      }

      const objetivo = getObjetivo(id);

      if (!objetivo) {
        throw new Error(`Objetivo com id ${id} não encontrado`);
      }

      for (const key in data) {
        (objetivo as Record<string, unknown>)[key] = (
          data as Record<string, unknown>
        )[key];
      }

      setObjetivos([...objetivos]);

      return objetivo;
    },
    [objetivos, getObjetivo],
  );

  useEffect(() => {
    fetchObjetivos();
  }, [fetchObjetivos]);

  if (objetivos === undefined) {
    return <LoadingComponent />;
  }

  if (objetivos === null) {
    return (
      <ErrorComponent
        reload={fetchObjetivos}
        message="Quais são meus objetivos???"
      />
    );
  }

  return (
    <ObjetivosContext.Provider
      value={{ objetivos, fetchObjetivos, updateObjetivo, getObjetivo }}
    >
      {children}
    </ObjetivosContext.Provider>
  );
};

export const useObjetivos = () => useContext(ObjetivosContext);
