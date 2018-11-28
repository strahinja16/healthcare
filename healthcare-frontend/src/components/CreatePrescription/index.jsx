
import React, { Component } from 'react';
import {
  Input, Label, Button, Form, FormField,
} from 'semantic-ui-react';
import Joi from 'joi-browser';
import PropTypes from 'prop-types';
import { Alert } from '../elements';
import style from './style.scss';

class CreatePrescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drug: '',
      hour: '',
      pills: '',
      note: '',
      error: null,
      loading: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDrugChange = this.handleDrugChange.bind(this);
    this.handleHourChange = this.handleHourChange.bind(this);
    this.handlePillsChangeChange = this.handlePillsChangeChange.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.validateForm()) {
      this.createPrescription();
    }
  }

  createPrescription() {
    const {
      drug, hour, pills, note,
    } = this.state;
    const { onSubmit, history: { goBack }, id } = this.props;

    this.setState({ loading: true });
    onSubmit({
      drug,
      hours: parseInt(hour, 10),
      quantity: parseInt(pills, 10),
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
      drug, hour, pills, note,
    } = this.state;
    const schema = {
      drug: Joi.string()
        .required()
        .error(new Error('Drug is required.')),
      hour: Joi.string()
        .required()
        .error(new Error('Hour frequency is required.')),
      pills: Joi.string()
        .required()
        .error(new Error('Number of pills is required.')),
      note: Joi.string()
        .required()
        .error(new Error('Note is required.')),
    };
    const result = Joi.validate({
      drug, hour, pills, note,
    }, schema);
    if (result.error && result.error.message) {
      this.setState({
        error: result.error.message,
      });
    }
    return !result.error;
  }

  handleDrugChange(e) {
    this.setState({ drug: e.target.value });
  }

  handleHourChange(e) {
    this.setState({ hour: e.target.value });
  }

  handlePillsChangeChange(e) {
    this.setState({ pills: e.target.value });
  }

  handleNoteChange(e) {
    this.setState({ note: e.target.value });
  }

  render() {
    const {
      drug, hour, pills, note, error, loading,
    } = this.state;

    return (
      <Form error={!!error} className={style.form} onSubmit={this.handleSubmit}>
        <Alert message={error} />
        <FormField>
          <Label className={style.label}>Drug</Label>
          <Input
            name="drug"
            value={drug}
            onChange={this.handleDrugChange}
            placeholder="Drug name"
          />
        </FormField>
        <FormField>
          <Label className={style.label}>Hour frequency</Label>
          <Input
            name="hour"
            value={hour}
            onChange={this.handleHourChange}
            placeholder="Hour frequency"
          />
        </FormField>
        <FormField>
          <Label className={style.label}>Number of pills</Label>
          <Input
            name="pills"
            value={pills}
            onChange={this.handlePillsChangeChange}
            placeholder="Number of pills"
          />
        </FormField>
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

CreatePrescription.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CreatePrescription;
