import { ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import Colors from '../../../utils/colors'
import fontStyle from '../../../utils/fontStyles'
import { useNavigation } from '@react-navigation/native'


const Header = () => {

  const navigation = useNavigation();

  return (
    <ImageBackground imageStyle={styles.image} blurRadius={4} resizeMode='cover' source={require('../../../../assets/images/headerBg.jpg')} style={styles.container}>
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.menu} onPress={() => navigation.openDrawer()}>
        <Feather name="menu" size={22} color={'white'}/>
      </TouchableOpacity>

    <View style={styles.bottom}>
      <View style={styles.row}>
        <Text style={styles.text}>הצטרף/י</Text>
        <View style={styles.highlight}>
            <Text style={[styles.text,fontStyle.bold]}>אלינו</Text>
        </View>
        <Text style={styles.text}>למסע</Text>
        <View style={styles.highlight}>
            <Text style={[styles.text,fontStyle.bold]}>של</Text>
        </View>
        <Text style={styles.text}>נתינה</Text>

      </View>
      </View>
    </View>
    </ImageBackground>
  )
}

export default Header

const styles = StyleSheet.create({
    row:{
        flexDirection:'row-reverse',
        alignItems:'center',
        flexWrap:'wrap'
    },
    highlight:{
        backgroundColor:'rgba(222, 103, 105, 0.5)',
        paddingHorizontal:2,
        borderRadius:8,
        paddingVertical:2,
    },
    text:{
        ...fontStyle.medium,
        color:Colors.typeAColor,
        fontSize:18,
        marginHorizontal:3
    },
    bottom:{
        position:'absolute',
        bottom: 25,
        paddingHorizontal:20,
        left: 0,
        right: 0,
        justifyContent: 'center', // Center content horizontally
        alignItems: 'center', // Center content vertically
    },
    menu:{
        width:30,
        height:30,
        backgroundColor:'rgba(222, 103, 105, 0.5)',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:6
    },
    wrapper:{
        backgroundColor:"rgba(0,0,0,0.3)",
        height:'100%',
        borderBottomLeftRadius:40,
        borderBottomRightRadius:40,
        paddingHorizontal:20,
        paddingTop:Platform.OS === 'ios'? 50: 60
    },
    image:{
        borderBottomLeftRadius:40,
        borderBottomRightRadius:40,
    },
    container:{
        width:'100%',
        height:240,
     
    }
})