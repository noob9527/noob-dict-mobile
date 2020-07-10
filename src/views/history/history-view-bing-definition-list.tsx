import React from 'react';
import { Definition } from '@noob9527/noob-dict-core';
import styled from 'styled-components/native';
import { ThemedText } from '../../components/themed-ui/text/text';
import BingMeaningList from '../../components/dict/bing/bing-meaning-list';

const ListContainer = styled.View`
`;

const ItemContainer = styled.View`
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

const HistoryViewBingDefinitionItem: React.FC<BingDefinitionItemProp> = (props: BingDefinitionItemProp) => {
  const { definition } = props;
  return (
    <ItemContainer>
      <StyledText>{definition.partOfSpeech}</StyledText>
      <BingMeaningList meanings={definition.meanings}/>
    </ItemContainer>
  );
};

export const HistoryViewBingDefinitionList: React.FC<BingDefinitionListProp> = (props: BingDefinitionListProp) => {
  const { definitions } = props;
  return (
    <>
      <ListContainer>
        {definitions.map((def, i) => (<HistoryViewBingDefinitionItem definition={def} key={i}/>))}
      </ListContainer>
    </>
  );
};

