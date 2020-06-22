import React from 'react';
import { ThemeProvider } from 'styled-components';
import { dark } from '../theme/dark';
import { RootRouter } from './root-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

// mimic the behavior of SafeAreaView, as I haven't figured out how to use it
// https://reactnavigation.org/docs/handling-safe-area
const HeadPadding = styled.View`
  height: 25px;
`

export const RootView: React.FC = () => {
  return (
    <SafeAreaProvider>
      <HeadPadding/>
      <ThemeProvider theme={dark}>
        <RootRouter/>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

