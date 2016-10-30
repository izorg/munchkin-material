import React from 'react';
import PropTypes from 'prop-types';
import cns from 'classnames';

import cn from './style.css';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const defaultProps = {
  children: null,
  className: '',
};

export const Layout = ({ children, className }) =>
  <div className={cns(cn.layout, className)}>{children}</div>;
Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export const LayoutContent = ({ children, className }) =>
  <div className={cns(cn.layoutContent, className)}>{children}</div>;
LayoutContent.propTypes = propTypes;
LayoutContent.defaultProps = defaultProps;

export const LayoutHeader = ({ children, className }) =>
  <div className={cns(cn.layoutHeader, className)}>{children}</div>;
LayoutHeader.propTypes = propTypes;
LayoutHeader.defaultProps = defaultProps;
