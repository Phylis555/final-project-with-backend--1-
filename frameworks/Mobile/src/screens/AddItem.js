

import React, { Component, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';

import { SafeAreaView, 
    Text, 
    ScrollView, 
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
//import {launchImageLibrary} from 'react-native-image-picker';

import { CategoryA } from '../components/categorySelector'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ContentLoader from '../components/LoadContent'
import DateTimePicker from "@react-native-community/datetimepicker";
import Colors from '../utils/colors'
import { newDonation } from '../api/donator.api'
import { requesterProfile } from '../api/requester.api'



import {
  SafeAreaView,
  Text,
  ScrollView,
  View,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import CustomBtn1 from "../components/customButton";
import { TypeBInput } from "../components/customInput";
import { Feather } from "@expo/vector-icons";
import Topic from "../components/topic";
import * as ImagePicker from "expo-image-picker";
//import {launchImageLibrary} from 'react-native-image-picker';

import { CategoryA } from "../components/categorySelector";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ContentLoader from "../components/LoadContent";
import DateTimePicker from "@react-native-community/datetimepicker";
import Colors from "../utils/colors";
import { newDonation } from "../api/donator.api";
import { requesterProfile } from "../api/requester.api";

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
            donationEndDate_input: new Date(),


            donationImage_input: null,



            wantedItems: [],
            itemName: '',
            selectedCategory :'',
            wantedQuantity :'',

            userId: null,
            profileData: {},
            token: null,


            isUploading: false,
            isVisible: false

        }


        var dtToday = new Date();

        var nextYear = new Date(dtToday.getFullYear() + 1, dtToday.getMonth(), dtToday.getDate());


   

    }


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
         //   const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: 'base64' });
            console.log(base64String)

             this.setState({ donationImage: base64String}); 
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

          alert('Please fill all fields');
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






    onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        this.setState({donationEndDate_input: currentDate})


       

        var month = this.state.donationEndDate_input.getMonth() + 1;
        var day = this.state.donationEndDate_input.getDate() + 1;
        var year = this.state.donationEndDate_input.getFullYear();
        
      
        if (month < 10) month = "0" + month.toString();
        if (day < 10) day = "0" + day.toString();

        var expireDate = year + "-" + month + "-" + day;

        console.log(expireDate)
        console.log(typeof expireDate)


        this.setState({donationEndDate: expireDate})
        

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
            donationEndDate_input: new Date(),
            wantedItems: [],
            itemName: '',
            selectedCategory: '',
            wantedQuantity: '',
            isUploading: false,


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



    // INSERT FUNCTION
    InsertFunc = async ({navigation}) => {

        // try {
        console.log("///////////insertttt");

        let { wantedItems, userID, token, email, contactNumber, donationTitle,
             location, donationEndDate, donationDescription, donationImage} = this.state
             console.log(email);
             console.log(contactNumber);


            
        console.log(token);

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

            console.log(donation);
            this.props.navigation.navigate('dashBoard');

        } catch (err) {
            console.log(err);
            alert("יצירת התרומה נכשלה");
            this.props.navigation.goBack();
        }
          
    }

    render()
    {
        let {  donationImage_input, isVisible,nextYear, wantedItems,itemName, wantedQuantity, selectedCategory, donationTitle,donationDescription, donationEndDate_input, location} = this.state
      
        
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
                    <Text>Choose Image</Text>
                </Pressable>
                {donationImage_input && <Image source={{ uri: donationImage_input }} style={styles.selected} />}
                <TypeBInput label="כותרת*" value = {donationTitle} height={50} onChangeText={(donationTitle) => this.setState({ donationTitle })} />
                <TypeBInput label="מיקום*" value = {location} height={50}  onChangeText={(location) => this.setState({ location })} />
                <Text style={styles.label}>תאריך סיום התרומה:</Text>
                <DateTimePicker
                    minimumDate={new Date()}
                    maximumDate={nextYear}
                    value={donationEndDate_input}
                    mode={"date"}
                    onChange={this.onDateChange}
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
    {this.state.isUploading ? <ContentLoader /> : null}
            </SafeAreaView>
            { this.state.isUploading ? <ContentLoader /> : null }
            </>
        )
    }
  };

  onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    this.setState({ donationEndDate_input: currentDate });

    var month = this.state.donationEndDate_input.getMonth() + 1;
    var day = this.state.donationEndDate_input.getDate() + 1;
    var year = this.state.donationEndDate_input.getFullYear();

    if (month < 10) month = "0" + month.toString();
    if (day < 10) day = "0" + day.toString();

    var expireDate = year + "-" + month + "-" + day;

    console.log(expireDate);
    console.log(typeof expireDate);

    this.setState({ donationEndDate: expireDate });

    //  var imgUrl = this.state.image.assets[0].uri
  };

  renderItem = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.category}</Text>
      <Text style={styles.cell}>{item.itemName}</Text>
      <Text style={styles.cell}>{item.quantity}</Text>
      <Pressable onPress={() => this.handleDeleteItem(index)}>
        <Feather name="delete" size={25} />
      </Pressable>
    </View>
  );

  clearState = () => {
    // Clear fields
    this.setState({
      donationImage: null,
      donationImage_input: null,
      donationTitle: "",
      location: "",
      donationDescription: "",
      donationEndDate_input: new Date(),
      wantedItems: [],
      itemName: "",
      selectedCategory: "",
      wantedQuantity: "",
      isUploading: false,
    });
  };

  // Fetch user ID and token from AsyncStorage
  fetchData = async () => {
    const storedUserId = await AsyncStorage.getItem("user_id");
    const storedToken = await AsyncStorage.getItem("token");
    this.setState({ userID: storedUserId, token: storedToken });

    console.log("Fetched user ID:", storedUserId);
    console.log("Fetched Token access:", storedToken);
  };

  // Effect to fetch data when component mounts
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    //   if (prevState.userID !== this.state.userID) {
    if (
      prevState.userID !== this.state.userID ||
      (prevProps.navigation !== this.props.navigation &&
        this.props.navigation.isFocused())
    ) {
      const { userID, token, profileData } = this.state;

      if (userID) {
        requesterProfile(userID, token)
          .then((res) => {
            const requester = res.data.requester;

            this.setState({
              profileData: requester,
              email: requester.email,
              contactNumber: "0" + requester.contactNumber,
            });
          })
          .catch((e) => {
            console.error(e);
          });
      }
    }
  }

  // INSERT FUNCTION
  InsertFunc = async ({ navigation }) => {
    // try {
    console.log("///////////insertttt");

    let {
      wantedItems,
      userID,
      token,
      email,
      contactNumber,
      donationTitle,
      location,
      donationEndDate,
      donationDescription,
      donationImage,
    } = this.state;
    console.log(email);
    console.log(contactNumber);

    console.log(token);

    if (wantedItems.length === 0) {
      alert("אנא הוסף פריט לפני הגשת הבקשה");
      return;
    }
    this.setState({ isUploading: true });
    const donation = {
      userID,
      donationTitle,
      email,
      location,
      donationEndDate,
      contactNumber,
      donationImage,
      donationDescription,
      wantedItems,
    };

    console.log(donation);

    try {
      const res = await newDonation(donation, token);
      console.log(res);
      alert("תרומה נוצרה בהצלחה!");
      this.clearState();

      console.log(donation);
      this.props.navigation.navigate("dashBoard");
    } catch (err) {
      console.log(err);
      alert("יצירת התרומה נכשלה");
      this.props.navigation.goBack();
    }
  };

  render() {
    let {
      donationImage_input,
      isVisible,
      nextYear,
      wantedItems,
      itemName,
      wantedQuantity,
      selectedCategory,
      donationTitle,
      donationDescription,
      donationEndDate_input,
      location,
    } = this.state;

    return (
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
                  <Feather name="plus" size={16} />
                  <Text>Choose Image</Text>
                </Pressable>
                {donationImage_input && (
                  <Image
                    source={{ uri: donationImage_input }}
                    style={styles.selected}
                  />
                )}
                <TypeBInput
                  label="כותרת*"
                  value={donationTitle}
                  height={50}
                  onChangeText={(donationTitle) =>
                    this.setState({ donationTitle })
                  }
                />
                <TypeBInput
                  label="מיקום*"
                  value={location}
                  height={50}
                  onChangeText={(location) => this.setState({ location })}
                />
                <Text style={styles.label}>תאריך סיום התרומה:</Text>
                <DateTimePicker
                  minimumDate={new Date()}
                  maximumDate={nextYear}
                  value={donationEndDate_input}
                  mode={"date"}
                  onChange={this.onDateChange}
                />

                <TypeBInput
                  label="תיאור אודות התרומה*"
                  value={donationDescription}
                  height={80}
                  multiline={true}
                  numberOfLines={4}
                  onChangeText={(donationDescription) =>
                    this.setState({ donationDescription })
                  }
                />

                <View
                  style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#ccc",
                    marginHorizontal: 5,
                    marginVertical: 15,
                  }}
                />
                <Text style={styles.label}>הוספת פריטים:</Text>
                <TypeBInput
                  label="שם הפריט"
                  height={50}
                  value={itemName}
                  onChangeText={(itemName) => this.setState({ itemName })}
                />
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TypeBInput
                    label="כמות מבוקשת"
                    value={wantedQuantity}
                    height={50}
                    keyboardType="numeric"
                    onChangeText={(wantedQuantity) =>
                      this.setState({ wantedQuantity })
                    }
                  />
                  <CategoryA
                    value={selectedCategory}
                    onChange={(item) =>
                      this.setState({ selectedCategory: item.value })
                    }
                  />
                </View>
                <CustomBtn1 title="הוסף פריט" onPress={this.handleAddItem} />
              </View>
            }
            ListFooterComponent={
              <View>
                {wantedItems.length > 0 && (
                  <CustomBtn1
                    title="יצירת בקשה לתרומה"
                    onPress={this.InsertFunc}
                  />
                )}
              </View>
            }
          />
          {this.state.isUploading ? <ContentLoader /> : null}
        </SafeAreaView>
        {this.state.isUploading ? <ContentLoader /> : null}
      </>
    );
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
    label: {
        fontSize: 16, 
        fontWeight: '500', 
        color: Colors.primary, 
        textAlign: 'right',
        marginVertical: 10
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
})
