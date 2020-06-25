import React from 'react';
import { View, Text, Animated } from 'react-native';
import { Meaning } from '@noob9527/noob-dict-core';
import styled from 'styled-components/native';
import FlatList = Animated.FlatList;

const ItemContainer = styled.View`

`;

const ListContainer = styled(FlatList)`

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
      <View>{meaning.EN}</View>
      <View>{meaning.ZH}</View>
    </ItemContainer>
  );
};

const MeaningList: React.FC<MeaningListProp> = (props: MeaningListProp) => {
  const { meanings } = props;
  return (
    <>
      <Text>Meanings:</Text>
      <ListContainer>
        {meanings.map((def, i) => (<MeaningItem meaning={def} key={i}/>))}
      </ListContainer>
    </>
  );
};

export default MeaningList;
