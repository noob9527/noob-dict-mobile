import { Text, View } from 'react-native';
import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import ColorId from '../../styles/color-id';
import { LoginButtonView } from './login-button-view';
import { GithubLoginView } from './github-login-view';


const Container = styled(SafeAreaView)`
  height: 100%;
  background-color: ${props => props.theme[ColorId.status_bar_background]};
`;

const ContentContainer = styled.View`
  height: 100%;
  background-color: ${props => props.theme[ColorId.background]};
`;


export const ProfilePage = () => {
  return (
    <Container>
      <ContentContainer>
        {/*<LoginButtonView/>*/}
        <GithubLoginView/>
      </ContentContainer>
    </Container>
  );
};
