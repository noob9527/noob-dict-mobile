import React, { KeyboardEvent, useContext, useEffect, useRef } from 'react';
import { SearchInputState } from './search-input-model';
import { usePrevious } from '../../../hooks/use-previous';
import styled, { ThemeContext } from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, TextInput } from 'react-native';
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

const SearchTextInputContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const SearchTextInput = styled.TextInput`
  height: 40px;
  padding-left: 10px;
  padding-right: 25px;
  color: ${props => props.theme[ColorId.input_foreground]};
  background-color: ${props => props.theme[ColorId.input_background]};
  border-width: 0;
  flex: 1;
`;

const SearchTextInputIcon = styled.Text`
  color: ${props => props.theme[ColorId.input_foreground]};
  background-color: ${props => props.theme[ColorId.input_background]};
  left: -25px;
`

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

  return (
    <Container>
      <SearchTextInputContainer>
        <SearchTextInput
          onChangeText={handleInputSearchText}
          onSubmitEditing={onSubmitEditing}
          selectionColor={'rebeccapurple'}
          selectTextOnFocus={true}
          returnKeyType='search'
          value={text}
        >
        </SearchTextInput>
        <SearchTextInputIcon
          onPress={onSearchIconPress}
        ><AntDesign name={'search1'}/></SearchTextInputIcon>
      </SearchTextInputContainer>
    </Container>
  );

}

