import React from 'react';
import styled from 'styled-components/native';
import { ThemedText } from '../../components/themed-ui/text/text';
import { ISearchHistory } from '../../model/history';
import Title from '../../components/dict/common/title';
import PronunciationList from '../../components/dict/common/pronunciation-list';
import { HistoryViewBingDefinitionList } from './history-view-bing-definition-list';
import { Note } from '../../model/note';
import _ from 'lodash';
import ColorId from '../../styles/color-id';
import moment from 'moment';
import WordFormList from '../../components/dict/common/word-form-list';

const Container = styled.View`
`;

const TopContainer = styled.View`
  flex-direction: row;
`;

const LeftContainer = styled.View`
`;

const StyledTitle = styled(Title)`
  font-size: 15px;
`;

const RightContainer = styled.View`
  flex: 1;
  margin-left: 15px;
`;

const MidContainer = styled.View`
  margin-top: 5px;
  margin-bottom: 5px;
`;

const ContextParagraph = styled(ThemedText)`

`;

const ContextSource = styled(ThemedText)`

`;

const FooterContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const StyledPronunciationList = styled(PronunciationList)`
`;

const StyledWordFormList = styled(WordFormList)`
  margin-top: 0;
`;

const SecondaryText = styled(ThemedText)`
  color: ${props => props.theme[ColorId.foreground_secondary]};
  font-size: 10px;
`;

export interface HistoryItemProp {
  note: Note
}

export const HistoryItem: React.FC<HistoryItemProp> = (prop) => {
  const { note } = prop;

  const pronunciations = note.search_result.pronunciations ?? note.search_result.definitions.flatMap(e => e.pronunciations);
  const wordForms = note.search_result.wordForms ?? note.search_result.definitions.flatMap(e => e.wordForms);
  const definitions = note.search_result.definitions.slice(0, 2);

  const latestHistory: ISearchHistory = _.chain(note.histories)
    .sortBy(e => -e.create_at)
    .first()
    .value();

  return (
    <Container>
      <TopContainer>
        <LeftContainer>
          <StyledTitle>{note.text}</StyledTitle>
          {/*<StyledWordFormList wordForms={wordForms}/>*/}
        </LeftContainer>
        <RightContainer>
          <StyledPronunciationList pronunciations={pronunciations}/>
          <HistoryViewBingDefinitionList definitions={definitions as any}/>
        </RightContainer>
      </TopContainer>
      {
        latestHistory.context?.paragraph && (
          <MidContainer>
            <ContextParagraph>Context: {latestHistory.context?.paragraph}</ContextParagraph>
          </MidContainer>
        )
      }
      <FooterContainer>
        <SecondaryText>
          {moment(note.create_at).format('YYYY-MM-DD HH:mm')}
        </SecondaryText>
        {
          latestHistory.context?.source && (
            <SecondaryText>
              Source: {latestHistory?.context?.source}
            </SecondaryText>
          )
        }
      </FooterContainer>
    </Container>
  );
};
