import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import '../src/loader';
import VerticalTab from '../src/components/elements/VerticalTab';

const menus = [
  'Item1', 'Item2', 'Item3',
];

storiesOf('VerticalTab', module)
  .add('default', () => {
    const renderContent = (tabElement) => {
      if (tabElement === 1) {
        return 'good';
      }
      return 'ok';
    };

    return <VerticalTab menus={menus} renderContent={renderContent} />;
  });
