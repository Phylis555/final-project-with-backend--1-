import React, { useState, useEffect } from "react";
import { View, Alert, Linking, StyleSheet, TouchableOpacity } from "react-native";
import { acceptDonationRequest, rejectDonationRequest } from "../../api/donator.api";
import Icon from "react-native-vector-icons/FontAwesome";
import { Text, Card, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const RequestCard = (props) => {
    const [token, setToken] = useState(null);
    const navigation = useNavigation(); // Use navigation hook

    const reqdata = {
        email: props.email,
        title: props.title,
    };

    useEffect(() => {
        const fetchData = async () => {
            const token = await AsyncStorage.getItem('token');
            setToken(token);
        };
        fetchData();
    }, []);

    const acceptRequest = (id) => {
        Alert.alert(
            "אתה בטוח?",
            "הבקשה תאושר",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: () => {
                        acceptDonationRequest(id, reqdata, token)
                            .then((res) => {
                                Alert.alert("Success", "הבקשה אושרה!!", [
                                    {
                                        text: "OK",
                                        onPress: () => navigation.goBack(), // Go back to the previous screen
                                    },
                                ]);
                            })
                            .catch((e) => {
                                Alert.alert("Error", "File Is Not Deleted");
                            });
                    }
                }
            ],
            { cancelable: false }
        );
    };

    const rejectedRequest = (id) => {
        Alert.alert(
            "אתה בטוח?",
            "הבקשה תדחה",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: () => {
                        rejectDonationRequest(id, reqdata, token)
                            .then((res) => {
                                Alert.alert("Success", "הבקשה נדחתה!!", [
                                    {
                                        text: "OK",
                                        onPress: () => navigation.goBack(), // Go back to the previous screen
                                    },
                                ]);
                            })
                            .catch((e) => {
                                Alert.alert("Error", "File Is Not Deleted");
                            });
                    }
                }
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.cardContainer}>
            <Card style={styles.card}>
                <Text variant="headlineMedium" style={styles.header}>פרטי הבקשה</Text>
                <View style={styles.info}>
                    <View style={styles.row}>
                        <Text style={styles.label} variant="labelLarge">שם </Text>
                        <Text style={styles.value} variant="labelMedium">{props.name}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label} variant="labelLarge">Email </Text>
                        <Text style={styles.value} variant="labelMedium">{props.email}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label} variant="labelLarge">מספר איש קשר </Text>
                        <Text style={styles.value} variant="labelMedium">{"0"+props.contact}</Text>
                    </View>
                    {/* <TouchableOpacity
                        onPress={() => Linking.openURL(`https://wa.me/972${props.contact}?text=${encodeURIComponent("שלום, ראיתי את התרומה שלך דרך אתר Instant Giving ואני מעוניין בתרומה שהצעת! אשמח שתיצור איתי קשר. תודה רבה!")}`)}
                        style={styles.whatsappButton}
                    >
                        <Icon name="whatsapp" size={20} color="green" />
                        <Text style={styles.whatsappText}>Whatsapp</Text>
                    </TouchableOpacity> */}
                    <Button icon="whatsapp" textColor={"green"} style={styles.whatsappButton} mode="outlined"   onPress={() => Linking.openURL(`https://wa.me/972${props.contact}?text=${encodeURIComponent("שלום, ראיתי את התרומה שלך דרך אתר Instant Giving ואני מעוניין בתרומה שהצעת! אשמח שתיצור איתי קשר. תודה רבה!")}`)}>
   שלח הודעה
  </Button>
                    <View style={styles.row}>
                        <Text style={styles.label} variant="labelLarge">תיאור </Text>
                        <Text style={styles.value} variant="labelMedium">{props.description}</Text>
                    </View>
                    {props.items.length > 0 && (
                        <Text style={styles.header}>פריטים לתרומה</Text>
                    )}
                    {props.items.map((items, index) => (
                        <View key={index} style={styles.row}>
                            <Text style={styles.label} variant="labelLarge">שם הפריט</Text>
                            <Text style={styles.value} variant="labelMedium">{items.item.itemName}</Text>
                            <Text style={styles.label} variant="labelLarge">כמות</Text>
                            <Text style={styles.value} variant="labelMedium">{items.receivedAmount}</Text>
                        </View>
                    ))}
                </View>
                {props.accepted === 'accepted' ? (
                    <View style={styles.buttonContainer}></View>
                ) : (
                    <View style={styles.buttonContainer}>
                        <Button
                            mode="contained"
                            buttonColor="green"
                            style={styles.button}
                            onPress={() => acceptRequest(props.id)}
                        >אשר בקשה</Button>
                        <Button
                            mode="contained"
                            buttonColor="red"
                            style={styles.button}
                            onPress={() => rejectedRequest(props.id)}
                        >דחה בקשה</Button>
                    </View>
                )}
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        marginBottom: 20, // To add space between cards
        paddingHorizontal: '5%', // To add horizontal padding
    },
    card: {
        width: '100%', // Ensure the card uses the full width of the container
        borderWidth: 1,
        borderRadius: 8,
        padding: 16,
        backgroundColor: "#fff",
    },
    header: {
        textAlign: "center",
        marginBottom: 20,
        fontWeight: "bold",
    },
    info: {
        marginRight: 0, // Ensure right alignment works properly
    },
    row: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between', // Space out the label and value
        marginVertical: 5,
    },
    label: {
        textAlign: 'right', // Align text to the right
        flex: 1, // Take up equal space
    },
    value: {
        textAlign: 'right', // Align text to the right
        flex: 1, // Take up equal space
    },
    whatsappButton: {
     //   flexDirection: "row-reverse", // Align icon and text in RTL
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10,
        borderColor: "green",
        borderWidth: 1,
        width: '40%', // Set fixed width for the buttons

    },
    whatsappText: {
        marginRight: 5, // Adjust margin to move text closer to the icon
        color: "green",
        fontWeight: "bold",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between", // Space out the buttons
        marginTop: 20,
    },
    button: {
        flex: 1, // Allow buttons to take equal space
        marginHorizontal: 5, // Add horizontal margin to create space between buttons
    },
});

export default RequestCard;
