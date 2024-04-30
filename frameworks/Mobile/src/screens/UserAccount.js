import React, { Component,useState, useEffect} from "react"
import { View, Text, SafeAreaView, ImageBackground, Image, StyleSheet } from "react-native"
import Colors from "../utils/colors"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from 'axios';
import { getAuthHeader } from "../../../Frontend/src/components/common/authHeader";



export default class Account extends Component {
    constructor(props)
    {
        super(props)
        
        this.state = {
         //   userId: AsyncStorage.getItem('user_id')
         userId: null,
         profileData: null,
            
            
        }
    }
 
        fetchData = async () => {
            // Retrieve the user ID from AsyncStorage
            const storedUserId = await AsyncStorage.getItem('user_id');
            this.setState({ userId: storedUserId });
        }

        componentDidMount() {
            this.fetchData();
        }
    

        componentDidUpdate(prevProps, prevState) {
            if (prevState.userId !== this.state.userId && this.state.userId) {
                axios.get(`http://192.168.1.245:8070/requester/profile/${this.state.userId}`, getAuthHeader())
                    .then((res) => {
                        this.setState({ profileData: res.data.requester });
                        console.log(res.data);
                    })
                    .catch((e) => {
                        console.error(e);
                    });
            }
        }
           
           
         
            

       

     //    const [userData, setUserData] = useState('');
        // async function getData() {
        //     const token = await AsyncStorage.getItem('token');
        //     console.log(token);
        //     axios
        //     .post('http://192.168.1.245:8070/', {token: token})
        //     .then(res => {
        //         console.log(res);
        //        // setUserData(res);
        //     });
        // }
       
    



    render() {

        let Uri = require('../../assets/images/accBg.jpg')
        let userImage = require('../../assets/images/profile.jpeg')
        return(
            <SafeAreaView style={styles.container}>
                <ImageBackground resizeMode='cover' source={Uri} style={styles.container}>
                    <View style={styles.content}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.img} source={userImage} />
                        </View>
                       
                        <View style={{flex:1, flexDirection: 'row', alignItems: 'baseline'}}>
                            <Text style={styles.lvlTxt}> Level One Donor </Text>
                            <View style={styles.lvlStat}></View>
                        </View>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    content: {
        backgroundColor: '#efefef',
        alignSelf: 'center',
        height: '50%',
        width: '80%',
        marginBottom: '40%',
        borderRadius: 15,
        alignItems: 'center'
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
        marginTop: '-20%'
    },
    img: {
        width: '75%',
        height: '75%',
        borderRadius: 100,
    },
    user: {
        fontSize: 19,
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
})



////////////////////////////////////////


// import React, { useState, useEffect } from 'react';
// import { Link, useParams } from "react-router-dom";

// import { View, Text, SafeAreaView, ImageBackground, Image, StyleSheet } from 'react-native';
// import Colors from '../utils/colors';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// const Account = () => {
//     // Define state using useState hook
//     const [userData, setUserData] = useState('');

//     // Define an effect using useEffect hook to fetch data from AsyncStorage and the API
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 // Get the token from AsyncStorage
//                // const user_id = await AsyncStorage.getItem('user_id');
//                const { user_id } = useParams();
//                 console.log(user_id);
//                 if (user_id) {
//                     // Make a request to the API
//                     const response = await axios.get('http://192.168.1.245:8070/',  user_id);
//                     console.log(response);
//                     // Set the user data using the response from the API
//                     //setUserData(response.data);
//                 }
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         // Call the fetchData function
//         fetchData();
//     }, []); // Empty dependency array ensures the effect runs once on mount

//     // Define the image URIs
//     const backgroundUri = require('../../assets/images/accBg.jpg');
//     const userImageUri = require('../../assets/images/profile.jpeg');

//     return (
//         <SafeAreaView style={styles.container}>
//             <ImageBackground resizeMode='cover' source={backgroundUri} style={styles.container}>
//                 <View style={styles.content}>
//                     <View style={styles.imageContainer}>
//                         <Image style={styles.img} source={userImageUri} />
//                     </View>
//                     <View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline' }}>
//                         <Text style={styles.lvlTxt}> Level One Donor </Text>
//                         <View style={styles.lvlStat}></View>
//                     </View>
//                 </View>
//             </ImageBackground>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'flex-end',
//     },
//     content: {
//         backgroundColor: '#efefef',
//         alignSelf: 'center',
//         height: '50%',
//         width: '80%',
//         marginBottom: '40%',
//         borderRadius: 15,
//         alignItems: 'center',
//     },
//     imageContainer: {
//         width: 130,
//         height: 130,
//         backgroundColor: 'rgba(151, 122, 248, .2)',
//         borderRadius: 100,
//         marginBottom: 15,
//         justifyContent: 'center',
//         alignItems: 'center',
//         alignSelf: 'center',
//         marginTop: '-20%',
//     },
//     img: {
//         width: '75%',
//         height: '75%',
//         borderRadius: 100,
//     },
//     lvlTxt: {
//         fontSize: 15,
//         color: 'rgba(0,0,0,.4)',
//     },
//     lvlStat: {
//         width: 8,
//         height: 8,
//         backgroundColor: '#0fd415',
//         borderRadius: 20,
//         marginLeft: 5,
//     },
// });

// export default Account;
