import { ScrollView, StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Searchbar } from 'react-native-paper';
import Colors from '../../../utils/colors';
import { categories } from '../../../utils/Constant';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

const Categories = ({ onCategorySelect, onSortPress, onChangeSearch, searchQuery }) => {
  const [activeCategory, setActiveCategory] = useState('הכל');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const initialCategory = categories.find(category => category.category === 'הכל');
    if (initialCategory) {
      setActiveCategory(initialCategory);
      onCategorySelect(initialCategory);
    }
  }, []);

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
      <View style={styles.container}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category, index) => (
            <TouchableOpacity key={index} activeOpacity={0.7} onPress={() => { setActiveCategory(category); onCategorySelect(category) }}>
              <View style={{
                backgroundColor: category === activeCategory ? Colors.primary : Colors.light,
                marginRight: 36,
                borderRadius: 8,
                paddingHorizontal: 16,
                paddingVertical: 10,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.5,
                shadowRadius: 7,
                marginVertical: 16,
              }}>
                <Text style={{
                  color: category === activeCategory ? "#fff" : "#000",
                  fontSize: 18
                }}>{category.category}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.row}>
          <Searchbar
            placeholder="חיפוש"
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={styles.searchBar}
          />
          <TouchableOpacity
            style={styles.sortButton}
            onPress={toggleDropdown}
          >
            <Icon name="sort" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {dropdownVisible && (
          <View style={styles.dropdownContainer}>
            <View style={styles.dropdown}>
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
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Categories

const styles = StyleSheet.create({
  container: {
    zIndex: 1000, // Ensure the entire component has a higher zIndex
  },
  categoryText: {
    fontSize: 16,
    color: "gray",
  },
  sortButton: {
    backgroundColor: 'rgba(222, 103, 105, 0.5)',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 5,
    marginLeft: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 7,
    marginTop: 10,
  },
  row: {

    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  searchBar: {
    flex: 1,
    borderRadius: 5,
  },
  dropdownContainer: {
    position: 'absolute',
    right: 0,
    top: 60, // Adjust as needed to position below the sort button
    width: '50%',
    zIndex: 2000, // Higher zIndex to ensure it appears above other elements
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 7,
  },
  dropdownOption: {
    padding: 10,
  },
  dropdownOptionText: {
    fontSize: 16,
  },
});
