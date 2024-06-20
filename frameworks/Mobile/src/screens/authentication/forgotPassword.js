import react from 'react'
import { useEffect, useState } from "react";


import { View, SafeAreaView, Text, StyleSheet, Platform, ScrollView, Alert } from 'react-native'
import CustomBtn1 from '../../components/customButton'
import TypeAInput from '../../components/customInput'
import Topic from '../../components/topic'
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook


const RESET_PASSWORD_URL = 'http://192.168.1.245:8070/login/resetPassword';


const ForgotPassword = () => {

    const navigation = useNavigation(); // Get the navigation object
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);



    const handleSubmit = async () => {
        setLoading(true);
        if (email.length === 0) {
            Alert.alert("שגיאה", "שדה ריק");
            setLoading(false);
            return;
        }

        try {
            let updatedEmail = email.toLowerCase();
            const response = await fetch(RESET_PASSWORD_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: updatedEmail }), // Assuming email is defined elsewhere
            });
            console.log(response);
            if (response.status === 200) {
                Alert.alert("הצלחה","קישור לאיפוס הסיסמה נשלח לכתובת האימייל שלך.");
                navigation.goBack();
            } else {
                Alert.alert("שגיאה", "שגיאה בעת שליחת בקשה לאיפוס הסיסמה.");
            }
        } catch (err) {
            Alert.alert("שגיאה", err.message);
        }

        setLoading(false);
    };

  
      


    return (
        <SafeAreaView style={styles.authcontainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Topic></Topic>
                <Text style={styles.header}>איפוס סיסמה</Text>
                <View style={{marginVertical:Platform =='ios'? 60 : 70}}>
                    <TypeAInput label='אימייל' onChangeText={(email) => setEmail(email)}></TypeAInput>
                    {/* <Text style={styles.info}>An email will be sent to your account to recover your password</Text> */}
                </View>
                <CustomBtn1 title='שלח קישור לאיפוס סיסמה' onPress={handleSubmit} style={styles.btn}></CustomBtn1>
            </ScrollView>
        </SafeAreaView>
    );
}

export default ForgotPassword;

const styles = StyleSheet.create({
    authcontainer: {
        flex: 1,
        paddingHorizontal: 30,
        marginHorizontal:20,
    },
    header: {
        fontSize:  30,
        fontWeight: 'bold',
        maxHeight: 50,
        textAlign: 'center',
        marginTop: 30
    },
    info: {
        fontSize: 17,
        textAlign: 'center',
        fontWeight: '500'
    }
})