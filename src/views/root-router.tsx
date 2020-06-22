import * as React from 'react';
import { AntDesign } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import { AppView } from './app/app-view';
import { SettingView } from './setting/setting-view';
import { SearchPage } from './search/search-page';

const Tab = createBottomTabNavigator()

export function RootRouter() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => {
          return {
            tabBarIcon: ({ focused, size, color }) => {
              let iconName;
              switch (route.name) {
                case 'Search':
                  iconName = 'search1';
                  break;
                case 'App':
                  iconName = 'book';
                  break;
                case 'Setting':
                  iconName = 'user'
                  break;
              }
              // You can return any component that you like here!
              return <AntDesign name={iconName} size={size} color={color}/>;
            }
          }
        }}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Search" component={SearchPage}/>
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

