import React from 'react';
import { View, Text } from 'react-native';
import { Pronunciation, LanguageTag } from '@noob9527/noob-dict-core';
import styled from 'styled-components/native';
import Speaker from '../shared/speaker/speaker';
import { ThemedText } from '../../themed-ui/text/text';

const ItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 20px;
`;
const ListContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
const StyledText = styled(ThemedText)`
  margin-right: 5px;
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
      <StyledText>{LanguageTag.getLabel(pronunciation.tag)}</StyledText>
      <StyledText>{pronunciation.phoneticSymbol}</StyledText>
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
