import styled from 'styled-components/native';
import ColorId from '../../../styles/color-id';

const ThemedText = styled.Text`
  color: ${props => props.theme[ColorId.foreground]};
`;

export { ThemedText };
