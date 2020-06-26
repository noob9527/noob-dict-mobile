import React from 'react';
import { View, Text } from 'react-native';
import { Meaning } from '@noob9527/noob-dict-core';
import styled from 'styled-components/native';
import { ThemedText } from '../../themed-ui/text/text';

const ListContainer = styled.View`

`;

const ItemContainer = styled.View`
  flex-direction: row;
`;

interface BingMeaningItemProp {
  meaning: Meaning
}

interface BingMeaningListProp {
  meanings: Meaning[]
}

const BingMeaningItem: React.FC<BingMeaningItemProp> = (props: BingMeaningItemProp) => {
  const { meaning } = props;
  return (
    <ItemContainer>
      <ThemedText>{meaning.EN}</ThemedText>
      <ThemedText>{meaning.ZH}</ThemedText>
    </ItemContainer>
  );
};

const BingMeaningList: React.FC<BingMeaningListProp> = (props: BingMeaningListProp) => {
  const { meanings } = props;
  return (
    <>
      <ListContainer>
        {meanings.map((def, i) => (<BingMeaningItem meaning={def} key={i}/>))}
      </ListContainer>
    </>
  );
};

export default BingMeaningList;

