import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import { AppView } from './app/app-view';
import { SettingView } from './setting/setting-view';
import { SearchView } from './search/search-view';

const Tab = createBottomTabNavigator()

export function RootRouter() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Search" component={SearchView}/>
        <Tab.Screen
          name="App"
          component={AppView}
          // options={{ title: 'Welcome' }}
        />
        <Tab.Screen name="Setting" component={SettingView}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const Home = () => {
  return (
    <View><Text>Home</Text></View>
  );
};


