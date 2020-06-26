import React from 'react';
import styled from 'styled-components/native';
import EngineView from '../views/engine/engine-view';
import { useSelector } from 'react-redux';
import { SearchInputState } from '../input/search-input-model';
import { SearchPanelState } from './search-panel-model';
import { SearchSuggests } from './search-suggests';

const Container = styled.View`
`;

export const SearchPanel = () => {
  const {
    open,
  } = useSelector((state: { searchInput: SearchInputState }) => state.searchInput);

  if (open) {
    return (
      <Container>
        <SearchSuggests/>
      </Container>
    )
  }

  return (
    <Container>
      <EngineView/>

      {/*<Switch>*/}
      {/*  /!*<Route path="/search/tab1" component={() => <div>tab1</div>}/>*!/*/}
      {/*  /!*<Route path="/search/tab2" component={() => <div>tab2</div>}/>*!/*/}
      {/*  /!*<Route path="/search/overview" component={OverviewView}/>*!/*/}
      {/*  <Route path="/search/engine_view/:engine" component={EngineView}/>*/}
      {/*  <Route component={EngineView}/>*/}
      {/*</Switch>*/}
    </Container>
  );
}

