import React, { Component } from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getLocale, getMessages, loadLocale } from '../../i18n';

const mapStateToProps = (state) => ({
  locale: state.app.locale || getLocale(),
});

const textComponent = ({ children }) => children;

class LocaleProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
    };
  }

  async componentWillMount() {
    const { locale } = this.props;

    await loadLocale(locale);

    this.setState({
      loaded: true,
    });
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.locale !== this.props.locale) {
      await loadLocale(nextProps.locale);

      this.forceUpdate();
    }
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.locale === this.props.locale;
  }

  render() {
    const { loaded } = this.state;

    if (!loaded) {
      return null;
    }

    const { locale, ...rest } = this.props;

    return (
      <IntlProvider
        {...rest}
        key={locale}
        locale={locale}
        messages={getMessages(locale)}
        textComponent={textComponent}
      />
    );
  }
}

LocaleProvider.propTypes = {
  locale: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(LocaleProvider);
