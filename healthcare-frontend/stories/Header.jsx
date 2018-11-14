import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import '../src/loader';
import Header from '../src/components/Header';

storiesOf('Header', module)
  .add('Logged in', () => (
    <Header isLoggedIn activeItem="home" onItemChange={action('onSubmit')} />
  ))
  .add('Logged out', () => (
    <Header activeItem="home" />
  ));
