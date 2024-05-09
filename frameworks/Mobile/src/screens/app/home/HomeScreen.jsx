import { FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState,Component } from 'react'
import Header from './Header'
import Categories from './Categories'
import Card from './Card'
import { getAllDonations, getOneDonation } from '../../../api/donator.api'
/////////////לא מוצא את הטוקן לסדר בבוקר

export default class HomeScreen extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      userId: null,
      token: null,
      isLoading: true,
      donation: [],
      donationDetails: [],
      dataSource: [],
      filteredData: [],
      activeCategory: 'הכל',
      //details: []

    }
  }

     // Fetch user ID and token from AsyncStorage
     fetchData = async () => {
    
      
      const storedUserId = await AsyncStorage.getItem('user_id');
      const storedToken = await AsyncStorage.getItem('token');
      this.setState({ userId: storedUserId, token: storedToken });

      console.log("Fetched user ID:", storedUserId);
      console.log("Fetched Token access:", storedToken);
  };


componentDidMount() {


  getAllDonations()
      .then((res) => {
       this.setState({ isLoading :false });

        if (res.data.length > 0) {
          this.setState({  donation : res.data });
          this.setState({  dataSource : res.data });

         console.log("///////////////donation");
          console.log(this.state.donation);
          Promise.all(
            res.data.map((donation) =>
              getOneDonation(donation._id).then((res) => res.data.donation)
              
            )
          ).then((donationDetails) => {

          this.setState({  donationDetails : donationDetails });
  
          });
        }else{
          alert('Database Empty');
          this.props.navigation.navigate('home');
        }

      })
      .catch((e) => {
     //   isLoading = false;
        console.log(e);
      });
  }


  onCategorySelect = (category) => {
    // Filter data based on the selected category
    const { donationDetails,filteredData, dataSource } = this.state;
    let categoryArray = [];

    if(category.category == 'הכל')
  {
        this.setState({
          activeCategory: category,
          filteredData : dataSource,
          
      });
      return;
  
  }

    
      donationDetails.forEach((don) => {
     
          don.wantedItems.forEach((item) => {
             // console.log(item);
          if (item.item.itemCategory == category.category) {
            categoryArray.push(don);
          }
        });
        this.setState({
            activeCategory: category,
            filteredData : categoryArray,
        });
      });
}


  render()
  {

    const { dataSource,filteredData, activeCategory , } = this.state;

  
    console.log(filteredData);
    return(
      <View style={styles.container}>
         <Header />
         <Categories onCategorySelect={this.onCategorySelect} activeCategory={activeCategory} />
         <FlatList data={activeCategory == 'הכל'? dataSource : filteredData}
         
         style={{marginTop:15}}         
         renderItem={({item,index})=><Card details={item} />}
         keyExtractor={(item) => item.id || item._id }   // Ensure each item has a unique key
         contentContainerStyle={styles.content}
         showsVerticalScrollIndicator={false}
         />
     </View>
    )
  }

}

const styles = StyleSheet.create({
  content:{
    paddingHorizontal:20,
    paddingVertical:20
    
  },
    container:{
        flex:1
    }
})