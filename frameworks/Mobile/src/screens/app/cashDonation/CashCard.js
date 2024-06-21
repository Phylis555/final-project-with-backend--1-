import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import fontStyle from '../../../utils/fontStyles';
import Colors from '../../../utils/colors';
import { useNavigation } from '@react-navigation/native';
import { Card,ProgressBar, MD3Colors  } from 'react-native-paper';
import { getRemainingTime } from '../../../components/getRemainingTime';
const CashCard = ({ details }) => {
  const navigation = useNavigation();
  const prog = ((details.currentAmount ) / (details.budget)) * 100;

  return (
    <Card style={styles.card} onPress={() => { navigation.navigate('cashActivity', { aid: details._id }) }}>
      <Card.Content style={styles.cardContent}>
        <Image source={{ uri: details.fundImage  }} resizeMode="cover" style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.title}>{details.title}</Text>
          <Text style={styles.target}>{details.target}</Text>

          <View style={[styles.row, { marginTop: 12 }]}>
            <View style={[styles.row, { width: '75%' }]}>
              <Text style={styles.amnt} numberOfLines={1} ellipsizeMode="tail">₪{details.currentAmount}</Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.amnt]} numberOfLines={1} ellipsizeMode="tail">₪ {details.budget}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.progressBG}>
              <View style={[styles.progress, { width: `${prog}%` }]} />
            </View>
          </View>

          <View style={[styles.row, { justifyContent: 'space-between', marginTop: 12 }]}>
            <View>
              <Text style={styles.infoLabel}>
                {details.status === "completed" ? "הסתיים בתאריך" : "נוצר בתאריך"}
              </Text>
              <Text style={styles.infoValue}>
                {new Date(details.status === "completed" ? details.endingDate : details.createdOn).toISOString().split('T')[0]}
              </Text>
            </View>
            <View>
              <Text style={styles.infoLabel}>זמן שנותר</Text>
              <Text style={[styles.infoValue, { color: 'red' }]}>{getRemainingTime(details.endingDate)}</Text>
            </View>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

export default CashCard;

const styles = StyleSheet.create({
  amnt: {
    ...fontStyle.medium,
    fontSize: 15,
    marginLeft: 5,
    marginTop: 3,
  },
  row: {
    flexDirection: 'row',
    flex:1,
    marginTop: 10,
  },
  title: {
    ...fontStyle.semibold,
    fontSize: 15,
    color: Colors.dark,
    textAlign: 'right',

  },
  target: {
    ...fontStyle.semibold,
    fontSize: 12,
    color: Colors.dark,
    textAlign: 'right'
},
  details: {
    marginLeft: 15,
    maxWidth: '70%',
    paddingRight: 10,
    paddingBottom: 15,
    alignSelf: 'center',
  },
  image: {
    width: 100,
    height: '80%',
    borderRadius: 10,
  },
  card: {
    minHeight: 120,
    width: '100%',
    marginBottom: 15,
    backgroundColor: 'whitesmoke',
    paddingHorizontal: 5,
    borderRadius: 15,
    elevation: 15,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowColor: 'silver',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBG: {
    width: '95%',
    height: 10,
    backgroundColor: '#C4CDD5',
    marginVertical: 0,
    borderRadius: 10,
  },
  progress: {
    height: 10,
    backgroundColor: Colors.yellow,
    borderRadius: 10,
  },
});
