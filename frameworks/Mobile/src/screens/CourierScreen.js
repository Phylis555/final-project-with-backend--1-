import React, { Component } from "react"
import { View, SafeAreaView, ScrollView, StyleSheet, Text,TextInput,Alert} from "react-native"
import CustomBtn1 from "../components/customButton"
import TypeAInput from "../components/customInput"
import Topic from "../components/topic"
import { Checkbox } from "react-native-paper"
import Colors from "../utils/colors"
import axios from 'axios'


export default class Messenger extends Component {
    constructor(props) {
        super(props),

        this.state = {
            policy: false ,
            firstName: '',
            lastName: '',
            email: '',
            contactNumber: '' ,
            password: '',
            confirmPassword: ''
        }
    }
    onChangeText = (key, val) => {
        this.setState({ [key]: val })
      } 

      signUp = async () => {

        if (this.state.password !== this.state.confirmPassword) {
            Alert.alert("נכשל", "סיסמה לא תואמת לאימות סיסמה");
            console.log("סיסמה לא תואמת לאימות סיסמה");
            return;
        }

        if(!this.state.policy){
            Alert.alert("נכשל", "על מנת להמשיך את התהליך יש לקרוא מדיניות ולאשר");
            console.log("על מנת להמשיך את התהליך יש לקרוא מדיניות ולאשר");
            return;
        }
          

        const signupData = {
            firstName,
            lastName,
            email,
            contactNumber,
            password,
          } = this.state;
          console.log(signupData);

        try {
            // Send a POST request to the server with the signup data
            const response = await axios.post('http://192.168.1.245:8070/requester/requesterSignup', signupData);
            console.log(response.status);
            // Check if the request was successful based on the response
            if (response.status === 201) {
                Alert.alert("הצלחה", "נרשם בהצלחה");
                this.props.navigation.navigate('login');
            } else {
                Alert.alert("נכשל",  "בבקשה נסה שוב");
                console.log('Sign-up failed:', response.data);
            }
        } catch (err) {
            Alert.alert("נכשל", err.message);
            console.log('Error signing up:', err);
        }

      }

    render() {

        return(
            <>
            <SafeAreaView style={styles.authcontainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Topic title={'הירשם כדי להתחיל לתמוך'}/>
                    <View>
                        <TypeAInput label={'שם פרטי'}  onChangeText={(firstName) => this.setState({ firstName })}/>
                        <TypeAInput label={'שם משפחה'} onChangeText={(lastName) => this.setState({ lastName })}/>
                        <TypeAInput label={'Email'} placeholder={'exampe@gmail.com'} keyboardType={'email-address'} onChangeText={(email) => this.setState({ email })}/>
                        <TypeAInput label={'מספר טלפון'} placeholder={'05 _ _ _ _'} keyboardType={'phone-pad'} onChangeText={(contactNumber) => this.setState({ contactNumber })}/>
                        <TypeAInput label={'סיסמא'} placeholder={'Password'} secureTextEntry={true} autoCapitalize="none" onChangeText={(password) => this.setState({ password })}/>
                        <TypeAInput label={'אימות סיסמא'} placeholder={'Password'} secureTextEntry={true} autoCapitalize="none" onChangeText={(confirmPassword) => this.setState({ confirmPassword })}/>
                    </View>
                        <CustomBtn1 title={'הירשם'} onPress={this.signUp}/>
                        <View style={styles.policyContainer}>
              <View style={styles.checkboxContainer}>
                <Checkbox
                  status={this.state.policy ? 'checked' : 'unchecked'}
                  onPress={() => { this.setState({ policy: !(this.state.policy) }) }}
                  color={Colors.primary} // Set the color of the checkbox
                  uncheckedColor={Colors.primary} // Set the color when unchecked
                />
              </View>
              <Text style={styles.policyText}>
                אני מסכים עם כל התנאים, ההגבלות ולמדיניות הפרטיות
              </Text>
            </View>
                </ScrollView>
            </SafeAreaView>
            </>
        )
    }
}


const styles = StyleSheet.create({
    authcontainer:{
        flex: 1,
        justifyContent: 'center',
        marginBottom: 20,
        marginHorizontal: 15,
        paddingHorizontal: 30
    },
    policyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
      },
      checkboxContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Transparent black background
        borderRadius: 4,
        padding: 4,
      },
      policyText: {
        color: Colors.פ,
        fontSize: 15.5,
        flex: 1,
        textAlign: 'right', // Align the text to the right
      },
})



