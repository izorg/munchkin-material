import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';

class PlayerListItemAvatar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
    };
  }

  componentWillMount() {
    this.handleError = this.handleError.bind(this);
  }

  handleError() {
    this.setState({
      error: true,
    });
  }

  render() {
    const { avatar, name, ...props } = this.props;
    const { error } = this.state;

    return avatar && !error ? (
      <Avatar {...props} onError={this.handleError} src={avatar} />
    ) : (
      <Avatar {...props}>
        {String.fromCodePoint(name.codePointAt(0)).toUpperCase()}
      </Avatar>
    );
  }
}

PlayerListItemAvatar.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string,
};

PlayerListItemAvatar.defaultProps = {
  avatar: '',
  name: '',
};

export default PlayerListItemAvatar;
