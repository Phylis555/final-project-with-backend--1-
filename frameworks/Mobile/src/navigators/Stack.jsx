import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

// Screens
import Login from "../screens/authentication/login";
import ForgotPassword from "../screens/authentication/forgotPassword";
import ItemDetails from "../screens/item_details";
import DrawerNav from "./Drawer";
import CashActivityDetails from "../screens/app/cashDonation/CashActivityDetails";
import PaymentGateway from "../screens/app/cashDonation/PaymentGateway";
import UserHistory from "../screens/History";
import Help from "../screens/HelpScreen";
import Account from "../screens/UserAccount";
import Messenger from "../screens/CourierScreen";
import CourierLogin from "../screens/authentication/CourierLogin";
import CourierList from "../screens/CourierList";
import AddItem from "../screens/AddItem";
import EditAccount from "../screens/EditAccount";
import ChangePass from "../screens/authentication/changePassword";
import Dashboard from "../screens/DashboardProfile";
import EditDonation from "../screens/EditDonation";

const StackNavigator = createNativeStackNavigator();
import Login from "../screens/authentication/login";
import ForgotPassword from "../screens/authentication/forgotPassword";
import ItemDetails from "../screens/item_details";
import DrawerNav from "./Drawer";
import CashActivityDetails from "../screens/app/cashDonation/CashActivityDetails";
import PaymentGateway from "../screens/app/cashDonation/PaymentGateway";
import UserHistory from "../screens/History";
import Help from "../screens/HelpScreen";
import Account from "../screens/UserAccount";
import Messenger from "../screens/CourierScreen";
import CourierLogin from "../screens/authentication/CourierLogin";
import CourierList from "../screens/CourierList";
import AddItem from "../screens/AddItem";
import EditAccount from "../screens/EditAccount";
import ChangePass from "../screens/authentication/changePassword";
import Dashboard from "../screens/DashboardProfile";
import EditDonation from "../screens/EditDonation";

const StackNavigator = createNativeStackNavigator();

const Stack = () => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="login"
    >
      <StackNavigator.Screen name="login" component={Login} />
      <StackNavigator.Screen name="home" component={DrawerNav} />
      <StackNavigator.Screen name="forgotPass" component={ForgotPassword} />
      <StackNavigator.Screen name="itemDetails" component={ItemDetails} />
      <StackNavigator.Screen
        name="cashActivity"
        component={CashActivityDetails}
      />
      <StackNavigator.Screen name="paymentGateway" component={PaymentGateway} />
      <StackNavigator.Screen name="history" component={UserHistory} />
      <StackNavigator.Screen name="help" component={Help} />
      <StackNavigator.Screen name="account" component={Account} />
      <StackNavigator.Screen name="mregister" component={Messenger} />
      <StackNavigator.Screen name="CourierLogin" component={CourierLogin} />
      <StackNavigator.Screen name="courierList" component={CourierList} />
      <StackNavigator.Screen name="addItem" component={AddItem} />
      <StackNavigator.Screen name="editAccount" component={EditAccount} />
      <StackNavigator.Screen name="ChangePassword" component={ChangePass} />
      <StackNavigator.Screen name="dashBoard" component={Dashboard} />
      <StackNavigator.Screen name="editDonation" component={EditDonation} />
      {/* <StackNavigator.Screen name="seeRequests" component={ViewRequests} /> */}
      <StackNavigator.Screen name="login" component={Login} />
      <StackNavigator.Screen name="home" component={DrawerNav} />
      <StackNavigator.Screen name="forgotPass" component={ForgotPassword} />
      <StackNavigator.Screen name="itemDetails" component={ItemDetails} />
      <StackNavigator.Screen
        name="cashActivity"
        component={CashActivityDetails}
      />
      <StackNavigator.Screen name="paymentGateway" component={PaymentGateway} />
      <StackNavigator.Screen name="history" component={UserHistory} />
      <StackNavigator.Screen name="help" component={Help} />
      <StackNavigator.Screen name="account" component={Account} />
      <StackNavigator.Screen name="mregister" component={Messenger} />
      <StackNavigator.Screen name="CourierLogin" component={CourierLogin} />
      <StackNavigator.Screen name="courierList" component={CourierList} />
      <StackNavigator.Screen name="addItem" component={AddItem} />
      <StackNavigator.Screen name="editAccount" component={EditAccount} />
      <StackNavigator.Screen name="ChangePassword" component={ChangePass} />
      <StackNavigator.Screen name="dashBoard" component={Dashboard} />
      <StackNavigator.Screen name="editDonation" component={EditDonation} />
      {/* <StackNavigator.Screen name="seeRequests" component={ViewRequests} /> */}
    </StackNavigator.Navigator>
  );
};

export default Stack;

const styles = StyleSheet.create({});
