import React, { KeyboardEvent, useContext, useEffect, useRef } from 'react';
import { SearchInputState } from './search-input-model';
import { usePrevious } from '../../../hooks/use-previous';
import styled, { ThemeContext } from 'styled-components/native';
import Autocomplete from '../../../components/autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, TextInput } from 'react-native';
import { TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';
import ColorId from '../../../styles/color-id';
import { AntDesign } from '@expo/vector-icons';

const Container = styled.View`
  width: 90%;
  /*
  height: 30px;
  */
  margin: 20px;
/* display: flex */
`;

const AutoCompleteContainer = styled.View`
  flex: 1;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 10;
  /*
  flex-direction: row;
  justify-content: center;
  align-items: center;
   */
`;

const SearchTextInput = styled.TextInput`
  flex: 1;
  color: ${props => props.theme[ColorId.input_foreground]};
  background-color: ${props => props.theme[ColorId.input_background]};
  border-width: 0;
`;

const SearchTextInputIcon = styled.Text`
  color: ${props => props.theme[ColorId.input_foreground]};
  background-color: ${props => props.theme[ColorId.input_background]};
  left: -20px;
  z-index: 2;
`

const Suggestion = styled(TouchableOpacity)`
  border: 0;
  width: 100%;
  flex-direction: row;
`;

const SuggestionEntry = styled.Text`
  width: 50%;
`;

const SuggestionExplain = styled.Text`
  width: 50%;
`;

export const SearchInput: React.FC = (props: any) => {
  const dispatch = useDispatch();
  const {
    text,
    suggests,
    loadingSuggests,
    open,
  } = useSelector((state: { searchInput: SearchInputState }) => state.searchInput);


  // focus on input element
  // const selectEle = useRef<Select | null>(null);
  // const previousFocusInput = usePrevious(focusInput);
  // useEffect(() => {
  //   if (!previousFocusInput && focusInput) {
  //     setTimeout(() => {
  //       selectEle?.current?.focus();
  //     }, 1);
  //   }
  // }, [previousFocusInput, focusInput]);

  function onSubmitEditing(...args: any[]) {
    search(text);
  }

  function onSearchIconPress() {
    search(text);
  }

  // 用户选择了自动补全项
  function onSelect(text: string) {
    console.log('on select');
    dispatch({
      type: 'searchInput/searchTextChange',
      text,
    });
    search(text);
  }

  // 用户输入搜索字符
  function handleInputSearchText(text: string) {
    dispatch({
      type: 'searchInput/inputSearchText',
      text,
    });
  }

  function setOpen(open: boolean) {
    dispatch({
      type: 'searchInput/mergeState',
      payload: {
        open,
      },
    });
  }

  function search(text: string) {
    setOpen(false);
    dispatch({
      type: 'searchPanel/fetchResults',
      text,
    });
  }

  const theme = useContext(ThemeContext);
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
      backgroundColor: 'pink',
      padding: 0,
      paddingLeft: 0,
    },
    autoCompleteList: {
      backgroundColor: 'wheat',
      borderWidth: 0,
      margin: 0,
    },
  });

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
          onChangeText={handleInputSearchText}
          onSubmitEditing={onSubmitEditing}
          returnKeyType='search'
          value={text}
          // end TextInputBlock
          hideResult={!open}
          // renderTextInput={renderTextInput}
          renderItem={({ item, i }) => (
            <Suggestion key={i} onPress={() => onSelect(item.entry)}>
              <SuggestionEntry
                numberOfLines={1}
                ellipsizeMode='tail'
              >{item.entry}</SuggestionEntry>
              <SuggestionExplain
                numberOfLines={1}
                ellipsizeMode='tail'
              >{item.explain}</SuggestionExplain>
            </Suggestion>
          )}
        />
        {/*<SearchTextInputIcon*/}
        {/*  onPress={onSearchIconPress}*/}
        {/*><AntDesign name={'search1'}/></SearchTextInputIcon>*/}
      </AutoCompleteContainer>
    </Container>
  );

}

