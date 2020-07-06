import styled from 'styled-components/native';
import ColorId from '../../styles/color-id';

export const ThemedView = styled.View`
  background-color: ${props => props.theme[ColorId.background]};
`;
