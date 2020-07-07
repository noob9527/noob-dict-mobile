import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { View, Text, Animated, FlatList } from 'react-native';
import { Example, Language } from '@noob9527/noob-dict-core';
import styled from 'styled-components/native';
import { useDispatch } from 'react-redux';
import Highlight from '../shared/highlight/highlight';
import ColorId from '../../../styles/color-id';
import { ThemedTooltip } from '../../themed-ui/tooltip/tooltip';
import { ThemedText } from '../../themed-ui/text/text';

const ListContainer = styled.View`

`;

const ItemContainer = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;

const ItemContent = styled.View`
  flex-direction: column;
  padding-left: 8px;
`;

interface ExampleItemProp {
  example: Example
  highlightWordSet?: Set<string>
}

const ExampleItem: React.FC<ExampleItemProp> = (props: ExampleItemProp) => {
  const { example, highlightWordSet } = props;

  const en = example[Language.EN].sentence;
  const zh = example[Language.ZH].sentence;

  return (
    <ItemContainer>
      <ThemedText>{'\u2022'}</ThemedText>
      <ItemContent>
        <Highlight sentence={en} highlightWords={highlightWordSet}/>
        {/*<Button type="link" shape="circle" ghost onClick={() => {*/}
        {/*  dispatch({*/}
        {/*    type: 'searchNote/saveExampleToContext',*/}
        {/*    payload: {*/}
        {/*      paragraph: en,*/}
        {/*    },*/}
        {/*  });*/}
        {/*}}>*/}
        {/*  <AntDesign name="file-add"/>*/}
        {/*</Button>*/}
        <ThemedText style={{ marginTop: 3 }}>{zh}</ThemedText>
      </ItemContent>
    </ItemContainer>
  );
};

interface ExampleListProp {
  examples: Example[]
  highlightWordSet?: Set<string>
}

const ExampleList: React.FC<ExampleListProp> = (props: ExampleListProp) => {
  const { examples, highlightWordSet } = props;
  return (
    <>
      <ThemedText>Examples:</ThemedText>
      <ListContainer>
        {examples.map((def, i) =>
          (<ExampleItem example={def} highlightWordSet={highlightWordSet} key={i}/>))
        }
      </ListContainer>
    </>
  );
};

export default ExampleList;
