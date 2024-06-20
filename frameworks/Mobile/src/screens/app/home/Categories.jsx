import { ScrollView, StyleSheet, Text, TouchableOpacity, View , TouchableWithoutFeedback} from 'react-native'
import React, { useState } from 'react'
import fontStyle from '../../../utils/fontStyles'
import Colors from '../../../utils/colors'
import { categories } from '../../../utils/Constant'
import Icon from '@expo/vector-icons/MaterialCommunityIcons';


const Categories = ({onCategorySelect, onSortPress }) => {
  const [activeCategory,setActiveCategory] = useState('הכל');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [sortBy, setSortBy] = useState("");


  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleSortOption = (option) => {
    onSortPress(option); // Call the passed sorting function
    setDropdownVisible(false);
  };

  const handleOutsidePress = () => {
    if (dropdownVisible) {
      setDropdownVisible(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>

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

      <TouchableOpacity 
        style={styles.sortButton} 
        onPress={toggleDropdown}
      >
        <Icon name="sort" size={20} color="#fff" />
      </TouchableOpacity>
            {dropdownVisible && (
        <View style={styles.dropdown}>
          {/* {['מספר תרומות', 'תאריך סיום קרוב ביותר', 'תאריך סיום רחוק ביותר', 'תאריך יצירה רחוק ביותר'].map((option, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.dropdownOption} 
              onPress={() => handleSortOption(option)}
            >
              <Text style={styles.dropdownOptionText}>{option}</Text>
            </TouchableOpacity>
          ))} */}

{[
              { label: 'מספר תרומות', value: 'popularity' },
              { label: 'תאריך סיום קרוב ביותר', value: 'closestEndDate' },
              { label: 'תאריך סיום רחוק ביותר', value: 'furthestEndDate' },
              { label: 'תאריך יצירה קרוב ביותר', value: 'newestCreatedDate' },
              { label: 'תאריך יצירה רחוק ביותר', value: 'oldestCreatedDate' }
            ].map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownOption}
                onPress={() => handleSortOption(option.value)}
              >
                <Text style={styles.dropdownOptionText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
             
        </View>
      )}
    </View>

    </TouchableWithoutFeedback>

    
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
    sortButton: {
      alignSelf: 'flex-end', // Align the button to the right
      backgroundColor:'rgba(222, 103, 105, 0.5)',
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 5,
      marginHorizontal:10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 7,
      marginTop: 10, // Add some space between categories and the button
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
        position: 'relative'
    },
    dropdown: {
      position: 'absolute',
      right: 20,
      top: 60, // Adjust as needed to position below the sort button
      backgroundColor: '#fff',
      borderRadius: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 7,
      zIndex: 1000, // Higher zIndex to ensure it appears above other elements
    },
    dropdownOption: {
      padding: 10,
    },
    dropdownOptionText: {
      fontSize: 16,
    },
  
})