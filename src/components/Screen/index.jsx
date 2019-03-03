import React, {
  lazy,
  memo,
  Suspense,
  useEffect,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import Loading from '../Loading';

import ScreenModal from './Modal';

const Screen = ({ appear: appearProp, loader, match, ...rest }) => {
  const [screenAppear, setScreenAppear] = useState(false);

  useEffect(() => {
    if (!screenAppear) {
      setScreenAppear(true);
    }
  }, [screenAppear]);

  const appear = appearProp !== undefined ? appearProp : screenAppear;

  const LazyComponent = useMemo(() => lazy(loader), [loader]);

  return (
    <ScreenModal appear={appear} open={Boolean(match)}>
      <Suspense fallback={<Loading />}>
        <LazyComponent match={match} {...rest} />
      </Suspense>
    </ScreenModal>
  );
};

Screen.propTypes = {
  appear: PropTypes.bool,
  loader: PropTypes.func.isRequired,
  match: PropTypes.object,
};

Screen.defaultProps = {
  appear: undefined,
  match: null,
};

export default memo(Screen);
