import React, { Component } from "react"
import { Pressable, Text, View, Image, StyleSheet, Platform } from "react-native"
import { useNavigation } from '@react-navigation/native'
import Colors from "../utils/colors"
import AsyncStorage from "@react-native-async-storage/async-storage"


export default class Profile extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            user: ''
        }
    }

    componentDidMount = () => {
        AsyncStorage.getItem('user_id').then((value) => {
            var user_id = value
            
            var data = {
                user_id: user_id
            }
            
            fetch (
                "http://onedon.atwebpages.com/api/profile.php",
                {
                    method: "POST",
                    headers: { 
                        'Accept': 'application/json',
                        'Content-Type': 'application.json'
                    },
                    body: JSON.stringify(data)
                }
            )
            .then((response) => response.json())
            .then((response) => {
                this.setState({user: response[0].user})
            })
            .catch((error) => {
                alert("Error: " + error);
            })
            
        })
    }

    render(){

        const userImage = require('../../assets/images/profile.jpeg')

        return(
            <Pressable style={styles.userContainer} onPress={()=>alert('Alive')}>
                <View style={styles.imageContainer}>
                    <Image style={styles.img} source={userImage} />
                </View>
                <Text style={styles.user}> {this.state.user} </Text>
                <View style={{flex:1, flexDirection: 'row', alignItems: 'baseline'}}>
                    <Text style={styles.lvlTxt}> Level One Donor </Text>
                    <View style={styles.lvlStat}></View>
                </View>
            </Pressable>
        )
    }
}


const styles = StyleSheet.create({
    userContainer: {
        height: 190,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Platform == 'ios'? 70: 90
    },
    imageContainer: {
        width: '43%',
        height: '65%',
        backgroundColor: 'rgba(151, 122, 248, .2)',
        borderRadius: 100,
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    user: {
        fontSize: 17,
        fontWeight: '800',
        color: Colors.dark,
        paddingTop: 5,
    },
    lvlTxt: {
        fontSize: 15,
        color: 'rgba(0,0,0,.4)'
    },
    lvlStat: {
        width: 8,
        height: 8,
        backgroundColor:'#0fd415',
        borderRadius: 20,
        marginLeft: 5,
    },
    img: {
        width: '75%',
        height: '75%',
        borderRadius: 100
    }
})