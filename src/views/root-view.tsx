import React, { useEffect, useRef } from 'react';
import { ThemeProvider } from 'styled-components';
import { dark } from '../theme/dark';
import { RootRouter } from './root-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppState } from 'react-native';
import { useDispatch } from 'react-redux';


export const RootView: React.FC = () => {
  const dispatch = useDispatch();
  // see https://reactnative.dev/docs/appstate
  const appState = useRef(AppState.currentState);
  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  function handleAppStateChange(nextState) {
    if (
      appState.current.match(/inactive|background/) &&
      nextState === 'active'
    ) {
      dispatch({
        type: '_transient/appComeToForeground',
      });
    }

    appState.current = nextState;
    dispatch({
      type: '_transient/appStateChange',
      payload: {
        appState: nextState,
      },
    });
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={dark}>
        <RootRouter/>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

