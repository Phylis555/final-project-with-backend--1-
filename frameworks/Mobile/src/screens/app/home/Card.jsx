import { Image, Text, View, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { SimpleLineIcons } from '@expo/vector-icons';
import Colors from '../../../utils/colors';
import { useNavigation } from '@react-navigation/native';
import { getRemainingTime } from '../../../components/getRemainingTime';
import { Card, Title, Paragraph } from 'react-native-paper';

const CustomCard = ({ details }) => {
    const navigation = useNavigation();

    return (
        <Card style={styles.container} onPress={() => navigation.navigate('itemDetails', { pid: details._id })}>
            <Card.Content>
                <View style={styles.row}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: details?.donationImage }}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.content}>
                        <Title numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
                            {details?.donationTitle}
                        </Title>
                        <Paragraph numberOfLines={1} ellipsizeMode="tail" style={styles.description}>
                            {details?.donationDescription}
                        </Paragraph>
                        <View style={styles.infoContainer}>
                            <View style={styles.infoRow}>
                                <SimpleLineIcons name="location-pin" size={18} color={Colors.primary} />
                                <Text style={styles.infoText} numberOfLines={1} ellipsizeMode="tail">
                                    {details?.location}
                                </Text>
                            </View>
                            <View style={styles.infoRow}>
                                <SimpleLineIcons name="clock" size={18} color={Colors.primary} />
                                <Text style={styles.infoText} numberOfLines={1} ellipsizeMode="tail">
                                    נותרו {getRemainingTime(details.donationEndDate)}
                                </Text>
                            </View>
                            <Text style={styles.dateText}>
                                נוצר ב {new Date(details?.donationStartDate).toISOString().split('T')[0]}
                            </Text>
                        </View>
                    </View>
                </View>
            </Card.Content>
        </Card>
    );
};

export default CustomCard;

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        borderWidth: 1,
        padding: 5,
        borderColor: "lightgray",
        backgroundColor: '#fff',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '95%',
        alignSelf: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageContainer: {
        width: 95,
        height: 95,
        borderRadius: 16,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 16,
    },
    content: {
        paddingLeft: 16,
        justifyContent: "space-around",
        flex: 1,
        gap: 8,
    },
    title: {
        fontSize: 16, // Adjust the font size to fit the text better
        fontFamily: "Outfit_600SemiBold",
        textAlign: 'right',
    },
    description: {
        fontSize: 14,
        fontFamily: "Outfit_500Medium",
        color: "gray",
        textAlign: 'right',
    },
    infoContainer: {
        flexDirection: "column",
    },
    infoRow: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        marginVertical: 3,
    },
    infoText: {
        color: "gray",
        fontFamily: "Outfit_400Regular",
        marginLeft: 5,
    },
    dateText: {
        color: "gray",
        fontFamily: "Outfit_400Regular",
        textAlign: 'right',
        fontSize: 10,
    },
    iconInfo: {
        fontSize: 12,
        marginLeft: 5,
        flex: 1,
        flexShrink: 1, // Allow the text to shrink if necessary
    },
});
