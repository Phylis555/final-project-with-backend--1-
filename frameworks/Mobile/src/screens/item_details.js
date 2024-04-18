import React,  { Component } from "react";
import { View,
    Text,
    StyleSheet, 
    SafeAreaView, 
    ScrollView, 
    ImageBackground,
    Linking, 
    Pressable,
    Image
} from "react-native";
import Colors from "../utils/colors";
import Topic from "../components/topic";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../components/Loader";
import CustomBtn1 from "../components/customButton";


export default class ItemDetails extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            isLoading: true,
            details: [],
            user_id: '',
            mapUrl: ""
        }
    }


    componentDidMount = () => {
        
        var fetchUrl = "https://onedonation.000webhostapp.com/api/itemDetails.php"
        var data = {
            pid: this.props.route.params.pid
        }

        fetch(
            fetchUrl,
            {
                method: 'POST',
                headers: {
                    'Accept': 'aplication/json',
                    'Content-Type': 'application.json'
                },
                body: JSON.stringify(data)
            }
        )
        .then((response) => response.json())
        .then((responseJson) => {
    
          if (responseJson[0].message != 'success') {
              alert('Invalid Id');
              this.props.navigation.goBack();
          }else{
            this.setState({
              isLoading: false,
              details: responseJson[0].content
            })

            var location = this.state.details.location
            const myArr = location.split(" ")
            var newLoc = ""
            for (let index = 0; index < myArr.length; index++) {
                var item = myArr[index]
                newLoc = newLoc + item
                if ((index + 1) != myArr.length) {
                    newLoc = newLoc + "+"
                }
            }
            var link = "https://maps.google.com?q=" + newLoc
            this.setState({mapUrl: link})
          }
          
        })
        .catch((error)=>{
            alert('Error: '+ error);
            this.props.navigation.goBack();
        })

        AsyncStorage.getItem('user_id').then((value) => this.setState({user_id: value}))
        
    }

    mapHandler = () => {
        var location = this.state.details.location
        const myArr = location.split(" ")
        var newLoc = ""
        for (let index = 0; index < myArr.length; index++) {
            var item = myArr[index]
            newLoc = newLoc + item
            if ((index + 1) != myArr.length) {
                newLoc = newLoc + "+"
            }
        }
        return(newLoc)
    }

    render()
    {
        let { details } = this.state
        
        return(
            <>
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Topic title={'Item Details'}></Topic>
                    <View style={styles.content}>
                        <ImageBackground source={{uri: details.image}} style={styles.image}></ImageBackground>
                    </View>

                    <View style={{marginBottom: 30}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', lineHeight: 30, marginBottom: 40, color: Colors.dark}}> 
                            {details.title}
                        </Text>

                        <Text style={styles.details}>By:   
                            <Text style={{color: Colors.primary}}>                {details.name}</Text>
                        </Text>
                        <Text style={styles.details}>Quantity:     {details.quantity}</Text>
                        <Text style={styles.details}>Location:    <Text style={styles.link}
                            onPress={() => {
                                Linking.openURL(this.state.mapUrl)
                            }}>{details.location}</Text></Text>
                        <Text style={styles.details}>Email:         <Text style={styles.link}
                            onPress={() => {
                                var mail = details.email
                                var pname = details.title
                                var message = 'Hi, I want to know if your item; "' + pname + '" on OneDonation is  still available. Thank You'
                                Linking.openURL('mailto:' + mail +'?subject=Interested&body='+ message)}
                            }
                            >{details.email}</Text>
                        </Text>
                    </View>

                    <CustomBtn1 
                    onPress={() => this.props.navigation.navigate('courierList')}
                    title="Pick a Driver" />
                    

                    <Pressable onPress={() => {
                        Linking.openURL('https://web.facebook.com/devfreak/')
                    }}>
                        <Image source={require('../../assets/images/ad.png')} style={styles.ad}/>
                    </Pressable>

                    
                </ScrollView>
            </SafeAreaView>
            { this.state.isLoading ? <Loader /> : null }
            </>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
    },
    content: {
        flex: 1,
        height: 200,
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
        marginVertical: 5,
    },
    link: {
        color: Colors.primary,
        textDecorationLine: 'underline'
    },
    ad: {
        resizeMode: 'center',
        width: '100%',
        height: 200,
        marginBottom: 20
    }
})