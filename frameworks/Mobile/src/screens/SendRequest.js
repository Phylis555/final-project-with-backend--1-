import React, { Component } from "react";
import { View, StyleSheet, SafeAreaView, Text, ScrollView, Alert, Button, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import Topic from "../components/topic";
import { TypeBInput } from "../components/customInput";
import Colors from "../utils/colors";
import { getOneDonation, newRequest } from "../api/donator.api";
import { requesterProfile } from "../api/requester.api";
import InputSpinner from 'react-native-input-spinner';
import { DataTable } from 'react-native-paper';
import CustomBtn1 from "../components/customButton";

export default class SendRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            donation: null,
            hasSelectedItem: false,


            requesterName :"",
            requesterEmail:"",
            requesterContact:"",
            requestDescription:"",
            donationItemsForItenAmount:[],

            donationItems: [],
            inputValues: [],
            userId: null,
            token: null,


        };
    }

   // Fetch user ID and token from AsyncStorage
   fetchData = async () => {
    const storedUserId = await AsyncStorage.getItem('user_id');
    const storedToken = await AsyncStorage.getItem('token');
    this.setState({ userId: storedUserId, token: storedToken });
    
    const { userId, token, requesterEmail, requesterContact } = this.state;

    if (userId) {
        requesterProfile(userId, token)
          .then((res) => {

            this.setState({
                requesterName: res.data.requester.firstName +" " + res.data.requester.lastName,
                requesterEmail: res.data.requester.email,
                requesterContact: "0" + res.data.requester.contactNumber
            });
          })
          
          .catch((e) => {
            console.log(e);
          });
        }

};
whenStartItemQuantityChange = () => {
    this.setState((prevState) => ({
      donationItems: prevState.donationItems.map((item) => ({ ...item, receivedAmount: 0 }))
    }));
    console.log(this.state.donationItems)
  };

    componentDidMount = () => {
        this.fetchData();
        const { token } = this.state;

        const { pid } = this.props.route.params;
        console.log("///////pidddddd")

        console.log(pid)
        
        getOneDonation(pid,token)
        .then((res) => {
          this.setState({
            donation: res.data.donation,
            donationItems: res.data.donation.wantedItems,
            donationItemsForItenAmount: res.data.donation.wantedItems,
            loading: false,
          });
        //  this.whenStartItemQuantityChange();
        })
        .catch((error) => {
          console.error("Error fetching donation:", error);
          this.setState({ loading: false });
        });



    };
    // whenStartItemQuantityChange = () => {
        
    //     this.setState((prevState) => ({
    //       donationItems: prevState.donationItems.map((item) => ({ ...item, receivedAmount: 0 }))
    //     }));
    //     console.log("///////requestttttterr")

    //     console.log(this.state.donationItems)

    //   };

      handleItemQuantityChange = (itemId, quantity) => {
        const { donationItems } = this.state;

        this.setState((prevState) => ({
          donationItems: prevState.donationItems.map((item) =>
            item.item._id === itemId ? { ...item, receivedAmount: quantity } : item
          ),
          hasSelectedItem: true
        }));
        console.log(donationItems)
      };


    createRequest = async () => {
        const { donationItems,   requesterName, requesterEmail, requesterContact, requestDescription, token, hasSelectedItem } = this.state;
        const { navigation } = this.props;
        const { pid } = this.props.route.params;


        if (!hasSelectedItem) {
            Alert.alert('Error', 'אנא הוסף פריט לפני הגשת הבקשה');
            return;
        }
        console.log(pid)
        const request = {
            donationID: pid,
            requesterName,
            requesterEmail,
            requesterContact,
            requestDescription,
            donatedItems: donationItems
            .filter((item) => item.receivedAmount > 0)
            .map(({ wantedQuantity, ...rest }) => rest),
          };
          console.log(request)


          try {
            await newRequest(request, token);
            this.setState({ loading: false });
            Alert.alert('Success', 'הבקשה נשלחה בהצלחה', [
                {
                    text: 'OK',

                    onPress: () =>  this.props.navigation.navigate('home2'), // Adjust 'Home' to your home screen route
                },
            ]);
        } catch (error) {
            this.setState({ loading: false });
            console.log(error);
            Alert.alert('Error', 'שליחת הבקשה נכשלה, בבקשה נסה שוב', [
                {
                    text: 'OK',
                   // onPress: () => navigation.navigate('Home'), // Adjust 'Home' to your home screen route
                },
            ]);
        }
    };

    render() {
        const { requesterName, requesterEmail, requesterContact, requestDescription, donationItems, inputValues, loading } = this.state;

        return (
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Topic title={'שלח בקשה'} />
                    <TypeBInput
                        label="שם מלא*"
                        height={50}
                        onChangeText={(text) => this.setState({ requesterName: text })}
                        value={requesterName}
                    />
                    <TypeBInput
                        label='מספר טלפון'
                        height={50}
                        keyboardType="phone-pad"
                        onChangeText={(text) => this.setState({ requesterContact: text })}
                        value={requesterContact}
                    />
                    <TypeBInput
                        label="אימייל*"
                        height={50}
                        onChangeText={(text) => this.setState({ requesterEmail: text })}
                        value={requesterEmail}
                    />
                    <TypeBInput
                        label="תיאור אודות התרומה*"
                        height={80}
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={(text) => this.setState({ requestDescription: text })}
                        value={requestDescription}
                    />
                    <Text style={styles.label}>הוספת פריטים:</Text>
                    <View style={styles.containerTable}>
                        <DataTable>
                            <DataTable.Header style={styles.tableHeader}>
                                <DataTable.Title style={styles.headerText} numberOfLines={2}>שם הפריט</DataTable.Title>
                                <DataTable.Title style={styles.headerText} numberOfLines={2}>כמות מבוקשת</DataTable.Title>
                                <DataTable.Title style={styles.headerText} numeric numberOfLines={2}>כמות שנותרה</DataTable.Title>
                                <DataTable.Title style={styles.headerText} numeric numberOfLines={2}>בחירת כמות</DataTable.Title>
                            </DataTable.Header>

                            {donationItems.map((item) => {
                                const remainingQuantity = item.wantedQuantity - item.receivedAmount;
                                return (
                                    <DataTable.Row key={item.item._id}>
                                        <DataTable.Cell style={styles.cellText}>{item.item.itemName}</DataTable.Cell>
                                        <DataTable.Cell style={styles.cellText}>{item.wantedQuantity}</DataTable.Cell>
                                        <DataTable.Cell style={styles.cellText}>{remainingQuantity}</DataTable.Cell>
                                        <DataTable.Cell style={styles.cellText}>
                                            <InputSpinner
                                                max={remainingQuantity}
                                                min={0}
                                                step={1}
                                                colorMax={"#f04048"}
                                                colorMin={"#40c5f4"}
                                                width={90}
                                                height={35}
                                                rounded
                                                value={0}
                                                onChange={(value) => this.handleItemQuantityChange(item.item._id, parseInt(value))}
                                                />
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                );
                            })}
                        </DataTable>
                    </View>
                    <CustomBtn1 title="שלח" onPress={this.createRequest} />
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 15,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.primary,
        textAlign: 'right',
        marginVertical: 10,
    },
    containerTable: {
        padding: 5,
    },
    tableHeader: {
        backgroundColor: '#DCDCDC',
        minHeight: 60,
    },
    headerText: {
        textAlign: 'center',
        flex: 1,
        flexWrap: 'wrap',
    },
    cellText: {
        textAlign: 'center',
        flexWrap: 'wrap',
    },
});