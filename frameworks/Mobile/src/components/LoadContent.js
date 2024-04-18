import React from "react"
import { View, StyleSheet } from "react-native"
import LottieView from "lottie-react-native"


export default function ContentLoader() {
    return(
        <View style={[ StyleSheet.absoluteFillObject, styles.container]}>
            <LottieView 
                source={require('../../assets/contentloader.json')}
                autoPlay
                loop
                style={{width: 150, height: 150}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 1
    }
})