import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View } from 'react-native';
import { AppView } from './app/app-view';

const Stack = createStackNavigator();

export function RootRouter() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="App"
          component={AppView}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Profile" component={Profile}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Home = () => {
  return (
    <View><Text>Home</Text></View>
  );
};


const Profile = () => {
  return (
    <View><Text>Profile</Text></View>
  );
};


