import { Objetivo, Plinio } from "@/types";
import { getMaxPlinio } from "@/utils";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OBJETIVOS_KEY = "OBJETIVOS";

export const ObjetivosContext = createContext<{
  objetivos: Objetivo[];
  get: (nome: string) => Objetivo | undefined;
  create: (nome: string) => Promise<Objetivo>;
  update: (
    nome: string,
    data: Partial<Objetivo>,
  ) => Promise<Plinio | undefined>;
  delette: (id: string) => Promise<boolean>;
}>({
  objetivos: [],
  get: () => {
    throw new Error("ObjetivosContext.get não inicializado");
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
  const [objetivos, setObjetivos] = useState<Objetivo[]>([]);

  const get = useCallback(
    (nome: string): Objetivo | undefined => {
      return objetivos?.find(
        (objetivo) => !objetivo.excluido && objetivo.nome === nome,
      );
    },
    [objetivos],
  );

  const create = useCallback(
    async (nome: string): Promise<Objetivo> => {
      if (
        objetivos?.find(
          (objetivo) => !objetivo.excluido && objetivo.nome === nome,
        )
      ) {
        throw new Error("Nome repetido");
      }

      const objetivo = {
        nome,
        inicio: new Date(),
        fim: new Date(),
      };

      const novosObjetivos = [...objetivos, objetivo];

      setObjetivos(novosObjetivos);
      await AsyncStorage.setItem(OBJETIVOS_KEY, JSON.stringify(novosObjetivos));

      return objetivo;
    },
    [setObjetivos, objetivos],
  );

  const update = useCallback(
    async (
      nome: string,
      data: Partial<Objetivo>,
    ): Promise<Plinio | undefined> => {
      const index = objetivos.findIndex(
        (objetivo) => !objetivo.excluido && objetivo.nome === nome,
      );

      if (
        objetivos?.find(
          (objetivo, i) =>
            index !== i && !objetivo.excluido && objetivo.nome === nome,
        )
      ) {
        throw new Error("Nome repetido");
      }

      if (index < 0) {
        throw new Error("Objetivo não encontrado");
      }

      const initialMaxPlinio = getMaxPlinio(objetivos);

      objetivos[index] = {
        ...objetivos![index],
        ...data,
      };

      const novosObjetivos = objetivos.slice(0);

      setObjetivos(novosObjetivos);
      await AsyncStorage.setItem(OBJETIVOS_KEY, JSON.stringify(novosObjetivos));

      const currentMaxPlinio = getMaxPlinio(objetivos);

      return initialMaxPlinio === currentMaxPlinio
        ? undefined
        : currentMaxPlinio;
    },
    [objetivos, setObjetivos],
  );

  const delette = useCallback(
    async (nome: string): Promise<boolean> => {
      const index = objetivos!.findIndex((objetivo) => objetivo.nome === nome);

      if (index < 0) {
        return false;
      }

      objetivos[index] = {
        ...objetivos[index],
        excluido: new Date(),
      };

      const novosObjetivos = objetivos.slice(0);

      setObjetivos(novosObjetivos);
      await AsyncStorage.setItem(OBJETIVOS_KEY, JSON.stringify(novosObjetivos));

      return true;
    },
    [objetivos, setObjetivos],
  );

  useEffect(() => {
    AsyncStorage.getItem(OBJETIVOS_KEY)
      .then((value) => {
        console.log(value);
        return value ? JSON.parse(value) : [];
      })
      .then((objetivos) =>
        objetivos.map((objetivo: Objetivo) => ({
          ...objetivo,
          inicio: new Date(objetivo.inicio),
          fim: new Date(objetivo.fim),
          excluido: objetivo.excluido ? new Date(objetivo.excluido) : undefined,
        })),
      )
      .then(setObjetivos);
  }, []);

  return (
    <ObjetivosContext.Provider
      value={{ objetivos, create, update, get, delette }}
    >
      {children}
    </ObjetivosContext.Provider>
  );
};

export const useObjetivos = () => useContext(ObjetivosContext);
