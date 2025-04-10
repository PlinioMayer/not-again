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
}>({ today: new Date() });

export const DateProvider = ({ children }: { children: ReactNode }) => {
  const [today, setToday] = useState<Date | undefined | null>();
  const fetchToday = useCallback(() => {
    axiosInstance.utils.today().then(setToday);
  }, [setToday]);

  useEffect(() => {
    fetchToday();
  }, [fetchToday]);

  if (today === undefined) {
    return <LoadingComponent />;
  }

  if (today === null) {
    return (
      <ErrorComponent
        reload={fetchToday}
        message="Não sei que dia é hoje ;-;"
      />
    );
  }

  return (
    <DateContext.Provider value={{ today }}>{children}</DateContext.Provider>
  );
};

export const useDate = () => useContext(DateContext);
