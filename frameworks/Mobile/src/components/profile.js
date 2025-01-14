import React, { Component } from "react"
import { Pressable, Text, View, Image, StyleSheet, Platform } from "react-native"
import { useNavigation } from '@react-navigation/native'
import Colors from "../utils/colors"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from 'axios';
import { getAuthHeader } from "./authHeader"


export default class Profile extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            userId: null,
            profileData: null,
            token: null,
        };
    }

    // Fetch user ID and token from AsyncStorage
    fetchData = async () => {
        const storedUserId = await AsyncStorage.getItem('user_id');
        const storedToken = await AsyncStorage.getItem('token');
        this.setState({ userId: storedUserId, token: storedToken });

        console.log("Fetched user ID:", storedUserId);
        console.log("Fetched Token access:", storedToken);
    };

    // Effect to fetch data when component mounts
    componentDidMount() {
        this.fetchData();
    }

    // Effect to fetch profile data when userId changes
    componentDidUpdate(prevProps, prevState) {
        if (prevState.userId !== this.state.userId) {
            const { userId, token } = this.state;
            if (userId) {
                axios.get(`http://192.168.1.245:8070/requester/profile/${userId}`, getAuthHeader(token))
                    .then((res) => {
                        this.setState({ profileData: res.data.requester });
                        console.log(res.data);
                    })
                    .catch((e) => {
                        console.error(e);
                    });
            }
        }
    }
    render(){

        const { profileData } = this.state;

        const userImage = require('../../assets/images/profile.jpeg')

        return(
            <Pressable style={styles.userContainer} onPress={()=>alert('Alive')}>
                <View style={styles.imageContainer}>
                    <Image style={styles.img} source={userImage} />
                </View>
                {profileData && (
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline' }}>
                                <Text style={styles.lvlTxt}>שלום, {profileData.firstName.charAt(0).toUpperCase() + profileData.firstName.slice(1)}</Text>
                                <View style={styles.lvlStat}></View>
                            </View>
                        )}

                <Text style={styles.user}> {this.state.user} </Text>
               
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