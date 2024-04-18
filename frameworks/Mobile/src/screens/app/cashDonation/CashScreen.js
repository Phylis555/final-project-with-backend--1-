import { FlatList, StyleSheet, View, ImageBackground } from 'react-native'
import React, { Component } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from './Header'
import Card from './Card'
import Loader from '../../../components/Loader'


export default class CashScreen extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: []
    }
  }

  

  componentDidMount () {
    fetch("https://onedonation.000webhostapp.com/api/cash.php")
    .then((response) => response.json())
    .then((responseJson) => {

      if (responseJson[0].message != "success") {
          alert('Database Empty');
          // this.props.navigation.navigate('home');
      }else{
        this.setState({
          isLoading: false,
          dataSource: responseJson[0].content
        })
      }
      
    })
    .catch((error) => {
        alert('Error: ' + error)
    })
  }


  render()
  {
    let { dataSource } = this.state
    return(
      <>
      <View style={styles.container}>
         <Header />
         <View style={styles.cntContainer}>
            <FlatList data={dataSource}
                style={{marginTop:15}}         
                renderItem={({item,index})=><Card details={item} />}
                keyExtractor={item=>item.id}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            />
         </View>
     </View>
     { this.state.isLoading ? <Loader /> : null }
     </>
    )
  }

}

const styles = StyleSheet.create({
    content:{
        paddingHorizontal: 20,
        paddingVertical:20,
        
    },
    container:{
        flex:1
    },
    cntContainer: {
        marginTop: -30,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        backgroundColor: 'whitesmoke'
    }
})