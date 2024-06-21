import { FlatList, StyleSheet, View, RefreshControl } from 'react-native';
import React, { Component } from 'react';
import Header from './Header';
import Categories from './Categories';
import Card from './Card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllDonations, getOneDonation } from '../../../api/donator.api';

export default class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      token: null,
      isLoading: true,
      isRefreshing: false,

      donation: [],
      donationDetails: [],
      dataSource: [],
      filteredData: [],
      activeCategory: 'הכל',
      searchQuery: '',
      originalDataSource: [], // Original data source to preserve the data
    }
  }

  // Fetch user ID and token from AsyncStorage
  fetchData = async () => {
    const storedUserId = await AsyncStorage.getItem('user_id');
    const storedToken = await AsyncStorage.getItem('token');
    this.setState({ userId: storedUserId, token: storedToken });

    console.log("Fetched user ID:", storedUserId);
    console.log("Fetched Token access:", storedToken);

    this.loadDonations();
  };

  loadDonations = () => {
    getAllDonations()
      .then((res) => {
        this.setState({ isLoading: false });

        if (res.data.length > 0) {
          this.setState({
            donation: res.data,
            dataSource: res.data,
            filteredData: res.data,
            originalDataSource: res.data, // Set the original data source
            isLoading: false,
            isRefreshing: false,
          });

          Promise.all(
            res.data.map((donation) =>
              getOneDonation(donation._id,this.state.token).then((res) => res.data.donation)
            )
          ).then((donationDetails) => {
            this.setState({ donationDetails: donationDetails });
          });
        } else {
          alert('Database Empty');
          this.setState({ isLoading: false, isRefreshing: false });

          this.props.navigation.navigate('home');
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };


  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused && this.props.isFocused) {
      // Screen has come into focus, refresh data
      this.loadDonations();
    }
  }

  onCategorySelect = (category) => {
    const { donationDetails, originalDataSource } = this.state;

    let filteredData = [];
    let addedDonations = new Set(); // Use a Set to track added donations

    if (category.category === 'הכל') {
      this.setState({
        activeCategory: category.category,
        searchQuery: "",
        filteredData: originalDataSource, // Reset to original data source
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
      activeCategory: category.category,
      searchQuery: "",
      filteredData: filteredData,
    });
  }

  onSortSelect = (sortBy) => {
    let { filteredData, originalDataSource, activeCategory } = this.state;
    this.setState({ searchQuery: "" });

    let dataToSort = activeCategory === 'הכל' ? originalDataSource : filteredData;

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
      filteredData: activeCategory === 'הכל' ? originalDataSource : filteredData,
    });
  };

  onChangeSearch = (query) => {
    const { originalDataSource } = this.state;

    if (query === '') {
      this.setState({ searchQuery: query, filteredData: originalDataSource });
    } else {
      const filteredData = originalDataSource.filter((item) =>
        item.donationTitle.toLowerCase().includes(query.toLowerCase())
      );

      this.setState({ searchQuery: query, filteredData: filteredData });
    }
  };
  handleRefresh = () => {
    this.setState({ isRefreshing: true });
    this.loadDonations();
  };
  render() {
    const { filteredData, searchQuery, isRefreshing } = this.state;

    return (
      <View style={styles.container}>
        <Header />
        <Categories 
          onCategorySelect={this.onCategorySelect} 
          onSortPress={this.onSortSelect} 
          onChangeSearch={this.onChangeSearch} 
          searchQuery={searchQuery} 
        />
        <FlatList 
          data={filteredData}
          style={{ marginTop: 15 }}
          renderItem={({ item, index }) => <Card details={item} />}
          keyExtractor={(item) => item.id || item._id} // Ensure each item has a unique key
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl 
              refreshing={isRefreshing} 
              onRefresh={this.handleRefresh} 
            />
          }
          // onEndReached={this.handleLoadMore}
          // onEndReachedThreshold={0.5}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  container: {
    flex: 1
  },
});
