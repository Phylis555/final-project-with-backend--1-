import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import fontStyle from '../../../utils/fontStyles'
import { SimpleLineIcons } from '@expo/vector-icons'
import Colors from '../../../utils/colors'
import { useNavigation } from '@react-navigation/native'

const Card = ({details}) => {

    const navigation = useNavigation();

  return (
    <Pressable style={styles.container} onPress={() => {navigation.navigate('itemDetails', {pid: details.id})}}>
        <Image source={{uri: details.image}} resizeMode="cover" style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{details.title}</Text>
        <View style={styles.row}>
            <View style={[styles.row,{width:'75%'}]} >
                <SimpleLineIcons name="location-pin" size={14} color={Colors.primary} />
                <Text style={styles.location} numberOfLines={1} ellipsizeMode="tail">{details.location}</Text>
            </View>

            <View style={styles.row}>
            <SimpleLineIcons name="layers" size={14} color={Colors.primary} />
                <Text style={styles.location} numberOfLines={1} ellipsizeMode="tail">{details.quantity}</Text>
            </View>
        </View>
      </View>
    </Pressable>
  )
}

export default Card

const styles = StyleSheet.create({
    location:{
        ...fontStyle.regular,
        fontSize:12,
        marginLeft:5,
        marginTop:3
    },
    row:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:10,
        
    },
    title:{
       ...fontStyle.semibold ,
       fontSize:15,
       color:Colors.dark

    },
    details:{
        marginLeft:10,
        maxWidth:'70%',
        paddingRight:10,
        paddingBottom:15,
        alignSelf:'flex-end'

    },
    image:{
        width:100,
        height:'80%',
        borderRadius:10
    },
    container:{
        minHeight:120,
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
        flexDirection:'row',
        alignItems:'center'

    }
})