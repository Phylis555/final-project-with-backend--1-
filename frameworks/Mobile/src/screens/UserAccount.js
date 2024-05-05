// import React, { Component,useState, useEffect} from "react"
// import { View, Text, SafeAreaView, ImageBackground, Image, StyleSheet } from "react-native"
// import Colors from "../utils/colors"
// import AsyncStorage from "@react-native-async-storage/async-storage"
// import axios from 'axios';
// import { getAuthHeader } from "../components/authHeader";



// export default class Account extends Component {
//     constructor(props)
//     {
//         super(props)
        
//         this.state = {
//          //   userId: AsyncStorage.getItem('user_id')
//          userId: null,
//          profileData: null,
            
            
//         }
//        fetchData = async () => {
//             // Retrieve the user ID from AsyncStorage
//             const storedUserId = await AsyncStorage.getItem('user_id');
//             this.setState({ userId: storedUserId });
//             console.log(userId);
//         };
    
//         // componentDidUpdate = () => {
//         //     this.fetchData();
//         //     console.log("component did update");
//         // if (this.state.userId) {
//         //     axios.get(`http://192.168.1.245:8070/requester/profile/${this.state.userId}`, getAuthHeader())
//         //         .then((res) => {
//         //             this.setState({ profileData: res.data.requester });
//         //             console.log(res.data);
//         //         })
//         //         .catch((e) => {
//         //             console.error(e);
//         //         });
//         // }

//         // }

    
    
//     useEffect(() => {
//         // Fetch data when userId changes
//         fetchData();
//     }, []);

    

//         // Effect to fetch profile data when userId changes
//         useEffect(() => {
//             if (userId) {
//                 axios.get(`http://192.168.1.245:8070/requester/profile/${userId}`, getAuthHeader())
//                     .then((res) => {
//                         setProfileData(res.data.requester);
//                         console.log(res.data);
//                     })
//                     .catch((e) => {
//                         console.error(e);
//                     });
//             }
//         }, [userId]); // Run this effect when userId changes
        

//        // componentDidMount() {
//         //    this.fetchData();
//        // }
    

      
           
        
            

       

//      //    const [userData, setUserData] = useState('');
//         // async function getData() {
//         //     const token = await AsyncStorage.getItem('token');
//         //     console.log(token);
//         //     axios
//         //     .post('http://192.168.1.245:8070/', {token: token})
//         //     .then(res => {
//         //         console.log(res);
//         //        // setUserData(res);
//         //     });
//         // }
       
    

//     }

//     render() {

//         let Uri = require('../../assets/images/accBg.jpg')
//         let userImage = require('../../assets/images/profile.jpeg')
//         return(
//             <SafeAreaView style={styles.container}>
//                 <ImageBackground resizeMode='cover' source={Uri} style={styles.container}>
//                     <View style={styles.content}>
//                         <View style={styles.imageContainer}>
//                             <Image style={styles.img} source={userImage} />
//                         </View>
                       
//                         <View style={{flex:1, flexDirection: 'row', alignItems: 'baseline'}}>
//                             <Text style={styles.lvlTxt}> {profileData.firstName} </Text>
//                             <View style={styles.lvlStat}></View>
//                         </View>
//                     </View>
//                 </ImageBackground>
//             </SafeAreaView>
//         )
//     }
// }


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'flex-end'
//     },
//     content: {
//         backgroundColor: '#efefef',
//         alignSelf: 'center',
//         height: '50%',
//         width: '80%',
//         marginBottom: '40%',
//         borderRadius: 15,
//         alignItems: 'center'
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
//         marginTop: '-20%'
//     },
//     img: {
//         width: '75%',
//         height: '75%',
//         borderRadius: 100,
//     },
//     user: {
//         fontSize: 19,
//         fontWeight: '800',
//         color: Colors.dark,
//         paddingTop: 5,
//     },
//     lvlTxt: {
//         fontSize: 15,
//         color: 'rgba(0,0,0,.4)'
//     },
//     lvlStat: {
//         width: 8,
//         height: 8,
//         backgroundColor:'#0fd415',
//         borderRadius: 20,
//         marginLeft: 5,
//     },
// })




//////////////////////////working

// import React, { useState, useEffect } from "react";
// import { View, Text, SafeAreaView, ImageBackground, Image, StyleSheet } from "react-native";
// import Colors from "../utils/colors";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from 'axios';
// import { getAuthHeader } from "../components/authHeader";

// const Account = () => {
//     const [userId, setUserId] = useState(null);
//     const [profileData, setProfileData] = useState(null);
//     const [token, setToken] = useState(null);


//     // Fetch user ID from AsyncStorage
//     const fetchData = async () => {
//         const storedUserId = await AsyncStorage.getItem('user_id');
//         const storedToken = await AsyncStorage.getItem('token');
//         setToken(storedToken);
//         setUserId(storedUserId);
       
//         console.log("Fetched user ID:", storedUserId);
//         console.log("Fetched Token access:", storedToken);

//     };

//     // Effect to fetch data when component mounts
//     useEffect(() => {
//         fetchData();
//     }, []); // Empty dependency array ensures effect runs once

//     // Effect to fetch profile data when userId changes
//     useEffect(() => {
//         if (userId) {
//             axios.get(`http://192.168.1.245:8070/requester/profile/${userId}`, getAuthHeader(token))
//                 .then((res) => {
//                     setProfileData(res.data.requester);
//                     console.log(res.data);
//                 })
//                 .catch((e) => {
//                     console.error(e);
//                 });
//         }
//     }, [userId]); // Run effect when userId changes

//     // Define the URIs for images
//     const Uri = require('../../assets/images/accBg.jpg');
//     const userImage = require('../../assets/images/profile.jpeg');

//     // Return the component's view
//     return (
//         <SafeAreaView style={styles.container}>
//             <ImageBackground resizeMode='cover' source={Uri} style={styles.container}>
//                 <View style={styles.content}>
//                     <View style={styles.imageContainer}>
//                         <Image style={styles.img} source={userImage} />
//                     </View>
//                     {/* Only display profile data if it exists */}
//                     {profileData && (
//                         <View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline' }}>
//                             <Text style={styles.lvlTxt}>{profileData.firstName}</Text>
//                             <View style={styles.lvlStat}></View>
//                         </View>
//                     )}
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
import React, { Component } from "react";
import { View, Text, SafeAreaView, ImageBackground, Image, StyleSheet } from "react-native";
import Colors from "../utils/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { getAuthHeader } from "../components/authHeader";

class Account extends Component {
    constructor(props) {
        super(props);
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

    render() {
        const { profileData } = this.state;

        const Uri = require('../../assets/images/accBg.jpg');
        const userImage = require('../../assets/images/profile.jpeg');

        return (
            <SafeAreaView style={styles.container}>
                <ImageBackground resizeMode='cover' source={Uri} style={styles.container}>
                    <View style={styles.content}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.img} source={userImage} />
                        </View>
                        {/* Only display profile data if it exists */}
                        {profileData && (
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline' }}>
                                <Text style={styles.lvlTxt}>{profileData.firstName}</Text>
                                <View style={styles.lvlStat}></View>
                            </View>
                        )}
                    </View>
                </ImageBackground>
            </SafeAreaView>
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
});

export default Account;
