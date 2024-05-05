import React, { Component } from "react"
import { View, SafeAreaView, ScrollView, StyleSheet, Text,TextInput} from "react-native"
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
            password: ''
        }
    }
    onChangeText = (key, val) => {
        this.setState({ [key]: val })
      } 

      signUp = async () => {
        const signupData = {
            firstName,
            lastName,
            email,
            contactNumber,
            password,
          } = this.state;
      //  const { firstName,lastName, email, contactNumber, password } = this.state
        // try {
        //   // here place your signup logic
        //   axios.post("http://192.168.1.245:8070/requester/requesterSignup", signupData)
        //   console.log('user successfully signed up!: ', success)
        //   this.props.navigation.navigate('home');
        // } catch (err) {
        //   console.log('error signing up: ', err)
        // }
        try {
            // Send a POST request to the server with the signup data
            const response = await axios.post('http://192.168.1.245:8070/requester/requesterSignup', signupData);
            console.log(response.status);
            // Check if the request was successful based on the response
            if (response.status === 201) {
                console.log('User successfully signed up!');
                this.props.navigation.navigate('home');
            } else {
                console.log('Sign-up failed:', response.data);
            }
        } catch (err) {
            console.log('Error signing up:', err);
        }

      }

    render() {
        return(
            <SafeAreaView style={styles.authcontainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Topic title={'הירשם כדי להתחיל לתמוך'}/>
                    <View>
                        <TypeAInput label={'שם פרטי'} onChangeText={val => this.onChangeText('firstName', val)}/>
                        <TypeAInput label={'שם משפחה'} onChangeText={val => this.onChangeText('lastName', val)}/>
                        <TypeAInput label={'Email'} placeholder={'exampe@gmail.com'} keyboardType={'email-address'} onChangeText={val => this.onChangeText('email', val)}/>
                        <TypeAInput label={'מספר טלפון'} placeholder={'05 _ _ _ _'} keyboardType={'phone-pad'} onChangeText={val => this.onChangeText('contactNumber', val)}/>
                        <TypeAInput label={'סיסמא'} placeholder={'Password'} secureTextEntry={true} autoCapitalize="none" onChangeText={val => this.onChangeText('password', val)}/>
                        <TypeAInput label={'אימות סיסמא'} placeholder={'Password'} secureTextEntry={true} autoCapitalize="none"/>
                    </View>
                        <CustomBtn1 title={'הירשם'} onPress={this.signUp}/>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Checkbox
                                status={this.state.policy ? 'checked' : 'unchecked'}
                                onPress={() => {this.setState({policy: !(this.state.policy)})}}
                            />
                            <Text style={{color: Colors.light, fontSize: 15.5}}>Agree with 
                                <Text style={{color: Colors.primary}}
                                onPress={() => alert('long list of privacy & policies go here')}
                                > Policy </Text>
                            </Text>
                        </View>
                    <View>
                        
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    authcontainer:{
        flex: 1,
        justifyContent: 'center',
        marginBottom: 20,
        paddingHorizontal: 30
    },
})



