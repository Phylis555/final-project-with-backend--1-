import react from 'react'
import { View, SafeAreaView, Text, StyleSheet, Platform, ScrollView } from 'react-native'
import CustomBtn1 from '../../components/customButton'
import TypeAInput from '../../components/customInput'
import Topic from '../../components/topic'

const ForgotPassword = ({navigation}) => {

    const onPressAction = () => alert('Under Development');

    return (
        <SafeAreaView style={styles.authcontainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Topic></Topic>
                <Text style={styles.header}>Forgot Password</Text>
                <View style={{marginVertical:Platform =='ios'? 60 : 70}}>
                    <TypeAInput label='Email'></TypeAInput>
                    <Text style={styles.info}>An email will be sent to your account to recover your password</Text>
                </View>
                <CustomBtn1 title='Continue' onPress={onPressAction} style={styles.btn}></CustomBtn1>
            </ScrollView>
        </SafeAreaView>
    );
}

export default ForgotPassword;

const styles = StyleSheet.create({
    authcontainer: {
        flex: 1,
        paddingHorizontal: 30
    },
    header: {
        fontSize:  30,
        fontWeight: 'bold',
        maxHeight: 50,
        marginTop: 30
    },
    info: {
        fontSize: 17,
        textAlign: 'center',
        fontWeight: '500'
    }
})