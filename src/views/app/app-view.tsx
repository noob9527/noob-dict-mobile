import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';

const StyledText = styled.Text`
  color: rebeccapurple;
`;

export const AppView = () => {
  const dispatch = useDispatch();
  const app = useSelector((state: any) => state.app);

  return (
    <View style={styles.container}>
      <Text>{process.env.NODE_ENV}</Text>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Text>{app.counter}</Text>
      <StyledText>styled context</StyledText>
      <Button
        title="increase"
        onPress={() => {
          dispatch({
            type: 'app/increase',
          });
        }}
      />
      <Button
        title="decrease"
        onPress={() => {
          dispatch({
            type: 'app/decrease',
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
