import React from 'react';
import styled from 'styled-components/native';
import EngineView from '../views/engine/engine-view';

const Container = styled.View`
`;

export const SearchPanel = () => {
  return (
    <Container>
      <EngineView></EngineView>
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

