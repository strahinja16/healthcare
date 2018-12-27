
import React, { Component } from 'react';
import PropType from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getPrescriptionsAction } from '../../thunks/user';
import Prescriptions from '../../components/Perscriptions';

class PrescriptionsPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { getPrescriptionsAction, prescriptions, user: { id } } = this.props;
    console.log(prescriptions);
    if(!prescriptions) {
      getPrescriptionsAction(id).catch(e => console.log(e));
    }
  }

  render() {
    const { prescriptions } = this.props;
    return (
      <Prescriptions prescriptions={prescriptions} />
    );
  }
}

PrescriptionsPage.defaultProps = {
  prescriptions: null,
};

PrescriptionsPage.propTypes = {
  user: PropType.shape({}).isRequired,
  prescriptions: PropType.array,
};

const mapStateToProps = ({ auth, medical }) => ({
  user: auth.get('user'),
  prescriptions: medical.get('prescriptions'),
})

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getPrescriptionsAction,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(PrescriptionsPage);