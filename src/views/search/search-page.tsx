import * as React from 'react';
import styled from 'styled-components/native';
// import { rendererContainer } from '../../services/impl/renderer-container';
import ColorId from '../../styles/color-id';
import { SearchInput } from './input/search-input';
import { SearchPanel } from './panel/search-panel';
import { SafeAreaView } from 'react-native-safe-area-context';

const Container = styled(SafeAreaView)`
  height: 100%;
  background-color: ${props => props.theme[ColorId.status_bar_background]};
  /*
  overflow: hidden;
   */
`;

const Header = styled.View`
  background-color: ${props => props.theme[ColorId.background]};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Content = styled.View`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${props => props.theme[ColorId.background]};
`;

export const SearchPage = () => {
  return (
    <Container>
      <Header>
        <SearchInput/>
      </Header>
      <Content>
        <SearchPanel/>
      </Content>
    </Container>
  );
};
