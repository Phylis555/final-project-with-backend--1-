import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    ImageBackground,
    Alert,
    Pressable
} from "react-native";
import { TextInput, Button, Modal, Portal, Provider } from 'react-native-paper';
import { SimpleLineIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../../../utils/colors";
import Topic from "../../../components/topic";
import CustomBtn1 from "../../../components/customButton";
import Loader from "../../../components/Loader";
import fontStyle from '../../../utils/fontStyles';
import { getFundByID, donateFund } from "../../../api/fund.api";
import { getRemainingTime } from "../../../components/getRemainingTime";
import { cardValidation } from "./cardValidation";

export default class CashActivityDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            details: [],
            user_id: '',
            token: '',
            donationModalVisible: false,
            donationAmount: '',
            cardDetails: {},
            formErrors: {},
            isSubmit: false,
            

        };
    }

    componentDidMount = () => {
        const data = {
            aid: this.props.route.params.aid
        };
        this.fetchFund(data.aid);

        AsyncStorage.getItem('user_id').then((value) => this.setState({ user_id: value }));
        AsyncStorage.getItem('token').then((value) => this.setState({ token: value }));

        // Disable the slide back gesture
        this.props.navigation.setOptions({
            gestureEnabled: false,
        });
    }

    fetchFund = (fundID) => {
        this.setState({ isLoading: true });
        getFundByID(fundID)
            .then(res => {
                this.setState({ details: res.data.fund, isLoading: false });
            })
            .catch(err => {
                console.log(err);
                this.setState({ isLoading: false });
            });
    }

    handleDonation = () => {
        const { donationAmount, cardDetails, formErrors, token } = this.state;
        const { details, user_id } = this.state;

        this.setState({ formErrors: cardValidation(cardDetails) });

        if (donationAmount <= 0 || donationAmount === undefined) {
            this.setState({ formErrors: { ...formErrors, donationAmount: "סכום התרומה חייב להיות גדול מאפס" } });
        } else if (donationAmount > details.budget - details.currentAmount) {
            this.setState({ formErrors: { ...formErrors, donationAmount: "סכום התרומה חייב להיות נמוך מהתקציב הנותר" } });
        } else {
            donateFund(details._id, {
                userID: user_id,
                fundID: details._id,
                amount: donationAmount,
                organizationID: details.organizationID,
            }, token)
                .then((res) => {
                    if (res && res.status == 201) {
                        this.setState({ cardDetails: {}, donationAmount: '', donationModalVisible: false, isSubmit: false });
                        Alert.alert("התרומה הצליחה", "", [{ text: "OK", onPress: () => this.fetchFund(details._id) }]);
                        this.props.navigation.navigate('cashScreen');
                    } else {
                        Alert.alert("התרומה נכשלה", "");
                    }
                })
                .catch((err) => {
                    console.log('API Error:', err);
                    Alert.alert("התרומה נכשלה", "");
                    this.setState({ isSubmit: false });
                });
        }
    };

    render() {
        const { details, donationModalVisible, donationAmount, cardDetails, formErrors } = this.state;
        const prog = ((details.currentAmount) / (details.budget)) * 100;

        return (
            <Provider>
                <SafeAreaView style={styles.container}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Topic title={details.title}></Topic>
                        <View style={styles.content}>
                            {details.fundImage ? (
                                <ImageBackground source={{ uri: details.fundImage }} style={styles.image} />
                            ) : (
                                <Text>Image not available</Text>
                            )}
                        </View>

                        <View style={{ marginBottom: 60 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', lineHeight: 30, marginBottom: 40, color: Colors.dark, textAlign: 'right' }}>
                                {details.target}
                            </Text>

                            <View style={styles.row}>
                                <SimpleLineIcons name="calendar" size={14} color={Colors.primary} style={styles.calendar} />
                                <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>{getRemainingTime(details.endingDate)}</Text>
                            </View>
                            <View style={styles.progressBG}>
                                <View style={[styles.progress, { width: `${prog}%` }]} />
                            </View>
                            <View style={[styles.row, { marginTop: 12 }]}>
                                <View style={[styles.row, { flex: 1, marginRight: 10 }]}>
                                    <Text style={styles.amnt} numberOfLines={1} ellipsizeMode="tail">₪ {details.currentAmount}</Text>
                                </View>
                                <View style={[styles.row, { alignItems: 'flex-end' }]}>
                                    <Text style={[styles.amnt, { color: 'red' }]} numberOfLines={1} ellipsizeMode="tail">₪ {details.budget}</Text>
                                </View>
                            </View>
                            <View style={[styles.row, { marginTop: 12 }]}>
                                <Text style={[styles.row, { flex: 1, marginRight: 10 }]}>Email:
                                    <Text style={{ color: Colors.yellow, fontWeight: 'bold' }}> {details.contactEmail}</Text>
                                </Text>

                                <Text style={[styles.row, { alignItems: 'flex-end' }]}>Phone:
                                    <Text style={{ color: Colors.yellow, fontWeight: 'bold' }}> {details.contactNumber}</Text>
                                </Text>
                            </View>
                            <Text style={styles.details}>{details.description}</Text>
                            <CustomBtn1 title={'לתרומה'} style={{ flex: 1 }} onPress={() => {
                                this.setState({ donationModalVisible: true });
                            }}></CustomBtn1>
                        </View>
                    </ScrollView>
                </SafeAreaView>

                <Portal>
                    <Modal visible={donationModalVisible} onDismiss={() => this.setState({ donationModalVisible: false })} contentContainerStyle={styles.modalContainer}>
                        <SafeAreaView style={styles.modalContent}>
                            <ScrollView contentContainerStyle={styles.scrollView}>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        label="סכום (₪)"
                                        mode="outlined"
                                        keyboardType="numeric"
                                        value={donationAmount}
                                        onChangeText={(text) => {
                                            if (/^\d*$/.test(text)) this.setState({ donationAmount: text });
                                        }}
                                        style={styles.input}
                                    />
                                    {formErrors.donationAmount && <Text style={styles.errorText}>{formErrors.donationAmount}</Text>}
                                </View>

                                <Text style={styles.sectionHeader}>פרטי כרטיס אשראי</Text>

                                <View style={styles.inputContainer}>
                                    <TextInput
                                        label="שם בעל הכרטיס"
                                        mode="outlined"
                                        value={cardDetails.name || ''}
                                        onChangeText={(text) => this.setState({ cardDetails: { ...cardDetails, name: text } })}
                                        style={styles.input}
                                    />
                                    {formErrors.name && <Text style={styles.errorText}>{formErrors.name}</Text>}
                                </View>

                                <View style={styles.inputContainer}>
                                    <TextInput
                                        label="מספר כרטיס"
                                        mode="outlined"
                                        keyboardType="numeric"
                                        maxLength={19}
                                        value={cardDetails.cardNumber || ''}
                                        onChangeText={(text) => {
                                            this.setState({
                                                cardDetails: {
                                                    ...cardDetails,
                                                    cardNumber: text.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim()
                                                }
                                            });
                                        }}
                                        style={styles.input}
                                    />
                                    {formErrors.cardNumber && <Text style={styles.errorText}>{formErrors.cardNumber}</Text>}
                                </View>

                                <View style={styles.row}>
                                    <View style={styles.halfWidthContainer}>
                                        <TextInput
                                            label="תוקף"
                                            mode="outlined"
                                            keyboardType="numeric"
                                            value={cardDetails.cardExpiry || ''}
                                            onChangeText={(text) => {
                                                let value = text;
                                                if (value.length === 2 && value.indexOf('/') === -1) {
                                                    value += '/';
                                                }
                                                if (value.length > 5) {
                                                    value = value.substr(0, 5);
                                                }
                                                const [month, year] = value.split('/').map(num => parseInt(num, 10));
                                                const currentYear = new Date().getFullYear() % 100;
                                                const currentMonth = new Date().getMonth() + 1;

                                                let errorMessage = '';
                                                if (!isNaN(month) && !isNaN(year)) {
                                                    if (year < currentYear || (year === currentYear && month < currentMonth)) {
                                                        errorMessage = 'תוקף הכרטיס חייב להיות גדול מהתאריך של היום';
                                                    }
                                                }

                                                this.setState({
                                                    cardDetails: { ...cardDetails, cardExpiry: value },
                                                    formErrors: { ...formErrors, cardExpiry: errorMessage }
                                                });
                                            }}
                                            style={[styles.input, styles.halfWidth]}
                                        />
                                        {formErrors.cardExpiry && <Text style={styles.errorText}>{formErrors.cardExpiry}</Text>}
                                    </View>

                                    <View style={styles.halfWidthContainer}>
                                        <TextInput
                                            label="CVV"
                                            mode="outlined"
                                            keyboardType="numeric"
                                            secureTextEntry={true}
                                            maxLength={3}
                                            value={cardDetails.cvv || ''}
                                            onChangeText={(text) => {
                                                if (/^\d{0,3}$/.test(text))
                                                    this.setState({ cardDetails: { ...cardDetails, cvv: text } });
                                            }}
                                            style={[styles.input, styles.halfWidth]}
                                        />
                                        {formErrors.cvv && <Text style={styles.errorText}>{formErrors.cvv}</Text>}
                                    </View>
                                </View>

                                <Button mode="contained" onPress={this.handleDonation} style={styles.button}>
                                    לתרומה
                                </Button>
                            </ScrollView>
                        </SafeAreaView>
                    </Modal>
                </Portal>

                {this.state.isLoading ? <Loader /> : null}
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        flex: 1
    },
    content: {
        height: 180,
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 10
    },
    image: {
        flex: 1,
    },
    details: {
        fontSize: 17,
        fontWeight: '400',
        margin: 25,
        textAlign: 'right',
        backgroundColor: '#C4CDD5'
    },
    link: {
        color: Colors.primary,
        textDecorationLine: 'underline'
    },
    progressBG: {
        width: '95%',
        height: 10,
        backgroundColor: '#C4CDD5',
        marginVertical: 5,
        borderRadius: 10,
    },
    progress: {
        width: '50%',
        height: 10,
        backgroundColor: Colors.primary,
        borderRadius: 10,
    },
    amnt: {
        ...fontStyle.medium,
        fontSize: 16,
        marginLeft: 5,
        marginTop: 3
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    calendar: {
        padding: 6,
        backgroundColor: "rgba(139,109,247,.2)",
        borderRadius: 5
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        height: '85%',
        borderRadius: 10,
    },
    modalContent: {
        flex: 1,
    },
    scrollView: {
        flexGrow: 1,
    },
    input: {
        marginVertical: 10,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'right',
    },
    errorText: {
        color: 'red',
        textAlign: 'right',
        marginBottom: 10,
    },
    halfWidth: {
        flex: 1,
        marginHorizontal: 5,
    },
    button: {
        marginVertical: 20,
    },
    inputContainer: {
        marginBottom: 10,
    },
    halfWidthContainer: {
        flex: 1,
        marginRight: 5,
    },
});

///////////////////////////////////////////

