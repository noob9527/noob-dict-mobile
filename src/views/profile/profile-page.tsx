import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled, { useTheme } from 'styled-components/native';
import ColorId from '../../styles/color-id';
import { GithubLoginButton } from './github-login-button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../root-model';
import { ThemedText } from '../../components/themed-ui/text/text';
import { Avatar } from './avatar';
import { ProfileState } from './profile-model';
import { ActivityIndicator } from 'react-native';


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

const ButtonGroup = styled.View`
  width: 100%;
`;

const LogoutButton = styled.Button`
  width: 100%;
`;


export const ProfilePage = () => {
  const theme = useTheme();
  const rootState: RootState = useSelector((state: any) => state.root);
  const profileState: ProfileState = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();
  const { currentUser } = rootState;
  const { loginRequesting } = profileState;

  function logout() {
    dispatch({
      type: 'profile/logout',
    });
  }

  if (loginRequesting) {
    return (
      <Container>
        <ContentContainer>
          <ActivityIndicator color={theme[ColorId.foreground]} size={80}/>
        </ContentContainer>
      </Container>
    );
  }

  return (
    <Container>
      <ContentContainer>
        <Avatar source={{ uri: currentUser?.picture }} style={{ marginBottom: 40 }}/>
        {/*<LoginButtonView/>*/}
        <ButtonGroup>
          {
            currentUser
              ? <LogoutButton
                color={'rebeccapurple'}
                title={'Log out'}
                onPress={logout}
              />
              : <GithubLoginButton/>
          }
        </ButtonGroup>
      </ContentContainer>
    </Container>
  );
};
