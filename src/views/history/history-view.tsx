import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { HistoryState } from './history-model';
import { ThemedEmpty } from '../../components/themed-ui/empty/empty';
import { FlatList } from 'react-native';
import { ThemedText } from '../../components/themed-ui/text/text';
import { SafeAreaView } from 'react-native-safe-area-context';
import ColorId from '../../styles/color-id';
import { HistoryItem } from './history-item';
import { LineSeparator } from '../../components/themed-ui/line-separator';

const Container = styled(SafeAreaView)`
  height: 100%;
  background-color: ${props => props.theme[ColorId.status_bar_background]};
`;

const ContentContainer = styled.View`
  padding-left: 10px;
  padding-right: 10px;
  height: 100%;
  background-color: ${props => props.theme[ColorId.background]};
`;

const HistoryView: React.FC = () => {
  const dispatch = useDispatch();
  const historyState: HistoryState = useSelector((state: any) => state.history);
  const { stale, histories } = historyState;

  useEffect(() => {
    if (stale) {
      dispatch({
        type: 'history/fetchLatestHistories',
      });
    }
  });

  if (!histories.length) {
    return (
      <Container>
        <ContentContainer>
          <ThemedEmpty/>
        </ContentContainer>
      </Container>
    );
  }
  return (
    <Container>
      <ContentContainer>
        <FlatList
          data={histories}
          keyExtractor={(item: any) => item.id}
          renderItem={({ item, index }) => <HistoryItem history={item}/>}
          ItemSeparatorComponent={LineSeparator}
        />
      </ContentContainer>
    </Container>
  );
};

export default HistoryView;

