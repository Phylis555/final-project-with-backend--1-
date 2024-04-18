import React, { useState } from "react"
import { StyleSheet, View, Text } from "react-native"
import {Picker} from '@react-native-picker/picker'
import Colors from "../utils/colors"
import { withDecay } from "react-native-reanimated"



const CategoryA = () => {
    
    const [selectedCategory, setSelectedCategory] =useState()

    return (
        <View>
            <Text style={styles.label}>Category</Text>
            <View  style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedCategory}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedCategory(itemValue)
                    }>
                    <Picker.Item label="general" value="General" />
                    <Picker.Item label="books" value="Books" />
                    <Picker.Item label="clothing" value="Clothing" />
                    <Picker.Item label="gadgets" value="Gadgets" />
                </Picker>
            </View>
        </View>
    );
}

const CategoryB = () => {
    
    const [selectedCategory, setSelectedCategory] =useState()

    return (
        <View>
            <Text style={styles.label}>Category</Text>
            <View  style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedCategory}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedCategory(itemValue)
                    }>
                    <Picker.Item label="General" value="general" />
                    <Picker.Item label="Technology" value="tech" />
                    <Picker.Item label="Food" value="food" />
                </Picker>
            </View>
        </View>
    );
}

export { CategoryA, CategoryB };


const styles = StyleSheet.create({
    pickerContainer: {
        height: 50,
        borderColor: Colors.primary,
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 10,
        marginBottom: 10
    },
    label: {
        fontSize: 16, 
        fontWeight: '500', 
        color: Colors.light, 
        marginVertical: 10
    }
})