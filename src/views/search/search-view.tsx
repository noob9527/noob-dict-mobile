import { Button, Text, View } from 'react-native';
import * as React from 'react';
import styled from 'styled-components/native';
// import { rendererContainer } from '../../services/impl/renderer-container';
import { SearchService, SearchServiceToken } from '../../services/search-service';
import { CorsSearchService } from '../../services/impl/search-service-impl';
import { useState } from 'react';
import { timer } from '../../noob-dict-core/utils/promise-extension';

const Container = styled.View`
  display: flex;
  margin: auto;
`;

const searchService = new CorsSearchService();

export const SearchView = () => {
  // const searchService = rendererContainer.get<SearchService>(SearchServiceToken);
  const [text, setText] = useState('');
  return (
    <Container>
      <Text>Search</Text>
      <Button
        title="set text to foo"
        onPress={() => {
          setText('foo');
        }}
      />
      <Button
        title="suggest hello"
        onPress={() => {
          searchService.fetchSuggests('hello', '1')
            .then(res => {
              setText(JSON.stringify(res));
              console.log(res);
            });
        }}
      />
      <Button
        title="search hello"
        onPress={() => {
          searchService.fetchResult('hello', {})
            .then(res => {
              setText(JSON.stringify(res));
              console.log(res);
            });
        }}
      />
      <Text>{text}</Text>
    </Container>
  );
};
