import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import fontStyle from '../../../utils/fontStyles'
import Colors from '../../../utils/colors'
import { useNavigation } from '@react-navigation/native'

const Card = ({details}) => {

    const navigation = useNavigation();
    // const [progress, setProgress] = useState(0);
    var prog = ((details.pamount)/(details.tamount))*100
  return (
    <Pressable style={styles.container} onPress={() => {navigation.navigate('cashActivity', {aid: details.id})}}>
        <Image source={{uri: details.image}} resizeMode="cover" style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{details.title}</Text>
        <View style={[styles.row, {marginTop: 12}]}>
            <View style={[styles.row,{width:'75%'}]} >
                <Text style={styles.amnt} numberOfLines={1} ellipsizeMode="tail">$ {details.pamount}</Text>
            </View>

            <View style={styles.row}>
                <Text style={[styles.amnt, {color: Colors.light}]} numberOfLines={1} ellipsizeMode="tail">$ {details.tamount}</Text>
            </View>
        </View>
        <View style={styles.row}>
            <View style={styles.progressBG}>
                <View style={[styles.progress,
                        {
                        width: `${prog}%`
                        },
                    ]}
                />
            </View>
        </View>
      </View>
    </Pressable>
  )
}

export default Card

const styles = StyleSheet.create({
    amnt:{
        ...fontStyle.medium,
        fontSize:15,
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
        marginLeft:15,
        maxWidth:'70%',
        paddingRight:10,
        paddingBottom:15,
        alignSelf:'center'

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

    },
    progressBG: {
        width: '95%',
        height: 10,
        backgroundColor: '#C4CDD5',
        marginVertical: 0,
        borderRadius: 10,
      },
     
      progress: {
        width: '50%',
        height: 10,
        backgroundColor: Colors.primary,
        borderRadius: 10,
      }
})