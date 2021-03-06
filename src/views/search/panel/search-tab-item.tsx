import React from 'react';
import { SearchPanelState } from './search-panel-model';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { ThemedEmpty } from '../../../components/themed-ui/empty/empty';
import { EngineIdentifier } from '@noob9527/noob-dict-core';
import BingDict from '../../../components/dict/bing/bing-dict';
import CommonDict from '../../../components/dict/common/common-dict';
import styled from 'styled-components/native';
import ColorId from '../../../styles/color-id';

const Container = styled.ScrollView`
  padding-left: 5%;
  padding-right: 5%;
  background-color: ${props => props.theme[ColorId.background]};
`;

export const SearchTabItem: React.FC = () => {
  const state: SearchPanelState = useSelector((state: any) => state.searchPanel);
  const route = useRoute();
  const engine = route.name;
  const result = state.searchResultMap[engine];

  let component;
  if (!result) {
    component = <ThemedEmpty/>;
  } else {
    switch (engine) {
      case EngineIdentifier.BING:
        component = <BingDict result={result}/>;
        break;
      case EngineIdentifier.CAMBRIDGE:
        component = <CommonDict result={result}/>;
        break;
      default:
        component = <CommonDict result={result}/>;
        break;
    }
  }
  return (
    <>
      <Container
        contentContainerStyle={{
          paddingTop: 15,
          // minHeight: '100%',
          paddingBottom: 30,
        }}
      >{component}</Container>
    </>
  );
};
