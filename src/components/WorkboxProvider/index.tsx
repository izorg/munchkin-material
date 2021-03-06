import PropTypes from "prop-types";
import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Workbox } from "workbox-window";

type WorkboxContext = {
  applyUpdate: () => void;
  update: boolean;
};

const Context = createContext<WorkboxContext>({
  applyUpdate: () => {
    throw new Error("No <WorkboxProvider />");
  },
  update: false,
});

export const useWorkbox = (): WorkboxContext => useContext(Context);

const WorkboxProvider: FC = ({ children }) => {
  const [update, setUpdate] = useState(false);

  const workbox = useMemo(() => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      return new Workbox("/service-worker.js");
    }

    return undefined;
  }, []);

  const applyUpdate = useCallback(() => {
    if (workbox) {
      workbox.addEventListener("controlling", () => {
        window.location.reload();
      });

      workbox.messageSkipWaiting();
    }
  }, [workbox]);

  useEffect(() => {
    if (workbox) {
      workbox.addEventListener("waiting", () => {
        setUpdate(true);
      });

      void workbox.register();
    }
  }, [workbox]);

  return (
    <Context.Provider value={{ applyUpdate, update }}>
      {children}
    </Context.Provider>
  );
};

WorkboxProvider.propTypes = {
  children: PropTypes.node,
};

export default WorkboxProvider;
