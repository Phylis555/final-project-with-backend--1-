/*
    There are types of input fields for this projet (say TypeA & TypeB)
    TypeA ------->>>>> Login and signup screen Inputs
    TypeB ------->>>>> All other screens Input [@Michael]

*/
import React  from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Colors from "../utils/colors";
import Icon from '@expo/vector-icons/MaterialCommunityIcons';


const TypeAInput = (props) => {

    const [hidePassword, setHidePassword] = React.useState(props.password);

    return(
        <View style={{marginBottom: 20}}>
            <Text style={styles.label}>
                {props.label}
            </Text>
            <View style={styles.inputContainer}>
                <Icon name={props.iconName} size={15}/>
                <TextInput 
                    secureTextEntry={hidePassword}
                    style={styles.inputContent}
                    autoCorrect={false}
                    {...props}
                    ></TextInput>
            </View>
        </View>
    );
} 


export function TypeBInput(props) {
    return(
        <View style={{marginBottom: 20}}>
            <Text style={styles.label}>
                {props.label}
            </Text>
            <View style={[styles.inputContainer2, {height: props.height}]}>
                <Icon name={props.iconName} size={15}/>
                <TextInput 
                    style={styles.inputContent}
                    {...props}
                    ></TextInput>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: Colors.inputA, 
        height: 50, 
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    inputContent: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
        paddingHorizontal: 15
    },
    label: {
        fontSize: 16, 
        fontWeight: '500', 
        color: Colors.light, 
        marginVertical: 10
    },
    inputContainer2: {
        borderColor: Colors.primary, 
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15
    }
})


export default TypeAInput;