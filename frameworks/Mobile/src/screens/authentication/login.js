import { StatusBar } from 'expo-status-bar';
import react, { Component } from 'react';
import {View, Text, ScrollView, SafeAreaView, StyleSheet, Image} from 'react-native';
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
            return;
        }

        else{
            this.setState({loginPending: true})
            var loginApUrl = 'http://192.168.1.245:8070/login/login';
            var headers = {
                'Accept': 'aplication/json',
                'Content-Type': 'application/json'
            };

            var data={
                email: email,
              //  username:email,
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
              //  if (response[0].Message == 'Success') {
                    const user_id = response._id;
                    
                    console.log(user_id);
                   
                    this.storeID(user_id);

                    AsyncStorage.setItem('token', response.accessToken);
                    AsyncStorage.setItem('user_id', response._id);
                    AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
                    AsyncStorage.setItem('role',response.roles)
         
                 ///////////////////////////////// to take care of the admin or funds screen 
                    // if(res.data.userType=="Admin"){
                    //     navigation.navigate('AdminScreen');
                    //  }else{
                    //    navigation.navigate('Home');
                    //  }
                   

                         this.props.navigation.navigate('home');
                 //    }
                    
              //   }else{
                 //   alert(response.Message);
               //  }
             
            console.log("Blabla");
            console.log(response);
        }
        )
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
                    <View style={{ marginBottom: 50, flexDirection: 'row', alignSelf: 'center'}}>
                        <Text style={styles.bgheader}>הבאים</Text>
                        <View style={{backgroundColor: Colors.primary,
                                        paddingHorizontal: 15,
                                    
                                        marginHorizontal: 6,
                                        borderRadius: 5,
                                        alignItems: 'center'}}>
                                        <Text style={[styles.bgheader, {color: '#f2f2f2'}]}>ברוכים</Text>
                        </View>
                    </View>
                    <View style={{ marginBottom: 90, flexDirection: 'row', alignSelf: 'center'}}>
                       
                    <Image source={require('../../../assets/images/logo1.jpeg')} style={styles.image}  />

                    </View>
                    
                    <View>
                        <TypeAInput 
                            iconName='email-outline'
                            onChangeText={Email=>this.setState({Email})}
                            placeholder='מייל'
                            >
                        </TypeAInput>
                        <TypeAInput 
                            iconName='lock-outline' 
                            password
                            onChangeText={Password=>this.setState({Password})}
                            placeholder='סיסמה'
                            >  
                        </TypeAInput>
                        <Text style={styles.fPass}>
                        שכחת את הסיסמה?
                        <Text style={{color: Colors.primary, fontWeight: '700'}} 
                        
                        onPress={() => this.props.navigation.navigate('forgotPass')}> לחץ כאן </Text>
                      
                    </Text>
                    </View>
    
                    <CustomBtn1 title={'התחבר'} style={{flex: 1}} onPress={this.login}></CustomBtn1>
               
                    <View style={styles.hline}></View>
                    <Text style={{fontSize: 15.5, textAlign: 'center'}}>
                        אין לך חשבון?
                        <Text style={{color: Colors.primary, fontWeight: '700'}} 
                        
                        onPress={() => this.props.navigation.navigate('mregister')}> לחץ כאן </Text>
                      
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
        fontSize: 15.5,
        textAlign: 'right' ,
        alignSelf: 'flex-end', 
        marginBottom: 50,
        marginEnd: 5
    },
    hline: {
        width: '15%',
        height: 1.3,
        backgroundColor: 'rgba(0,0,0,.4)',
        alignSelf: 'center',
        marginVertical: 10
    },

    image: {
        flex: 1,
        height: 100,
        borderRadius: 95,
    }
})