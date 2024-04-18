import React, { Component } from "react"
import { View, SafeAreaView, ScrollView, StyleSheet, Text } from "react-native"
import CustomBtn1 from "../components/customButton"
import TypeAInput from "../components/customInput"
import Topic from "../components/topic"
import { Checkbox } from "react-native-paper"
import Colors from "../utils/colors"


export default class Messenger extends Component {
    constructor(props) {
        super(props),
        this.state = {
            policy: false
        }
    }

    render() {
        return(
            <SafeAreaView style={styles.authcontainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Topic title={'Account SignUp'}/>
                    <View>
                        <TypeAInput label={'First Name'}/>
                        <TypeAInput label={'Surname'}/>
                        <TypeAInput label={'Address line 1'}/>
                        <TypeAInput label={'Address line 2'}/>
                        <TypeAInput label={'Email'} placeholder={'exampe@gmail.com'} keyboardType={'email-address'}/>
                        <TypeAInput label={'Mobile'} placeholder={'+235 _ _ _ _'} keyboardType={'phone-pad'}/>
                    </View>
                        <CustomBtn1 title={'Next'}/>
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