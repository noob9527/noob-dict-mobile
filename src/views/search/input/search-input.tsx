import React, { KeyboardEvent, useEffect, useRef } from 'react';
import { SearchInputState } from './search-input-model';
import { usePrevious } from '../../../hooks/use-previous';
import styled from 'styled-components/native';
import Autocomplete from 'react-native-autocomplete-input';
import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity, Text } from 'react-native';

const Container = styled.View`
  width: 80%;
/* display: flex */
`;

const AutoCompleteContainer = styled.View`
    flex: 1;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1
`

const Suggestion = styled.View`
  width: 100%;
  span {
    display: inline-block;
    width: 50%;
    
    // ellipsis
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  span:nth-child(2) {
    font-size: 0.7em;
  }
`;


export const SearchInput: React.FC = () => {
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

  return (
    <Container>
      <AutoCompleteContainer>
        <Autocomplete
          data={suggests}
          onChangeText={handleInputSearchText}
          defaultValue={text}
          renderItem={({ item, i }) => (
            <>
              <TouchableOpacity key={i} onPress={() => onPress(item.entry)}>
                <Text>{item.entry}</Text>
                <Text>{item.explain}</Text>
              </TouchableOpacity>
            </>
          )}
        />
      </AutoCompleteContainer>
    </Container>
  );

  function onPress(text: string) {
    dispatch({
      type: 'searchInput/searchTextChange',
      text,
    });
    search(text);
  }

  // 文本框值变化时回调
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
}

