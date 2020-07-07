import * as React from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { ImageSourcePropType, Image } from 'react-native';
import ColorId from '../../styles/color-id';
import { FontAwesome } from '@expo/vector-icons';
import { useContext } from 'react';

const IconContainer = styled.View`
  color: ${props => props.theme[ColorId.foreground]};
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
`;

export interface AvatarProps {
  style?: any
  source: { uri?: string | null }
}

export const Avatar: React.FC<AvatarProps> = (props) => {
  const theme = useContext(ThemeContext);
  return (
    <IconContainer style={{...props.style}}>
      {
        !!props.source?.uri
          ? <Image
            source={props.source}
            style={{
              resizeMode: 'cover',
              borderRadius: 50,
              borderWidth: 1,
              borderColor: theme[ColorId.foreground],
              width: 100,
              height: 100,
            }}
          />
          : <FontAwesome name="user-circle-o" size={100} color={theme[ColorId.foreground]}/>
      }
      {/*<AntDesign name={'user'} size={24} color={theme[ColorId.foreground]}/>;*/}
    </IconContainer>
  );
};
