import React,  { Component } from "react";
import { View,
    Text,
    StyleSheet, 
    SafeAreaView, 
    ScrollView, 
    ImageBackground,
    Linking } from "react-native"
import Colors from "../../../utils/colors"
import Topic from "../../../components/topic"
import { SimpleLineIcons } from '@expo/vector-icons'
import fontStyle from '../../../utils/fontStyles'
import CustomBtn1 from "../../../components/customButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../../../components/Loader";


export default class CashActivityDetails extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            isLoading: true,
            details: [],
            user_id: ''
        }
    }


    componentDidMount = () => {

        var fetchUrl = "https://onedonation.000webhostapp.com/api/cashActivityDetails.php"
        var data = {
            aid: this.props.route.params.aid
        }

        fetch(
            fetchUrl,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
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
            }
          
        })
        .catch((error)=>{
            alert('Error: '+ error);
            this.props.navigation.goBack();
        })

        AsyncStorage.getItem('user_id').then((value) => this.setState({user_id: value}))

    }

    render()
    {
        let { details } = this.state
        var prog = ((details.pamount)/(details.tamount))*100
        return(
            <>
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Topic title={'Details'}></Topic>
                    <View style={styles.content}>
                        <ImageBackground source={{uri: details.image}} style={styles.image}></ImageBackground>
                    </View>

                    <View style={{marginBottom: 60}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', lineHeight: 30, marginBottom: 40, color: Colors.dark}}> 
                            {details.title}
                        </Text>
                        
                    {/* ProgressBar Starts Here */}
                        <View style={styles.row}>
                            <SimpleLineIcons name="calendar" size={14} color={Colors.primary}  style={styles.calendar}/>
                            <Text style={{fontWeight: 'bold', marginLeft: 10}}>5 Days Left</Text>
                        </View>
                        <View style={styles.progressBG}>
                            <View style={[styles.progress,
                                    {
                                    width: `${prog}%`
                                    },
                                ]}
                            />
                        </View>
                        <View style={[styles.row, {marginTop: 12}]}>
                            <View style={[styles.row,{width:'75%', marginBottom: 30}]} >
                                <Text style={styles.amnt} numberOfLines={1} ellipsizeMode="tail">$ {details.pamount}</Text>
                            </View>

                            <View style={styles.row}>
                                <Text style={[styles.amnt, {color: Colors.light}]} numberOfLines={1} ellipsizeMode="tail">$ {details.tamount}</Text>
                            </View>
                        </View>

                        <Text style={styles.details}>By:   
                            <Text style={{color: Colors.light, fontWeight: 'bold'}}>                {details.name}</Text>
                        </Text>
                        <Text style={styles.details}>{details.description}</Text>

                    <CustomBtn1 title={'Donate'} style={{flex: 1}} onPress={()=>{
                        this.props.navigation.navigate('paymentGateway')
                    }}></CustomBtn1>
                    </View>

                    
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
        marginBottom: 25,
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
    amnt:{
        ...fontStyle.medium,
        fontSize:16,
        marginLeft:5,
        marginTop:3
    },
    row:{
        flexDirection:'row',
        alignItems:'center'
    },
    calendar: {
        padding: 6,
        backgroundColor: "rgba(139,109,247,.2)",
        borderRadius: 5
    }
})