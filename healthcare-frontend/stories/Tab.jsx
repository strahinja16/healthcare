import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import '../src/loader';
import Tab from '../src/components/elements/Tab';

const menus = [
  'Item1', 'Item2', 'Item3',
];

storiesOf('Tab', module)
  .add('default', () => {
    const renderContent = (tabElement) => {
      if (tabElement === 1) {
        return 'good';
      }
      return 'ok';
    };

    return (
      <Tab
        menus={menus}
        renderContent={renderContent}
      />
    );
  });
