import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getLocale, getMessages, loadLocale } from '../../i18n';

const mapStateToProps = (state) => ({
  locale: state.app.locale || getLocale(),
});

const textComponent = ({ children }) => children;

class LocaleProvider extends PureComponent {
  constructor(props) {
    super(props);

    const { locale } = props;

    this.state = {
      locale,
      messages: getMessages(locale),
    };
  }

  componentDidMount() {
    const { locale } = this.props;

    this.updateLocale(locale);
  }

  componentDidUpdate() {
    const { locale } = this.props;
    const { locale: stateLocale } = this.state;

    if (stateLocale !== locale) {
      this.updateLocale(locale);
    }
  }

  async updateLocale(locale) {
    const { messages } = await loadLocale(locale);

    this.setState({
      locale,
      messages,
    });
  }

  render() {
    const { locale, messages } = this.state;

    if (!messages) {
      return null;
    }

    return (
      <>
        <Helmet>
          <html lang={locale} />
        </Helmet>
        <IntlProvider
          {...this.props}
          key={locale}
          locale={locale}
          messages={messages}
          textComponent={textComponent}
        />
      </>
    );
  }
}

LocaleProvider.propTypes = {
  locale: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(LocaleProvider);
