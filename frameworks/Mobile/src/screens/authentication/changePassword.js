import React, { Component } from "react";
import { View, Text, StyleSheet, SafeAreaView, Platform, ScrollView } from "react-native"
import CustomBtn1 from "../../components/customButton"
import Topic from "../../components/topic"
import TypeAInput from "../../components/customInput"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updatePassword, requesterProfile } from "../../api/requester.api";


export default class ChangePass extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            userId: null,
            profileData: {},
            token: null,

            pass: "",
            confirmPass: ""
        }
    }

         // Fetch user ID and token from AsyncStorage
         fetchData = async () => {
            const storedUserId = await AsyncStorage.getItem('user_id');
            const storedToken = await AsyncStorage.getItem('token');
            this.setState({ userId: storedUserId, token: storedToken });
    
            console.log("Fetched user ID:", storedUserId);
            console.log("Fetched Token access:", storedToken);
        };
    
        // Effect to fetch data when component mounts
        componentDidMount() {
            this.fetchData();
        }
    
        // Effect to fetch profile data when userId changes
        componentDidUpdate(prevProps, prevState) {
            if (prevState.userId !== this.state.userId) {
                const { userId, token } = this.state;
               
                if (userId) {
                requesterProfile(userId,token)
                .then((res) => {
                this.setState({ profileData: res.data.requester });  
                })
                .catch((e) => {
                    console.error(e);
                });
                 }
            }
        }


    handlePassword = (e) => {
        e.preventDefault()
       // setChangePassword(!changePassword);
       var pass = this.state.pass
       var cpass = this.state.confirmPass
       const { userId,token} = this.state;


    
        if (pass === cpass) {
          updatePassword(userId, {
            password: pass
          },token)
            .then((res) => {
                alert("Password updated succesfully").then((value) => {
                if (value) {
                    this.props.navigation.goBack()
                }
              });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
            alert("Password does not match");
        }
      }

    // updateFunc = () => {

    //     var pass = this.state.pass
    //     var cpass = this.state.confirmPass

    //     // Authentication
    //     if (pass != cpass) {
    //         alert('Passwords do not match!');
    //     }else {

    //         AsyncStorage.getItem('user_id').then((value) => {
                
    //             data = {
    //                 user_id: value,
    //                 password: pass
    //             }

    //             headers = {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application.json'
    //             }

    //             fetch(
    //                 "https://onedonation.000webhostapp.com/api/changePassword.php",
    //                 {
    //                     method: "POST",
    //                     headers: headers,
    //                     body: JSON.stringify(data)
    //                 }
    //             )
    //             .then((response) => response.json())
    //             .then((response) => {
    //                 if (response != "success") {
    //                     alert("Something went wrong")
    //                 }else {
    //                     alert("Password changed successfully")
    //                     this.props.navigation.goBack()
    //                 }
    //             })
    //             .catch((error) => {
    //                 alert("Error: " + error)
    //             })
    //         })

    //     }

    // }

    render(){
        return(
            <SafeAreaView style={styles.authcontainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Topic/>
                     <Text style={styles.header}>שינוי סיסמא</Text>
                    <View style={{marginVertical:Platform =='ios'? 60 : 70}}>
                        <TypeAInput 
                            label='סיסמה חדשה' 
                            iconName='lock-outline'
                            onChangeText={(value) => this.setState({pass: value})}
                        />
                        <TypeAInput 
                            label='אימות סיסמא' 
                            iconName='lock-outline'
                            onChangeText={(value) => this.setState({confirmPass: value})}
                        />
                    </View>
                    <CustomBtn1 title='שנה סיסמה' onPress={this.handlePassword} style={styles.btn} />
                    
                </ScrollView>
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    authcontainer: {
        flex: 1,
        marginHorizontal:10,
        paddingHorizontal: 30
    },
    header: {
        fontSize:  30,
        fontWeight: 'bold',
        maxHeight: 50,
        textAlign:'center',
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