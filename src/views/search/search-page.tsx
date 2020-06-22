import { Button, Text, View } from 'react-native';
import * as React from 'react';
import styled from 'styled-components/native';
// import { rendererContainer } from '../../services/impl/renderer-container';
import { SearchService, SearchServiceToken } from '../../services/search-service';
import { CorsSearchService } from '../../services/impl/search-service-impl';
import { useState } from 'react';
import database from '../../services/impl/db/database';
import ColorId from '../../styles/color-id';
import { SearchInput } from './input/search-input';
import { SearchPanel } from './panel/search-panel';

const Container = styled.View`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  
  > * + * {
    flex: 1;
    overflow: hidden;
  }
`;

const Header = styled.View`
  height: 100px;
  color: ${props => props.theme[ColorId.foreground]};
  background-color: ${props => props.theme[ColorId.background]};
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Content = styled.View`
  display: flex;
  flex-direction: column;

  > * + * {
    display: flex;
    flex-direction: column;
    //overflow: auto;  // default scroll bar, we use react-scrollbar instead
    overflow: hidden;
    flex: 1;
  }
`;


const searchService = new CorsSearchService();

export const SearchPage = () => {
  // const searchService = rendererContainer.get<SearchService>(SearchServiceToken);
  const [text, setText] = useState('');
  return (
    <Container>
      <Header>
        <SearchInput/>
      </Header>
      <Content>
        <SearchPanel/>
        {/*<Text>Search</Text>*/}
        {/*<Button*/}
        {/*  title="set text to foo"*/}
        {/*  onPress={() => {*/}
        {/*    setText('foo');*/}
        {/*  }}*/}
        {/*/>*/}
        {/*<Button*/}
        {/*  title="suggest hello"*/}
        {/*  onPress={() => {*/}
        {/*    searchService.fetchSuggests('hello', '1')*/}
        {/*      .then(res => {*/}
        {/*        setText(JSON.stringify(res));*/}
        {/*        console.log(res);*/}
        {/*      });*/}
        {/*  }}*/}
        {/*/>*/}
        {/*<Button*/}
        {/*  title="search hello"*/}
        {/*  onPress={() => {*/}
        {/*    searchService.fetchResult('hello', {})*/}
        {/*      .then(res => {*/}
        {/*        setText(JSON.stringify(res));*/}
        {/*        console.log(res);*/}
        {/*      });*/}
        {/*  }}*/}
        {/*/>*/}
        {/*<Button*/}
        {/*  title="sqlite"*/}
        {/*  onPress={() => {*/}
        {/*    database.transaction(tx => {*/}
        {/*      return tx.executeSql('select * from notes', [], (tx, res) => {*/}
        {/*        console.log(res.rows.length);*/}
        {/*        const items = Array.from({ length: res.rows.length }).map((e, i) => {*/}
        {/*          return res.rows.item(i)*/}
        {/*        });*/}
        {/*        console.log(items);*/}
        {/*      });*/}
        {/*    }, error => {*/}
        {/*      console.log(error);*/}
        {/*    }, () => {*/}
        {/*    });*/}
        {/*  }}/>*/}
        {/*<Text>{text}</Text>*/}
      </Content>
    </Container>
  );
};
