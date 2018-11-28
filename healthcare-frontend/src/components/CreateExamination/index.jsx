
import React, { Component } from 'react';
import {
  Input, Label, Button, Form, FormField,
} from 'semantic-ui-react';
import Joi from 'joi-browser';
import PropTypes from 'prop-types';
import { Alert } from '../elements';
import style from './style.scss';

class CreateExamination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: '',
      error: null,
      loading: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.validateForm()) {
      this.createPrescription();
    }
  }

  createPrescription() {
    const { note } = this.state;
    const { onSubmit, history: { goBack }, id } = this.props;

    this.setState({ loading: true });
    onSubmit({
      note,
      userId: id.id,
    })
      .then(() => {
        goBack();
      })
      .catch(({ response: { data: { message } } }) => {
        this.setError(message);
        this.setState({ loading: false });
      });
  }

  validateForm() {
    const {
      note,
    } = this.state;
    const schema = {
      note: Joi.string()
        .required()
        .error(new Error('Note is required.')),
    };
    const result = Joi.validate({
      note,
    }, schema);
    if (result.error && result.error.message) {
      this.setState({
        error: result.error.message,
      });
    }
    return !result.error;
  }

  handleNoteChange(e) {
    this.setState({ note: e.target.value });
  }

  render() {
    const {
      note, error, loading,
    } = this.state;

    return (
      <Form error={!!error} className={style.form} onSubmit={this.handleSubmit}>
        <Alert message={error} />
        <FormField>
          <Label className={style.label}>Note</Label>
          <Input
            name="note"
            value={note}
            onChange={this.handleNoteChange}
            placeholder="Note"
          />
        </FormField>
        <FormField>
          <Button loading={loading} disabled={loading} primary type="submit">
            Create
          </Button>
        </FormField>
      </Form>
    );
  }
}

CreateExamination.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CreateExamination;
