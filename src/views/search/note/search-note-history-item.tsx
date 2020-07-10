import React, { useContext } from 'react';
import styled, { useTheme } from 'styled-components/native';
import { ISearchHistory } from '../../../model/history';
import { DataWrapper } from './search-note-model';
import { ThemedText } from '../../../components/themed-ui/text/text';
import moment from 'moment';
import ColorId from '../../../styles/color-id';
import { useDispatch } from 'react-redux';

const Container = styled.TouchableHighlight`
  padding-top: 5px;
  padding-bottom: 8px;
`;

const ButtonContainer = styled.View`

`;

const FooterContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const SecondaryText = styled(ThemedText)`
  color: ${props => props.theme[ColorId.foreground_secondary]};
  font-size: 10px;
`;

interface SearchNoteHistoryItemProps {
  historyData: DataWrapper<ISearchHistory>
  isFirst: boolean
}


export const SearchNoteHistoryItem: React.FC<SearchNoteHistoryItemProps> = (props) => {
  const dispatch = useDispatch();
  const {
    historyData,
    isFirst,
  } = props;
  return (
    <Container onPress={() => {
      dispatch({
        type: 'searchNote/changeEditing',
        payload: {
          ...historyData,
          editing: true,
        },
      });
    }}>
      <ButtonContainer>
        <ThemedText>{historyData.newData?.context?.paragraph}</ThemedText>
        <FooterContainer>
          <SecondaryText>
            {isFirst ? 'Current' : moment(historyData.oldData.create_at).format('YYYY-MM-DD HH:mm')}
          </SecondaryText>
          {
            historyData.newData?.context?.source
            && (
              <SecondaryText>
                Source: {historyData.newData?.context?.source}
              </SecondaryText>
            )
          }
        </FooterContainer>
      </ButtonContainer>
    </Container>
  );
};
