import React from 'react';
import { ThemeProvider } from 'styled-components';
import { dark } from '../theme/dark';
import { RootRouter } from './root-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export const RootView: React.FC = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={dark}>
        <RootRouter/>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

