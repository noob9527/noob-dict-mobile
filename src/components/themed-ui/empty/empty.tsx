import React, { Fragment } from 'react';
import { Text, Image } from 'react-native';
import styled from 'styled-components/native';
import { ThemedText } from '../text/text';

const Container = styled.View`
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const StyledImage = styled.Image`
  top: -120px;
`;

const StyledText = styled(ThemedText)`
  top: -110px;
`;

const ThemedEmpty: React.FC = (props) => {
  return <Container>
    <StyledImage
      source={require('./empty.png')}
    />
    <StyledText>No Result</StyledText>
  </Container>;
};


export { ThemedEmpty };
