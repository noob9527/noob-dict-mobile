import React from 'react';
import { View, Text, Animated, FlatList } from 'react-native';
import { Definition } from '@noob9527/noob-dict-core';
import styled from 'styled-components/native';
import PronunciationList from './pronunciation-list';
import WordFormList from './word-form-list';
import MeaningList from './meaning-list';
import ExampleList from './example-list';
import { LineSeparator } from '../../themed-ui/line-separator';
import { ThemedText } from '../../themed-ui/text/text';

const ListContainer = styled.View`

`;

const ItemContainer = styled.View`

`;


interface DefinitionListProp {
  definitions: Definition[]
}

interface DefinitionItemProp {
  definition: Definition
}

const DefinitionItem: React.FC<DefinitionItemProp> = (props: DefinitionItemProp) => {
  const { definition } = props;
  const highlightWords = new Set([
    definition.title!!,
    ...definition.wordForms.map(e => e[1]),
  ]);
  return (
    <ItemContainer>
      <ThemedText>{definition.partOfSpeech}</ThemedText>
      <PronunciationList pronunciations={definition.pronunciations}/>
      <WordFormList wordForms={definition.wordForms}/>
      <MeaningList meanings={definition.meanings}/>
      <ExampleList examples={definition.examples} highlightWordSet={highlightWords}/>
    </ItemContainer>
  );
};

const DefinitionList: React.FC<DefinitionListProp> = (props: DefinitionListProp) => {
  const { definitions } = props;
  return (
    <ListContainer>
      {definitions.map((def, i) =>
        (
          <View key={i}>
            <DefinitionItem definition={def} key={i}/>
            {i < definitions.length - 1 ? <LineSeparator/> : null}
          </View>
        ),
      )}
    </ListContainer>
  );
};

export default DefinitionList;
