import React from 'react';
import { storiesOf } from '@storybook/react';
import '../src/loader';
import Modal from '../src/components/elements/Modal';

const actions = [
  (<button type="Submit">Cancel</button>),
  (<button type="Submit">OK</button>),
];

storiesOf('Modal', module)
  .add('default', () => (
    <Modal open title="Default modal" />
  ))
  .add('with children', () => (
    <Modal open title="Modal with children"><p>I am child node</p></Modal>
  ))
  .add('with actions', () => (
    <Modal open actions={actions} title="Actions modal" />
  ))
  .add('with children and actions', () => (
    <Modal open actions={actions} title="Modal with both children and actions"><p>I am child node</p></Modal>
  ));
