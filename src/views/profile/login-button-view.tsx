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

const LoginHint = styled.Text`
  color: ${props => props.theme[ColorId.foreground]};
  font-size: 25px;
  margin-left: 20px;
`;

export const LoginButtonView: React.FC = () => {
  const theme = useContext(ThemeContext);

  async function onPress() {
    console.log(123);
  }

  return (
    <Container>
      <LoginTouchable
        onPress={onPress}
      >
        <LoginHint>点击登录</LoginHint>
      </LoginTouchable>
    </Container>
  )
};
