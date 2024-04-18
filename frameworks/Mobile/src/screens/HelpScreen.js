import React from "react"
import { View, Text, SafeAreaView, StyleSheet } from "react-native"

const Help = () => {
    return(
        <SafeAreaView style={styles.container}>
            <View>
                <Text>Help Screen Under Construction</Text>
            </View>
        </SafeAreaView>
    )
}

export default Help

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})