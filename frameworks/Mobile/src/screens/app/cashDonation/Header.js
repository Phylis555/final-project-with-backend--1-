import { ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import Colors from '../../../utils/colors'
import fontStyle from '../../../utils/fontStyles'
import { useNavigation } from '@react-navigation/native'
import { FAB } from 'react-native-paper'


const Header = () => {

  const navigation = useNavigation();

  return (
     <ImageBackground imageStyle={styles.image} resizeMode='cover' source={require('../../../../assets/images/cashDonation.png')} style={styles.container}>
    <View style={styles.wrapper}>
    <FAB
        style={styles.fab}
        icon="home"
        onPress={() => navigation.navigate('home2')}

      />

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



fab: {
  position: 'absolute',
  margin: 16,
  left: 0,
  top: 40, // Adjust the position as needed
  backgroundColor: 'rgba(243, 195, 123, 0.8)',
},
wrapper:{
    backgroundColor:"rgba(0,0,0,0.2)",
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