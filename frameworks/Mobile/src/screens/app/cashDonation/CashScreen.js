import { FlatList, StyleSheet, View, RefreshControl } from 'react-native';
import React, { Component } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from './Header';
import CashCard from './CashCard';
import Loader from '../../../components/Loader';
import { getFundByStatus } from '../../../api/fund.api';

export default class CashScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      ongoingFunds: [],
      isRefreshing: false
    };
  }

  componentDidMount() {
    this.fetchFunds();

    // Disable the slide back gesture
    this.props.navigation.setOptions({
      gestureEnabled: false,
    });
  }

  fetchFunds = async () => {
    try {
      const res = await getFundByStatus('approved');
      this.setState({ ongoingFunds: res.data.funds, isLoading: false, isRefreshing: false });
    } catch (error) {
      console.error(error);
      this.setState({ isLoading: false, isRefreshing: false });
    }
  };

  handleRefresh = () => {
    this.setState({ isRefreshing: true });
    this.fetchFunds();
  };

  render() {
    const { ongoingFunds, isLoading, isRefreshing } = this.state;

    return (
      <>
        <View style={styles.container}>
          <Header />
          <View style={styles.cntContainer}>
            <FlatList
              data={ongoingFunds}
              style={{ marginTop: 15 }}
              renderItem={({ item, index }) => <CashCard details={item} />}
              keyExtractor={item => item._id}
              contentContainerStyle={styles.content}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={this.handleRefresh}
                />
              }
            />
          </View>
        </View>
        {isLoading ? <Loader /> : null}
      </>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  container: {
    flex: 1
  },
  cntContainer: {
    marginTop: -50,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    backgroundColor: 'whitesmoke'
  }
});
