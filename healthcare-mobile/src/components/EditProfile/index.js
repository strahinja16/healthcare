import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  Content, Form, Input, Item, Spinner, DatePicker, Picker, Icon, Label, Card,
} from 'native-base';
import Button from '../common/Button';
import styles from './style';
import PropType from 'prop-types';
import extractErrorsFromResponse from '../../util/extractErrorMessagesFromResponse';
import LGContainer from '../common/LGContainer';
import validate from '../../validation';
import validationSchema from './validation';

class EditProfile extends Component {
  constructor(props) {
    super(props);

    const { user } = props;

    this.state = {
      birthday: user && user.birthday || null,
      bloodType: user && user.bloodType || 'A-',
      height: user && user.height && user.height.toString() || null,
      weight: user && user.weight && user.weight.toString() || null,
      gender: user && user.gender ? user.gender : 'M',
      lbo: user && user.lbo || null,
      loading: false,
    };

    this.bloodTypes = ['A-', 'A+', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    this.editProfile = this.editProfile.bind(this);
  }

  async editProfile() {
    this.setState({ loading: true });
    const { user: { id }, editProfileAction } = this.props;
    const { bloodType, height, weight, birthday, gender, lbo } = this.state;

    const error = validate(this.state, validationSchema);
    if (error) {
      this.setState({ loading: false });
      return Alert.alert('Error', error);
    }

    try {
      await editProfileAction(id, bloodType, height, weight, birthday, gender, lbo);
      Actions.main({ type: 'reset' });
    } catch (e) {
      const messages = extractErrorsFromResponse(e.response);
      Alert.alert('Error', messages.length > 0 && messages[0]); 
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading } = this.state;
    return (
      <LGContainer>
        <Content padder contentContainerStyle={styles.contentStyle}>
        <Card>
          <Form>
            <Item>
              <Label style={styles.labelStyle}>Birthday:</Label>
                <DatePicker
                defaultDate={new Date(this.state.birthday)}
                minimumDate={new Date(1920, 1, 1)}
                maximumDate={new Date()}
                locale={"en"}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                onDateChange={birthday => this.setState({ birthday })}
                />
            </Item>
            <Item>
            <Label style={styles.labelStyle}>Blood type:</Label>
                <Picker
                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                    mode="dropdown"
                    style={{ width: undefined }}
                    selectedValue={this.state.bloodType}
                    onValueChange={bloodType => this.setState({ bloodType })}
                >   
                {this.bloodTypes.map(
                        (bloodType, index) => (<Picker.Item key={index} label={bloodType} value={bloodType} />),
                    )}
                </Picker>
            </Item>
            <Item>
              <Label style={styles.labelStyle}>Height:</Label>
                <Input
                  onChangeText={height => this.setState({ height })}
                  value={this.state.height}
                />
            </Item>
            <Item>
              <Label style={styles.labelStyle}>Weight:</Label>
                <Input
                  onChangeText={weight => this.setState({ weight })}
                  value={this.state.weight}
                />
            </Item>
            <Item>
            <Label style={styles.labelStyle}>Gender:</Label>
                <Picker
                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                    mode="dropdown"
                    style={{ width: undefined }}
                    selectedValue={this.state.gender}
                    onValueChange={gender => this.setState({ gender })}
                >   
                  <Picker.Item key={0} label="Male" value="M" />
                  <Picker.Item key={1} label="Female" value="F" />
                </Picker>
            </Item>
            <Item last>
              <Label style={styles.labelStyle}>SSN:</Label>
                <Input
                  onChangeText={lbo => this.setState({ lbo })}
                  value={this.state.lbo}
                />
            </Item>
          </Form>
          { loading ? <Spinner /> : <Button syle={{ borderRadius: 4 }} onPress={this.editProfile}>Submit</Button> }
        </Card>
        </Content>
      </LGContainer>
    );
  }
}

EditProfile.propTypes = {
  user: PropType.shape({}).isRequired,
  editProfileAction: PropType.func.isRequired,
};

export default EditProfile;
