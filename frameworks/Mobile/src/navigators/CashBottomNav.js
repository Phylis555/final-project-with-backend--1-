import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AddFund from '../screens/app/cashDonation/AddFund'
import CashScreen from '../screens/app/cashDonation/CashScreen'
import { Feather } from '@expo/vector-icons'
import Colors from '../utils/colors'
import Account from '../screens/UserAccount'

const Tab = createBottomTabNavigator();

function CashBottomNav() {
  return (
    <Tab.Navigator screenOptions={{
        tabBarShowLabel: false,
        headerShown: false
    }}>
      <Tab.Screen name="home3" component={CashScreen} options={{
        tabBarIcon: () => (
            <Feather name="home" size={20} color={Colors.yellow}/>
        )
      }}/>
  
      <Tab.Screen name="profile" component={Account} options={{
        tabBarIcon: () => (
            <Feather name="user" size={20} color={Colors.yellow}/>
        )
      }}/>
    </Tab.Navigator>
  );
}

export default CashBottomNav