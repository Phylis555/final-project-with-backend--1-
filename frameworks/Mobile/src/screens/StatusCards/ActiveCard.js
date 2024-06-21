import { Image, TouchableOpacity, View, StyleSheet, Alert, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import Colors from '../../utils/colors';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { SimpleLineIcons } from '@expo/vector-icons';
import { API_URL } from '../../api/config';
import { getAuthHeader } from '../../components/authHeader';
import { getRemainingTime } from '../../components/getRemainingTime';
import { markDonationAsCompleted } from '../../api/donator.api';
import { Card, Button, Avatar, Text } from 'react-native-paper';

const ActiveCard = ({ details }) => {
  const navigation = useNavigation();
  const [token, setToken] = useState("");

  const deleteDonation = async (id) => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      const response = await axios.delete(
        `${API_URL}/donator/deleteDonation/${id}`,
        getAuthHeader(storedToken)
      );
      console.log(response);
      if (response.status === 200) {
        Alert.alert('הפריט נמחק בהצלחה', '', [
          {
            text: 'אשר',
          },
        ]);
      } else {
        Alert.alert('שגיאה', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting donation:', error);
      Alert.alert('שגיאה', 'לא ניתן למחוק את הפריט כעת. אנא נסה שנית מאוחר יותר.');
    }
  };

  const markAsCompleted = async (id) => {
    Alert.alert(
      "שים לב",
      "התרומה תועבר לתרומות שהושלמו",
      [
        {
          text: "ביטול",
          style: "cancel"
        },
        {
          text: "אישור",
          onPress: async () => {
            try {
              const storedToken = await AsyncStorage.getItem('token');
              await markDonationAsCompleted(id, storedToken);
              Alert.alert('הפריט הושלם בהצלחה', '', [
                {
                  text: 'אשר',
                  onPress: () => navigation.navigate('account'),
                },
              ]);
            } catch (error) {
              Alert.alert("שגיאה", "התרומה לא הושלמה");
            }
          }
        }
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken);
      console.log("Fetched Token access:", storedToken);
    };

    fetchData();
  }, []);

  return (
    <Card onPress={() => navigation.navigate('itemDetails', { pid: details._id })}>
      <View style={styles.cardInfo}>
        <Card.Content>
          <Text style={styles.cardTitle} variant="titleLarge">{details.donationTitle}</Text>
          <Text style={styles.cardDetails} variant="bodyMedium">{details.donationDescription}</Text>
        </Card.Content>
        <View style={styles.row}>
          <Button mode="contained-tonal" style={styles.button} buttonColor="green" onPress={() => markAsCompleted(details._id)}>
            <SimpleLineIcons name="check" size={14} color={Colors.white} />
            <Text style={styles.iconInfo} numberOfLines={1} ellipsizeMode="tail">הושלם</Text>
          </Button>
          <Button mode="contained-tonal" style={styles.button} buttonColor="red">
            <SimpleLineIcons name="clock" size={14} color={Colors.white} />
            <Text style={styles.iconInfo} numberOfLines={1} ellipsizeMode="tail">{getRemainingTime(details.donationEndDate)}</Text>
          </Button>
          <Button mode="contained-tonal" style={styles.button} buttonColor="blue" onPress={() => navigation.navigate('seeRequests', { pid: details._id })}>
            <SimpleLineIcons name="people" size={14} color={Colors.white} />
            <Text style={styles.iconInfo} numberOfLines={1} ellipsizeMode="tail">בקשות</Text>
          </Button>
        </View>
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

export default ActiveCard;

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
  cardInfo: {
    flex: 1,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#f5f0f0',
    alignItems: 'flex-end', // Align text to the right
    overflow: 'hidden', // Ensures content doesn't slip out
    justifyContent: 'space-between', // Distributes space between rows and actions container
  },
  cardTitle: {
    fontWeight: 'bold',
    textAlign: 'right', // Align text to the right
  },
  cardDetails: {
    color: '#444',
    textAlign: 'right', // Align text to the right
  },
  iconInfo: {
    fontSize: 12,
    margin: 2,
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 2,
    paddingHorizontal: 2, // Adjust the padding to fit the text
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // Align buttons to the left
    marginTop: 'auto', // Align the actions container at the bottom
    paddingTop: 10,
  },
  actionButton: {
    marginHorizontal: 5,
  },
});
