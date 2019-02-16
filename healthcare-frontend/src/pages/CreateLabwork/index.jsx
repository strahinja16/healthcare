
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {Label, Form, Button, Input, FormField} from 'semantic-ui-react';
import Joi from 'joi-browser';
import {
  Alert, FileInput,
} from '../../components/elements';
import style from './style.scss';
import {bindActionCreators} from "redux";
import {createLabwork} from "../../thunks/labwork";
import connect from "react-redux/es/connect/connect";

class CreateLabwork extends Component {
  constructor(props) {
    super(props);
    this.state = {
      analysis: '',
      file: null,
      validationError: null,
      loading: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
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
    const { createLabworkAction, match: { params: { id } }, history: { goBack } } = this.props;
    const { analysis, file } = this.state;

    const labwork = {
      analysis,
      userId: id,
    };

    this.setState({ loading: true });
    createLabworkAction(file, labwork)
      .then(() => {
        goBack();
      })
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

  handleEnter(e) {
    e.preventDefault();
    if (e.keyCode === 13) {
      this.handleSubmit();
    }
  }

  render() {
    const { validationError, loading, analysis } = this.state;
    return (
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
    );
  }
}

CreateLabwork.propTypes = {
  createLabworkAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    createLabworkAction: createLabwork,
  },
  dispatch,
);

export default withRouter(
  connect(
    null,
    mapDispatchToProps,
  )(CreateLabwork),
);
