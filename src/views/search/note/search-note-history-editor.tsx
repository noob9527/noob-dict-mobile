import React, { useEffect, useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components/native';
import { ISearchHistory } from '../../../model/history';
import { DataWrapper } from './search-note-model';
import { ThemedText } from '../../../components/themed-ui/text/text';
import moment from 'moment';
import ColorId from '../../../styles/color-id';
import { useDispatch } from 'react-redux';
import { Button } from 'react-native';
import { SourceInput } from './source-input';

const Container = styled.View`
  margin-top: 5px;
  margin-bottom: 5px;
`;

const StyledTextInput = styled.TextInput`
  color: ${props => props.theme[ColorId.input_foreground]};
  background-color: ${props => props.theme[ColorId.input_background]};
  padding-left: 8px;
`;

const StyledSourceInput = styled(StyledTextInput)`
  margin-top: 5px;
`;

const StyledButton = styled.TouchableHighlight`
  height: 20px;
`;

interface SearchNoteHistoryItemProps {
  historyData: DataWrapper<ISearchHistory>
}


export const SearchNoteHistoryEditor: React.FC<SearchNoteHistoryItemProps> = (props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const {
    historyData,
  } = props;

  const textInputEle = useRef<any>(null);

  return (
    <Container>
      <StyledTextInput
        ref={textInputEle}
        value={historyData.newData.context?.paragraph ?? ''}
        placeholder={'context'}
        placeholderTextColor={theme[ColorId.input_placeholder]}
        onChangeText={value => {
          dispatch({
            type: 'searchNote/typeHistoryContext',
            payload: {
              history: {
                ...historyData.oldData,
                context: {
                  ...historyData.newData.context,
                  paragraph: value,
                },
              },
            },
          });
        }}
      />
      {/*<SourceInput historyData={historyData}/>*/}
      <StyledSourceInput
        value={historyData.newData.context?.source ?? ''}
        placeholder={'source'}
        placeholderTextColor={theme[ColorId.input_placeholder]}
        onChangeText={value => {
          dispatch({
            type: 'searchNote/typeHistoryContext',
            payload: {
              history: {
                ...historyData.oldData,
                context: {
                  ...historyData.newData.context,
                  source: value,
                },
              },
            },
          });
          dispatch({
            type: 'searchNote/searchTextChange',
            value,
          });
        }}
      />
    </Container>
  );
};
