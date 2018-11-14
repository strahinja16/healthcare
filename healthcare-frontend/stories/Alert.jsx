import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import '../src/loader';
import Alert from '../src/components/elements/Alert';

const list = [
  'You must include both a upper and lower case letters in your password.',
  'You need to select your home country.',
];

const header = 'There was some errors with your submission';

const message = 'There is just one error';

storiesOf('Alert', module)
  .add('One error', () => (
    <Alert
      header={header}
      message={message}
    />
  ))
  .add('List of errors', () => (
    <Alert
      list={list}
      header={header}
    />
  ))
  .add('Without header', () => (
    <Alert
      list={list}
    />
  ));
