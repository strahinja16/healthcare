import React, { Component } from 'react';
import { Alert, View, Text, } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  Container, Content, Form, Input, Item, Spinner, Picker, Icon, Label, Card,
} from 'native-base';
import Button from '../Button';
import styles from './style';
import { postMeasurementsApi } from '../../api/user';
import theme from '../../theme';
import BackEffect from '../BackEffects';

class MeasureList extends Component {
  constructor(props) {
    super(props);

    this.state = {
          selected: 'sugar',
          pressure: null,
          temperature: null,
          sugar: null,
          loading: false,
          value: null,
    };

    this.submitMeasurements = this.submitMeasurements.bind(this);
  }

   submitMeasurements() {
    this.setState({ loading: true });
    const { selectedValue, value } = this.state;
    this.setState({ [selectedValue]: value }, async () => {

        const { pressure, temperature, sugar } = this.state;

        try {
        await postMeasurementsApi(pressure, temperature, sugar);
        Actions.main();
        } catch (e) {
        console.log(e); 
        Alert.alert('Error.');
        this.setState({ loading: false });
        }
    });
  }

  render() {
    const { loading } = this.state;
    return (
      <Container style={styles.containerStyle}>
        <Content padder contentContainerStyle={styles.contentStyle}>
        <BackEffect />
        <Card>
          
          <Form>
          <Item>
            <Label>Type:</Label>
                <Picker
                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                    mode="dropdown"
                    style={{ width: undefined }}
                    selectedValue={this.state.selectedValue}
                    onValueChange={selectedValue => this.setState({ selectedValue })}
                >   
                  <Picker.Item key={0} label="Blood sugar" value="sugar" />
                  <Picker.Item key={1} label="Blood pressure" value="pressure" />
                  <Picker.Item key={2} label="Temperature" value="temperature" />
                </Picker>
            </Item>
            <Item last>
              <Label>Value:</Label>
                <Input
                  placeholder={this.state.selectedValue === "pressure" ? "120/80" : ''}
                  onChangeText={value => this.setState({ value })}
                  value={this.state.value}
                />
            </Item>
          </Form>
          { loading ? <Spinner color={theme.colors.borders} /> : <Button style={{ borderRadius: 4 }} onPress={this.submitMeasurements}>Submit</Button> }
        </Card>
        </Content>
      </Container>
    );
  }
}

export default MeasureList;
