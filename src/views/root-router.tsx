import * as React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import { AppView } from './app/app-view';
import { ProfilePage } from './profile/profile-page';
import { SearchPage } from './search/search-page';
import { useContext, useEffect } from 'react';
import { ThemeContext } from 'styled-components/native';
import ColorId from '../styles/color-id';
import * as Linking from 'expo-linking';
import HistoryView from './history/history-view';
import { DeveloperView } from './debug/developer-view';
import { rootNavigationRef } from './root-navigation';

const Tab = createBottomTabNavigator();

export function RootRouter() {
  const theme = useContext(ThemeContext);

  // const prefix = Linking.makeUrl('/');
  //
  // const linking = {
  //   prefixes: [prefix, 'https://192.168.207:19000'],
  // };

  // return (
  //   <NavigationContainer>
  //     <SearchPage/>
  //   </NavigationContainer>
  // );

  return (
    <NavigationContainer
      ref={rootNavigationRef}
      // linking={linking}
      // fallback={<SearchPage/>}
    >
      <Tab.Navigator
        screenOptions={({ route }) => {
          return {
            tabBarIcon: ({ focused, size, color }) => {
              let iconName;
              switch (route.name) {
                case 'Search':
                  iconName = 'search1';
                  break;
                case 'Profile':
                  iconName = 'user';
                  break;
                // case 'Notes':
                //   iconName = 'book';
                //   break;
                case 'History':
                  return (<MaterialIcons name="history" size={size} color={color}/>);
                case 'Debug':
                  iconName = 'tool';
                  break;
              }
              // You can return any component that you like here!
              return <AntDesign name={iconName} size={size} color={color}/>;
            },
          };
        }}
        tabBarOptions={{
          style: {
            borderTopWidth: 0,
          },
          tabStyle: {},
          activeTintColor: theme[ColorId.tab_activeForeground],
          inactiveTintColor: theme[ColorId.tab_inactiveForeground],
          activeBackgroundColor: theme[ColorId.tab_activeBackground],
          inactiveBackgroundColor: theme[ColorId.tab_inactiveBackground],
        }}
      >
        <Tab.Screen name="Search" component={SearchPage}/>
        {/*<Tab.Screen*/}
        {/*  name="App"*/}
        {/*  component={AppView}*/}
        {/*/>*/}
        <Tab.Screen name="History" component={HistoryView}/>
        <Tab.Screen name="Profile" component={ProfilePage}/>
        <Tab.Screen name="Debug" component={DeveloperView}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

