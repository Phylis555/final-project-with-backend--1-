import { Image, TouchableOpacity, Text, View, StyleSheet,Alert, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import Colors from '../../utils/colors';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
import { SimpleLineIcons } from '@expo/vector-icons';

import { API_URL } from '../../api/config';
import { getAuthHeader } from '../../components/authHeader';
import { getRemainingTime } from '../../components/getRemainingTime';





const ActiveCard = ({ details }) => {
  const navigation = useNavigation();
  const [token, setToken] = useState("");

  


  const deleteDonation  = async (id) => {
    try {
        const storedToken = await AsyncStorage.getItem('token');

        const response = await axios.delete(
          `${API_URL}/donator/deleteDonation/${id}`,
          getAuthHeader(storedToken)
        );
        console.log(response)
        if (response.status === 200) { // Assuming success response has a 'success' property
            Alert.alert('הפריט נמחק בהצלחה', '', [
                {
                  text: 'אשר',
                  onPress: () => navigation.navigate('dashBoard', { key: new Date().toISOString() }), // Simulate reload with navigation
                },
              ]);
        } else {
          Alert.alert('שגיאה', response.data.message ); // Handle errors gracefully
        }
      } catch (error) {
        console.error('Error deleting donation:', error);
        Alert.alert('שגיאה', 'לא ניתן למחוק את הפריט כעת. אנא נסה שנית מאוחר יותר.');
      }
    };
  

    fetchData = async () => {
        const storedToken = await AsyncStorage.getItem('token');
        setToken(storedToken);
        console.log("Fetched Token access:", storedToken);
    };




  return (
    <TouchableOpacity onPress={() => navigation.navigate('itemDetails', { pid: details._id })}>
            <View style={styles.card}>
                <View style={styles.cardImgWrapper}>
                <TouchableOpacity onPress={() =>{deleteDonation(details._id)}}>
            <Icon name="delete" size={24} color={Colors.primary} />

            </TouchableOpacity>
            <TouchableOpacity onPress={() =>  navigation.navigate('editDonation', { pid: details._id })}>
            <Icon name="square-edit-outline" size={24} color={Colors.primary} />

            </TouchableOpacity>
                </View>
                <View style={styles.cardInfo}>
                    <View style={styles.textContainer}>
                        <Text style={styles.cardTitle}>{details.donationTitle}</Text>
                        <Text numberOfLines={2} style={styles.cardDetails}>{details.donationDescription}</Text>

                        <View style={styles.row}>
                            <View style={styles.iconRow}>
                                <SimpleLineIcons name="check" size={14} color={Colors.primary} />
                                <Text style={styles.iconInfo} numberOfLines={1} ellipsizeMode="tail">סמן כהושלם</Text>
                            </View>

                            <View style={styles.iconRow}>
                                <SimpleLineIcons name="clock" size={14} color={Colors.primary} />
                                <Text style={styles.iconInfo} numberOfLines={1} ellipsizeMode="tail">{getRemainingTime(details.donationEndDate)}</Text>
                            </View>

                            <View style={styles.iconRow}>
                            <Pressable onPress={() => navigation.navigate('seeRequests', { pid: details._id })}>
                                    <SimpleLineIcons name="people" size={14} color={Colors.primary} />
                                    <Text style={styles.iconInfo} numberOfLines={1} ellipsizeMode="tail">ראה בקשות</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
  );
};

export default ActiveCard;

const styles = StyleSheet.create({
    card: {
      height: 150,
      marginVertical: 10,
      flexDirection: 'row',
      shadowColor: '#999',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
    },
    cardImgWrapper: {
      flex: 1,
      justifyContent:'space-around',
      flexDirection: 'column'
    },
    cardImg: {
      height: '100%',
      width: '100%',
      alignSelf: 'center',
      borderRadius: 8,
      borderBottomRightRadius: 0,
      borderTopRightRadius: 0,
    },
    cardInfo: {
      flex: 7,
      padding: 10,
      borderColor: '#ccc',
      borderWidth: 1,
      borderLeftWidth: 0,
      borderBottomRightRadius: 8,
      borderTopRightRadius: 8,
      backgroundColor: '#fff',
      alignItems: 'flex-end', // Align text to the right


    },
    cardTitle: {
      fontWeight: 'bold',
      textAlign: 'right', // Align text to the right

    },
    cardDetails: {
      fontSize: 12,
      color: '#444',
      textAlign: 'right', // Align text to the right

    },
        iconInfo:{
       // ...fontStyle.regular,
        fontSize:12,
        marginLeft:5,
        marginTop:3
    },

    row:{
        flexDirection:'row',
        justifyContent:'space-between',
        margin:10,
        overflow: 'hidden', // Ensures content doesn't slip out

        // position: 'absolute',
        // bottom: 0,
        // left: 0, 
        // right: 0,  
     },
  });
