import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet, Image, Alert,ImageBackground ,Platform} from 'react-native';
import Colors from '../../utils/colors';
import TypeAInput from '../../components/customInput';
import CustomBtn1 from '../../components/customButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader';
import { API_URL } from '../../api/config';

const LOGIN_URL = `${API_URL}/login/login`; // Replace with your actual login URL

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Email: '',
            Password: '',
            errMsg: '',
            loginPending: false
        }
    }

    storeID = async (user_id) => {
        await AsyncStorage.setItem('user_id', user_id);
    }

    login = async () => {
        this.setState({ loginPending: true });
        const { Email, Password } = this.state;

        if (Email.length === 0 || Password.length === 0) {
            Alert.alert('שדה ריק');
            this.setState({ loginPending: false });
            return;
        }

        try {
            const response = await fetch(LOGIN_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: Email, password: Password }),
            });

            const data = await response.json();

            if (response.ok) {
                const user_id = data._id;
                await this.storeID(user_id);
                await AsyncStorage.setItem('token', data.accessToken);
                await AsyncStorage.setItem('user_id', data._id);
                await AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
                await AsyncStorage.setItem('role', data.roles);
                this.setState({ Email: '', Password: '', errMsg: '' });
                this.props.navigation.navigate('home');
                this.setState({ loginPending: false });

            } else {
                this.setState({ loginPending: false });
                Alert.alert("שגיאה בעת התחברות");
            }
        } catch (err) {
            this.setState({ errMsg: 'Error during login', loginPending: false });
            Alert.alert('Error: ' + err.message);
        }
    };
    
    render() {
        return (
            <>
                <View style={styles.authcontainer}>
                    <ImageBackground source={require('../../../assets/images/loginBg.png')} style={styles.imageBackground}>
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                            <View style={{ marginHorizontal:20 ,  paddingTop:Platform.OS === 'ios'? 60: 70}}>
                            <View style={{ marginBottom: 50, flexDirection: 'row', alignSelf: 'center' }}>
                                <Text style={styles.bgheader}>הבאים</Text>
                                <View style={{ backgroundColor: Colors.primary, paddingHorizontal: 15, marginHorizontal: 6, borderRadius: 5, alignItems: 'center' }}>
                                    <Text style={[styles.bgheader, { color: '#f2f2f2' }]}>ברוכים</Text>
                                </View>
                            </View>
                            <View style={{ marginBottom: 90, flexDirection: 'row', alignSelf: 'center' }}>
                                <Image source={require('../../../assets/images/logo1.jpeg')} style={styles.image} />
                            </View>

                            <View>
                                <TypeAInput
                                    iconName='email-outline'
                                    onChangeText={Email => this.setState({ Email })}
                                    placeholder='מייל'
                                />
                                <TypeAInput
                                    password
                                    onChangeText={Password => this.setState({ Password })}
                                    placeholder='סיסמה'
                                />

                                <Text style={styles.fPass}>
                                    שכחת את הסיסמה?
                                    <Text style={{ color: Colors.primary, fontWeight: '700' }}
                                        onPress={() => this.props.navigation.navigate('forgotPass')}> לחץ כאן </Text>
                                </Text>
                            </View>

                            <CustomBtn1 title={'התחבר'} style={{ flex: 1 }} onPress={this.login}></CustomBtn1>

                            <View style={styles.hline}></View>
                            <Text style={{ fontSize: 15.5, textAlign: 'center' }}>
                                אין לך חשבון?
                                <Text style={{ color: Colors.primary, fontWeight: '700' }}
                                    onPress={() => this.props.navigation.navigate('mregister')}> לחץ כאן </Text>
                            </Text>
                            </View>
                        </ScrollView>
                    </ImageBackground>
                </View>

                {this.state.loginPending ? <Loader /> : null}
            </>
        )
    }
}

const styles = StyleSheet.create({
    authcontainer: {
        flex: 1,
   },
    smheader: {
        fontSize: 25,
        alignSelf: 'center',
        marginBottom: 10,
    },
    bgheader: {
        fontSize: 35,
        fontWeight: 'bold',
        maxHeight: 50
    },
    fPass: {
        fontSize: 15.5,
        textAlign: 'right',
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
        height: 100,
        width:'90%',
        borderRadius: 20,
        borderColor: Colors.primary,
        borderWidth: 1
    },
    imageBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover', // Ensures the image covers the entire background
        justifyContent: 'center',
    },
});