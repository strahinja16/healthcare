
import React from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import Map from '../../components/Map';

const MapPage = ({ coordinates, channel }) => (
  <Map helpCoordinates={coordinates} channel={channel} />
);

MapPage.propTypes = {
  coordinates: PropType.shape({}).isRequired,
  channel: PropType.string.isRequired,
};

const mapStateToProps = ({ sos }) => ({
  coordinates: sos.get('coordinates'),
  channel: sos.get('channel'),
});

export default connect(mapStateToProps)(MapPage);