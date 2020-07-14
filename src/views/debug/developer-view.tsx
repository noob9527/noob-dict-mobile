import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ColorId from '../../styles/color-id';
import { ThemedText } from '../../components/themed-ui/text/text';
import { RootState } from '../root-model';
import { rendererContainer } from '../../services/impl/renderer-container';
import { NoteService, NoteServiceToken } from '../../services/db/note-service';
import { SearchHistory } from '../../model/history';
import { NoteRepo, NoteRepoToken } from '../../services/db/note-repo';
import { HistoryRepo, HistoryRepoToken } from '../../services/db/history-repo';
import logger from '../../utils/logger';
import { TransientState } from '../../model/transient-model';


const Container = styled(SafeAreaView)`
  height: 100%;
  background-color: ${props => props.theme[ColorId.background]};
`;

const ContentContainer = styled.View`
  height: 100%;
  justify-content: space-around;
  align-items: center;
`;

const StyledButton = styled.Button`
`;

export const DeveloperView = () => {
  const rootState: RootState = useSelector((state: any) => state.root);
  const transientState: TransientState = useSelector((state: any) => state._transient);
  const dispatch = useDispatch();

  return (
    <Container>
      <ContentContainer>
        <ThemedText>last sync time: {rootState.currentUser?.last_sync_time}</ThemedText>
        <ThemedText>app state: {transientState.appState}</ThemedText>
        <StyledButton
          title={'fetch Latest Histories'}
          onPress={() => {
            logger.log('press fetch Latest Histories button');
            dispatch({
              type: 'history/fetchLatestNotes',
            });
          }}
        />
        <StyledButton
          title={'sync Histories'}
          onPress={() => {
            logger.log('syncHistories pressed');
            dispatch({
              type: 'root/syncHistories',
            });
          }}
        />
        <StyledButton
          title={'reset last sync time'}
          onPress={() => {
            logger.log('reset last sync time');
            dispatch({
              type: 'developer/resetLastSyncTime',
            });
          }}
        />
        <StyledButton
          title={'clear all table'}
          onPress={async () => {
            const noteRepo = rendererContainer.get<NoteRepo>(NoteRepoToken);
            const historyRepo = rendererContainer.get<HistoryRepo>(HistoryRepoToken);
            await noteRepo.clearAll();
            logger.log('clear note table success');
            await historyRepo.clearAll();
            logger.log('clear history table success');
          }}
        />
        <StyledButton
          title={'place holder'}
          onPress={() => {
          }}
        />
      </ContentContainer>
    </Container>
  );
};

