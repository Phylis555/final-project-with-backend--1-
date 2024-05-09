import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import fontStyle from '../../../utils/fontStyles'
import Colors from '../../../utils/colors'
import { categories } from '../../../utils/Constant'


const Categories = ({onCategorySelect }) => {
  const [activeCategory,setActiveCategory] = useState('הכל');
  

  return (
    <View>
      <ScrollView horizontal howsHorizontalScrollIndicator={false} >
        {categories.map((category, index) => {
        
          return (
            <TouchableOpacity key={index} activeOpacity={0.7} onPress={()=>{setActiveCategory(category); onCategorySelect(category)}} >

        
            <View style={{ 
              backgroundColor: index === 0 ||category === activeCategory?Colors.primary : Colors.light ,
              marginRight:36,
              borderRadius: 8,
              paddingHorizontal: 16,
              paddingVertical:10,
              shadowColor: "#000",
              shadowOffset: { width: 0 , height: 4},
              shadowOpacity: 0.5,
              shadowRadius: 7,
              marginVertical: 16,}}>
                <Text style= {{
                  color:  category === activeCategory ? "#fff": "#000" ,
                  fontSize:18
                }}>{category.category}</Text>
            </View>
            </TouchableOpacity>
          );
        })}

      </ScrollView>
    </View>


    
  )
}

export default Categories

const styles = StyleSheet.create({
    category:{
    

    },
    categoryText:{
        //...fontStyle.medium,
        fontSize:16,
        color:"gray",
     
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