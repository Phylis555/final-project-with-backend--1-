import { StatusBar } from 'expo-status-bar';
import react, { Component } from 'react';
import {View, Text, ScrollView, SafeAreaView, StyleSheet} from 'react-native';
import Colors from '../../utils/colors';
import TypeAInput from '../../components/customInput';
import CustomBtn1 from '../../components/customButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader';


export default class Login extends Component{

    constructor(props)
    {
        super(props);
        this.state={
            Email:'', 
            Password:'',
            loginPending: false
        }
    }

    storeID = (user_id) => {
        AsyncStorage.setItem('user_id', user_id);
    }

    login = () => {
        
        var email = this.state.Email;
        var password = this.state.Password;

        if (email.length == 0 || password.length == 0){
            alert('All fields required');
        }
        else if (email.length != 9 && email.split('@')[1].toLowerCase() != 'unm.edu'){
            alert('Incorrect Email or NetID');

        }
        else if (email.length == 9 && !['100', '101', '102'].includes(email.substring(0, 3))){
            alert('Incorrect Email or NetID');
        }
        else{
            
            this.setState({loginPending: true})
            var loginApUrl = 'https://onedonation.000webhostapp.com/api/login.php';
            var headers = {
                'Accept': 'aplication/json',
                'Content-Type': 'application.json'
            };

            var data={
                email: email,
                password: password
            };

            fetch(
                loginApUrl,
                {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(data)
                }
            )
            .then((response)=>response.json()) // Checks if response is in json format
            .then((response)=>{

                // If authenticted
                this.setState({loginPending: false})
                if (response[0].Message == 'Success') {
                    const user_id = response[0].user_id;
                    this.storeID(user_id);
                    if (this.state.Password == '123456') {
                        this.props.navigation.navigate('home', {screen: 'ChangePassword'});
                    } else {
                        this.props.navigation.navigate('home');
                    }
                    
                }else{
                    alert(response[0].Message);
                }
            })
            .catch((error)=>{
                this.setState({loginPending: false})
                alert('Error: '+ error);
            })

        }
    }

    render()
    {
        return(
            <>
            <SafeAreaView  style={styles.authcontainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <StatusBar style="auto" />
                    <Text style={styles.smheader}> Welcome to </Text>
                    <View style={{ marginBottom: 90, flexDirection: 'row', alignSelf: 'center'}}>
                        <Text style={styles.bgheader}>One</Text>
                        <View style={{backgroundColor: Colors.primary,
                                        paddingHorizontal: 15,
                                        paddingVertical: 3,
                                        marginHorizontal: 6,
                                        borderRadius: 10,
                                        alignItems: 'center'}}>
                                        <Text style={[styles.bgheader, {color: '#f2f2f2'}]}>Donation</Text>
                        </View>
                    </View>
                    
                    <View>
                        <TypeAInput 
                            label='Email or Stud. NetID' 
                            iconName='email-outline'
                            onChangeText={Email=>this.setState({Email})}
                            placeholder='10...  or  ...@unm.edu'
                            >
                        </TypeAInput>
                        <TypeAInput 
                            label='Password' 
                            iconName='lock-outline' 
                            password
                            onChangeText={Password=>this.setState({Password})}
                            >  
                        </TypeAInput>
                        <Text style={styles.fPass} onPress={() => this.props.navigation.navigate('forgotPass')}>Forgot Password?</Text>
                    </View>
    
                    <CustomBtn1 title={'Login'} style={{flex: 1}} onPress={this.login}></CustomBtn1>
                    <Text style={{fontSize: 15.5, textAlign: 'center',marginVertical: 10}}>First time only password: 123456 </Text>
                    <View style={styles.hline}></View>
                    <Text style={{fontSize: 15.5, textAlign: 'center'}}>
                        <Text style={{color: Colors.primary, fontWeight: '700'}} 
                        onPress={() => this.props.navigation.navigate('mregister')}> Sign-Up </Text> or
                        <Text  style={{color: Colors.primary, fontWeight: '700'}}
                        onPress={() => this.props.navigation.navigate('CourierLogin')}
                        > Login </Text>
                        as a Driver
                    </Text>
                </ScrollView>
            </SafeAreaView>
            {this.state.loginPending ? <Loader /> : null}
            </>
        )
    }
}



const styles = StyleSheet.create({
    authcontainer:{
        flex: 1,
        justifyContent: 'center',
        marginTop: 90,
        marginBottom: 20,
        paddingHorizontal: 30
    },
    smheader: {
        fontSize: 25,
        alignSelf: 'center',
        marginBottom: 10,
    },
    bgheader: {
        fontSize:  35,
        fontWeight: 'bold',
        maxHeight: 50
    },
    fPass: {
        color: Colors.primary, 
        alignSelf: 'flex-end', 
        fontSize: 16,
        marginBottom: 50
    },
    hline: {
        width: '15%',
        height: 1.3,
        backgroundColor: 'rgba(0,0,0,.4)',
        alignSelf: 'center',
        marginVertical: 10
    }
})

