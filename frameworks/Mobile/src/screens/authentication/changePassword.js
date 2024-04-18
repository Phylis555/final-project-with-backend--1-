import React, { Component } from "react";
import { View, Text, StyleSheet, SafeAreaView, Platform, ScrollView } from "react-native"
import CustomBtn1 from "../../components/customButton"
import Topic from "../../components/topic"
import TypeAInput from "../../components/customInput"
import AsyncStorage from "@react-native-async-storage/async-storage";


export default class ChangePass extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            pass: "",
            confirmPass: ""
        }
    }

    updateFunc = () => {

        var pass = this.state.pass
        var cpass = this.state.confirmPass

        // Authentication
        if (pass != cpass) {
            alert('Passwords do not match!');
        }else {

            AsyncStorage.getItem('user_id').then((value) => {
                
                data = {
                    user_id: value,
                    password: pass
                }

                headers = {
                    'Accept': 'application/json',
                    'Content-Type': 'application.json'
                }

                fetch(
                    "https://onedonation.000webhostapp.com/api/changePassword.php",
                    {
                        method: "POST",
                        headers: headers,
                        body: JSON.stringify(data)
                    }
                )
                .then((response) => response.json())
                .then((response) => {
                    if (response != "success") {
                        alert("Something went wrong")
                    }else {
                        alert("Password changed successfully")
                        this.props.navigation.goBack()
                    }
                })
                .catch((error) => {
                    alert("Error: " + error)
                })
            })

        }

    }

    render(){
        return(
            <SafeAreaView style={styles.authcontainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Topic></Topic>
                    <Text style={styles.header}>Change Password</Text>
                    <View style={{marginVertical:Platform =='ios'? 60 : 70}}>
                        <TypeAInput 
                            label='New Password' 
                            iconName='lock-outline'
                            onChangeText={(value) => this.setState({pass: value})}
                        />
                        <TypeAInput 
                            label='Confirm' 
                            iconName='lock-outline'
                            onChangeText={(value) => this.setState({confirmPass: value})}
                        />
                    </View>
                    <CustomBtn1 title='Continue' onPress={this.updateFunc} style={styles.btn} />
                    
                </ScrollView>
                <Text onPress={() => this.props.navigation.navigate('Home')} style={styles.skip}>Skip &gt;&gt; </Text>
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    authcontainer: {
        flex: 1,
        paddingHorizontal: 30
    },
    header: {
        fontSize:  30,
        fontWeight: 'bold',
        maxHeight: 50,
        marginTop: 25
    },
    skip: {
        fontSize: 16,
        fontWeight: "bold",
        color: 'black',
        alignSelf: 'flex-end',
        right: 10,
        bottom: 150
    }
})