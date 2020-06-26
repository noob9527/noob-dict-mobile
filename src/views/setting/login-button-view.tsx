import * as React from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import ColorId from '../../styles/color-id';
import { FontAwesome } from '@expo/vector-icons';
import { useContext } from 'react';

const Container = styled.View`
  width: 100%;
  height: 100px;
  background-color: ${props => props.theme[ColorId.background]};
`;

const LoginTouchable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`;

const IconContainer = styled.Text`
  color: ${props => props.theme[ColorId.foreground]};
  margin-left: 20px;
`;

const LoginHint = styled.Text`
  color: ${props => props.theme[ColorId.foreground]};
  font-size: 25px;
  margin-left: 20px;
`;

export const LoginButtonView: React.FC = () => {
  const theme = useContext(ThemeContext);

  const config = {
    // redirectUrl: '',
    clientId: 'd0812cce061bc8601159',
    scope: 'user',
    serviceConfiguration: {
      authorizationEndpoint: 'https://github.com/login/oauth/authorize',
      tokenEndpoint: 'https://github.com/login/oauth/access_token',
      revocationEndpoint: 'https://github.com/settings/connections/applications/d0812cce061bc8601159'
    }
  }

  async function onPress() {
    console.log(config);
  }

  return (
    <Container>
      <LoginTouchable
        onPress={onPress}
      >
        <IconContainer>
          {/*<AntDesign name={'user'} size={24} color={theme[ColorId.foreground]}/>;*/}
          <FontAwesome name="user-circle-o" size={60} color={theme[ColorId.foreground]} />
        </IconContainer>
        <LoginHint>点击登录</LoginHint>
      </LoginTouchable>
    </Container>
  )
};
