import React, { useState } from "react"
import { StyleSheet, View, Text } from "react-native"
import {Picker} from '@react-native-picker/picker'
import Colors from "../utils/colors"
import { withDecay } from "react-native-reanimated"
import { Dropdown } from 'react-native-element-dropdown';
import { categoryData } from "../utils/Constant"




const CategoryA = (props) => {
    
    const [selectedCategory, setSelectedCategory] =useState()

    // return (
    //     <View>
    //         <Text style={styles.label}>Category</Text>
    //         <View  style={styles.pickerContainer}>
    //             <Picker
    //                 selectedValue={selectedCategory}
    //                 onValueChange={(itemValue, itemIndex) =>
    //                     setSelectedCategory(itemValue)
    //                 }>
    //                 <Picker.Item label="general" value="General" />
    //                 <Picker.Item label="books" value="Books" />
    //                 <Picker.Item label="clothing" value="Clothing" />
    //                 <Picker.Item label="gadgets" value="Gadgets" />
    //             </Picker>
    //         </View>
    //     </View>
    // );

    return (
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={categoryData}
          search={false}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="בחר קטגוריה"
          {...props}
         
        //   onChange={item => {
        //     setSelectedCategory(item.value);
        //   }}
          
        />
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


// const styles = StyleSheet.create({
//     pickerContainer: {
//         height: 50,
//         borderColor: Colors.primary,
//         borderWidth: 2,
//         borderStyle: 'solid',
//         borderRadius: 10,
//         marginBottom: 10
//     },
//     label: {
//         fontSize: 16, 
//         fontWeight: '500', 
//         color: Colors.light, 
//         marginVertical: 10
//     }
// })

const styles = StyleSheet.create({
    dropdown: {
      margin: 16,
      height: 50,
      textAlign: 'right',
      flex:1,
      borderBottomColor: Colors.primary,
      borderBottomWidth: 0.5,
    },
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      fontSize: 16,
      textAlign: 'right'
    },
    selectedTextStyle: {
      fontSize: 16,
      textAlign: 'center'

    },
    iconStyle: {
      width: 20,
      height: 20,
     
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
      

    },
  });