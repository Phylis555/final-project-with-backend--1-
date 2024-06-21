import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { DrawerContent } from '../screens/DrawerContent';
// Screens
import BottomTabNavigator from './BottomTab';
import ItemDetails from '../screens/item_details';
import { Feather } from '@expo/vector-icons';
import Colors from '../utils/colors';
import ChangePass from '../screens/authentication/changePassword';
import CashBottomNav from './CashBottomNav';
import Dashboard from '../screens/DashboardProfile';
import UserHistory from '../screens/History';
import Help from '../screens/HelpScreen';
import CashScreen from '../screens/app/cashDonation/CashScreen';

const Drawer = createDrawerNavigator();

function DrawerNav() {
  let [fontsLoaded] = useFonts({
      Poppins_400Regular,
      Poppins_500Medium,
      Poppins_600SemiBold,
      Poppins_700Bold
  });
  
  if (!fontsLoaded){
      return null;
  }
  
  return (
    <Drawer.Navigator 
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: { fontSize: 15, fontWeight: '600' },
        drawerActiveTintColor: Colors.primary,
        gestureEnabled: false // Disable slide back gesture for all screens
      }} 
      drawerContent={props => <DrawerContent {...props}/>}
    >
      <Drawer.Screen 
        name="דף הבית" 
        component={BottomTabNavigator} 
        options={{
          drawerIcon: () => (
            <Feather name='home' size={15}/>
          )
        }}
      />
      <Drawer.Screen 
        name="תרומות שלי" 
        component={Dashboard} 
        options={{
          drawerIcon: () => (
            <Feather name='bookmark' size={15}/>
          )
        }}
      />
      <Drawer.Screen 
        name="גיוס כספים לעמותות" 
        component={CashBottomNav} 
        options={{
          drawerIcon: () => (
            <Feather name='dollar-sign' size={15}/>
          )
        }}
      />
      <Drawer.Screen 
        name="אודות" 
        component={Help} 
        options={{
          drawerIcon: () => (
            <Feather name='help-circle' size={15}/>
          )
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNav;
