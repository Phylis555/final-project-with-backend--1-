import { Image, TouchableOpacity, View, StyleSheet,Alert, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import Colors from '../../utils/colors';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';

import { API_URL } from '../../api/config';
import { getAuthHeader } from '../../components/authHeader';
import { Card,Button,Avatar,Text } from 'react-native-paper';






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
    <Card onPress={() => navigation.navigate('itemDetails', { pid: details._id })}>
   
    <View style={styles.cardInfo}>

    <Card.Content>
          <Text variant="titleLarge">{details.donationTitle}</Text>
    </Card.Content>
      

                    <View style={styles.actionsContainer}>
          <Button
            onPress={() => deleteDonation(details._id)}
            style={[styles.actionButton, { backgroundColor: 'white' }]}
          >
            <Icon name="delete" size={20} color={Colors.primary} />
          </Button>
          <Button
            onPress={() => navigation.navigate('editDonation', { pid: details._id })}
            style={[styles.actionButton, { backgroundColor: 'white' }]}
          >
            <Icon name="square-edit-outline" size={20} color={Colors.primary} />
          </Button>
        </View>
    </View>

</Card>
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
    flex: 7,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#f5f0f0',
    flexDirection: 'column',
    alignItems: 'flex-end', // Align text to the right
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
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  actionButton: {
    marginHorizontal: 5,
  },
});
