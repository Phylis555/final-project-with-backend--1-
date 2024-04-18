import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AddItem from '../screens/AddItem'
import HomeScreen from '../screens/app/home/HomeScreen'
import { Feather } from '@expo/vector-icons'
import Colors from '../utils/colors'
import Account from '../screens/UserAccount'

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{
        tabBarShowLabel: false,
        headerShown: false
    }}>
      <Tab.Screen name="home2" component={HomeScreen} options={{
        tabBarIcon: () => (
            <Feather name="home" size={20} color={Colors.light}/>
        )
      }}/>
      <Tab.Screen name="addItem" component={AddItem} options={{
        tabBarIcon: () => (
            <Feather name="plus-circle" size={25} color={Colors.primary}/>
        )
      }}/>
      <Tab.Screen name="addFund" component={Account} options={{
        tabBarIcon: () => (
            <Feather name="user" size={20} color={Colors.light}/>
        )
      }}/>
    </Tab.Navigator>
  );
}

export default BottomTabNavigator