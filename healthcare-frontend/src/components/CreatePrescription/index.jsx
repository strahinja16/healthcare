
import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";
import {
  Input, Label, Button, Form, FormField,
} from 'semantic-ui-react';
import Joi from 'joi-browser';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Alert, Dropdown } from '../elements';
import style from './style.scss';
import {bindActionCreators} from "redux";
import { getDiseases, getDrugsByDisease} from "../../thunks/prescription";

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
      disease: '',
      diseases: [],
      medications: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDrugChange = this.handleDrugChange.bind(this);
    this.handleHourChange = this.handleHourChange.bind(this);
    this.handlePillsChangeChange = this.handlePillsChangeChange.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
    this.handleDiseaseChange = this.handleDiseaseChange.bind(this);
    this.handleDiseaseSearch = this.handleDiseaseSearch.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.validateForm()) {
      this.createPrescription();
    }
  }

  createPrescription() {
    const {
      drug, hour, pills, note, disease,
    } = this.state;
    const { onSubmit, history: { goBack }, id } = this.props;

    this.setState({ loading: true });
    onSubmit({
      drug,
      disease,
      hoursFrequency: parseInt(hour, 10),
      quantity: parseInt(pills, 10),
      note,
      userId: id.id,
      dueDate: moment().add(2, 'days').toString(),
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
      drug, hour, pills, note, disease
    } = this.state;
    const schema = {
      drug: Joi.string()
        .required()
        .error(new Error('Drug is required.')),
      disease: Joi.string()
        .required()
        .error(new Error('Disease is required.')),
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
      drug, disease, hour, pills, note,
    }, schema);
    if (result.error && result.error.message) {
      this.setState({
        error: result.error.message,
      });
    }
    return !result.error;
  }

  handleDiseaseChange(e, { value }) {
    const { getMedicationsAction } = this.props;
    this.setState({ disease: value }, () => {
      getMedicationsAction(value)
        .then(() => {
          const { medications } = this.props;
          this.setState({ medications });
        })
    });
  }

  handleDiseaseSearch(e, { searchQuery }) {
    const { getDiseasesAction } = this.props;
    getDiseasesAction(searchQuery)
      .then(() => {
        const { diseases } = this.props;
        this.setState({ diseases })
      })
  }

  handleDrugChange(e, { value }) {
    this.setState({ drug: value });
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

  prepareDiseases(diseases) {
    return diseases.map(disease => ({
      key: disease,
      value: disease,
      text: disease,
    }));
  }

  prepareDrugs(drugs) {
    return drugs.map(drug => ({
      key: drug,
      value: drug,
      text: drug,
    }));
  }

  render() {
    const {
      hour, pills, note, error, loading, diseases, medications,
    } = this.state;

    return (
      <Form error={!!error} className={style.form} onSubmit={this.handleSubmit}>
        <Alert message={error} />
        <FormField>
          <Label>Disease</Label>
          <Dropdown
            search
            placeholder="Disease"
            options={this.prepareDiseases(diseases)}
            handleOnChange={this.handleDiseaseChange}
            handleOnSearchChange={this.handleDiseaseSearch}
          />
        </FormField>
        <FormField>
          <Label>Drug</Label>
          <Dropdown
            placeholder="Drug"
            options={this.prepareDrugs(medications)}
            handleOnChange={this.handleDrugChange}
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

CreatePrescription.defaultProps = {
  drugs: [],
  diseases: [],
};

CreatePrescription.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  getDiseasesAction: PropTypes.func.isRequired,
  getMedicationsAction: PropTypes.func.isRequired,
  diseases: PropTypes.arrayOf(PropTypes.string),
  medications: PropTypes.arrayOf(PropTypes.string),
};

const mapStateToProps = ({ prescription }) => ({
  medications: prescription.get('currentMedications'),
  diseases: prescription.get('currentDiseases'),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getDiseasesAction: getDiseases,
    getMedicationsAction: getDrugsByDisease,
  },
  dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CreatePrescription);
