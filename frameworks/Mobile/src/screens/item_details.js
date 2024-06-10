import React,  { Component } from "react";
import { View,
    Text,
    StyleSheet, 
    SafeAreaView, 
    ScrollView, 
    Linking, 
    Pressable,
    TouchableOpacity,
    Platform,
    FlatList,
    Dimensions,
    Modal ,
    Image
} from "react-native";
import { getOneDonation } from "../api/donator.api";
import { SimpleLineIcons } from '@expo/vector-icons'
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import { getRemainingTime } from "../components/getRemainingTime";
import fontStyle from "../utils/fontStyles";


import Colors from "../utils/colors";
import Topic from "../components/topic";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../components/Loader";
import CustomBtn1 from "../components/customButton";


export default class ItemDetails extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            isLoading: true,
            details: [],
            user_id: '',
            words: "",
            isModalVisible: false, // State variable to control modal visibility
            isExpanded: false,
            mapUrl: "",

            
        }
       // console.log(pid);

    }

   

    componentDidMount = () => {
      //  var fetchUrl = "https://onedonation.000webhostapp.com/api/itemDetails.php"
        var data = {
            pid: this.props.route.params.pid
        }
        console.log(data.pid);

        getOneDonation(data.pid).then((res) => res.data.donation)
        .then((donationDetails) => {
            
            this.setState({isLoading: false,  details : donationDetails});
           // console.log(donationDetails.wantedItems);
          }).catch((e) => {
           // this.setState({  isLoading : false });
            console.log(e);
          });
    
        
    }
    handleMail = () => {
        const mail = this.state.details.email;
        Linking.openURL(`mailto:${mail}`);
    };
     handleCall = () => {
        const phoneNumber = "+972" + this.state.details.contactNumber;
      
        Linking.openURL(`tel:${phoneNumber}`);
      };
    
    handleWhatsApp = () => {
        const phoneNumber ="0" + this.state.details.contactNumber;
        console.log(phoneNumber)
        Linking.openURL(`whatsapp://send?phone=972${phoneNumber}&text=${encodeURIComponent("שלום, ראיתי את התרומה שלך דרך אתר Instant Giving ואני מעוניין לתרום לך! האם תוכל לשלוח לי עוד פרטים על התרומה?")}`);
    };


         // Toggle the expanded state when the text is tapped
         toggleText = () => {
            this.setState((prevState) => {
                // Only update state if there is a meaningful change
                if (prevState.isExpanded !== !prevState.isExpanded) {
                    return { isExpanded: !prevState.isExpanded };
                }
                return null;
            });
             
        }

          // Event handler to toggle modal visibility
         toggleModal = () => {
            this.setState((prevState) => ({ isModalVisible: !prevState.isModalVisible }));
         };


    mapHandler = () => {
        var location = this.state.details.location
        const myArr = location.split(" ")
        var newLoc = ""
        for (let index = 0; index < myArr.length; index++) {
            var item = myArr[index]
            newLoc = newLoc + item
            if ((index + 1) != myArr.length) {
                newLoc = newLoc + "+"
            }
        }
        return(newLoc)
    }

    render()
    {
    

        let { details,  isExpanded , isModalVisible} = this.state;
        const screenWidth = Dimensions.get('window').width;

        const fullText = details.donationDescription || '';
        const words = fullText.split(' ');

        const displayText = isExpanded ? fullText : words.slice(0, 15).join(' ') + (words.length > 15 ? '  ...ראה עוד' : '');
        
        const renderItem = ({item}) => (
            <View style={[styles.row, { width: screenWidth * 0.9 }]}>
            
                <Text style={styles.cell}>{item.wantedQuantity - item.receivedAmount}</Text>
                <Text style={styles.cell}>{item.item.itemCategory}</Text>
                <Text style={styles.cell}>{item.wantedQuantity}</Text>
                <Text style={styles.cell}>{item.item.itemName}</Text>  
            </View>
        )
        

        return (
    <>

    <ScrollView style={styles.container} nestedScrollEnabled={true}>
        {/* <StatusBar backgroundColor={"#FF573300"} translucent /> */}
        {/* <Spinner
          visible={isLoading}
          textContent={"Donating your food..."}
          textStyle={{ fontSize: 16, fontFamily: "Outfit_600SemiBold" }}
        /> */}
        <View
          style={{
            position: "absolute",
            top: 40,
            left: 16,
            zIndex: 10,
            borderRadius: 5,
            height: 40,
            width: 40,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(200, 200, 200, 0.5)",
          }}
        >
          <Pressable onPress={() => this.props.navigation.goBack()}>
          <SimpleLineIcons name="arrow-left" size={25} color={Colors.primary} />
          </Pressable>
        </View>
        {/* {isMyDonation ? (
          <Pressable
            style={{
              position: "absolute",
              top: 40,
              right: 16,
              zIndex: 10,
              borderRadius: 5,
              height: 40,
              width: 40,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(225, 225, 225, 0.5)",
            }}
            onPress={() => props.navigation.navigate("Edit", { data: item })}
          >
            <Entypo name={"edit"} size={20} color={COLORS.white} />
          </Pressable>
        ) : (
          <Pressable
            style={{
              position: "absolute",
              top: 40,
              right: 16,
              zIndex: 10,
              borderRadius: 5,
              height: 40,
              width: 40,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(225, 225, 225, 0.5)",
            }}
            onPress={handleFavourite}
          >
            <Ionicons
              name={favourite ? "bookmark" : "bookmark-outline"}
              size={25}
              color={favourite ? COLORS.primary : COLORS.white}
            />
          </Pressable>
        )} */}

        <View style={styles.imageContainer}>
          <Image
            style={{
              height: "100%",
              width: "100%",
              borderBottomRightRadius: 20,
              borderBottomLeftRadius: 20,
            }}
            source={{ uri: details?.donationImage }}
          ></Image>
        </View>

        
                   {/* Modal to show the image in a pop-up window */}
                   <Modal visible={isModalVisible} transparent={true} animationType="fade">
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Pressable onPress={this.toggleModal} style={styles.closeButton}>
                                <SimpleLineIcons name="close" size={24} color={Colors.primary} />
                            </Pressable>
                            <View style={styles.title}>
                            <Text style={styles.titleText}>פרטי יצירת קשר</Text>
                        </View>
                        <View style={styles.details}>
                            <View style={styles.row}>
                            <Text style={styles.label}>Email: </Text>

                            <TouchableOpacity onPress={this.handleMail}>
                                <Text style={styles.value}>{details.email}</Text>
                            </TouchableOpacity>

                            </View>
                            <View style={styles.row}>

                            <Text style={styles.label}>Phone No. :</Text>
                            <TouchableOpacity onPress={this.handleCall}>
                                <Text style={styles.value}>0{details.contactNumber}</Text>
                            </TouchableOpacity>
                          
                            </View>

                            <TouchableOpacity style={styles.wButton} onPress={this.handleWhatsApp}>
                                <Icon name="whatsapp" size={24} color="white" />
                                <Text style={styles.wButtonText}>WhatsApp</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                    </View>
                </Modal>
        <View style={styles.bodyContainer}>
          {/* <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={styles.categoryTextContainer}>
              <Text style={styles.categoryText}>
                {data?.category.toUpperCase()}
              </Text>
            </View>
            <Symbol veg={data?.veg} />
          </View> */}
          <Text numberOfLines={1} style={styles.titleText}>
            {details.donationTitle}
          </Text>
          {/* <Text numberOfLines={5} style={styles.descText}>
            {details.donationDescription}
          </Text> */}

                            
                <TouchableOpacity onPress={this.toggleText}>
                                <Text style={styles.descText}>{displayText}</Text>
                            </TouchableOpacity>
                   
          <View
            style={{
              flexDirection: "row-reverse",
              alignItems: "center",
            }}
          >
            <SimpleLineIcons name="location-pin"
              size={20}
              color={Colors.primary}
              style={{ marginTop: 8, marginRight: 4 }}
            />
            <Text style={styles.locationText}>{details?.location}</Text>
          </View>

          <View
            style={{
              flexDirection: "row-reverse",
              alignItems: "center",
            }}
          >
            <SimpleLineIcons name="people"
              size={20}
              color={Colors.primary}
              style={{ marginTop: 8, marginRight: 4 }}
            />
            <Text style={styles.locationText}>{details.numberOfRequests} תרומות</Text>
          </View>

          <View
            style={{
              flexDirection: "row-reverse",
              alignItems: "center",
            }}
          >
            <SimpleLineIcons name="clock"
              size={20}
              color={Colors.primary}
              style={{ marginTop: 8, marginRight: 4 }}
            />
            <Text style={styles.locationText}> נותרו {getRemainingTime(details.donationEndDate)} </Text>
          </View>

          <View style={styles.itemsList}>
                            <Text style={{ fontWeight: 'bold', textAlign:"center", marginBottom:5} }>רשימת הפריטים שמבקשים בתרומה:</Text>
                            <View style={styles.headerRow}>
                                <Text style={styles.heading}>כמות נותרת</Text>
                                <Text style={styles.heading}>קטגוריה</Text>
                                <Text style={styles.heading}>כמות מבוקשת</Text>
                                <Text style={styles.heading}>שם הפריט</Text>
                            </View>
                            <FlatList
                             horizontal={true}
                             nestedScrollEnabled={true}
                                data={details.wantedItems}
                                keyExtractor={(item) => item.item._id.toString()}
                                renderItem={renderItem}
                            />
             </View>
             
                





          <View
            style={{
              marginTop: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View >
              {/* <Text style={styles.donatedBy}>Donated By</Text>
              <Text style={styles.name}>userName</Text> */}

        <TouchableOpacity style={{borderRadius: 10, backgroundColor:'#e7c486',   paddingVertical: 15, paddingHorizontal: 20}}  onPress={this.toggleModal}>
          <Text style={styles.buttonText}>צור קשר</Text>
        </TouchableOpacity>
            </View>
            <View
              style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
            >
              {/* <Text style={styles.chat}>Start chat</Text>
              <Ionicons name={"chatbubbles"} size={30} color={COLORS.primary} /> */}
            </View>
          </View>

      
      
        </View>
      </ScrollView>
         <View style={styles.bottomContainer}>
    
                 <CustomBtn1 
                     onPress={() => this.props.navigation.navigate('courierList')}
                  title="שלח בקשה" />
    
       </View>
    </>
        );
    }
}




const styles = StyleSheet.create({
    bottomContainer: {
      position: "absolute",
      bottom: 0,
      padding: 16,
      backgroundColor: "#fff",
      width: "100%",

      gap: 16,
      ...Platform.select({
        ios: {
          shadowColor: 'black',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.3,
          shadowRadius: 2,
        },
        android: {
          elevation: 5,
        },
      }),
    },
    bodyContainer: {
      marginTop: 16,
      flex: 1,
      paddingHorizontal: 16,
    },
    categoryTextContainer: {
      backgroundColor: Colors.light,
      padding: 8,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
    },
    locationText: {
      marginTop: 8,
      fontFamily: "Outfit_500Medium",
     // color: Colors.primary,
      fontSize: 16,
    },
    name: {
      marginTop: 4,
      fontFamily: "Outfit_500Medium",
    //  color: Colors.primary,
      fontSize: 16,
    },
    chat: {
      fontFamily: "Outfit_500Medium",
   //   color: Colors.primary,
      fontSize: 14,
    },
    donatedBy: {
      fontFamily: "Outfit_600SemiBold",
   //   color: Colors.primary,
      fontSize: 18,
    },
    titleText: {
      marginTop: 16,
      fontFamily: "Outfit_600SemiBold",
   //   color: Colors.primary,
      fontSize: 20,
      textAlign: 'right'
    },
    descText: {
      marginTop: 8,
      fontFamily: "Outfit_500Medium",
    //  color: Colors.primary,
      fontSize: 16,
      textAlign: 'right'

    },
    categoryText: {
      fontFamily: "Outfit_400Regular",
      color: Colors.primary,
    },
    container: {
      flex: 1,
  
      backgroundColor: '#fff',
    },
    imageContainer: {
      width: '100%',
      height: '50%'
    },
    body: {},
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        overflow: 'hidden',
        marginVertical: 8,
        marginHorizontal:2,
        elevation:1,
        borderRadius:20,
        borderColor: "#fff",
        padding: 20,
        

        backgroundColor: "rgba(251,237,237,255)",
    },
    itemsList: {
        marginTop: 20,
        // maxHeight:'25%',
        ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
            },
            android: {
              elevation: 5,
            },
        }),

        
    },
    cell: {
        textAlign: 'center',
        flex: 1,
        fontSize:15,
        width:'100%',

        
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark semi-transparent background
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        width: '80%',

    },
    closeButton: {
        alignSelf: 'flex-end',
    },
    wButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "green",
        padding: 10,
        borderRadius: 5,
      },
      wButtonText: {
        color: "white",
        marginLeft: 5,
        fontSize: 16,
      },
      buttonText: {
        color: "white",
        fontWeight: "bold",
      },
  });


