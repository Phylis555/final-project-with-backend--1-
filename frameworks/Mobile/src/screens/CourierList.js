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
                <Topic title={'Pick a Driver'}/>
                <SafeAreaView style={styles.content}>
                    <View>
                        <FlatList data={this.dataSource}
                        style={{marginTop:15}}         
                        renderItem={({item,index})=><DriverCard details={item} />}
                        keyExtractor={item=>item.id}
                        contentContainerStyle={styles.content}
                        showsVerticalScrollIndicator={false}
                        />
                    </View>
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
    }
})