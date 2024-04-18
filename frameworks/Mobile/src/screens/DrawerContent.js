import React from 'react'
import { View, StyleSheet } from 'react-native'
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer'
import Colors from '../utils/colors'
import Profile from '../components/profile'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Feather } from '@expo/vector-icons'


export function DrawerContent(props) {
    return(
        <View style={styles.continer}>
            <Profile />
            <DrawerContentScrollView {...props} contentContainerStyle={{flex:1}}>
                <DrawerItemList {...props} 
                    drawerActiveTintColor={Colors.primary}
                />
                <DrawerItem 
                    label="Log out"
                    onPress={()=>{
                    AsyncStorage.clear();
                    props.navigation.replace("login");
                    }}
                    icon={() => <Feather name='log-out' size={15}/>}
                />
            </DrawerContentScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    continer: {
        flex: 1,
    }
})