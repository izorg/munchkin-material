import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';

import Combat from '../components/Combat';

const mapStateToProps = ({ app: { activePlayerId }, players }) => ({
  player: players[activePlayerId],
});

const mapDispatchToProps = {
  onBack: goBack,
  // onImport: importContact,
  // onSubmit: submitPlayer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Combat);
