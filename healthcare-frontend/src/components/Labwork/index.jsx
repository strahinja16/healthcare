import React  from 'react';
import PropTypes from 'prop-types';
import {List, Divider, Label, Button} from 'semantic-ui-react';
import fileDownloadLink from "../../util/fileDownloadLink";
import moment from "moment";
import style from './style.scss';

const Labwork = ({removeLabwork, labwork: { id, analysis, originalName, createdAt}}) => (
    <List.Item>
      <Label as="a" color="purple" ribbon>
        Done {moment(createdAt).format('lll')}
      </Label>
      <Divider hidden/>
      <div className={style.floatRight}>
        <Button onClick={() => removeLabwork(id)} size="mini" basic color='purple' icon='trash'/>
      </div>
      <List.Icon name="clipboard outline"/><strong>{analysis}</strong>
      <Divider hidden/>
      <List.Icon name="file outline"/><a href={fileDownloadLink(id)}>{originalName}</a>
    </List.Item>
  );

Labwork.propTypes = {
  labwork: PropTypes.shape({}).isRequired,
  removeLabwork: PropTypes.func.isRequired,
};

export default Labwork;
