import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import fontStyle from '../../../utils/fontStyles'

// add your categories here
const categories = ['all','books','clothing','gadgets','others']

const Categories = () => {
    const [activeCategory,setActiveCategory] = useState('all')
  return (
    <ScrollView   showsHorizontalScrollIndicator={false} style={styles.container} contentContainerStyle={styles.content} horizontal>
      {categories.map(category=><TouchableOpacity activeOpacity={0.7} onPress={()=>setActiveCategory(category)} key={category} style={styles.category}>
        <Text style={[styles.categoryText,category === activeCategory && {color:"black"}]}>{category}</Text>
      </TouchableOpacity>)}
    </ScrollView>
  )
}

export default Categories

const styles = StyleSheet.create({
    category:{
        marginHorizontal:15
    },
    categoryText:{
        ...fontStyle.medium,
        fontSize:16,
        color:"gray",
        textTransform:'capitalize'
    },
    content:{
        justifyContent:'center',
        paddingRight:30,
        height:40
        
    },
    container:{
        maxHeight:40,
        marginTop:20,
        paddingHorizontal:20,
    }
})