import React from 'react';
import { View, Text } from 'react-native';
import { DoYouMeanItem, DoYouMeanType } from '@noob9527/noob-dict-core';
import styled from 'styled-components/native';
import _ from 'lodash';
import WordLink from '../shared/word-link/word-link';

const GroupContainer = styled.View`
`;
const ListContainer = styled.View`
`;
const ItemContainer = styled.View`
  View:nth-child(1) {
    margin-right: 15px;  
  }
`;

const GroupTitle = styled.Text`
  margin-bottom: 0;
  font-weight: bold;
`;

const ListTitle = styled.Text`
  font-size: 1.2em;
`;

interface DoYouMeanGroupProp {
  target: string
  doYouMeanItems: DoYouMeanItem[]
}

interface DoYouMeanListProp {
  doYouMeanType: DoYouMeanType
  doYouMeanItems: DoYouMeanItem[]
}

interface DoYouMeanItemProp {
  doYouMeanItem: DoYouMeanItem
}

const DoYouMeanItemComponent: React.FC<DoYouMeanItemProp> = (props) => {
  const { doYouMeanItem } = props;
  return (
    <ItemContainer>
      <WordLink word={doYouMeanItem.suggest.entry}/>
      <View>{doYouMeanItem.suggest.explain}</View>
    </ItemContainer>
  );
};

const DoYouMeanList: React.FC<DoYouMeanListProp> = (props: DoYouMeanListProp) => {
  const { doYouMeanItems, doYouMeanType } = props;
  let title;
  switch (doYouMeanType) {
    case DoYouMeanType.SIMILAR_SPELLING:
      title = 'similar spelling';
      break;
    case DoYouMeanType.SIMILAR_PRONUNCIATION:
      title = 'similar pronunciation';
      break;
    case DoYouMeanType.WEB:
      title = 'WEB';
      break;
    case DoYouMeanType.UNKNOWN:
      title = '';
      break;
  }
  return (
    <ListContainer>
      {title ? <ListTitle>{title}</ListTitle> : null}
      {doYouMeanItems.map((e, i) => (
        <DoYouMeanItemComponent key={i} doYouMeanItem={e}/>
      ))}
    </ListContainer>
  );
};

const DoYouMeanGroup: React.FC<DoYouMeanGroupProp> = (props) => {
  const { doYouMeanItems, target } = props;
  const doYouMeanItemMap = _.groupBy(doYouMeanItems, e => e.type);
  return (
    <GroupContainer>
      <GroupTitle>No result for '{target}', do you mean:</GroupTitle>
      {
        Object.entries(doYouMeanItemMap).map(([key, value], i, arr) => (
          <View key={key}>
            <DoYouMeanList doYouMeanType={key as DoYouMeanType} doYouMeanItems={value}/>
            {i < arr.length - 1 ? <hr/> : null}
          </View>
        ))
      }
    </GroupContainer>
  );
};

export default DoYouMeanGroup;
