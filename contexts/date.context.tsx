import { ErrorComponent, LoadingComponent } from "@/components";
import { axiosInstance } from "@/utils";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export const DateContext = createContext<{
  today: Date;
  fetch: () => void;
}>({
  today: new Date(),
  fetch: () => {
    throw new Error("DateContext.fetch não inicializado");
  },
});

export const DateProvider = ({ children }: { children: ReactNode }) => {
  const [today, setToday] = useState<Date | undefined | null>();
  const fetch = useCallback(() => {
    axiosInstance.utils.today().then(setToday);
  }, [setToday]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  if (today === undefined) {
    return <LoadingComponent />;
  }

  if (today === null) {
    return (
      <ErrorComponent reload={fetch} message="Não sei que dia é hoje ;-;" />
    );
  }

  return (
    <DateContext.Provider value={{ today, fetch }}>
      {children}
    </DateContext.Provider>
  );
};

export const useDate = () => useContext(DateContext);
