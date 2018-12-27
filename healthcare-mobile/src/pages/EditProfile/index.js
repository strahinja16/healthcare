
import React from 'react';
import PropType from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { editProfileAction } from '../../thunks/auth';
import EditProfile from '../../components/EditProfile';

const EditProfilePage = ({ user, editProfileAction }) => (
  <EditProfile user={user} editProfileAction={editProfileAction} />
);

EditProfilePage.propTypes = {
  user: PropType.shape({}).isRequired,
  editProfileAction: PropType.func.isRequired,
};

const mapStateToProps = ({ auth }) => ({
  user: auth.get('user'),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    editProfileAction: editProfileAction,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePage);
