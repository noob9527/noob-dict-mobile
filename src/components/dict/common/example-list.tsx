import React from 'react';
import { Example, Language } from '@noob9527/noob-dict-core';
import styled from 'styled-components/native';
import Highlight from '../shared/highlight/highlight';
import { ThemedText } from '../../themed-ui/text/text';

const Container = styled.View`
  margin-top: 10px;
`;

const ListContainer = styled.View`
`;

const ItemContainer = styled.View`
  flex-direction: row;
  margin-top: 8px;
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
        {zh ? <ThemedText style={{ marginTop: 3 }}>{zh}</ThemedText> : null}
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
    <Container>
      <ThemedText>Examples:</ThemedText>
      <ListContainer>
        {examples.map((def, i) =>
          (<ExampleItem example={def} highlightWordSet={highlightWordSet} key={i}/>))
        }
      </ListContainer>
    </Container>
  );
};

export default ExampleList;
