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
  plinios?: Plinio[] | null;
  fetch: () => Promise<void>;
}>({
  plinios: [],
  fetch: () => {
    throw new Error("PliniosContext.fetch não inicializado");
  },
});

export const PliniosProvider = ({ children }: { children: ReactNode }) => {
  const [plinios, setPlinios] = useState<Plinio[] | undefined | null>();
  const fetch = useCallback((): Promise<void> => {
    setPlinios(undefined);
    return axiosInstance.plinios.get().then(setPlinios);
  }, [setPlinios]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <PliniosContext.Provider value={{ plinios, fetch }}>
      {children}
    </PliniosContext.Provider>
  );
};

export const usePlinios = () => useContext(PliniosContext);
