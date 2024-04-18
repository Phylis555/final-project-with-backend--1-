import React, { Component } from 'react'
import { SafeAreaView, 
    Text, 
    ScrollView, 
    StyleSheet,
    Image,
    Pressable 
} from 'react-native'
import CustomBtn1 from '../components/customButton'
import { TypeBInput } from '../components/customInput'
import { Feather } from '@expo/vector-icons'
import Topic from '../components/topic'
import * as ImagePicker from 'expo-image-picker';
import { CategoryA } from '../components/categorySelector'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ContentLoader from '../components/LoadContent'


export default class AddItem extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            image: null,
            title: '',
            category: 'general',
            location: '',
            quantity: 1,
            user_id: "",
            isUploading: false
        }
    }

    pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        if (!result.canceled) {
            this.setState({ image: result});
        }
    };

    // INSERT FUNCTION
    InsertFunc = ({navigation}) => {
        this.setState({isUploading: true})
        AsyncStorage.getItem('user_id').then((value) => {
            this.setState({user_id: value})

            var title = this.state.title
            var category = this.state.category
            var location = this.state.location
            var quantity = this.state.quantity
            var imgUrl = this.state.image.assets[0].uri
            var user_id = this.state.user_id

            var InsertUrl = "https://onedonation.000webhostapp.com/api/addItem.php";
            
            let data = new FormData();
            data.append('submit','ok');
            data.append('title', title);
            data.append('category', category);
            data.append('location', location);
            data.append('quantity', quantity);
            data.append('user_id', user_id);
            data.append('file',{type: 'image/jpg', uri:imgUrl, name:'uploadimagetmp.jpg'});
            
            fetch (
                InsertUrl,
                {
                    method: "POST",
                    body: data
                }
            )
            .then((response) => response.json())
            .then((response) => {
                this.setState({isUploading: false})
                if (response[0].message != 'success') {
                    alert(response[0].message);
                }else {
                    alert('Saved!');
                    this.setState({title: '', location: '', quantity: '', image: null})
                    this.props.navigation.goBack();
                }
            })
            .catch((error) => {
                this.setState({isUploading: false})
                alert('Error: ' + error);
            })
        })
        

    }

    render()
    {
        let { image } = this.state
        return(
            <>
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Topic title={'Add Item'} />

                    <Pressable style={styles.imgContainer} onPress={this.pickImage}>
                        <Feather name='plus' size={16} />
                        <Text>Choose Image</Text>
                    </Pressable>
                    {image && <Image source={{ uri: image.assets[0].uri }} style={styles.selected} />}

                    <TypeBInput 
                        label='Item Description' 
                        height={50}
                        onChangeText={(title)=>this.setState({title})}
                    />
                    
                    {/* Category Selector starts */}
                    <CategoryA 

                    />
                    

                    {/* Category Selector ends */}
                    <TypeBInput 
                        label='Location'
                        height={50}
                        onChangeText={(location)=>this.setState({location})}
                    />
                    <TypeBInput 
                        label='Quantity' 
                        height={50} 
                        keyboardType={'numeric'}
                        onChangeText={(quantity)=>this.setState({quantity})}
                    />

                    <CustomBtn1 title='Donate' onPress={this.InsertFunc} />
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
    },
    selected: {
        width: 150,
        height: 150,
        borderRadius: 10,
        borderColor: "#ffffff",
        borderStyle: 'solid',
        borderWidth: 8
    }
})