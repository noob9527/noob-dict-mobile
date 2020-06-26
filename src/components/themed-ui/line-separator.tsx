import styled from 'styled-components/native';
import ColorId from '../../styles/color-id';

const LineSeparator = styled.View`
  border-bottom-color: ${props => props.theme[ColorId.foreground]};
  border-bottom-width: 2px;
  margin-top: 8px;
  margin-bottom: 5px;
`;

export { LineSeparator };
