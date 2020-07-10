/**
 * input with autoComplete
 * doesn't work because z-index and position absolute seemed not working well in my test device
 */
import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import Autocomplete from '../../../components/autocomplete';
import { StyleSheet } from 'react-native';
import ColorId from '../../../styles/color-id';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DataWrapper, SearchNoteState } from './search-note-model';
import { useDispatch, useSelector } from 'react-redux';
import { ThemedText } from '../../../components/themed-ui/text/text';
import { ISearchHistory } from '../../../model/history';

const Suggestion = styled.TouchableHighlight`
  border: 0;
  width: 100%;
  flex-direction: row;
`;

const Container = styled.View`
  margin-top: 5px;
`;

const AutoCompleteContainer = styled.View`
  flex: 1;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 10;
`;

interface SourceInputProps {
  historyData: DataWrapper<ISearchHistory>
}

export const SourceInput: React.FC<SourceInputProps> = (props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const noteState: SearchNoteState = useSelector((state: any) => state.searchNote);
  const { suggests, loadingSuggests } = noteState;

  const { historyData } = props;

  const styles = StyleSheet.create({
    autoComplete: {
      height: 30,
      lineHeight: 30,
      flex: 1,
      color: theme[ColorId.input_foreground],
      backgroundColor: theme[ColorId.input_background],
      borderWidth: 0,
      paddingLeft: 10,
      paddingRight: 20,
    },
    autoCompleteContainer: {},
    autoCompleteInput: {
      borderWidth: 0,
    },
    autoCompleteListContainer: {
      backgroundColor: theme[ColorId.dropdown_background],
      // padding: 0,
      // paddingLeft: 0,
    },
    autoCompleteList: {
      backgroundColor: theme[ColorId.dropdown_background],
      borderWidth: 0,
      // margin: 0,
    },
  });

  // 文本框值变化时回调
  function handleInputSearchText(text: string) {
    dispatch({
      type: 'searchNote/inputSearchText',
      text,
    });
  }

  // 选中 option，或 input 的 value 变化（combobox 模式下）时，调用此函数
  function onChange(text: string) {
    dispatch({
      type: 'searchNote/typeHistoryContext',
      payload: {
        history: {
          ...historyData.oldData,
          context: {
            ...historyData.newData.context,
            source: text,
          },
        },
      },
    });
    dispatch({
      type: 'searchNote/searchTextChange',
      text,
    });
  }

  return (
    <Container>
      <AutoCompleteContainer>
        <Autocomplete
          style={styles.autoComplete}
          containerStyle={styles.autoCompleteContainer}
          inputContainerStyle={styles.autoCompleteInput}
          listContainerStyle={styles.autoCompleteListContainer}
          listStyle={styles.autoCompleteList}
          data={suggests}
          // start TextInputBlock
          placeholder={'source'}
          placeholderTextColor={theme[ColorId.input_placeholder]}
          onChangeText={handleInputSearchText}
          // onSubmitEditing={onSubmitEditing}
          returnKeyType='search'
          value={historyData.newData.context?.source}
          // end TextInputBlock
          // hideResult={!open}
          // renderTextInput={renderTextInput}
          renderItem={({ item, i }) => (
            <Suggestion key={item} onPress={() => onChange(item)}>
              <ThemedText
                numberOfLines={1}
                ellipsizeMode='tail'
              >{item}</ThemedText>
            </Suggestion>
          )}
        />
      </AutoCompleteContainer>
    </Container>

  );
};
