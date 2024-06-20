

// import React, { useState, useEffect } from 'react';
// import {
// 	View, Text,
// 	StyleSheet, TouchableOpacity,
//     Image,
//     FlatList,
//     ScrollView,
//     SafeAreaView
// } from 'react-native';
// import Icon from '@expo/vector-icons/MaterialCommunityIcons';
// import AsyncStorage from '@react-native-async-storage/async-storage'

// import { getPendingDonations, getRejectedDonations, getOngoingDonations, getCompletedDonations } from '../api/donator.api';
// import PendingCard from './StatusCards/PendingCard';



// import Colors from '../utils/colors';
// import ActiveCard from './StatusCards/ActiveCard';
// import CompleteCard from './StatusCards/CompleteCard';

// const DashboardProfile = () => {
// 	const [activeSection, setActiveSection] = useState('Home');
//     const [pendinDonations, setPendingDonations] = useState([]);
//     const [rejectedDonations, setRejectedDonations] = useState([]);
//     const [ongoingDonations, setOngoingDonations] = useState([]);
//     const [completeDonations, setCompleteDonations] = useState([]);




//     const [userId, setUserId] = useState("");
//     const [token, setToken] = useState("");


//      // Fetch user ID and token
//      useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const storedUserId = await AsyncStorage.getItem('user_id');
//                 const storedToken = await AsyncStorage.getItem('token');
//                 setUserId(storedUserId);
//                 setToken(storedToken);
//                 console.log("Fetched user ID:", storedUserId);
//                 console.log("Fetched Token access:", storedToken);
//             } catch (error) {
//                 console.error(error);
//             }
//         };

//         fetchData();
//     }, []);

//         // Fetch donations
//         useEffect(() => {
//             const fetchDonations = async () => {
//                 if (userId && token) {
//                     try {
//                         const [pendingRes, rejectedRes, ongoingRes, completedRes] = await Promise.all([
//                             getPendingDonations(userId, token),
//                             getRejectedDonations(userId, token),
//                             getOngoingDonations(userId, token),
//                             getCompletedDonations(userId, token)
//                         ]);
    
//                         setPendingDonations(pendingRes.data);
//                         setRejectedDonations(rejectedRes.data);
//                         setOngoingDonations(ongoingRes.data);
//                         setCompleteDonations(completedRes.data);
    
//                         console.log("Pending Donations:", pendingRes.data);
//                         console.log("Rejected Donations:", rejectedRes.data);
//                         console.log("Ongoing Donations:", ongoingRes.data);
//                         console.log("Completed Donations:", completedRes.data);
//                     } catch (error) {
//                         console.error(error);
//                     }
//                 }
//             };
    
//             fetchDonations();
//         }, [userId, token]);


//     //    // Fetch pending donations when userId and token are set
//     // useEffect(() => {
//     //     if (userId && token) {
//     //         const fetchPendingDonations = async () => {
//     //             try {
//     //                 const res = await getPendingDonations(userId, token);
//     //                 if (res.data.length > 0) {
//     //                     setPendingDonations(res.data);
                        
//     //                     console.log(res.data);
//     //                 }
//     //             } catch (error) {
//     //                 console.error(error);
//     //             }
//     //         };

//     //         fetchPendingDonations();
//     //     }
//     // }, [userId, token]);

//     // useEffect(() => {
//     //     //fetching all inbound item data from the database
//     //     getRejectedDonations(userId,token)
//     //       .then((res) => {
//     //         console.log(res);
//     //         if (res.data.length > 0) {
//     //             setRejectedDonations(res.data);
//     //           console.log(res.data);
//     //           //   console.log(donations);
//     //         }
//     //       })
//     //       .catch((e) => {
//     //         console.log(e);
//     //       });
//     //   }, [userId, token]);

//     //   useEffect(() => {
//     //     //fetching all inbound item data from the database
//     //     getOngoingDonations(userId,token)
//     //       .then((res) => {
//     //         console.log(res);
//     //         if (res.data.length > 0) {
//     //             setOongoindDonations(res.data);

//     //           console.log(res.data);
//     //           //   console.log(donations);
//     //         }
//     //       })
//     //       .catch((e) => {
//     //         console.log(e);
//     //       });
//     //   }, [userId, token]);

      
//     //   useEffect(() => {
//     //     //fetching all inbound item data from the database
//     //     getCompletedDonations(userId,token)
//     //       .then((res) => {
//     //         console.log(res);
//     //         if (res.data.length > 0) {
//     //             setCompleteDonations(res.data);
//     //             console.log("////completeeeee don");

//     //           console.log(res.data);
//     //         }
//     //       })
//     //       .catch((e) => {
//     //         console.log(e);
//     //       });
//     //   }, [userId]);




// 	const renderSection = () => {
// 		switch (activeSection) {
// 			case 'Profile':
// 				return <ProfileSection />;
// 			case 'Settings':
// 				return <SettingsSection />;
// 			case 'Complete':
// 				return <CompleteSection />;
// 			case 'Pending':
// 				return <PendingSection />;
// 			case 'Ongoing':
// 				return <OngoingSection />;
// 			case 'Rejected':
// 				return <RejectedSection />;
// 			default:
// 				return <HomeSection />;
// 		}
// 	};

// 	const renderBackButton = () => (
// 		<TouchableOpacity
// 			onPress={
// 				() =>
// 					setActiveSection('Home')
// 			} style={styles.backButton}>
// 			<Icon name="arrow-left"
// 				size={30} color="#000000" />
			
// 		</TouchableOpacity>
// 	);

// 	const HomeSection = () => (
// 		<SafeAreaView style={styles.container}>
// 			<View style={styles.headerContainer}>
// 				<Text style={styles.headerTitle}>
// 					לוח מעקב - תורמים
// 				</Text>
// 				<View style={styles.buttonsContainer}>
//                 <Image source={require('../../assets/icon_logo.png')} style={styles.image}  />

// 					{/* <TouchableOpacity onPress=
// 						{
// 							() =>
// 								setActiveSection('Profile')
// 						} style={styles.button}>
// 						<Icon name="person"
// 							size={30} color="white" />
// 						<Text style={styles.buttonText}>
// 							Profile
// 						</Text>
// 					</TouchableOpacity>
// 					<TouchableOpacity
// 						onPress={
// 							() =>
// 								setActiveSection('Settings')
// 						} style={styles.button}>
// 						<Icon name="settings"
// 							size={30} color="white" />
// 						<Text style={styles.buttonText}>
// 							Settings
// 						</Text>
// 					</TouchableOpacity> */}
// 				</View> 
// 			</View>
// 			<View style={styles.featuresContainer}>
// 				<PressableFeatureBox name="תרומות שהושלמו"
// 					icon="archive-check-outline" onPress=
// 					{
// 						() => setActiveSection('Complete')
// 					} />
// 				<PressableFeatureBox name="תרומות בהמתנה לאישור"
// 					icon="archive-clock-outline" onPress=
// 					{
// 						() => setActiveSection('Pending')
// 					} />
// 				<PressableFeatureBox name="תרומות פעילות"
// 					icon="archive-arrow-up-outline" onPress=
// 					{
// 						() => setActiveSection('Ongoing')
// 					} />
// 				<PressableFeatureBox name="תרומות שנדחו"
// 					icon="archive-cancel-outline" onPress=
// 					{
// 						() => setActiveSection('Rejected')
// 					} />
// 			</View>
// 		</SafeAreaView>
// 	);
// 	// const ProfileSection = () => (
// 	// 	<View style={styles.container}>
// 	// 		<View style={styles.headerContainer}>
// 	// 			{renderBackButton()}
// 	// 			<Text style={styles.headerTitle}>
// 	// 				Profile Section
// 	// 			</Text>
// 	// 		</View>
// 	// 		<View style={styles.contentContainer}>
// 	// 			<Icon name="person" size={80}
// 	// 				color="#3498db" />
// 	// 			<Text style={styles.contentText}>
// 	// 				Username: Maniiish
// 	// 			</Text>
// 	// 			<Text style={styles.contentText}>
// 	// 				Email: manish.pra@example.com
// 	// 			</Text>

// 	// 		</View>
// 	// 	</View>
// 	// );

// 	// const SettingsSection = () => (
// 	// 	<View style={styles.container}>
// 	// 		<View style={styles.headerContainer}>
// 	// 			{renderBackButton()}
// 	// 			<Text style={styles.headerTitle}>
// 	// 				Settings Section
// 	// 			</Text>
// 	// 		</View>
// 	// 		<View style={styles.contentContainer}>
// 	// 			<Icon name="settings" size={80}
// 	// 				color="#3498db" />
// 	// 			<Text style={styles.contentText}>
// 	// 				Notifications: On
// 	// 			</Text>
// 	// 			<Text style={styles.contentText}>
// 	// 				Theme: Light
// 	// 			</Text>

// 	// 		</View>
// 	// 	</View>
// 	// );

// 	const PressableFeatureBox = (
// 		{ name, icon,
// 			onPress
// 		}
// 	) => (
// 		<TouchableOpacity onPress={onPress}
// 			style={styles.featureBox}>
// 			<Icon name={icon} size={50}
// 				color= {Colors.primary} />
// 			<Text style={styles.featureName}>
// 				{name}
// 			</Text>
// 		</TouchableOpacity>
// 	);

// 	const CompleteSection = () => (
//         <View style={styles.container}>
//         <View style={styles.headerContainer}>
//             {renderBackButton()}
//             <Text style={styles.headerTitle}>
//                 תרומות שהושלמו
//             </Text>
//         </View>
//         <View style={styles.listContainer}>
//             <FlatList
//                 data={completeDonations}
//                 renderItem={({ item, index }) => <CompleteCard details={item} />}
//                 keyExtractor={(item) => item.id || item._id}
//                 contentContainerStyle={styles.listContentContainer}
//                 showsVerticalScrollIndicator={true}
//             />
//         </View>
//     </View>
// 	);

// 	const PendingSection = () => (
// 		<View style={styles.container}>
// 			<View style={styles.headerContainer}>
// 				{renderBackButton()}
// 				<Text style={styles.headerTitle}>
// 					תרומות בהמתנה לאישור
// 				</Text>
// 			</View>
// 			<View style={styles.listContainer}>
// 				<FlatList
// 					data={pendinDonations}
// 					renderItem={({ item, index }) => <PendingCard details={item} />}
// 					keyExtractor={(item) => item.id || item._id}
// 					contentContainerStyle={styles.listContentContainer}
// 					showsVerticalScrollIndicator={true}
// 				/>
// 			</View>
// 		</View>
// 	);

// 	const OngoingSection = () => (
//         <View style={styles.container}>
//         <View style={styles.headerContainer}>
//             {renderBackButton()}
//             <Text style={styles.headerTitle}>
//             תרומות פעילות           
//              </Text>
//         </View>
//         <View style={styles.listContainer}>
//             <FlatList
//                 data={ongoingDonations}
//                 renderItem={({ item, index }) => <ActiveCard details={item} />}
//                 keyExtractor={(item) => item.id || item._id}
//                 contentContainerStyle={styles.listContentContainer}
//                 showsVerticalScrollIndicator={true}
//             />
//         </View>
//     </View>
// 	);
// 	const RejectedSection = () => (
// 		<View style={styles.container}>
// 			<View style={styles.headerContainer}>
// 				{renderBackButton()}
// 				<Text style={styles.headerTitle}>
//                 תרומות שנדחו
// 				</Text>
// 			</View>
// 			<View style={styles.listContainer}>
// 				<FlatList
// 					data={rejectedDonations}
// 					renderItem={({ item, index }) => <PendingCard details={item} />}
// 					keyExtractor={(item) => item.id || item._id}
// 					contentContainerStyle={styles.listContentContainer}
// 					showsVerticalScrollIndicator={true}
// 				/>
// 			</View>
// 		</View>
// 	);

// 	const TaskItem = (
// 		{
// 			title,
// 			description
// 		}) => (
// 		<View style={styles.taskItem}>
// 			<Text style={styles.taskTitle}>
// 				{title}
// 			</Text>
// 			<Text style={styles.taskDescription}>
// 				{description}
// 			</Text>
// 		</View>
// 	);

// 	const EventItem = (
// 		{ date, time,
// 			title, location
// 		}) => (
// 		<View style={styles.eventItem}>
// 			<View style={styles.eventDateTime}>
// 				<Text style={styles.eventDate}>
// 					{date}
// 				</Text>
// 				<Text style={styles.eventTime}>
// 					{time}
// 				</Text>
// 			</View>
// 			<Text style={styles.eventTitle}>
// 				{title}
// 			</Text>
// 			<Text style={styles.eventLocation}>
// 				{location}
// 			</Text>
// 		</View>
// 	);
// 	const styles = StyleSheet.create({
// 		container: {
// 			flex: 1,
//             backgroundColor: Colors.light
// 		},
// 		headerContainer: {
// 			backgroundColor: Colors.primary,
// 			padding: 20,
// 			borderBottomLeftRadius: 20,
// 			borderBottomRightRadius: 20,
// 			elevation: 5,
//             alignItems: 'center',
//             height:'20%'

// 		},
// 		headerTitle: {
// 			fontSize: 24,
// 			fontWeight: 'bold',
// 			color: 'white',
// 			marginBottom: 20,
// 		},
// 		buttonsContainer: {
// 			flexDirection: 'row',
// 			justifyContent: 'space-between',
// 		},
// 		button: {
// 			flexDirection: 'row',
// 			alignItems: 'center',
// 			backgroundColor: '#2ecc71',
// 			padding: 10,
// 			borderRadius: 5,
// 		},
// 		buttonText: {
// 			color: 'white',
// 			fontSize: 16,
// 			fontWeight: 'bold',
// 			marginLeft: 10,
// 		},
// 		featuresContainer: {
// 			flex: 1,
// 			flexDirection: 'row',
// 			flexWrap: 'wrap',
// 			justifyContent: 'space-around',
// 			marginTop: 20,
// 		},
// 		featureBox: {
// 			alignItems: 'center',
// 			justifyContent: 'center',
// 			width: '45%',
// 			aspectRatio: 1,
// 			backgroundColor: 'white',
// 			borderRadius: 10,
// 			marginVertical: 10,
//             shadowColor: '#000', 
//             shadowOffset: { width: 0, height: 2 }, 
//             shadowOpacity: 0.25, 
//             shadowRadius: 4, 
//             elevation: 5, 

// 		},
// 		featureName: {
// 			marginTop: 10,
// 			fontSize: 16,
// 			fontWeight: 'bold',
// 			color: '#555',
// 		},
// 		backButton: {
            
//                 position: "absolute",
//                 top: 40,
//                 left: 16,
//                 zIndex: 10,
//                 borderRadius: 5,
//                 height: 40,
//                 width: 40,
//                 justifyContent: "center",
//                 alignItems: "center",
//                 backgroundColor: "rgba(200, 200, 200, 0.5)",
            
// 		},
// 		backButtonText: {
// 			color: '#3498db',
// 			fontSize: 16,
// 			marginLeft: 10,
// 		},
// 		contentContainer: {
// 			flex: 1,
// 			padding: 20,
// 		},
// 		contentText: {
// 			fontSize: 16,
// 			marginBottom: 10,
// 			color: '#555',
// 		},
// 		contentTitle: {
// 			fontSize: 20,
// 			fontWeight: 'bold',
// 			color: '#333',
// 			marginBottom: 10,
// 		},
// 		taskItem: {
// 			backgroundColor: '#3498db',
// 			borderRadius: 10,
// 			padding: 15,
// 			marginVertical: 10,
// 		},
// 		taskTitle: {
// 			color: 'white',
// 			fontSize: 18,
// 			fontWeight: 'bold',
// 		},
// 		taskDescription: {
// 			color: 'white',
// 			fontSize: 14,
// 			marginTop: 5,
// 		},
// 		eventItem: {
// 			backgroundColor: 'white',
// 			borderRadius: 10,
// 			padding: 15,
// 			marginVertical: 10,
// 			elevation: 5,
// 		},
// 		eventDateTime: {
// 			flexDirection: 'row',
// 			justifyContent: 'space-between',
// 			marginBottom: 10,
// 		},
// 		eventDate: {
// 			color: '#3498db',
// 			fontSize: 16,
// 			fontWeight: 'bold',
// 		},
// 		eventTime: {
// 			color: '#555',
// 			fontSize: 16,
// 		},
// 		eventTitle: {
// 			fontSize: 18,
// 			fontWeight: 'bold',
// 			color: '#333',
// 		},
// 		eventLocation: {
// 			fontSize: 14,
// 			color: '#777',
// 		},
//         listContainer: {
// 			flex: 1,
// 		},
// 		listContentContainer: {
// 			padding: 20,
// 		},
// 	});

// 	return <View style={styles.container}>
// 		{renderSection()}
// 	</View>;
// };

// export default DashboardProfile;
import React, { useState, useEffect } from 'react';
import {
	View, Text,
	StyleSheet, TouchableOpacity,
    Image,
    FlatList,
    ScrollView,
    SafeAreaView
} from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage'

import { getPendingDonations, getRejectedDonations, getOngoingDonations, getCompletedDonations } from '../api/donator.api';
import PendingCard from './StatusCards/PendingCard';
import Colors from '../utils/colors';
import ActiveCard from './StatusCards/ActiveCard';
import CompleteCard from './StatusCards/CompleteCard';

const DashboardProfile = () => {
	const [activeSection, setActiveSection] = useState('Home');
    const [pendingDonations, setPendingDonations] = useState([]);
    const [rejectedDonations, setRejectedDonations] = useState([]);
    const [ongoingDonations, setOngoingDonations] = useState([]);
    const [completeDonations, setCompleteDonations] = useState([]);

    const [userId, setUserId] = useState("");
    const [token, setToken] = useState("");

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

	const renderSection = () => {
		switch (activeSection) {
			case 'Profile':
				return <ProfileSection />;
			case 'Settings':
				return <SettingsSection />;
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

	const HomeSection = () => (
		<SafeAreaView style={styles.container}>
			<View style={styles.headerContainer}>
				<Text style={styles.headerTitle}>לוח מעקב - תורמים</Text>
				<View style={styles.buttonsContainer}>
                	<Image source={require('../../assets/icon_logo.png')} style={styles.image} />
				</View>
			</View>
			<View style={styles.featuresContainer}>
				<PressableFeatureBox name="תרומות שהושלמו" icon="archive-check-outline" count={completeDonations.length} onPress={() => setActiveSection('Complete')} />
				<PressableFeatureBox name="תרומות בהמתנה לאישור" icon="archive-clock-outline" count={pendingDonations.length} onPress={() => setActiveSection('Pending')} />
				<PressableFeatureBox name="תרומות פעילות" icon="archive-arrow-up-outline" count={ongoingDonations.length} onPress={() => setActiveSection('Ongoing')} />
				<PressableFeatureBox name="תרומות שנדחו" icon="archive-cancel-outline" count={rejectedDonations.length} onPress={() => setActiveSection('Rejected')} />
			</View>
		</SafeAreaView>
	);

	const PressableFeatureBox = ({ name, icon, count, onPress }) => (
		<TouchableOpacity onPress={onPress} style={styles.featureBox}>
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
		<View style={styles.container}>
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
				/>
			</View>
		</View>
	);

	const PendingSection = () => (
		<View style={styles.container}>
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
				/>
			</View>
		</View>
	);

	const OngoingSection = () => (
		<View style={styles.container}>
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
				/>
			</View>
		</View>
	);

	const RejectedSection = () => (
		<View style={styles.container}>
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
				/>
			</View>
		</View>
	);

	const styles = StyleSheet.create({
		container: {
			flex: 1,
            backgroundColor: Colors.light
		},
		headerContainer: {
			backgroundColor: Colors.primary,
			padding: 20,
			borderBottomLeftRadius: 20,
			borderBottomRightRadius: 20,
			elevation: 5,
            alignItems: 'center',
            height: '20%'
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
			position: 'absolute',
			top: 20,
			left: 20,
		},
		image: {
            width: 100,
            height: 100,
            borderRadius: 50
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
	});

	return <View style={{ flex: 1 }}>{renderSection()}</View>;
};

export default DashboardProfile;
