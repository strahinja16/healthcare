
import React from 'react';
import PropTypes from 'prop-types';
import {
  List, Button,
} from 'semantic-ui-react';
import style from './style.scss';
import Labwork from '../Labwork';

const LabworkList = ({ labworks, createLabwork, removeLabwork }) => (
    <div className={style.maxWidth}>
      <Button basic color='purple' onClick={createLabwork} content='Add new labwork' fluid/>
      <List divided relaxed>
        {
          labworks.map(labwork => (
            <Labwork
              removeLabwork={removeLabwork}
              key={labwork.id}
              labwork={labwork}
            />
          ))
        }
      </List>
    </div>
  );

LabworkList.propTypes = {
  labworks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  createLabwork: PropTypes.func.isRequired,
  removeLabwork: PropTypes.func.isRequired,
};

export default LabworkList;
