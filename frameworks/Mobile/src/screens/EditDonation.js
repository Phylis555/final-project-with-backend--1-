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
import { getOneDonation } from '../api/donator.api'
import { API_URL } from '../api/config'
import { getAuthHeader } from '../components/authHeader'
import axios from 'axios'

export default class EditDonation extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            userId: null,
            profileData: {},
            details: [],
            token: null,
            donationTitle: '',
            email: '',
            contactNumber: '',
            donationDescription:'',

            pid: this.props.route.params.pid,
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
    // componentDidMount() {
    //     this.fetchData();
    // }
    componentDidMount = () => {
       
        let {pid} = this.state;

          getOneDonation(pid).then((res) => res.data.donation)
          .then((donationDetails) => {
              this.setState({ details : donationDetails,
                            donationTitle: donationDetails.donationTitle,
                            email: donationDetails.email,
                            contactNumber: '0' + donationDetails.contactNumber,
                            donationDescription: donationDetails.donationDescription
                        });
            }).catch((e) => {
             // this.setState({  isLoading : false });
              console.log(e);
            });
      
          
      }

 
     handleUpdate  = async () => {
        let {donationTitle, contactNumber, email, donationDescription,pid, token } = this.state;

        const donation = {
            donationTitle,
            email,
            contactNumber:  contactNumber, // Prepend the desired prefix
            donationDescription,
        };
        try {
            const storedToken = await AsyncStorage.getItem('token');

            const response = await axios.post(
                `${API_URL}/donator/updateDonation/${pid}`,
                donation,
                getAuthHeader(storedToken)
            );
            if (response.status === 200) {
                Alert.alert('התרומה עודכנה בהצלחה', '', [
                    { text: 'אשר', onPress: () => this.props.navigation.goBack() }
                ]);
            } else {
                Alert.alert('שגיאה', 'לא ניתן לעדכן את התרומה כעת. אנא נסה שנית מאוחר יותר.');
            }
        } catch (err) {
            console.error(err);
            Alert.alert('שגיאה', 'לא ניתן לעדכן את התרומה כעת. אנא נסה שנית מאוחר יותר.');
        }
    };
    
    render(){
         let {donationTitle, contactNumber, email, donationDescription } = this.state;
        return(
          
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Topic title={'ערוך בקשה'} />

                    <TypeBInput 
                        label='כותרת התרומה' 
                        height={50}
                        value={donationTitle}
                        onChangeText={(donationTitle) => this.setState({ donationTitle })}
                    />

                    <TypeBInput 
                        label='מספר טלפון'
                        height={50}
                        keyboardType="phone-pad"
                        value={ contactNumber + ''}
                        onChangeText={(contactNumber) => this.setState({ contactNumber })}
                    />

                    <TypeBInput 
                        label='מייל'
                        height={50}
                        value={email}
                        onChangeText={(email) => this.setState({ email })}
                    />

                    <TypeBInput 
                        label="תיאור אודות התרומה"
                        value={donationDescription}
                        height={80} 
                        multiline={true} 
                        numberOfLines={4} 
                        onChangeText={(donationDescription) => this.setState({ donationDescription })} 
                    />

                </ScrollView>
                      
                       
             
                        
                    
                    <CustomBtn1 title="ערוך תרומה" onPress={this.handleUpdate} />

                                    

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