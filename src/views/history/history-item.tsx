import React from 'react';
import styled from 'styled-components/native';
import { ThemedText } from '../../components/themed-ui/text/text';
import { SearchHistory } from '../../model/history';
import Title from '../../components/dict/common/title';
import PronunciationList from '../../components/dict/common/pronunciation-list';
import { HistoryViewBingDefinitionList } from './history-view-bing-definition-list';

const Container = styled.View`
  margin: 10px;
`;

const ResultContainer = styled.View`
  flex-direction: row;
`;

const HistoryTitle = styled(Title)`
  font-size: 15px;
`;

const DefinitionContainer = styled.View`
  margin-left: 15px;
`;

const ContextContainer = styled.View`
  height: 0;
`;

const ContextParagraph = styled(ThemedText)`

`;

const ContextSource = styled(ThemedText)`

`;

export interface HistoryItemProp {
  history: SearchHistory
}

export const HistoryItem: React.FC<HistoryItemProp> = (prop) => {
  const { history } = prop;

  const pronunciations = history.search_result.definitions.flatMap(e => e.pronunciations);
  const wordForms = history.search_result.definitions.flatMap(e => e.wordForms);
  const definitions = history.search_result.definitions.slice(0, 2);

  return (
    <Container>
      <ResultContainer>
        <HistoryTitle>{history.text}</HistoryTitle>
        <DefinitionContainer>
          <PronunciationList pronunciations={pronunciations}/>
          <HistoryViewBingDefinitionList definitions={definitions as any}/>
        </DefinitionContainer>
      </ResultContainer>
      <ContextContainer>
        <ContextParagraph>{history.context?.paragraph}</ContextParagraph>
        <ContextSource>{history.context?.source}</ContextSource>
      </ContextContainer>
    </Container>
  );
};
