import {StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MenuP from '../screens/MenuP';
import Definicoes from '../screens/Definicoes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const BarraDeNavegação = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.barra,
      }}>
      <Tab.Screen
        name="MenuP"
        component={MenuP}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Icon
                name="account-supervisor"
                size={30}
                color={focused ? 'white' : '#7A7067'}></Icon>
            );
          },
        }}></Tab.Screen>

      <Tab.Screen
        name="Definicoes"
        component={Definicoes}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Icon
                name="cogs"
                size={30}
                color={focused ? 'white' : '#7A7067'}></Icon>
            );
          },
        }}></Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  barra: {
    position: 'absolute',
    top: 30,
    height: 60,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#BFB3A8',
  },
});

export default BarraDeNavegação;
