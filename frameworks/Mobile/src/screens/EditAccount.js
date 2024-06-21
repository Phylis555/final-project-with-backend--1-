import React, { Component, useState } from 'react'
import { SafeAreaView, 
    Text, 
    ScrollView, 
    Alert,
    View,
    StyleSheet,
    FlatList,
    Image,
    Pressable 
} from 'react-native'
import CustomBtn1 from '../components/customButton'
import { TypeBInput } from '../components/customInput'
import { Feather } from '@expo/vector-icons'
import Topic from '../components/topic'
import * as ImagePicker from 'expo-image-picker';
import { CategoryA } from '../components/categorySelector'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ContentLoader from '../components/LoadContent'
import DateTimePicker from "@react-native-community/datetimepicker";
import Colors from '../utils/colors'
import { newDonation } from '../api/donator.api'
import { requesterProfile, updateProfile } from '../api/requester.api'

export default class EditAccount extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            userId: null,
            profileData: {},
            token: null,
        }
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


     handleUpdate = () => {
        console.log(this.state.userId);
        console.log(this.state.profileData);

        updateProfile(this.state.userId, {
            firstName: this.state.profileData.firstName,
            lastName: this.state.profileData.lastName,
            contactNumber: this.state.profileData.contactNumber,
            email: this.state.profileData.email,
        },this.state.token)
            .then(() => {
                Alert.alert("הצלחה","הפרופיל עודכן בהצלחה");
                   
                this.props.navigation.navigate('account');
    
             
            })
            .catch((error)=>{
                Alert.alert("נכשל",error);
                console.error(err)
            })
    };
    
    render(){

        let {profileData} = this.state;
        return(
          
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Topic title={'ערוך פרופיל'} />

                    <TypeBInput 
                        label='שם פרטי' 
                        height={50}
                        value={profileData.firstName}
                        onChangeText={text => this.setState(prevState => ({
                            profileData: {
                                ...prevState.profileData,
                                firstName: text
                            }
                        }))}
                    />

                    <TypeBInput 
                        label='שם משפחה'
                        height={50}
                        value={profileData.lastName}
                        onChangeText={text => this.setState(prevState => ({
                            profileData: {
                                ...prevState.profileData,
                                lastName: text
                            }
                        }))}
                    />
                 <TypeBInput 
                        label='מספר טלפון'
                        height={50}
                        keyboardType="phone-pad"
                        value={profileData.contactNumber + ''}
                        onChangeText={text => this.setState(prevState => ({
                            profileData: {
                                ...prevState.profileData,
                                contactNumber: text
                            }
                        }))}
                    />

                    <TypeBInput 
                        label='מייל'
                        height={50}
                        value={profileData.email}
                        onChangeText={text => this.setState(prevState => ({
                            profileData: {
                                ...prevState.profileData,
                                email: text
                            }
                        }))}
                    />
                     

                </ScrollView>
                      
                       
                <View style={{flexDirection:'row'}}>
                        
                        <View style={{flex:1}}>
                        <CustomBtn1 title="שינוי סיסמא" onPress={() =>  this.props.navigation.navigate('ChangePassword')} />
                        </View>
                        <View style={{marginHorizontal:10}}/>
                        <View style={{flex:1}}>
                        <CustomBtn1 title="שמור שינויים" onPress={this.handleUpdate} />

                        </View>
                </View>
                                    

                </SafeAreaView>
               
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 20,
        margin: 10,

        paddingHorizontal: 30
    },
})