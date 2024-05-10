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
import { requesterProfile } from '../api/requester.api'




export default class AddItem extends Component {
    constructor(props)
    {
        super(props);
        this.state = {

            donationImage: null,
            donationTitle: '',
            location: '',
            donationDescription:"",
            donationEndDate:"",
            email:'',
            contactNumber:'',


            donationEndDate: new Date(),


            wantedItems: [],
            itemName: '',
            selectedCategory :'',
            wantedQuantity :'',

            userID: "",
            token: "",
            profileData: null,


            isUploading: false,
            

            isVisible: false

        }


    }


    pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        if (!result.canceled) {
            this.setState({ donationImage: result});
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
        this.setState({donationEndDate: currentDate})

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

    componentDidUpdate(prevProps, prevState) {
        if (prevState.userID !== this.state.userID) {
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
             location, donationEndDate,donationImage, donationDescription} = this.state


        console.log(token);

        if (wantedItems.length === 0) {
            alert('אנא הוסף פריט לפני הגשת הבקשה');
            return;
          }
      //  this.setState({isUploading: true})

        
        //  var imgUrl = this.state.image.assets[0].uri  

        //     data.append('file',{type: 'image/jpg', uri:imgUrl, name:'uploadimagetmp.jpg'});

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
              
          await newDonation(donation)
           .then((res) => {
           // setLoading(false);
           alert('תרומה נוצרה בהצלחה!').then((value) => {
              if (value) {
                //this.setState({donationTitle: '', location: '', quantity: '', image: null})
                this.props.navigation.goBack();
              }
            });
          })
          .catch((err) => {
            console.log(err);
            alert("יצירת התרומה נכשלה").then(
              (value) => {
                if (value) {
                this.props.navigation.goBack();
                }
              }
            );
          });

        // const res = await newDonation(donation);

        // alert('תרומה נוצרה בהצלחה!');

        // if (navigation) {
        //     navigation.goBack();
        // }
    // } catch (err) {
    //     console.log(err);
    //     alert('יצירת התרומה נכשלה');
    //     if (err.response) {
    //         // Server responded with a status code other than 2xx
    //         console.log(`Server responded with status code ${err.response.status}:`, err.response.data);
    //         throw err; // Rethrow error for further handling
    //     } else if (err.request) {
    //         // Request was made but no response received
    //         console.log('No response received from server:', err.request);
    //         throw err; // Rethrow error for further handling
    //     } else {
    //         // Something else went wrong while setting up the request
    //         console.log('Error setting up request:', err.message);
    //         throw err; // Rethrow error for further handling
    //     }
    // }
          
    }

    render()
    {
        let { donationImage , isVisible, wantedItems, itemName, wantedQuantity, selectedCategory, donationTitle} = this.state
        return(
            <>
            <SafeAreaView style={styles.container}>
                {/* <ScrollView showsVerticalScrollIndicator={false}>
                    <Topic title={'צור את הבקשה לתרומה שלך'} />

                    <Pressable style={styles.imgContainer} onPress={this.pickImage}>
                        <Feather name='plus' size={16} />
                        <Text>Choose Image</Text>
                    </Pressable>
                    {image && <Image source={{ uri: image.assets[0].uri }} style={styles.selected} />}

                    <TypeBInput 
                        label='כותרת*' 
                        height={50}
                        onChangeText={(title)=>this.setState({title})}
                    />

                    <TypeBInput 
                        label='מיקום*'
                        height={50}
                        onChangeText={(location)=>this.setState({location})}
                    />
                    

                    <Text style={styles.label}>תאריך סיום התרומה:</Text>
                    <DateTimePicker 
                        minimumDate={new Date()}
                        value={this.state.donationEndDate}
                        mode={"date"}
                        onChange={this.onDateChange}
                        />
                    <View style={ {  height: 1, width: '100%', backgroundColor: '#ccc', marginHorizontal: 5,marginVertical: 15 }}/>
                    
                    <Text style={styles.label}>הוספת פריטים:</Text>
                    <TypeBInput 
                        label='שם הפריט'
                        height={50}
                        onChangeText={(itemName)=>this.setState({itemName})}
                    />
                <View style={{flexDirection: 'row',   alignItems: 'center'}}>
                        <TypeBInput 
                            label='כמות מבוקשת' 
                            height={50} 
                            keyboardType={'numeric'}
                            onChangeText={(wantedQuantity)=>this.setState({wantedQuantity})}
                            
                        />               
                        <CategoryA onChange={item => {this.state.selectedCategory =item.value}}/>
                </View>
                {wantedItems.length > 0 && (

                    <View>
                    <Text style={styles.label}>הפריטים המבוקשים:</Text>
                    <FlatList
                        data={wantedItems}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this.renderItem}
                    />
                    </View>
                 
                 )}
                    <CustomBtn1 title='הוסף פריט' onPress={this.handleAddItem} /> 
                    
                   { this.state.isVisible ? <CustomBtn1 title='יצירת בקשה לתרומה' onPress={this.InsertFunc} /> : null}
                </ScrollView> */}
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
                {donationImage && <Image source={{ uri: donationImage.assets[0].uri }} style={styles.selected} />}
                <TypeBInput label="כותרת*" height={50} onChangeText={(donationTitle) => this.setState({ donationTitle })} />
                <TypeBInput label="מיקום*" height={50} onChangeText={(location) => this.setState({ location })} />
                <Text style={styles.label}>תאריך סיום התרומה:</Text>
                <DateTimePicker
                    minimumDate={new Date()}
                    value={this.state.donationEndDate}
                    mode={"date"}
                    onChange={this.onDateChange}
                />

                <TypeBInput label="תיאור אודות התרומה*"height={80} multiline={true}numberOfLines={4} onChangeText={(donationDescription) => this.setState({ donationDescription })} />

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
        color: Colors.light, 
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