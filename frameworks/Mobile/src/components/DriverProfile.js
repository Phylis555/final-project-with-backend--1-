import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import fontStyle from '../utils/fontStyles'
import { SimpleLineIcons } from '@expo/vector-icons'
import Colors from '../utils/colors'
import { useNavigation } from '@react-navigation/native'

const DriverCard = ({details}) => {

    const navigation = useNavigation();

  return (
    <Pressable style={styles.container} onPress={() => alert(details.name + ' selected. Next screen under construction')}>
        <View style={styles.profile}>
            <Image source={details.image} resizeMode="cover" style={styles.image} />
            <View style={{marginLeft: 30}}>
                <View style={styles.row}>
                    <SimpleLineIcons name="user" size={14} color={Colors.light} />
                    <Text style={[styles.ptext, {marginHorizontal: 10}]}>{details.name}</Text>
                </View>
                
                <View style={styles.row}>
                    <SimpleLineIcons name="location-pin" size={14} color={Colors.light} />
                    <Text style={{marginHorizontal: 10, color: Colors.light}} numberOfLines={1} ellipsizeMode="tail">South Side NMU</Text>
                </View>
            </View>
        </View>

        <View style={{marginHorizontal: 15}}>
            <Text style={styles.schedule}>Monday           12:00PM - 14:30PM</Text>
            <Text style={styles.schedule}>Tuesday           7:00AM - 9:30AM</Text>
            <Text style={styles.schedule}>Wednesday     7:00AM - 9:30AM</Text>
            <Text style={styles.schedule}>Thursday         8:00AM - 9:30AM</Text>
            <Text style={styles.schedule}>Saturday          7:00AM - 9:30AM</Text>
        </View>
    </Pressable>
  )
}

export default DriverCard

const styles = StyleSheet.create({
    image:{
        width:80,
        height:80,
        borderRadius: 50
    },
    container:{
        minHeight:200,
        width:'100%',
        marginBottom:15,
        backgroundColor:"whitesmoke",
        paddingHorizontal:5,
        borderRadius:15,
        elevation:15,
        shadowOffset:{width:0,height:0},
        shadowOpacity:0.3,
        shadowRadius:20,
        shadowColor:'silver',
        padding: 10

    },
    profile: {
        flex: 1,
        flexDirection: 'row',
        maxHeight: '60%',
        marginBottom: 15
    },
    schedule: {
        marginVertical: 3,
        fontSize: 15
    },
    ptext: {
        fontSize: 16,
        fontWeight: '600',
        marginVertical: 5,
    },
    row:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:10,
    }
})