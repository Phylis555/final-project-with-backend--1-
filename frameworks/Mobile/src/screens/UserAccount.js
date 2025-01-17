

// export default Account;
import React, { Component } from "react";
import { View, Text, SafeAreaView, ImageBackground, Image, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../utils/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

import axios from 'axios';
import { getAuthHeader } from "../components/authHeader";
import { requesterProfile } from "../api/requester.api";
import { SimpleLineIcons } from "@expo/vector-icons";
import DashboardProfile from "./DashboardProfile";
import { FAB } from 'react-native-paper'


class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: null,
            profileData: {},
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
        // Disable the slide back gesture
        this.props.navigation.setOptions({
        gestureEnabled: false,
        });
    }

    // Effect to fetch profile data when userId changes
    componentDidUpdate(prevProps, prevState) {
        if (prevState.userId !== this.state.userId) {
            const { userId, token } = this.state;
           
            if (userId) {
            requesterProfile(userId,token)
            .then((res) => {
            this.setState({ profileData: res.data.requester });  
            })
            .catch((e) => {
                console.error(e);
            });
             }
    }
    }

    render() {
        const { profileData } = this.state;

        const Uri = require('../../assets/images/headerBg.jpg');
        const userImage = require('../../assets/images/profile.jpeg');

       


        function capitalizeFirstLetter(string) {
            if (string && string.length > 0) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
            return string;
        }
        

        return (
            <View style={styles.container}>
                  
                <ImageBackground blurRadius={3} resizeMode='cover' source={Uri} style={styles.container}>
                <FAB
                        style={styles.fab}
                        icon="home"
                        onPress={() => this.props.navigation.navigate('home2')}

                    />
                    <View style={styles.content}>
             
                        <View style={styles.imageContainer}>
                            <Image style={styles.img} source={userImage} />
                        </View>
                        {/* Only display profile data if it exists */}
                        {profileData && (
                            <View style={styles.content}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline' }}>
                                <Text style={styles.lvlTxt}>{capitalizeFirstLetter(profileData.firstName) + " " + capitalizeFirstLetter(profileData.lastName)}</Text>
                                <View style={styles.lvlStat}></View>
                            </View>

                            <View  style={{ flexDirection: "row", marginVertical: 6,  alignItems: 'baseline' }} >
                                    <SimpleLineIcons name="phone" size={24} color={Colors.primary} />
    
                                    <Text
                                        style={{
                                        marginLeft: 4,
                                        }}
                                    >
                                       0{profileData.contactNumber}
                                    </Text>
                                    </View>

                                    <View  style={{ flexDirection: "row", marginVertical: 6,  alignItems: 'baseline' }} >
                                    <SimpleLineIcons name="envelope" size={24} color={Colors.primary} />
    
                                    <Text
                                        style={{
                                        marginLeft: 4,
                                        }}
                                    >
                                        {profileData.email}
                                    </Text>
                                    </View>






                                <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity onPress={() =>  this.props.navigation.navigate('editAccount')}
                                style={styles.btnStyle}
                                >
                                <Text
                                    style={{
                                //    ...FONTS.body4,
                                        color: "#fff",
                            }}
                                >
                                    ערוך פרופיל
                                </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity onPress={() =>  this.props.navigation.navigate('dashBoard')}
                                style={styles.btnStyle}

                                >
                                <Text
                                    style={{
                                    //...FONTS.body4,
                                    color: "#fff",
                                    }}
                                >
                                    כל התרומות שלי
                                </Text>
                                </TouchableOpacity>
                                </View>

                            </View>
                        )}
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    content: {
        backgroundColor: '#efefef',
        alignSelf: 'center',
        height: '50%',
        width: '80%',
        marginBottom: '40%',
        borderRadius: 15,
        alignItems: 'center',
    },
    imageContainer: {
        width: 130,
        height: 130,
        backgroundColor: 'rgba(151, 122, 248, .2)',
        borderRadius: 100,
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: '-20%',
    },
    img: {
        width: '75%',
        height: '75%',
        borderRadius: 100,
    },
    lvlTxt: {
        fontSize: 15,
        color: 'rgba(0,0,0,.4)',
    },
    lvlStat: {
        width: 8,
        height: 8,
        backgroundColor: '#0fd415',
        borderRadius: 20,
        marginLeft: 5,
    },
    btnStyle: {
        width: 124,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.primary,
        borderRadius: 10,
        marginHorizontal: 10,

    },
    fab: {
        position: 'absolute',
        margin: 16,
        left: 0,
        top: 40, // Adjust the position as needed
        backgroundColor: 'rgba(243, 195, 123, 0.8)',
      },
});

export default Account;
