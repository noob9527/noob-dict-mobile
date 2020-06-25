import React from 'react';
import { View, Text } from 'react-native';
import { Meaning } from '@noob9527/noob-dict-core';
import styled from 'styled-components/native';

const ItemContainer = styled.View`

`;

const ListContainer = styled.View`

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
      <Text>{meaning.EN}</Text>
      <Text>{meaning.ZH}</Text>
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

