import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins'
import { DrawerContent } from '../screens/DrawerContent'
// Screens
import BottomTabNavigator from './BottomTab'
import ItemDetails from '../screens/item_details'
import { Feather } from '@expo/vector-icons'
import Colors from '../utils/colors'
import ChangePass from '../screens/authentication/changePassword'
import CashBottomNav from './CashBottomNav'
import UserHistory from '../screens/History'
import Help from '../screens/HelpScreen'
const Drawer = createDrawerNavigator();

function DrawerNav() {
  let [fontsLoaded] = useFonts({
      Poppins_400Regular,
      Poppins_500Medium,
      Poppins_600SemiBold,
      Poppins_700Bold
  })
  if (!fontsLoaded){
      return null
  }
  return (
    <Drawer.Navigator screenOptions={{
        headerShown: false,
        drawerLabelStyle: {fontSize: 15, fontWeight: '600'},
        drawerActiveTintColor: Colors.primary,
      }} 
      drawerContent={props => <DrawerContent {...props}/>}
      >
      <Drawer.Screen name="Home" component={BottomTabNavigator} 
        options={{
          drawerIcon: () => (
            <Feather name='home' size={15}/>
          )
        }}
      />
      <Drawer.Screen name="ChangePassword" component={ChangePass} 
        options={{
          drawerIcon: () => (
            <Feather name='shield' size={15}/>
          )
        }}
      />
      <Drawer.Screen name="Product Donation" component={BottomTabNavigator} 
        options={{
          drawerIcon: () => (
            <Feather name='gift' size={15}/>
          )
        }}
      />
      <Drawer.Screen name="CashDonation" component={CashBottomNav} 
        options={{
          drawerIcon: () => (
            <Feather name='dollar-sign' size={15}/>
          )
        }}
      />
      <Drawer.Screen name="history" component={UserHistory} 
        options={{
          drawerIcon: () => (
            <Feather name='bookmark' size={15}/>
          )
        }}
      />
      <Drawer.Screen name="help" component={Help} 
        options={{
          drawerIcon: () => (
            <Feather name='help-circle' size={15}/>
          )
        }}
      />
      {/* <Drawer.Screen name="Logout" component={ItemDetails} 
        options={{
          drawerIcon: () => (
            <Feather name='log-out' size={15}/>
          )
        }}
      /> */}
    </Drawer.Navigator>
  );
}

export default DrawerNav