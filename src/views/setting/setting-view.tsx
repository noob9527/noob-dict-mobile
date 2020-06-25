import { Text, View } from 'react-native';
import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';


const Container = styled(SafeAreaView)`
`;

export const SettingView = () => {
  return (
    <Container><Text>Profile</Text></Container>
  );
};
