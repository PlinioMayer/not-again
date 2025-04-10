import { ErrorComponent, LoadingComponent } from "@/components";
import { Plinio } from "@/types";
import { axiosInstance } from "@/utils";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export const PliniosContext = createContext<{
  plinios: Plinio[];
  fetchPlinios: () => Promise<Plinio | undefined>;
}>({
  plinios: [],
  fetchPlinios: () => {
    throw new Error("fetchPlinios não inicializado");
  },
});

export const PliniosProvider = ({ children }: { children: ReactNode }) => {
  const [plinios, setPlinios] = useState<Plinio[] | undefined | null>();
  const fetchPlinios = useCallback((): Promise<Plinio | undefined> => {
    if (!plinios) {
      throw new Error("Plinios não inicializados");
    }

    return axiosInstance.plinios.get().then((novosPlinios) => {
      if (!novosPlinios) {
        setPlinios(null);
        return undefined;
      }

      setPlinios(plinios);

      if (novosPlinios.length > plinios.length) {
        return novosPlinios[0];
      }

      return undefined;
    });
  }, [plinios, setPlinios]);

  useEffect(() => {
    fetchPlinios();
  }, [fetchPlinios]);

  if (plinios === undefined) {
    return <LoadingComponent />;
  }

  if (plinios === null) {
    return (
      <ErrorComponent
        reload={fetchPlinios}
        message="Onde estão meus Plínios???"
      />
    );
  }

  return (
    <PliniosContext.Provider value={{ plinios, fetchPlinios }}>
      {children}
    </PliniosContext.Provider>
  );
};

export const usePlinios = () => useContext(PliniosContext);
