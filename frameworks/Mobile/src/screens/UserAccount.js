import React, { Component } from "react"
import { View, Text, SafeAreaView, ImageBackground, Image, StyleSheet } from "react-native"
import Colors from "../utils/colors"


export default class Account extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            user: 'Michael Forson'
        }
    }

    render() {

        let Uri = require('../../assets/images/accBg.jpg')
        let userImage = require('../../assets/images/profile.jpeg')
        return(
            <SafeAreaView style={styles.container}>
                <ImageBackground resizeMode='cover' source={Uri} style={styles.container}>
                    <View style={styles.content}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.img} source={userImage} />
                        </View>
                        <Text style={styles.user}> {this.state.user} </Text>
                        <View style={{flex:1, flexDirection: 'row', alignItems: 'baseline'}}>
                            <Text style={styles.lvlTxt}> Level One Donor </Text>
                            <View style={styles.lvlStat}></View>
                        </View>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    content: {
        backgroundColor: '#efefef',
        alignSelf: 'center',
        height: '50%',
        width: '80%',
        marginBottom: '40%',
        borderRadius: 15,
        alignItems: 'center'
    },
    imageContainer: {
        width: 130,
        height: 130,
        backgroundColor: 'rgba(151, 122, 248, .2)',
        borderRadius: 100,
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: '-20%'
    },
    img: {
        width: '75%',
        height: '75%',
        borderRadius: 100,
    },
    user: {
        fontSize: 19,
        fontWeight: '800',
        color: Colors.dark,
        paddingTop: 5,
    },
    lvlTxt: {
        fontSize: 15,
        color: 'rgba(0,0,0,.4)'
    },
    lvlStat: {
        width: 8,
        height: 8,
        backgroundColor:'#0fd415',
        borderRadius: 20,
        marginLeft: 5,
    },
})