/*
    Title appears on each page
    It tells the user what page he/she is on
    eg: <(back icon) Item Details
*/

import React from "react";
import { ScrollView, View, SafeAreaView, Text, StyleSheet, Platform } from "react-native";
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import Colors from "../utils/colors";
import { useNavigation } from "@react-navigation/native";

const Topic = ({title}) => {

    const navigation = useNavigation();

    return(
        <SafeAreaView style={styles.container}>
            <Icon name="chevron-left" size={35} style={styles.chevron} onPress={() => navigation.goBack()} />
            <Text style={styles.content}> {title} </Text>
            <View></View>
        </SafeAreaView>
    )
}

export default Topic;

const styles = StyleSheet.create({
    container: {
        marginTop:Platform == 'ios' ? 50 : 80,
        marginBottom:Platform == 'ios' ? 40 : 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    content: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    chevron: {
        color: Colors.primary,
        padding: 3
    }
})