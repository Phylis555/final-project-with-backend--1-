import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export default function NoItems() {
  return (
    <View style={styles.container}>
      <Text style={styles.noItemsHeader}>אין נתונים זמינים</Text>
      <LottieView
        source={require('../../assets/noItemsAnim.json')}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noItemsHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  animation: {
    width: 200,
    height: 200,
  },
});
