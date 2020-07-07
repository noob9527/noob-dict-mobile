import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import ColorId from '../../styles/color-id';
import { GithubLoginView } from './github-login-view';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../root-model';
import { ThemedText } from '../../components/themed-ui/text/text';
import { Avatar } from './avatar';


const Container = styled(SafeAreaView)`
  height: 100%;
  background-color: ${props => props.theme[ColorId.status_bar_background]};
`;

const ContentContainer = styled.View`
  padding: 20px;
  height: 100%;
  background-color: ${props => props.theme[ColorId.background]};
  justify-content: center;
  align-items: center;
`;

const LogoutButton = styled.Button`
`;


export const ProfilePage = () => {
  const rootState: RootState = useSelector((state: any) => state.root);
  const dispatch = useDispatch();
  const { currentUser } = rootState;

  function logout() {
    dispatch({
      type: 'profile/logout',
    });
  }

  return (
    <Container>
      <ContentContainer>
        <Avatar source={{ uri: currentUser?.picture }} style={{ marginBottom: 40 }}/>
        {/*<LoginButtonView/>*/}
        {
          currentUser
            ? <LogoutButton
              title={'Log out'}
              onPress={logout}
            />
            : <GithubLoginView/>
        }
      </ContentContainer>
    </Container>
  );
};
