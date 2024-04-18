import React, { Component } from "react"
import { View, SafeAreaView, Text, StyleSheet, Button } from "react-native"

export default class UserHistory extends Component {
    constructor(props)
    {
        super(props)
        this.state = {

        }
    }

    render(){
        return(
            <SafeAreaView style={styles.container}>
                <View>
                    <Text>Screen Under Construction</Text>
                </View>
                <Button
                    onPress={() => this.props.navigation.goBack()}
                    title="Go Back"
                    color="#841584"
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})