import React from 'react';
import { View, Text } from 'react-native';
import { Definition } from '@noob9527/noob-dict-core';
import styled from 'styled-components/native';
import BingMeaningList from './bing-meaning-list';

const ListContainer = styled.View`

`;

const ItemContainer = styled.View`
  > View + View {
    margin-left: 5px;
  }
`;


interface BingDefinitionListProp {
  definitions: Definition[]
}

interface BingDefinitionItemProp {
  definition: Definition
}

const BingDefinitionItem: React.FC<BingDefinitionItemProp> = (props: BingDefinitionItemProp) => {
  const { definition } = props;
  return (
    <ItemContainer>
      <Text>{definition.partOfSpeech}</Text>
      <BingMeaningList meanings={definition.meanings}/>
    </ItemContainer>
  );
};

const BingDefinitionList: React.FC<BingDefinitionListProp> = (props: BingDefinitionListProp) => {
  const { definitions } = props;
  return (
    <>
      <ListContainer>
        {definitions.map((def, i) => (<BingDefinitionItem definition={def} key={i}/>))}
      </ListContainer>
    </>
  );
};

export default BingDefinitionList;
