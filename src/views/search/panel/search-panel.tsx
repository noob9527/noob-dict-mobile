import React from 'react';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import { SearchInputState } from '../input/search-input-model';
import { SearchPanelState } from './search-panel-model';
import { SearchSuggests } from './search-suggests';
import { ActivityIndicator, Text } from 'react-native';
import { ThemedEmpty } from '../../../components/themed-ui/empty/empty';
import { EngineIdentifier } from '@noob9527/noob-dict-core';
import BingDict from '../../../components/dict/bing/bing-dict';
import CommonDict from '../../../components/dict/common/common-dict';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  width: 90%;
  margin: auto;
`;

export const SearchPanel = () => {
  const {
    open,
  } = useSelector((state: { searchInput: SearchInputState }) => state.searchInput);
  const state: SearchPanelState = useSelector((state: any) => state.searchPanel);
  const engine = 'BING';
  const result = state.searchResultMap[engine];

  let component;

  if (open) {
    component = (<SearchSuggests/>);
  } else if (state.loading) {
    component = (<ActivityIndicator color={'rebeccapurple'} size={80} style={{ bottom: 40 }}/>);
  } else if (!result) {
    component = (<ThemedEmpty/>);
  } else {
    switch (result.engine) {
      case EngineIdentifier.BING:
        component = <BingDict result={result}/>;
        break;
      default:
        component = <CommonDict result={result}/>;
        break;
    }
  }

  return (
    <Container>
      {component}
    </Container>
  );
};

