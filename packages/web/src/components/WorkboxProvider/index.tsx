import {
  createContext,
  type FC,
  type PropsWithChildren,
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

const WorkboxProvider: FC<PropsWithChildren> = ({ children }) => {
  const [update, setUpdate] = useState(false);

  const workbox = useMemo(() => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      return new Workbox("/service-worker.js");
    }

    return undefined;
  }, []);

  useEffect(() => {
    if (workbox) {
      workbox.addEventListener("waiting", () => {
        setUpdate(true);
      });

      workbox.register().catch(() => {
        // ignore YandexBot service worker register fail
      });
    }
  }, [workbox]);

  const value = useMemo(() => {
    const applyUpdate = () => {
      if (workbox) {
        workbox.addEventListener("controlling", () => {
          if (window.location.pathname === "/") {
            window.location.reload();
          } else {
            window.location.href = "/";
          }
        });

        workbox.messageSkipWaiting();
      }
    };

    return {
      applyUpdate,
      update,
    };
  }, [update, workbox]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default WorkboxProvider;
