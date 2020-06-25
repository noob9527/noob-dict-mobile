import React from 'react';
import { View, Text } from 'react-native';
import { WordForm, WordFormToken } from '@noob9527/noob-dict-core';
import styled from 'styled-components/native';

const ItemContainer = styled.View`

`;
const ListContainer = styled.View`
  > View + View::before {
    content: ' | ';
  }
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
      <View>{WordFormToken.getLabel(wordForm[0])}: </View>
      <View>{wordForm[1]}</View>
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
