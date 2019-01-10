
import React from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import Map from '../../components/Map';

const MapPage = ({ coordinates, user }) => (
  <Map helpCoordinates={coordinates} user={user} />
);

MapPage.propTypes = {
  coordinates: PropType.shape({}).isRequired,
  user: PropType.string.isRequired,
};

const mapStateToProps = ({ sos }) => ({
  coordinates: sos.get('coordinates'),
  user: sos.get('user'),
});

export default connect(mapStateToProps)(MapPage);