import * as React from 'react';
import { useContext, useEffect } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { makeRedirectUri, useAuthRequest, useAutoDiscovery } from 'expo-auth-session';
import * as Linking from 'expo-linking';

const Container = styled.View`
`;

const StyledButton = styled.Button`
`;

Linking.addEventListener('url', e => {
  console.log('addEventListener e', e);
})

export const GithubLoginView: React.FC = () => {
  // const theme = useContext(ThemeContext);

  // Endpoint
  const clientId = '28e5da20b548b1b8e115';
  const discovery = {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint: `https://github.com/settings/connections/applications/${clientId}`
  };
  // const discovery = useAutoDiscovery('https://accounts.google.com');

  const prefix = Linking.makeUrl();

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId,
      clientSecret: 'ed1abd4c56ca6d27047e97c4b3a39392cdf9b5a6',
      scopes: ['identity'],
      // redirectUri: 'exp://192.168.18.207:19000'
      // redirectUri: 'https://auth.expo.io/@noob9527/noob-dict-mobile',
      // redirectUri: prefix,
      // redirectUri: makeRedirectUri({
      //   native: 'https://auth.expo.io/@noob9527/noob-dict-mobile',
      //   useProxy: true,
      // })
      // For usage in managed apps using the proxy
      redirectUri: makeRedirectUri({
        // For usage in bare and standalone
        // native: 'exp://192.168.18.207:19000',
        useProxy: true,
      }),
    },
    discovery
  );

  console.log(request);

  useEffect(() => {
    console.log(response);
    if (response?.type === 'success') {
      const { code } = response.params;
      console.log(code);
    }
  }, [response])

  function onPress() {
    promptAsync().then((...args: any[]) => {
      console.log(...args);
    }).catch((err) => {
      console.log(err);
    });
  }

  return (
    <Container>
      <StyledButton
        disabled={!request}
        title={'Github Login'}
        onPress={onPress}
      >
      </StyledButton>
    </Container>
  )
};
