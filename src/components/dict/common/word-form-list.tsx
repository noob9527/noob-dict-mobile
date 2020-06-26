import React from 'react';
import { View, Text } from 'react-native';
import { WordForm, WordFormToken } from '@noob9527/noob-dict-core';
import styled from 'styled-components/native';
import { ThemedText } from '../../themed-ui/text/text';

const ItemContainer = styled.View`
  flex-direction: row;
  margin-right: 5px;
`;
const ListContainer = styled.View`
  margin-top: 8px;
`;


interface WordFormItemProp {
  wordForm: WordForm
}
interface WordFormListProp {
  wordForms: WordForm[]
}

const WordFormItem: React.FC<WordFormItemProp> = (props: WordFormItemProp) => {
  const { wordForm } = props;
  return (
    <ItemContainer>
      <ThemedText>{WordFormToken.getLabel(wordForm[0])}: </ThemedText>
      <ThemedText>{wordForm[1]}</ThemedText>
    </ItemContainer>
  );
};
const WordFormList: React.FC<WordFormListProp> = (props: WordFormListProp) => {
  const { wordForms } = props;
  return (
    <ListContainer>
      {wordForms.map((def, i) => (<WordFormItem wordForm={def} key={i}/>))}
    </ListContainer>
  );
};

export default WordFormList;
