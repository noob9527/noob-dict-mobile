import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { useSelector } from 'react-redux';
import { SearchNoteState } from './search-note-model';
import _ from 'lodash';
import { FlatList } from 'react-native';
import { LineSeparator } from '../../../components/themed-ui/line-separator';
import { SearchNoteHistoryItem } from './search-note-history-item';
import { SearchNoteHistoryEditor } from './search-note-history-editor';
import ColorId from '../../../styles/color-id';

const Container = styled.View`
  height: 400px;
  padding-left: 5px;
  padding-right: 5px;
  justify-content: center;
  align-items: center;
`;

const ItemContainer = styled.View`
`;

const StyledLineSeparator = styled(LineSeparator)`
  border-bottom-color: ${props => props.theme[ColorId.foreground_secondary]};
  border-bottom-width: 1px;
  height: 0;
  margin-top: 0;
  margin-bottom: 0;
`;

export const SearchNoteContent: React.FC = () => {
  const theme = useTheme();
  const noteState: SearchNoteState = useSelector((state: any) => state.searchNote);
  const histories = _.sortBy(Object.values(noteState.histories), e => {
    return -e.oldData.create_at;
  });
  const displayHistories = histories.filter((e, i) => !i || e.oldData.context!!);

  return (
    <Container>
      {
        <FlatList
          style={{ width: '100%' }}
          data={displayHistories}
          // as https://github.com/mrlaessig/react-native-autocomplete-input#readme
          // says "By default the autocomplete will not behave as expected inside a <ScrollView />.
          // Set keyboardShouldPersistTaps='always' for RN >= 0.40. (#5)."
          // I'm not sure this line have positive effect tho
          keyboardShouldPersistTaps={'always'}
          keyExtractor={(item: any) => item.id}
          renderItem={({ item, index }) => {
            const component = item.editing
              ? (<SearchNoteHistoryEditor historyData={item}/>)
              : (<SearchNoteHistoryItem historyData={item} isFirst={index === 0}/>);
            return <ItemContainer>{component}</ItemContainer>;
          }}
          ItemSeparatorComponent={StyledLineSeparator}
        />
      }
    </Container>
  );
};
