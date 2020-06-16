import React from 'react';
import { ThemeProvider } from 'styled-components';
import { dark } from '../theme/dark';
import { RootRouter } from './root-router';

export const RootView: React.FC = () => {
  return (
    <ThemeProvider theme={dark}>
      <RootRouter/>
    </ThemeProvider>
  );
};

