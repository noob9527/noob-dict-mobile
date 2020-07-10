import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { useSelector } from 'react-redux';
import { SearchInputState } from '../input/search-input-model';
import { SearchPanelState } from './search-panel-model';
import { SearchSuggests } from './search-suggests';
import { ActivityIndicator } from 'react-native';
import { SearchTabs } from './search-tabs';
import { ThemedEmpty } from '../../../components/themed-ui/empty/empty';
import { SearchNote } from '../note/search-note';
import ColorId from '../../../styles/color-id';

const Container = styled.View`
 flex: 1;
 justify-content: center;
 margin-bottom: 80px;
`;

export const SearchPanel = () => {
  const theme = useTheme();
  const {
    open,
  } = useSelector((state: { searchInput: SearchInputState }) => state.searchInput);
  const state: SearchPanelState = useSelector((state: any) => state.searchPanel);

  let component;

  if (open) {
    component = (<SearchSuggests/>);
  } else if (state.loading) {
    component = (<ActivityIndicator color={theme[ColorId.foreground]} size={80} style={{ bottom: 40 }}/>);
  } else if (!state.primaryResult) {
    component = (<ThemedEmpty/>);
  } else {
    component = (<>
      <SearchTabs/>
      <SearchNote/>
    </>);
  }

  return (
    <Container>
      {component}
    </Container>
  );
};

