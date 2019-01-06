
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Label, Form, Button, Input, FormField} from 'semantic-ui-react';
import Joi from 'joi-browser';
import {
  Alert, FileInput, Modal,
} from '../elements';
import style from './style.scss';

class CreateLabworkModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      analysis: '',
      file: null,
      validationError: null,
      loading: false,
    };

    this.modalRef = React.createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleAnalysisChange = this.handleAnalysisChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.takeFile = this.takeFile.bind(this);
    this.createLabwork = this.createLabwork.bind(this);
  }

  setError(validationError = null) {
    this.setState({ validationError });
  }

  takeFile(file) {
    this.setState({ file });
  }

  handleAnalysisChange(e) {
    this.setState({ analysis: e.target.value });
  }

  createLabwork() {
    const { createLabworkAction, id } = this.props;
    const { analysis, file } = this.state;

    const labwork = {
      analysis,
      userId: id,
    };

    this.setState({ loading: true });
    createLabworkAction(file, labwork)
      .then(() => this.handleModalClose())
      .catch(({ response: { data } }) => {
        this.setError(data.message);
        this.setState({ loading: false });
      });
  }

  validateForm() {
    const { analysis } = this.state;
    const schema = Joi.object().keys({
      analysis: Joi.string()
        .required()
        .error(new Error('Invalid analysis format.')),
    });

    const result = Joi.validate({ analysis }, schema);
    if (result.error && result.error.message) {
      this.setState({
        validationError: result.error.message,
      });
    }
    return !result.error;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setError();

    if (this.validateForm()) {
      this.createLabwork();
    }
  }

  getModalActionsAndChildren() {
    const { validationError, loading, analysis } = this.state;
    return {
      children: (
        <Form
          className={style.form}
          error={!!validationError}
          onSubmit={this.handleSubmit}
          noValidate
        >
          <Alert message={validationError} />
          <FormField>
            <Label className={style.label}>Note</Label>
            <Input
              name="analysis"
              value={analysis}
              onChange={this.handleAnalysisChange}
              placeholder="Analysis"
            />
          </FormField>
          <Form.Field>
            <FileInput takeFile={this.takeFile} />
          </Form.Field>
          <Button size="large" loading={loading} disabled={loading} color="purple" type="submit">
            Upload
          </Button>
        </Form>
      ),
    };
  }

  open() {
    this.modalRef.current.open();
  }

  handleModalClose() {
    this.setState({
      analysis: '',
      file: null,
      validationError: null,
      loading: false,
    });
    this.modalRef.current.close();
  }


  handleEnter(e) {
    e.preventDefault();
    if (e.keyCode === 13) {
      this.handleSubmit();
    }
  }

  render() {
    const { actions, children } = this.getModalActionsAndChildren();
    return (
      <Modal ref={this.modalRef} title="Create labwork" actions={actions}>
        {children}
      </Modal>
    );
  }
}

CreateLabworkModal.propTypes = {
  createLabworkAction: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};
export default CreateLabworkModal;
