import React from 'react';
import { View, Text } from 'react-native';
import { Pronunciation, LanguageTag } from '@noob9527/noob-dict-core';
import styled from 'styled-components/native';
import Speaker from '../shared/speaker/speaker';

const ItemContainer = styled.View`
  > View + View {
    margin-left: 5px;
  }
`;
const ListContainer = styled.View`
  > View + View {
    margin-left: 15px;
  }
`;

interface PronunciationItemProps {
  pronunciation: Pronunciation
}

interface PronunciationListProps {
  pronunciations: Pronunciation[]
}

const PronunciationItem: React.FC<PronunciationItemProps> = (props: PronunciationItemProps) => {
  const { pronunciation } = props;
  return (
    <ItemContainer>
      <Text>{LanguageTag.getLabel(pronunciation.tag)}</Text>
      <Text>{pronunciation.phoneticSymbol}</Text>
      <Speaker src={pronunciation.audio ?? undefined}/>
    </ItemContainer>
  );
};

const PronunciationList: React.FC<PronunciationListProps> = (props: PronunciationListProps) => {
  const { pronunciations } = props;
  return (
    <ListContainer>
      {pronunciations.map((prop, i) => (
        <PronunciationItem pronunciation={prop} key={i}/>
      ))}
    </ListContainer>
  );
};

export default PronunciationList;
