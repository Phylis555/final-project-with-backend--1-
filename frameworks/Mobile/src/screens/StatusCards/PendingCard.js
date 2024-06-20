import { Image, TouchableOpacity, Text, View, StyleSheet,Alert, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import Colors from '../../utils/colors';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';

import { API_URL } from '../../api/config';
import { getAuthHeader } from '../../components/authHeader';





const PendingCard = ({ details }) => {
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
    // <View
    <TouchableOpacity  style={styles.container} onPress={() => navigation.navigate('itemDetails', { pid: details._id })} >

      {/* style={styles.container} */}
    {/* //  onPress={() => navigation.navigate('itemDetails', { pid: details._id })} */}
    

          <View>

            <Text
              numberOfLines={1}
              style={styles.cardTitle}
            >
              {details?.donationTitle}
            </Text>
         
          </View>
          <View style={styles.iconRow}>
            <TouchableOpacity onPress={() =>{deleteDonation(details._id)}}>
            <Icon name="delete" size={24} color={Colors.primary} />

            </TouchableOpacity>
            <TouchableOpacity onPress={() =>  navigation.navigate('editDonation', { pid: details._id })}>
            <Icon name="square-edit-outline" size={24} color={Colors.primary} />

            </TouchableOpacity>
          </View>
  
   
     </TouchableOpacity>
  );
};

export default PendingCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    borderColor: "lightgray",
    backgroundColor: '#fff',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cardInfo: {
    flex: 1,
    paddingLeft: 16,
   // justifyContent: "space-between",
    gap: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: "Outfit_600SemiBold",
    textAlign: 'right'
  },
  cardDetails: {
    fontSize: 14,
    fontFamily: "Outfit_500Medium",
    color: "gray",
    textAlign: 'right'
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'flex',
    gap: 16,
    marginVertical: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconTextContainer: {
    flexDirection: "row-reverse",
    flex: 1,
    margin: 3,
  },
  iconInfo: {
    fontSize: 12,
    marginLeft: 5,
    flex: 1,
    flexShrink: 1,
  },
});
