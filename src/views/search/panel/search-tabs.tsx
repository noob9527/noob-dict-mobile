import React, { useContext } from 'react';
import { Dimensions } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';
import ColorId from '../../../styles/color-id';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SearchTabItem } from './search-tab-item';

const Tab = createMaterialTopTabNavigator();

const Container = styled.TouchableWithoutFeedback`
 flex: 1;
`;

export const SearchTabs: React.FC = () => {
  const theme = useContext(ThemeContext);
  return (
    <Container>
      <Tab.Navigator
        initialLayout={{ width: Dimensions.get('window').width }}
        tabBarOptions={{
          activeTintColor: theme[ColorId.tab_activeForeground],
          inactiveTintColor: theme[ColorId.tab_inactiveForeground],
          labelStyle: {
            height: 25,
            marginBottom: 15,
          },
          tabStyle: {
            height: 30,
          },
          indicatorStyle: {
            // height: 0,
            backgroundColor: theme[ColorId.tab_indicator],
          },
          style: {
            height: 30,
            backgroundColor: theme[ColorId.tab_inactiveBackground],
          },
        }}
      >
        <Tab.Screen name="BING" component={SearchTabItem}/>
        <Tab.Screen name="CAMBRIDGE" component={SearchTabItem}/>
      </Tab.Navigator>
    </Container>
  );
};


