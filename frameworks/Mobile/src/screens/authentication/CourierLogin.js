import React, { Component} from "react"
import { View, Text, ScrollView, SafeAreaView, StyleSheet } from "react-native"
import CustomBtn1 from "../../components/customButton"
import TypeAInput from "../../components/customInput"
import Topic from "../../components/topic"
import Colors from "../../utils/colors"


export default class CourierLogin extends Component {
    constructor(props) {
        super(props),
        this.state  = {
            email: '',
            password: ''
        }
    }

    render(){
        return(
            <SafeAreaView style={styles.authcontainer}>
                <ScrollView>
                    <Topic />
                    <Text style={styles.header}>Account Login</Text>

                    <View>
                        <TypeAInput 
                            label='Email' 
                            iconName='email-outline'
                            onChangeText={Email=>this.setState({Email})}
                            placeholder='example@gmail.com'
                            >
                        </TypeAInput>
                        <TypeAInput 
                            label='Password' 
                            iconName='lock-outline' 
                            password
                            onChangeText={Password=>this.setState({Password})}
                            >  
                        </TypeAInput>
                        <Text style={styles.fPass} onPress={() => alert("Screen under construction")}>Forgot Password?</Text>
                    </View>

                    <CustomBtn1 title={'Login'} style={{flex: 1}} onPress={this.login}></CustomBtn1>
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
    header: {
        fontSize: 30,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: '20%'
    },
    fPass: {
        color: Colors.primary, 
        alignSelf: 'flex-end', 
        fontSize: 16,
        marginBottom: 50
    }
})