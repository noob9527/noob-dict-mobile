import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import { useDispatch } from 'react-redux';
import ColorId from '../../../../styles/color-id';

const StyledWordLink = styled.View`
  color: ${props => props.theme[ColorId.word_link]};
  cursor: pointer;
`;

interface WordLinkProps {
  word: string
}

const WordLink: React.FC<WordLinkProps> = (props) => {
  const { word } = props;
  const dispatch = useDispatch();
  return <StyledWordLink
    onClick={() => {
      dispatch({
        type: 'search/search',
        payload: {
          text: word,
        },
      });
    }}
  >{word}</StyledWordLink>;
};

export default WordLink;
