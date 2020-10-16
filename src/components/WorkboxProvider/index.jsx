import PropTypes from 'prop-types';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Workbox } from 'workbox-window';

const WorkboxContext = createContext({
  applyUpdate: () => {
    throw new Error('No <WorkboxProvider />');
  },
  update: false,
});

export const useWorkbox = () => useContext(WorkboxContext);

const displayName = 'WorkboxProvider';

const WorkboxProvider = ({ children }) => {
  const [update, setUpdate] = useState(false);

  const workbox = useMemo(() => {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      return new Workbox('/service-worker.js');
    }

    return undefined;
  }, []);

  const applyUpdate = useCallback(() => {
    if (workbox) {
      workbox.addEventListener('controlling', () => {
        window.location.reload();
      });

      workbox.messageSW({ type: 'SKIP_WAITING' });
    }
  }, [workbox]);

  useEffect(() => {
    if (workbox) {
      workbox.addEventListener('waiting', () => {
        setUpdate(true);
      });

      workbox.register();
    }
  }, [workbox]);

  return (
    <WorkboxContext.Provider value={{ applyUpdate, update }}>
      {children}
    </WorkboxContext.Provider>
  );
};

WorkboxProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

WorkboxProvider.displayName = displayName;

export default WorkboxProvider;
