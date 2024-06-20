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


  // onCategorySelect = (category) => {
  //   // Filter data based on the selected category
  //   const { donationDetails,filteredData, dataSource } = this.state;
  //   let categoryArray = [];

  //   if(category.category == 'הכל')
  // {
  //       this.setState({
  //         activeCategory: category,
  //         filteredData : dataSource,
          
  //     });
  //     return;
  
  // }

    
//       donationDetails.forEach((don) => {
     
//           don.wantedItems.forEach((item) => {
//              // console.log(item);
//           if (item.item.itemCategory == category.category) {
//             categoryArray.push(don);
//           }
//         });
//         this.setState({
//             activeCategory: category,
//             filteredData : categoryArray,
//         });
//       });
//}
onCategorySelect = (category) => {
  const { donationDetails, dataSource } = this.state;
  let filteredData = [];
  let addedDonations = new Set(); // Use a Set to track added donations

  if (category.category === 'הכל') {
    this.setState({
      activeCategory: category,
      filteredData: dataSource,
    });
    return;
  }

  donationDetails.forEach((don) => {
    don.wantedItems.forEach((item) => {
      if (item.item.itemCategory === category.category) {
        if (!addedDonations.has(don._id)) {
          addedDonations.add(don._id);
          filteredData.push(don);
        }
      }
    });
  });

  this.setState({
    activeCategory: category,
    filteredData: filteredData,
  });
}

// onSortSelect = (sortBy) => {
//   let {filteredData } = this.state;

//   if (sortBy === "closestEndDate") {
//      filteredData.sort(
//       (a, b) => new Date(a.donationEndDate) - new Date(b.donationEndDate));
//     console.log(filteredData)
//   } else if (sortBy === "furthestEndDate") {
//     return filteredData.sort(
//       (a, b) => new Date(b.donationEndDate) - new Date(a.donationEndDate));
//   } else if (sortBy === "oldestCreatedDate") {
//     return filteredData.sort(
//       (a, b) => new Date(b.donationStartDate) - new Date(a.donationStartDate));
//   } else if (sortBy === "newestCreatedDate") {
//     return filteredData.sort(
//       (a, b) => new Date(a.donationStartDate) - new Date(b.donationStartDate));
//   } else if (sortBy === "popularity") {
//     return filteredData.sort((a, b) => b.numberOfRequests - a.numberOfRequests);
//   } else {
//     return filteredData;
//   }
// };
onSortSelect = (sortBy) => {
  let { filteredData, dataSource, activeCategory } = this.state;

  let dataToSort = activeCategory === 'הכל' ? dataSource : filteredData;

  switch (sortBy) {
    case "closestEndDate":
      dataToSort.sort(
        (a, b) => new Date(a.donationEndDate) - new Date(b.donationEndDate)
      );
      break;
    case "furthestEndDate":
      dataToSort.sort(
        (a, b) => new Date(b.donationEndDate) - new Date(a.donationEndDate)
      );
      break;
    case "oldestCreatedDate":
      dataToSort.sort(
        (a, b) => new Date(b.donationStartDate) - new Date(a.donationStartDate)
      );
      break;
    case "newestCreatedDate":
      dataToSort.sort(
        (a, b) => new Date(a.donationStartDate) - new Date(b.donationStartDate)
      );
      break;
    case "popularity":
      dataToSort.sort((a, b) => b.numberOfRequests - a.numberOfRequests);
      break;
    default:
      break;
  }

  this.setState({
    filteredData: activeCategory === 'הכל' ? dataSource : filteredData,
  });
};


  render()
  {

    const { dataSource,filteredData, activeCategory , } = this.state;

  
    console.log(filteredData);
    return(
      <View style={styles.container}>
         <Header />
         <View style={styles.dropdownContainer}>
          <Categories onCategorySelect={this.onCategorySelect} onSortPress={this.onSortSelect} activeCategory={activeCategory}  />
        </View>
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
    },
    dropdownContainer: {
      zIndex: 1000, // Ensure the dropdown appears above the FlatList
    },
})