import React from 'react';
import { Text } from 'react-native';
import { Meaning } from '@noob9527/noob-dict-core';
import styled from 'styled-components/native';
import { ThemedText } from '../../themed-ui/text/text';

const ItemContainer = styled.View`

`;

const ListContainer = styled.View`

`;

interface MeaningItemProp {
  meaning: Meaning
}

interface MeaningListProp {
  meanings: Meaning[]
}

const MeaningItem: React.FC<MeaningItemProp> = (props: MeaningItemProp) => {
  const { meaning } = props;
  return (
    <ItemContainer>
      <ThemedText>{meaning.EN}</ThemedText>
      <ThemedText>{meaning.ZH}</ThemedText>
    </ItemContainer>
  );
};

const MeaningList: React.FC<MeaningListProp> = (props: MeaningListProp) => {
  const { meanings } = props;
  return (
    <>
      <ThemedText>Meanings:</ThemedText>
      <ListContainer>
        {meanings.map((def, i) => (<MeaningItem meaning={def} key={i}/>))}
      </ListContainer>
    </>
  );
};

export default MeaningList;
