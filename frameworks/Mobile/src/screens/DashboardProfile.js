import React, { useState, useEffect } from 'react';
import {
    View, Text,
    StyleSheet, TouchableOpacity,
    Image,
    FlatList,
    Platform,
    SafeAreaView,
    ImageBackground,
    RefreshControl
} from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getPendingDonations, getRejectedDonations, getOngoingDonations, getCompletedDonations } from '../api/donator.api';
import PendingCard from './StatusCards/PendingCard';
import Colors from '../utils/colors';
import ActiveCard from './StatusCards/ActiveCard';
import CompleteCard from './StatusCards/CompleteCard';
import { FAB } from 'react-native-paper';

const DashboardProfile = ({ navigation }) => {
    const [activeSection, setActiveSection] = useState('Home');
    const [pendingDonations, setPendingDonations] = useState([]);
    const [rejectedDonations, setRejectedDonations] = useState([]);
    const [ongoingDonations, setOngoingDonations] = useState([]);
    const [completeDonations, setCompleteDonations] = useState([]);
    const [userId, setUserId] = useState("");
    const [token, setToken] = useState("");
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Fetch user ID and token
    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedUserId = await AsyncStorage.getItem('user_id');
                const storedToken = await AsyncStorage.getItem('token');
                setUserId(storedUserId);
                setToken(storedToken);
                console.log("Fetched user ID:", storedUserId);
                console.log("Fetched Token access:", storedToken);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    // Fetch donations
    useEffect(() => {
        const fetchDonations = async () => {
            if (userId && token) {
                try {
                    const [pendingRes, rejectedRes, ongoingRes, completedRes] = await Promise.all([
                        getPendingDonations(userId, token),
                        getRejectedDonations(userId, token),
                        getOngoingDonations(userId, token),
                        getCompletedDonations(userId, token)
                    ]);

                    setPendingDonations(pendingRes.data);
                    setRejectedDonations(rejectedRes.data);
                    setOngoingDonations(ongoingRes.data);
                    setCompleteDonations(completedRes.data);

                    console.log("Pending Donations:", pendingRes.data);
                    console.log("Rejected Donations:", rejectedRes.data);
                    console.log("Ongoing Donations:", ongoingRes.data);
                    console.log("Completed Donations:", completedRes.data);
                } catch (error) {
                    console.error(error);
                }
            }
        };

        fetchDonations();
    }, [userId, token]);

    const handleRefresh = () => {
        setIsRefreshing(true);
        // Fetch donations
        if (userId && token) {
            const fetchDonations = async () => {
                try {
                    const [pendingRes, rejectedRes, ongoingRes, completedRes] = await Promise.all([
                        getPendingDonations(userId, token),
                        getRejectedDonations(userId, token),
                        getOngoingDonations(userId, token),
                        getCompletedDonations(userId, token)
                    ]);

                    setPendingDonations(pendingRes.data);
                    setRejectedDonations(rejectedRes.data);
                    setOngoingDonations(ongoingRes.data);
                    setCompleteDonations(completedRes.data);
                    setIsRefreshing(false);
                } catch (error) {
                    console.error(error);
                    setIsRefreshing(false);
                }
            };

            fetchDonations();
        }
    };

    const renderSection = () => {
        switch (activeSection) {
            case 'Complete':
                return <CompleteSection />;
            case 'Pending':
                return <PendingSection />;
            case 'Ongoing':
                return <OngoingSection />;
            case 'Rejected':
                return <RejectedSection />;
            default:
                return <HomeSection />;
        }
    };

    const renderBackButton = () => (
        <TouchableOpacity
            onPress={() => setActiveSection('Home')}
            style={styles.backButton}>
            <Icon name="arrow-left" size={30} color="#000000" />
        </TouchableOpacity>
    );

    const renderSeparator = () => (
        <View
            style={{
                height: 10, // Adjust the height as needed for the spacing between cards
                backgroundColor: 'transparent', // Adjust based on your design
            }}
        />
    );

    const HomeSection = () => (
        <View style={[styles.container, styles.shadow]}>

            <View style={styles.headerContainer}>
                <FAB
                    style={styles.fab}
                    icon="arrow-left"
                    onPress={() => navigation.goBack()}
                />
                <Text style={styles.headerTitle}>לוח מעקב - תורמים</Text>
            </View>
            <View style={styles.featuresContainer}>
                <PressableFeatureBox name="תרומות שהושלמו" icon="archive-check-outline" count={completeDonations.length} onPress={() => setActiveSection('Complete')} />
                <PressableFeatureBox name="תרומות בהמתנה לאישור" icon="archive-clock-outline" count={pendingDonations.length} onPress={() => setActiveSection('Pending')} />
                <PressableFeatureBox name="תרומות פעילות" icon="archive-arrow-up-outline" count={ongoingDonations.length} onPress={() => setActiveSection('Ongoing')} />
                <PressableFeatureBox name="תרומות שנדחו" icon="archive-cancel-outline" count={rejectedDonations.length} onPress={() => setActiveSection('Rejected')} />
            </View>
        </View>
    );

    const PressableFeatureBox = ({ name, icon, count, onPress }) => (
        <TouchableOpacity onPress={onPress} style={[styles.featureBox, styles.shadow]}>
            <Icon name={icon} size={50} color={Colors.primary} />
            <Text style={styles.featureName}>{name}</Text>
            {count > 0 && (
                <View style={styles.countContainer}>
                    <Text style={styles.countText}>{count}</Text>
                </View>
            )}
        </TouchableOpacity>
    );

    const CompleteSection = () => (
        <View style={[styles.container, styles.shadow]}>
            <View style={styles.headerContainer}>
                {renderBackButton()}
                <Text style={styles.headerTitle}>תרומות שהושלמו</Text>
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    data={completeDonations}
                    renderItem={({ item, index }) => <CompleteCard details={item} />}
                    keyExtractor={(item) => item.id || item._id}
                    contentContainerStyle={styles.listContentContainer}
                    showsVerticalScrollIndicator={true}
                    ItemSeparatorComponent={renderSeparator} // Add space between items
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={handleRefresh}
                        />
                    }
                />
            </View>
        </View>
    );

    const PendingSection = () => (
        <View style={[styles.container, styles.shadow]}>
            <View style={styles.headerContainer}>
                {renderBackButton()}
                <Text style={styles.headerTitle}>תרומות בהמתנה לאישור</Text>
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    data={pendingDonations}
                    renderItem={({ item, index }) => <PendingCard details={item} />}
                    keyExtractor={(item) => item.id || item._id}
                    contentContainerStyle={styles.listContentContainer}
                    showsVerticalScrollIndicator={true}
                    ItemSeparatorComponent={renderSeparator} // Add space between items
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={handleRefresh}
                        />
                    }
                />
            </View>
        </View>
    );

    const OngoingSection = () => (
        <View style={[styles.container, styles.shadow]}>
            <View style={styles.headerContainer}>
                {renderBackButton()}
                <Text style={styles.headerTitle}>תרומות פעילות</Text>
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    data={ongoingDonations}
                    renderItem={({ item, index }) => <ActiveCard details={item} />}
                    keyExtractor={(item) => item.id || item._id}
                    contentContainerStyle={styles.listContentContainer}
                    showsVerticalScrollIndicator={true}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={handleRefresh}
                        />
                    }
                />
            </View>
        </View>
    );

    const RejectedSection = () => (
        <View style={[styles.container, styles.shadow]}>
            <View style={styles.headerContainer}>
                {renderBackButton()}
                <Text style={styles.headerTitle}>תרומות שנדחו</Text>
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    data={rejectedDonations}
                    renderItem={({ item, index }) => <PendingCard details={item} />}
                    keyExtractor={(item) => item.id || item._id}
                    contentContainerStyle={styles.listContentContainer}
                    showsVerticalScrollIndicator={true}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={handleRefresh}
                        />
                    }
                />
            </View>
        </View>
    );

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            //  backgroundColor: Colors.light,
            borderRadius: 10, // Add border radius for better shadow effect
        },
        headerContainer: {
            backgroundColor: Colors.primary,
            padding: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            elevation: 5,
            alignItems: 'center',
            height: '20%',
            paddingTop: Platform.OS === 'ios' ? 60 : 70
        },
        headerTitle: {
            fontSize: 24,
            fontWeight: 'bold',
            color: 'white',
            marginBottom: 20,
        },
        buttonsContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        featuresContainer: {
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            marginTop: 20,
        },
        featureBox: {
            alignItems: 'center',
            justifyContent: 'center',
            width: '45%',
            height: 150,
            backgroundColor: 'white',
            marginBottom: 20,
            borderRadius: 20,
            elevation: 5,
            padding: 10,
            position: 'relative',
        },
        featureName: {
            fontSize: 18,
            marginTop: 10,
            textAlign: 'center',
        },
        backButton: {
            position: "absolute",
            top: 40,
            left: 16,
            zIndex: 10,
            borderRadius: 5,
            height: 40,
            width: 40,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(200, 200, 200, 0.5)",
        },
        image: {
            width: 105,
            height: 105,
            borderRadius: 30
        },
        countContainer: {
            position: 'absolute',
            top: 10,
            right: 10,
            backgroundColor: Colors.primary,
            borderRadius: 12,
            width: 24,
            height: 24,
            justifyContent: 'center',
            alignItems: 'center',
        },
        countText: {
            color: 'white',
            fontSize: 14,
            fontWeight: 'bold',
        },
        listContainer: {
            flex: 1, // Take remaining space after the header
            paddingTop: 10, // Adjust as per your design
        },
        listContentContainer: {
            flexGrow: 1, // Allow the list to grow within its container
            margin: 10
        },
        shadow: {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        fab: {
            position: 'absolute',
            margin: 16,
            left: 0,
            top: 40, // Adjust the position as needed
            backgroundColor: 'rgba(243, 195, 123, 0.8)',
        },
    });

    return (
        <ImageBackground
            source={require('../../assets/images/bg_logo.png')}
            style={{ flex: 1 }}
        >
            <View style={{ flex: 1 }}>
                {renderSection()}
            </View>
        </ImageBackground>
    );
};

export default DashboardProfile;
