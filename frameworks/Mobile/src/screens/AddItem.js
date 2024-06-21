

import React, { Component, useState } from 'react'

import { SafeAreaView, 
    Text, 
    ScrollView, 
    View,
    StyleSheet,
    FlatList,
    Image,
    Pressable 
} from 'react-native'
import { Button } from 'react-native-paper';
import { DatePickerModal, registerTranslation, en } from 'react-native-paper-dates';


import CustomBtn1 from '../components/customButton'
import { TypeBInput } from '../components/customInput'
import { Feather } from '@expo/vector-icons'
import Topic from '../components/topic'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

//import {launchImageLibrary} from 'react-native-image-picker';

import { CategoryA } from '../components/categorySelector'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from '../components/Loader';

import Colors from '../utils/colors'
import { newDonation } from '../api/donator.api'
import { requesterProfile } from '../api/requester.api'
import * as Location from 'expo-location'; // Import Location module
import MapHandler from '../components/MapHandler';


// Register the locale
registerTranslation('en', en);

const imgDir = FileSystem.documentDirectory + 'images/';

const ensureDirExists = async () => {
	const dirInfo = await FileSystem.getInfoAsync(imgDir);
	if (!dirInfo.exists) {
		await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
	}
};

export default class AddItem extends Component {
    constructor(props)
    {
        super(props);
        this.state = {

            donationImage: null,
            donationTitle: '',
            location: '',
            donationDescription:"",
            donationEndDate: "",
            email:'',
            contactNumber:'',


            donationImage_input: null,



            wantedItems: [],
            itemName: '',
            selectedCategory :'',
            wantedQuantity :'',

            userId: null,
            profileData: {},
            token: null,


            isUploading: false,
            isVisible: false,

            date: undefined,
            open: false,


        }


        var dtToday = new Date();
        this.nextYear = new Date(dtToday.getFullYear() + 1, dtToday.getMonth(), dtToday.getDate());
        this.tomorrow = new Date(dtToday.getFullYear(), dtToday.getMonth(), dtToday.getDate() + 1);

   

    }
    onDismissSingle = () => {
        this.setState({ open: false });
      };

      onConfirmSingle = (params) => {
        const formattedDate = params.date.toISOString().split('T')[0];
        
        this.setState({ open: false, date: params.date, donationEndDate: formattedDate });
    };
    
    convertToBase64 = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        return new Promise((resolve) => {
          reader.onloadend = () => {
            resolve(reader.result);
          };
        });
      };
    

    pickImage = async () => {
        try {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        includeBase64: true,
        aspect: [4, 3],
        quality: 1,
        });

        if (!result.canceled) {
            console.log(result)
           const base64String = `data:${result.assets[0].mimeType};base64,${result.assets[0].uri}`;
           const base64Image = await this.convertToBase64(result.assets[0].uri);
            console.log(base64String)

             this.setState({ donationImage: base64Image}); 
              this.setState({ donationImage_input: result.assets[0].uri});



        }
        } catch (error)
            {
                alert("Error uploading image: " + error.message)                            
            }
        };

    handleAddItem = () => {

        let { itemName , selectedCategory, wantedQuantity, wantedItems, isVisible} = this.state
        // Validate input fields
        if (!itemName || !selectedCategory || !wantedQuantity) {
            console.log("///////////empty");

          alert('נא למלא את כל השדות');
          return;
        }
      
        // Create a new item object
        const newItem = {
          itemName: itemName,
          category: selectedCategory,
          quantity: wantedQuantity
        };
    
        // Add the new item to the array of wanted items
        wantedItems.push(newItem);
        console.log("///////////wanted items");

        console.log(wantedItems);
        // Clear input fields
        this.setState({
            itemName: '',
            selectedCategory: '',
            wantedQuantity: '',
            isVisible : true
          });


         
      };

      handleDeleteItem = (index) => {
        let { wantedItems} = this.state


        wantedItems.splice(index, 1);
        console.log(wantedItems);
         alert("הוסר פריט בהצלחה");
        if(wantedItems.length == 0){
            this.setState({isVisible : false});
        }
           
       
  

     
      };






   



      renderItem = ({ item, index }) => (
        <View style={styles.row}>

            <Text style={styles.cell}>{item.category}</Text>
            <Text style={styles.cell}>{item.itemName}</Text>
            <Text style={styles.cell}>{item.quantity}</Text>
            <Pressable onPress={() => this.handleDeleteItem(index)}>
                <Feather name='delete' size={25} />
                
            </Pressable>
        </View>
    )

    clearState = () => {
          // Clear fields
          this.setState({
            donationImage: null,
            donationImage_input: null,
            donationTitle: '',
            location: '',
            donationDescription: '',
            wantedItems: [],
            itemName: '',
            selectedCategory: '',
            wantedQuantity: '',
            isUploading: false,

            date: undefined,
            open: false,
        });
    };

    // Fetch user ID and token from AsyncStorage
    fetchData = async () => {
        const storedUserId = await AsyncStorage.getItem('user_id');
        const storedToken = await AsyncStorage.getItem('token');
        this.setState({ userID: storedUserId, token: storedToken });

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

 

    componentDidUpdate(prevProps,prevState ) {
     //   if (prevState.userID !== this.state.userID) {
        if ( (prevState.userID !== this.state.userID )|| (prevProps.navigation !== this.props.navigation && this.props.navigation.isFocused() )) {

            const { userID, token , profileData} = this.state;
           
            if (userID) {
            requesterProfile(userID,token)
            .then((res) => {
                const requester = res.data.requester;

                this.setState({
                    profileData: requester,
                    email: requester.email,
                    contactNumber: "0" + requester.contactNumber
                });
            })
            .catch((e) => {
                console.error(e);
            });
             }


       

    }

    }

    // Function to handle map press event
    handleMapPress = async (e) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;

        try {
            // Perform reverse geocoding to get address components
            let addressResponse = await Location.reverseGeocodeAsync({ latitude, longitude });
            let address = `${addressResponse[0].street}, ${addressResponse[0].city}, ${addressResponse[0].region}`;

            // Update location state with the formatted address
            this.setState({ location: address });
        } catch (error) {
            console.error('Error fetching address:', error);
        }
    };

    clearImage = () => {
        this.setState({ donationImage: null, donationImage_input: null });
    }


    // INSERT FUNCTION
    InsertFunc = async ({navigation}) => {


        let { wantedItems, userID, token, email, contactNumber, donationTitle,
             location, donationEndDate, donationDescription, donationImage} = this.state
        
            if(donationEndDate == "")
                {
                    alert('נא לבחור תאריך סיום לתרומה ');
                    return;
                }

                if(donationTitle == "" ||location==""||  donationDescription=="")
                    {
                        alert(' נא למלא את כל השדות המסומנות בכוכבית(*)');
                        return;
                    }
            

        if (wantedItems.length === 0) {
            alert('אנא הוסף פריט לפני הגשת הבקשה');
            return;
          }
        this.setState({isUploading: true})
        const donation = {
            userID,
            donationTitle,
            email,
            location,
            donationEndDate,
            contactNumber,
            donationImage,
            donationDescription,
            wantedItems
          };  

          console.log(donation);
              
      

        try {
            const res = await newDonation(donation, token)
            console.log(res);
            alert('תרומה נוצרה בהצלחה!');
            this.clearState();
            this.setState({isUploading: false})

            this.props.navigation.navigate('dashBoard');

        } catch (err) {

            console.log(err);
            alert("יצירת התרומה נכשלה");
            this.setState({isUploading: false})

            this.props.navigation.goBack();
        }
          
    }

    render()
    {
        let {  donationImage_input, isVisible,nextYear, wantedItems,itemName, wantedQuantity, selectedCategory, donationTitle,donationDescription, donationEndDate_input, location} = this.state
      
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return(
            <>
            <SafeAreaView style={styles.container}>
                    <FlatList
        data={wantedItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={this.renderItem}
        extraData={this.state}
        ListHeaderComponent={

            
            <View>
                <Topic title="צור את הבקשה לתרומה שלך" />
                <Pressable style={styles.imgContainer} onPress={this.pickImage}>
                    <Feather name='plus' size={16} />
                    <Text>בחר תמונה</Text>
                </Pressable>


                {donationImage_input && (
                                    <>
                                        <Image source={{ uri: donationImage_input }} style={styles.selected} />
                                        <Button mode="outlined" onPress={this.clearImage} style={styles.clearButton}>
                                            הסר תמונה
                                        </Button>
                                    </>
                                )}
                <TypeBInput label="כותרת*" value = {donationTitle} height={50} onChangeText={(donationTitle) => this.setState({ donationTitle })} />

                <View>
                <TypeBInput label="מיקום*" value={location} height={55} editable={false} onChangeText={(location) => this.setState({ location })} />
                <Text style={styles.direvtive}>*לא ניתן להכניס כתובת מדויקת כדי לשמור על פרטיותכם (אנחנו ממליצים לבחור את מיקום ע"י לחיצה על האזור הרלוונטי במפה)</Text>

                <View style={styles.section}>
                <Text style={styles.label}>מפה</Text>
              <MapHandler setLocation={(location) => this.setState({ location })} />
                </View>
                        </View>

                <Text style={styles.label}>תאריך סיום התרומה:</Text>
         
                <Button onPress={() => this.setState({ open: true })} uppercase={false} mode="outlined">
                    בחר תאריך
            </Button>
          {this.state.date && (
                                    <Text style={styles.selectedDate}>תאריך שנבחר: {this.state.donationEndDate}</Text>
                                )}
          <DatePickerModal
            locale="en"
            mode="single"
            validRange={{ startDate: this.tomorrow, endDate: this.nextYear }}
            visible={this.state.open}
            onDismiss={this.onDismissSingle}
            date={this.state.date}
            onConfirm={this.onConfirmSingle}
          />

                <TypeBInput label="תיאור אודות התרומה*" value = {donationDescription} height={80} multiline={true}numberOfLines={4} onChangeText={(donationDescription) => this.setState({ donationDescription })} />

                <View style={{ height: 1, width: '100%', backgroundColor: '#ccc', marginHorizontal: 5, marginVertical: 15 }} />
                <Text style={styles.label}>הוספת פריטים:</Text>
                <TypeBInput label="שם הפריט" height={50} value = {itemName} onChangeText={(itemName) => this.setState({ itemName })} />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TypeBInput label="כמות מבוקשת" value = {wantedQuantity} height={50} keyboardType="numeric" onChangeText={(wantedQuantity) => this.setState({ wantedQuantity })} />
                    <CategoryA value={selectedCategory}    onChange={(item) => this.setState({ selectedCategory: item.value })} />
                </View>
                <CustomBtn1 title="הוסף פריט" onPress={this.handleAddItem} />
            </View>
        }
        ListFooterComponent={
            <View>
                {wantedItems.length > 0 &&  <CustomBtn1 title="יצירת בקשה לתרומה" onPress={this.InsertFunc} />}
            </View>
        }
    />
    {this.state.isUploading ? <Loader /> : null}
            </SafeAreaView>
            { this.state.isUploading ? <Loader /> : null }
            </>
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
    imgContainer: {
        height: 100,
        backgroundColor: '#d6d6d6',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    selected: {
        width: 150,
        height: 150,
        borderRadius: 10,
        borderColor: "#ffffff",
        borderStyle: 'solid',
        borderWidth: 8
    },
    clearButton: {
        marginTop: 10, // Add margin to separate from the image
    },
    label: {
        fontSize: 16, 
        fontWeight: '500', 
        color: Colors.primary, 
        textAlign: 'right',
        marginVertical: 10
      },
      direvtive: {
        fontSize: 10, 
        fontWeight: '500', 
        color: 'red', 
        textAlign: 'right',
        marginVertical: 5
      },
      row: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    cell: {
        flex: 1,
        textAlign: 'center',
    },

    mapContainer: {
        height: 300,
        backgroundColor: '#d6d6d6',
        borderRadius: 10,
        marginBottom: 20,
        overflow: 'hidden'
    },
    section: {
        marginVertical: 10,
      },
    map: {
        flex: 1,
    },
    selectedDate: {
        marginTop: 10,
        fontSize: 16,
        color: Colors.black,
        textAlign: 'right',
    }
})