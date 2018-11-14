import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import '../src/loader';
import Login from '../src/components/Login';

const formPromise = () => new Promise((resolve) => {
  action('submitted');
  resolve();
});

storiesOf('Login', module)
  .add('form', () => (
    <Login login={formPromise} />
  ));
