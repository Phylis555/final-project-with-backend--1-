import { Image, TouchableOpacity, View, StyleSheet,Alert, Pressable } from 'react-native';
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
import { Card,Button,Avatar,Text } from 'react-native-paper';





const CompleteCard = ({ details }) => {
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
          <Text variant="bodyMedium">{details.donationDescription}</Text>
    </Card.Content>
      

           
                <Button  mode="contained-tonal"  style={styles.button} buttonColor="blue"onPress={() => navigation.navigate('seeRequests', { pid: details._id })}>
                        <SimpleLineIcons name="people" size={14} color={Colors.white} />
                        <Text style={styles.iconInfo} numberOfLines={1} ellipsizeMode="tail">ראה בקשות</Text>
                    </Button>

                    <View style={styles.actionsContainer}>
          <Button
            onPress={() => deleteDonation(details._id)}
            style={[styles.actionButton, { backgroundColor: 'white' }]}
          >
            <Icon name="delete" size={20} color={Colors.primary} />
          </Button>
          {/* <Button
            onPress={() => navigation.navigate('editDonation', { pid: details._id })}
            style={[styles.actionButton, { backgroundColor: 'white' }]}
          >
            <Icon name="square-edit-outline" size={20} color={Colors.primary} />
          </Button> */}
        </View>
    </View>

</Card>
  );
};

export default CompleteCard;

const styles = StyleSheet.create({
    card: {
        height: 150,
        marginVertical: 10,
        flexDirection: 'row',
        shadowColor: '#999',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    cardImgWrapper: {
        flex: 1,
        justifyContent: 'space-around',
        flexDirection: 'column',
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
        backgroundColor: '#f5f0f0',
        flexDirection: 'column',
        alignItems: 'flex-end', // Align text to the right
    },
   
   
 
    iconInfo:{
         fontSize:12,
         margin:5,
         color: '#fff',
 
         marginTop:3
     },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        overflow: 'hidden',
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
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
