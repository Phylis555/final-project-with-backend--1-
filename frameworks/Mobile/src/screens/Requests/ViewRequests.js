
import React, { Component } from "react";
import { View, Text, Button, ScrollView, ActivityIndicator, StyleSheet, Alert, Dimensions, SafeAreaView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApprovedRequests, getOneDonation, getRequests } from "../../api/donator.api";
import RequestCard from "./RequestCard";
import NoItems from "../../components/NoItems";
import { TabView, TabBar } from 'react-native-tab-view';
import  Colors  from "../../utils/colors";
import PDFLib, { PDFDocument, PDFPage } from 'react-native-pdf-lib';

const initialLayout = { width: Dimensions.get('window').width };

class ViewRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'בקשות שאושרו' },
        { key: 'second', title: 'בקשות שלא אושרו עדיין' },
      ],
      approvedRequests: [],
      pendingRequests: [],
      donation: {},
      loading: false,
      token: null
    };
  }

  fetchData = async () => {
    const storedToken = await AsyncStorage.getItem('token');
    this.setState({ token: storedToken });
  };

  componentDidMount = async () => {
    await this.fetchData(); // Ensure the token is fetched and set before making API calls
    const { token } = this.state;
    const { pid } = this.props.route.params;

    this.setState({ loading: true });

    try {
      const approvedRes = await getApprovedRequests(pid, token);
      if (approvedRes.data.length > 0) {
        this.setState({ approvedRequests: approvedRes.data });
        console.log("Approved requests:", approvedRes.data);
      }

      const requestsRes = await getRequests(pid, token);
      if (requestsRes.data.length > 0) {
        const approved = requestsRes.data.filter(request => request.requestStatus === 'accepted');
        const pending = requestsRes.data.filter(request => request.requestStatus !== 'accepted');
        this.setState({ approvedRequests: approved, pendingRequests: pending });
      }

      const donationRes = await getOneDonation(pid, token);
      this.setState({ donation: donationRes.data.donation });
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({ loading: false });
    }
  };

  setIndex = (index) => {
    this.setState({ index });
  };

  renderFirstRoute = () => {
    const { approvedRequests, donation } = this.state;
    return (
      <ScrollView style={styles.scrollView}>
        {approvedRequests.length === 0 ? (
          <NoItems />
        ) : (
          approvedRequests.map((request) => (
            <RequestCard
              key={request._id}
              name={request.requesterName}
              email={request.requesterEmail}
              contact={request.requesterContact}
              description={request.requestDescription}
              id={request._id}
              accepted={request.requestStatus}
              title={donation.donationTitle}
              items={request.items} // Pass requestedItems to RequestCard
            />
          ))
        )}
      </ScrollView>
    );
  };

  renderSecondRoute = () => {
    const { pendingRequests, donation } = this.state;
    return (
      <ScrollView style={styles.scrollView}>
        {pendingRequests.length === 0 ? (
          <NoItems />
        ) : (
          pendingRequests.map((request) => (
            <RequestCard
              key={request._id}
              name={request.requesterName}
              email={request.requesterEmail}
              contact={request.requesterContact}
              description={request.requestDescription}
              id={request._id}
              accepted={request.requestStatus}
              title={donation.donationTitle}
              items={request.items} // Pass requestedItems to RequestCard
            />
          ))
        )}
      </ScrollView>
    );
  };

  generateReport = async (requests) => {
    const { donation } = this.state;
    const tableRows = requests.map(request => {
      const requestedItems = request.requestedItems ? request.requestedItems.map(item => item.itemName).join(", ") : "";
      return [
        request.requesterName,
        request.requesterEmail,
        request.requesterContact,
        request.requestDescription,
        requestedItems,
      ].join(" | ");
    });

    const date = new Date();
    const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    const pdfPath = `${PDFLib.getDocumentsDirectory()}/Donations_Requests-${donation.donationTitle}_${dateString}.pdf`;

    const page1 = PDFPage
      .create()
      .setMediaBox(200, 200)
      .drawText(`בקשות עבור תרומה - ${donation.donationTitle}`, {
        x: 5,
        y: 180,
        color: '#000000',
        fontSize: 12,
        fontName: 'Helvetica',
      })
      .drawText(tableRows.join('\n'), {
        x: 5,
        y: 160,
        color: '#000000',
        fontSize: 10,
        fontName: 'Helvetica',
      });

    const docsDir = await PDFLib.getDocumentsDirectory();
    PDFDocument
      .create(pdfPath)
      .addPages(page1)
      .write() // Returns a promise that resolves with the PDF's path
      .then(path => {
        console.log('PDF created at: ' + path);
        Alert.alert('PDF created', `PDF has been created at ${path}`);
      });
  };
  renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: Colors.black }}
      style={{ backgroundColor: Colors.primary }}
    />
  );

  render() {
    const { loading } = this.state;

    if (loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      );
    }

    return (
      <SafeAreaView style={styles.safeArea}>
        <TabView
          navigationState={{ index: this.state.index, routes: this.state.routes }}
          renderTabBar={this.renderTabBar}
          renderScene={({ route }) => {
            switch (route.key) {
              case 'first':
                return this.renderFirstRoute();
              case 'second':
                return this.renderSecondRoute();
              default:
                return null;
            }
          }}
          onIndexChange={this.setIndex}
          initialLayout={initialLayout}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  center: {
    alignItems: "center",
    marginVertical: 10,
  },
  scrollView: {
    flex: 1,
  },
  tabContent: {
    marginVertical: 20,
  },
  tabTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  requestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  safeArea: {
    flex: 1,
  },
  scene: {
    flex: 1,
  },
});

export default ViewRequests;
