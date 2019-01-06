
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { Button } from 'semantic-ui-react';
import style from './style.scss';

class FileInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: '',
    };

    this.dropZoneRef = React.createRef();
    this.openDropZone = this.openDropZone.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(acceptedBlob) {
    const { takeFile } = this.props;
    const blob = acceptedBlob[0];
    this.setState({
      file: blob.name,
    }, () => takeFile(blob));
  }

  openDropZone(e) {
    e.preventDefault();
    this.dropZoneRef.current.open();
  }

  render() {
    const { fileExt, uploadButtonContent } = this.props;
    const { file } = this.state;
    return (
      <div>
        <Button
          icon="upload"
          size="tiny"
          label={{
            basic: true,
            content: uploadButtonContent,
          }}
          labelPosition="right"
          onClick={this.openDropZone}
        />
        <div className={style.hidden}>
          <Dropzone ref={this.dropZoneRef} onDrop={this.onDrop} accept={fileExt} />
        </div>
        {file !== '' ? <div>File chosen: <b>{file}</b></div> : <div>No file chosen.</div>}
      </div>
    );
  }
}

FileInput.propTypes = {
  fileExt: PropTypes.string,
  uploadButtonContent: PropTypes.string,
  takeFile: PropTypes.func.isRequired,
};

FileInput.defaultProps = {
  fileExt: null,
  uploadButtonContent: 'Select file',
};

export default FileInput;
