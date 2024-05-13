import React,  { Component } from "react";
import { View,
    Text,
    StyleSheet, 
    SafeAreaView, 
    ScrollView, 
    Linking, 
    Pressable,
    TouchableOpacity,
    FlatList,
    Modal ,
    Image
} from "react-native";
import { getOneDonation } from "../api/donator.api";
import { SimpleLineIcons } from '@expo/vector-icons'
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
            mapUrl: ""
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

        const fullText = details.donationDescription || '';
        const words = fullText.split(' ');

        const displayText = isExpanded ? fullText : words.slice(0, 8).join(' ') + (words.length > 8 ? '  ...ראה עוד' : '');
        
        const renderItem = ({item}) => (
            <View style={styles.row}>

                <Text style={styles.cell}>{item.wantedQuantity - item.receivedAmount}</Text>
                <Text style={styles.cell}>{item.item.itemCategory}</Text>
                <Text style={styles.cell}>{item.wantedQuantity}</Text>
                <Text style={styles.cell}>{item.item.itemName}</Text>  
            </View>
        )
        

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.imageContainer}>

                    <Pressable  style={styles.goBackButton} onPress={() => this.props.navigation.goBack()}>
                        <SimpleLineIcons name="arrow-left" size={25} color={Colors.primary} />
                    </Pressable>
                    <Pressable onPress={this.toggleModal}>
                    <Image source={{ uri: details.donationImage }} style={styles.image} />
                    </Pressable>
                   
                </View>

                   {/* Modal to show the image in a pop-up window */}
                   <Modal visible={isModalVisible} transparent={true} animationType="fade">
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Pressable onPress={this.toggleModal} style={styles.closeButton}>
                                <SimpleLineIcons name="close" size={24} color={Colors.primary} />
                            </Pressable>
                            <Image source={{ uri: details.donationImage }} style={styles.modalImage} />
                        </View>
                    </View>
                </Modal>
            
                <View style={styles.detailsContainer}>
                    <View>
                        <View>
                            
                                <Text style={styles.title}>{details.donationTitle}</Text>
                                <TouchableOpacity onPress={this.toggleText}>
                                    <Text style={styles.description}>{displayText}</Text>
                                </TouchableOpacity>
                           
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
                                data={details.wantedItems}
                                keyExtractor={(item) => item.item._id.toString()}
                                renderItem={renderItem}
                            />
                        </View>
                    </View>
                </View>



                <View style={styles.row2}>
             <View  style={{  flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 4, }}>
                 <SimpleLineIcons name="location-pin" size={16} color={Colors.primary} />
                 <Text style={styles.iconInfo} numberOfLines={1} ellipsizeMode="tail">{details.location}</Text>
             </View>

             <View style={{  flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 4, }}>
             <SimpleLineIcons name="clock" size={16} color={Colors.primary} />
                 <Text style={styles.iconInfo} numberOfLines={1} ellipsizeMode="tail">{getRemainingTime(details.donationEndDate)+" נותרו" }</Text>
            </View>

            <View style={{  flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 4, }}>
             <SimpleLineIcons name="people" size={16} color={Colors.primary} />
                 <Text style={styles.iconInfo} numberOfLines={1} ellipsizeMode="tail">{details.numberOfRequests}</Text>
            </View>
         </View>



        <ScrollView style={{ height:'50%'}} > 

       
          <View
            style={{
              marginTop: 16,
              flexDirection:"row",
              justifyContent: 'center',alignItems: 'center',

            }}
          >
            <SimpleLineIcons name="phone" size={20} color={Colors.primary} />
            <Text style={styles.name}>
              {details.contactNumber}
            </Text>
          </View>

          <View
            style={{
              marginTop: 16,
              flexDirection:"row",
              justifyContent: 'center',alignItems: 'center'

            }}
          >
            <SimpleLineIcons name="envelope" size={20} color={Colors.primary} />
            <Text style={{  color: Colors.primary, textDecorationLine: 'underline', marginLeft: 5,  ...fontStyle.semibold, }}onPress={() => {
                                var mail = details.email
                                var pname = details.donationTitle
                                var message = 'Hi, I want to know if your item; "' + pname + '" on OneDonation is  still available. Thank You'
                                Linking.openURL('mailto:' + mail +'?subject=Interested&body='+ message)}
                            }>
              {details.email}
            </Text>
          </View>

      


      <View style={styles.bottomContainer}>
    
                <CustomBtn1 
                 style={{ flex: 1 }}
                    onPress={() => this.props.navigation.navigate('courierList')}
                 title="שלח בקשה" />
    
      </View>

      </ScrollView>
              

            </SafeAreaView>
        );
    }
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    goBackButton: {
        position: 'absolute',
        top: 20, // Adjust top offset as needed
        left: 20, // Adjust left offset as needed
        zIndex: 1, // Ensure the button is on top of the image
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Optional: add background color and transparency
    },
        header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,

    },

    heading: {
        flex:1,
        ...fontStyle.medium,
        fontSize:15,

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
        padding: 10,
        backgroundColor: "rgba(251,237,237,255)",
    },

    row2: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        overflow: 'hidden',
        marginVertical: 8,
        marginHorizontal:2,
        elevation:1,
        borderRadius:20,
        borderColor: "#fff",
        padding: 10,
        backgroundColor: "rgba(230,195,136,255)",
    },
    cell: {
        textAlign: 'center',
        flex:1,
        fontSize:15,
        
    },
    imageContainer: {
        backgroundColor: 'black',
        width: '100%',
    },
    image: {
        resizeMode: 'cover',
        height: 470,
    },
    detailsContainer: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: 'white',
        marginTop: -200,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        textAlign: 'right',
    },
    title: {
        textAlign: 'right',
        ...fontStyle.semibold,
        fontSize: 18,
    },
    description: {
        color: 'gray',
        textAlign: 'right',
        fontSize: 12,
    },
    itemsList: {
        marginTop: 20,
    },
    boldText: {
        fontWeight: 'bold',
        marginBottom: 10,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    heading: {
        fontWeight: 'bold',
    },
    bottomContainer: {
       
        width: '100%',
        padding: 16,
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    textGray: {
        color: 'gray',
        marginBottom: -4,
    },
    userId: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    addToCartButton: {
        backgroundColor: 'black',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 50,
    },
    addToCartText: {
        color: 'white',
        fontWeight: 'bold',
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
    modalImage: {
        width: '100%',
        height: 470,
        resizeMode: 'contain',
    },

    iconInfo:{
        ...fontStyle.semibold,
        fontSize:12,
        marginLeft:5,
        marginTop:3,
        marginLeft: 5,
        paddingRight: 5,
    },

    name: {
        marginTop: 4,
        marginLeft:5,

        ...fontStyle.semibold,
        color: Colors.light,
        fontSize: 16,
      },
  
})
