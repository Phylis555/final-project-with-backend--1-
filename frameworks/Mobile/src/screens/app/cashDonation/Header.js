import { ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import Colors from '../../../utils/colors'
import fontStyle from '../../../utils/fontStyles'
import { useNavigation } from '@react-navigation/native'

const Header = () => {

  const navigation = useNavigation();

  return (
    // <ImageBackground imageStyle={styles.image} resizeMode='cover' source={require('../../../../assets/images/headerBg.jpg')} style={styles.container}>
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.menu} onPress={() => navigation.openDrawer()}>
        <Feather name="menu" size={22} color={'white'}/>
      </TouchableOpacity>

      <View style={styles.midTxt}>
        <View style={styles.row}>
          <Text style={styles.text}>What</Text>
          <View style={styles.highlight}>
              <Text style={[styles.text,fontStyle.bold]}>Goes</Text>
          </View>
          <Text style={styles.text}>Around,</Text>
          <View style={styles.highlight}>
              <Text style={[styles.text,fontStyle.bold]}>Comes</Text>
          </View>
          <Text style={styles.text}>Around</Text>

        </View>
      </View>

      <Text style={styles.bottom}>Hello, Prince</Text>
    </View>
    // </ImageBackground>
  )
}

export default Header

const styles = StyleSheet.create({
    row:{
        flexDirection:'row',
        alignItems:'center',
        flexWrap:'wrap'
    },
    highlight:{
        backgroundColor:Colors.primary,
        paddingHorizontal:2,
        borderRadius:8,
        paddingVertical:2,
    },
    text:{
        ...fontStyle.medium,
        color:Colors.typeAColor,
        fontSize: 22,
        marginHorizontal:4
    },
    midTxt:{
        position:'absolute',
        top: '55%',
        paddingHorizontal:20
    },
    menu:{
        width:30,
        height:30,
        backgroundColor:'rgba(151,122,248,.6)',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:6
    },
    wrapper:{
        backgroundColor:"rgba(147,119,248,.8)",
        height:'35%',
        paddingHorizontal:20,
        paddingTop:Platform.OS === 'ios'? 50: 60
    },
    bottom: {
      position: 'absolute',
      bottom: "20%",
      left: 30,
      ...fontStyle.bold,
      color:Colors.typeAColor,
      fontSize: 16,
      marginHorizontal:4
    }
})