import styled from 'styled-components/native';
import { View, Text } from 'react-native';
import ColorId from '../../../styles/color-id';
import { ThemedText } from '../../themed-ui/text/text';

const Title = styled(ThemedText)`
  color: ${props => props.theme[ColorId.foreground]};
  font-weight: bold;
  font-size: 25px;
`;

export default Title;
