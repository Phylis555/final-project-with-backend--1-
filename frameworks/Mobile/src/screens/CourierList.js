import React, { Component } from "react"
import { View, 
    StyleSheet,
    ScrollView, 
    SafeAreaView,
    Text,
    FlatList
} from "react-native"
import Topic from "../components/topic"
import DriverCard from "../components/DriverProfile"
import { TypeBInput } from "../components/customInput"
import Colors from "../utils/colors"

////////// dont need this screen, maybe for admin

export default class CourierList extends Component {
    constructor(props)
    {
        super(props)
        this.state = {}
    }

    dataSource = [
        {
            id: 2,
            name: "Adam",
            image: require("../../assets/images/cardImage.jpg")
        },
        {
            id: 3,
            name: 'Prince',
            image: require("../../assets/images/cardImage.jpg")
        }
    ]

    render() {
        return(
            
            <View style={styles.container}>
                <Topic title={'שלח בקשה'}/>
                <SafeAreaView style={styles.content}>
                <TypeBInput label="שם מלא*"  height={50} onChangeText={(donationTitle) => this.setState({ donationTitle })} />
                <TypeBInput label='מספר טלפון' height={50} keyboardType="phone-pad" />
                <TypeBInput label="אימייל*"  height={50} onChangeText={(donationTitle) => this.setState({ donationTitle })} />
                <TypeBInput label="תיאור אודות התרומה*"  height={80} multiline={true}numberOfLines={4} onChangeText={(donationDescription) => this.setState({ donationDescription })} />
                <Text style={styles.label}>הוספת פריטים:</Text>

                </SafeAreaView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 15
    },
    content: {
        marginHorizontal: 10
    },
        label: {
        fontSize: 16, 
        fontWeight: '500', 
        color: Colors.primary, 
        textAlign: 'right',
        marginVertical: 10
      },
})