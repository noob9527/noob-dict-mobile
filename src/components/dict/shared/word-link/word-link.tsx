import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import { useDispatch } from 'react-redux';
import ColorId from '../../../../styles/color-id';
import { ThemedText } from '../../../themed-ui/text/text';

const StyledWordLink = styled(ThemedText)`
  color: ${props => props.theme[ColorId.word_link]};
`;

interface WordLinkProps {
  word: string
}

const WordLink: React.FC<WordLinkProps> = (props) => {
  const { word } = props;
  const dispatch = useDispatch();
  return (
    <StyledWordLink
      onPress={() => {
        dispatch({
          type: 'search/search',
          payload: {
            text: word,
          },
        });
      }}
    >{word}</StyledWordLink>
  );
};

export default WordLink;
