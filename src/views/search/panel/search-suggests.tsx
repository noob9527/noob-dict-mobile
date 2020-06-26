import React from 'react';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { SearchInputState } from '../input/search-input-model';
import { SearchPanelState } from './search-panel-model';
import EngineView from '../views/engine/engine-view';
import { ActivityIndicator, Animated, FlatList, Text } from 'react-native';
import { Suggest } from '@noob9527/noob-dict-core';
import ColorId from '../../../styles/color-id';

const Container = styled.View`
  height: 100%;
  justify-content: center;
`;

const ListContainer = styled(FlatList)`
  width: 90%;
  margin: auto;
`;

const ListItemContainer = styled.TouchableOpacity`
  flex-direction: row;
`;

const SearchEntry = styled.Text`
  color: ${props => props.theme[ColorId.foreground]};
`;

const SearchExplain = styled.Text`
  color: ${props => props.theme[ColorId.foreground_secondary]};
  margin-left: 20px;
`;

const ListItem: React.FC<{
  suggest: Suggest,
  index: number,
  onPress: (suggest: Suggest) => void
}> = (props) => {
  const { suggest, index, onPress } = props;
  return <ListItemContainer
    style={{ marginTop: index ? 10 : 0 }}
    onPress={() => onPress(suggest)}
  >
    <SearchEntry
      numberOfLines={1}
      ellipsizeMode='tail'
    >{suggest.entry}</SearchEntry>
    <SearchExplain
      numberOfLines={1}
      ellipsizeMode='tail'
    >{suggest.explain}</SearchExplain>
  </ListItemContainer>
}

export const SearchSuggests = () => {
  const {
    text,
    suggests,
    loadingSuggests,
  } = useSelector((state: { searchInput: SearchInputState }) => state.searchInput);

  const dispatch = useDispatch();

  // 用户选择了自动补全项
  function onSelect(text: string) {
    console.log('on select');
    dispatch({
      type: 'searchInput/searchTextChange',
      text,
    });
    search(text);
  }

  function search(text: string) {
    dispatch({
      type: 'searchPanel/fetchResults',
      text,
    });
  }

  if (loadingSuggests) {
    return (<Container>
      <ActivityIndicator size={'large'}/>
    </Container>)
  }

  return (
    <Container>
      <ListContainer
        data={suggests}
        keyExtractor={(item: any) => item.entry}
        renderItem={({ item, index }) => <ListItem
          suggest={item as Suggest}
          index={index}
          onPress={(suggest) => onSelect(suggest.entry)}
        />}
      >
      </ListContainer>
    </Container>
  );
}

