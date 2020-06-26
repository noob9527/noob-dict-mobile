import React from 'react';
import { View, Text } from 'react-native';
import { Definition } from '@noob9527/noob-dict-core';
import styled from 'styled-components/native';
import BingMeaningList from './bing-meaning-list';
import { ThemedText } from '../../themed-ui/text/text';

const ListContainer = styled.View`
`;

const ItemContainer = styled.View`
  margin-top: 3px;
  flex-direction: row;
`;

const StyledText = styled(ThemedText)`
  margin-right: 10px;
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
      <StyledText>{definition.partOfSpeech}</StyledText>
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
