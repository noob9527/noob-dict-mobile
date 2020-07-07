import * as React from 'react';
import { useEffect } from 'react';
import styled from 'styled-components/native';
import { useAuthRequest } from 'expo-auth-session';
import { useDispatch } from 'react-redux';
import { githubOption } from '../../config/social-login';
import logger from '../../utils/logger';

const Container = styled.View`
  width: 100%;
`;

const StyledButton = styled.Button`
`;

export const GithubLoginView: React.FC = () => {
  // const theme = useContext(ThemeContext);
  const dispatch = useDispatch();

  // Endpoint
  const discovery = {
    authorizationEndpoint: githubOption.endpoint,
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint: `https://github.com/settings/connections/applications/${githubOption.params.client_id}`,
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: githubOption.params.client_id,
      scopes: [githubOption.params.scope],
      redirectUri: githubOption.params.redirect_uri,
    },
    discovery,
  );


  useEffect(() => {
    logger.debug('github login response', response);
    if (response?.type === 'success') {
      const { code } = response.params;
      dispatch({
        type: 'profile/loginCodeReceived',
        payload: {
          code,
          loginOption: githubOption,
        },
      });
    }
  }, [response]);

  function onPress() {
    promptAsync();
  }

  return (
    <Container>
      <StyledButton
        color={'rebeccapurple'}
        disabled={!request}
        title={'Github Login'}
        onPress={onPress}
      >
      </StyledButton>
    </Container>
  );
};
