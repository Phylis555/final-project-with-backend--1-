import React, { Component} from "react"
import {  
    Text, 
    ScrollView, 
    SafeAreaView, 
    StyleSheet ,
    Pressable,
    Image
} from "react-native"
import Topic from "../../../components/topic"
import { Feather } from "@expo/vector-icons"
import { TypeBInput } from "../../../components/customInput"
import CustomBtn1 from "../../../components/customButton"
import { CategoryB } from "../../../components/categorySelector"
import ContentLoader from "../../../components/LoadContent"

export default class AddFund extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            amount: 0,
            image: '',
            title: '',
            category: '',
            description: '',
            isUploading: false
        }
    }

    
    render() {

        let { image } = this.state.image

        return(
            <>
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Topic title={'Add Fundraising'} />

                    <Pressable style={styles.imgContainer} onPress={this.pickImage}>
                        <Feather name='plus' size={16} />
                        <Text>Choose Image</Text>
                    </Pressable>
                    {image && <Image source={{ uri: image.uri }} style={styles.selected} />}

                    <TypeBInput 
                        label='Title' 
                        height={50}
                        onChangeText={(title)=>this.setState({title})}
                    />
                    
                    <CategoryB />

                    <TypeBInput 
                        label='Brief Description'
                        multiline
                        numberOfLines={6}
                        onChangeText={(description)=>this.setState({description})}
                    />

                    <TypeBInput 
                        label='Amount' 
                        height={50} 
                        keyboardType={'numeric'}
                        onChangeText={(amount)=>this.setState({amount})}
                    />

                    <CustomBtn1 title='Post' onPress={() => alert("something")} />
                </ScrollView>
            </SafeAreaView>
            { this.state.isUploading ? <ContentLoader /> : null }
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 20,
        paddingHorizontal: 30
    },
    imgContainer: {
        height: 100,
        backgroundColor: '#d6d6d6',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    }
})