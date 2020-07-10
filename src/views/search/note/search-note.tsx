import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import Collapsible from 'react-native-collapsible';
import { useDispatch, useSelector } from 'react-redux';
import { SearchNoteState } from './search-note-model';
import { ThemedText } from '../../../components/themed-ui/text/text';
import ColorId from '../../../styles/color-id';
import { AntDesign } from '@expo/vector-icons';
import { SearchNoteContent } from './search-note-content';
import { ActivityIndicator } from 'react-native';


const Container = styled.View`
  border-top-width: 1px;
  border-top-color: ${props => props.theme[ColorId.foreground_secondary]};
  background-color: ${props => props.theme[ColorId.background]};
`;

const StyledButton = styled.TouchableHighlight`
  height: 35px;
`;

const StyledButtonContent = styled.View`
  height: 35px;
  justify-content: center;
  align-items: center;
`;

const SplitPaneIndicator = styled(AntDesign)`
  position: absolute;
  right: 8px;
`;

const SavingIndicator = styled(ActivityIndicator)`
  position: absolute;
  right: 30px;
`;

export const SearchNote: React.FC = () => {
  const dispatch = useDispatch();
  const noteState: SearchNoteState = useSelector((state: any) => state.searchNote);
  const theme = useContext(ThemeContext);

  let { noteInDb, showSearchNote, histories } = noteState;
  if (!noteInDb) return null;

  const showSpinner = Object.values(histories).some(e => e.showSpinner);

  function handlePress() {
    dispatch({
      type: 'searchNote/toggleSearchNote',
    });
  }

  return (
    <>
      <Container>
        <StyledButton onPress={handlePress}>
          <StyledButtonContent>
            <ThemedText>{`You've searched '${noteInDb?.text}' ${(noteInDb?.update_times ?? 0) + 1} times`}</ThemedText>
            {showSpinner && <SavingIndicator color={theme[ColorId.foreground]} size={11}/>}
            <SplitPaneIndicator name={showSearchNote ? 'down' : 'up'} size={14} color={theme[ColorId.foreground]}/>
          </StyledButtonContent>
        </StyledButton>
        <Collapsible collapsed={!showSearchNote}>
          <SearchNoteContent/>
        </Collapsible>
      </Container>
    </>
  );
};

