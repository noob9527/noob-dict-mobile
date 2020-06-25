import React from 'react';
import { AntDesign } from '@expo/vector-icons'
import { View, Text, Animated, FlatList } from 'react-native';
import { Button, WhiteSpace, WingBlank } from '@ant-design/react-native';
import { Example, Language } from '@noob9527/noob-dict-core';
import styled from 'styled-components/native';
import { useDispatch } from 'react-redux';
import Highlight from '../shared/highlight/highlight';
import ColorId from '../../../styles/color-id';
import { ThemedTooltip } from '../../themed-ui/tooltip/tooltip';

const ItemContainer = styled.View`
  //margin-bottom: 8px;
  .ant-button {
    height: unset;
  }
  .anticon {
    color: ${props => props.theme[ColorId.word_link]};
  }
`;

const ListContainer = styled(FlatList)`

`;

interface ExampleItemProp {
  example: Example
  highlightWordSet?: Set<string>
}

const ExampleItem: React.FC<ExampleItemProp> = (props: ExampleItemProp) => {
  const dispatch = useDispatch();
  const { example, highlightWordSet } = props;

  const en = example[Language.EN].sentence;
  const zh = example[Language.ZH].sentence;

  return (
    <ItemContainer>
      <View>
        {/*<View>{en}</View>*/}
        <Highlight sentence={en} highlightWords={highlightWordSet}/>
        <ThemedTooltip title={'save as context'}>
          <Button type="link" shape="circle" ghost onClick={() => {
            dispatch({
              type: 'searchNote/saveExampleToContext',
              payload: {
                paragraph: en,
              },
            });
          }}>
            <AntDesign name="file-add"/>
          </Button>
        </ThemedTooltip>
      </View>
      <View>{zh}</View>
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
      <Text>Examples:</Text>
      <ListContainer>
        {examples.map((def, i) =>
          (<ExampleItem example={def} highlightWordSet={highlightWordSet} key={i}/>))
        }
      </ListContainer>
    </>
  );
};

export default ExampleList;
