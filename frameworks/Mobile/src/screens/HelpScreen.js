import React, { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet ,TouchableOpacity } from "react-native"
import Colors from "../utils/colors";

const Help = () => {

    const [isDisplay, setIsDisplay] = useState(false);

    const toggleText = () => {
        setIsDisplay(!isDisplay);
    }
    return(

        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.headerText}>אודות</Text>
                <Text style={styles.secondaryText}>
                בעקבות מלחמת חרבות ברזל התגלה צורך גדול בציוד לחיילים ומפונים, אם זה ציוד טקטי או ציוד בסיסי למגורים.
                במהלך המלחמה, בקשות רבות הועלו ברשתות חברתיות, אך הפלטפורמות לא היו פתרון מוצלח לבעיה.      
                מטרת הפרויקט היא לפתח מערכת המאגדת את כל הבקשות לציוד, בה היה ניתן להוסיף בקשות לציוד בקלות ומאפשרת
                 למבקשים ולתורמים לאתר
                  בקשות רלוונטיות בקלות. בנוסף, המערכת מאפשרת לתרום כסף וכך גם מי שאין לו ציוד לתורמה בבית יוכל לעזור.
            </Text>
            </View>

            <TouchableOpacity onPress={toggleText}>
                <Text style={styles.toggleText}>איך זה עובד?</Text>
            </TouchableOpacity>

           
              {isDisplay &&  <Text style={styles.secondaryText}>
                באפליקציה Instant Giving תוכלו לקבל ולתרום ציוד בצורה פשוטה ונוחה. כדי לבצע פעולות אלו,
                 יש להתחבר לחשבון האישי שלכם. לאחר התחברות, תוכלו לקשת תרומות של ציוד
                , ולעקוב אחרי בקשות תרומות שלכם באיזור האישי שנקרא 'הבקשות ציוד שלי'.
                </Text> }
           


        </SafeAreaView>
    )
}

export default Help

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(251,237,237,255)'
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },

    secondaryText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },

    toggleText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginTop: 30,
        textDecorationLine: 'underline'

    }


})