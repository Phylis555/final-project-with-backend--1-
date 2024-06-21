// import { Image, Pressable, StyleSheet, TouchableOpacity,Text, View } from 'react-native'
// import React from 'react'
// import fontStyle from '../../../utils/fontStyles'
// import { SimpleLineIcons } from '@expo/vector-icons'
// import Colors from '../../../utils/colors'
// import { useNavigation } from '@react-navigation/native'
// import { getRemainingTime } from '../../../components/getRemainingTime'

// const Card = ({details}) => {
// import { Image, Pressable, StyleSheet, TouchableOpacity,Text, View } from 'react-native'
// import React from 'react'
// import fontStyle from '../../../utils/fontStyles'
// import { SimpleLineIcons } from '@expo/vector-icons'
// import Colors from '../../../utils/colors'
// import { useNavigation } from '@react-navigation/native'
// import { getRemainingTime } from '../../../components/getRemainingTime'

// const Card = ({details}) => {

//     const navigation = useNavigation();

// return (
//     <TouchableOpacity onPress={() => {navigation.navigate('itemDetails', {pid: details._id})}}>
//       <View style={styles.card}>
//         <View style={styles.cardImgWrapper}>
//           <Image
//             source={{uri: details.donationImage}}
//             resizeMode="cover"
//             style={styles.cardImg}
//           />
//         </View>
//         <View style={styles.cardInfo}>
//           <View>
//           <Text style={styles.cardTitle}>{details.donationTitle}</Text>
//           <Text numberOfLines={2} style={styles.cardDetails}>{details.donationDescription}</Text>

//           <View style={styles.row}>
//              <View  style={{flexDirection: 'row', flex: 1}}>
//                  <SimpleLineIcons name="location-pin" size={14} color={Colors.primary} />
//                  <Text style={styles.iconInfo} numberOfLines={1} ellipsizeMode="tail">{details.location}</Text>
//              </View>

//              <View style={{flexDirection: 'row', flex: 1}}>
//              <SimpleLineIcons name="clock" size={14} color={Colors.primary} />
//                  <Text style={styles.iconInfo} numberOfLines={1} ellipsizeMode="tail">{getRemainingTime(details.donationEndDate)}</Text>
//             </View>

//             <View style={{flexDirection: 'row', flex: 1}}>
//              <SimpleLineIcons name="people" size={14} color={Colors.primary} />
//                  <Text style={styles.iconInfo} numberOfLines={1} ellipsizeMode="tail">{details.numberOfRequests}</Text>
//             </View>
//          </View>

//          </View>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

// }

// export default Card

// const styles = StyleSheet.create({
//     card: {
//       height: 100,
//       marginVertical: 10,
//       flexDirection: 'row',
//       shadowColor: '#999',
//       shadowOffset: {width: 0, height: 1},
//       shadowOpacity: 0.8,
//       shadowRadius: 2,
//       elevation: 5,
//     },
//     cardImgWrapper: {
//       flex: 1,
//     },
//     cardImg: {
//       height: '100%',
//       width: '100%',
//       alignSelf: 'center',
//       borderRadius: 8,
//       borderBottomRightRadius: 0,
//       borderTopRightRadius: 0,
//     },
//     cardInfo: {
//       flex: 2,
//       padding: 10,
//       borderColor: '#ccc',
//       borderWidth: 1,
//       borderLeftWidth: 0,
//       borderBottomRightRadius: 8,
//       borderTopRightRadius: 8,
//       backgroundColor: '#fff',
//     },
//     cardTitle: {
//       fontWeight: 'bold',
//     },
//     cardDetails: {
//       fontSize: 12,
//       color: '#444',
//     },
//         iconInfo:{
//         ...fontStyle.regular,
//         fontSize:12,
//         marginLeft:5,
//         marginTop:3
//     },

//     row:{
//         flexDirection:'row',
//         justifyContent:'space-between',
//         margin:10,
//         overflow: 'hidden', // Ensures content doesn't slip out

//         // position: 'absolute',
//         // bottom: 0,
//         // left: 0,
//         // right: 0,
//      },
//   });

import {
  Image,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import React from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import Colors from "../../../utils/colors";
import { useNavigation } from "@react-navigation/native";
import { getRemainingTime } from "../../../components/getRemainingTime";

const Card = ({ details }) => {
  const navigation = useNavigation();

  return (
    // <TouchableOpacity onPress={() => navigation.navigate('itemDetails', { pid: details._id })}>
    //     <View style={styles.card}>
    //         <View style={styles.cardImgWrapper}>
    //             <Image
    //                 source={{ uri: details.donationImage }}
    //                 resizeMode="cover"
    //                 style={styles.cardImg}
    //             />
    //         </View>
    //         <View style={styles.cardInfo}>
    //             <View style={styles.textContainer}>
    //                 <Text style={styles.cardTitle}>{details.donationTitle}</Text>
    //                 <Text numberOfLines={2} style={styles.cardDetails}>{details.donationDescription}</Text>

    //                 <View style={styles.row}>
    //                     <View style={styles.iconRow}>
    //                         <SimpleLineIcons name="location-pin" size={14} color={Colors.primary} />
    //                         <Text style={styles.iconInfo} numberOfLines={1} ellipsizeMode="tail">{details.location}</Text>
    //                     </View>

    //                     <View style={styles.iconRow}>
    //                         <SimpleLineIcons name="clock" size={14} color={Colors.primary} />
    //                         <Text style={styles.iconInfo} numberOfLines={1} ellipsizeMode="tail">{getRemainingTime(details.donationEndDate)}</Text>
    //                     </View>

    //                     <View style={styles.iconRow}>
    //                         <SimpleLineIcons name="people" size={14} color={Colors.primary} />
    //                         <Text style={styles.iconInfo} numberOfLines={1} ellipsizeMode="tail">{details.numberOfRequests}</Text>
    //                     </View>
    //                 </View>
    //             </View>
    //         </View>
    //     </View>
    // </TouchableOpacity>
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate("itemDetails", { pid: details._id })}
    >
      {/* {favourite && (
          <View style={styles.favourite}>
            <Ionicons name={"bookmark"} size={26} color={COLORS.primary} />
          </View>
        )} */}

      <View style={{ flexDirection: "row" }}>
        <View style={{ width: 95, height: 95, borderRadius: 16 }}>
          <Image
            source={{ uri: details?.donationImage }}
            style={{
              width: "100%",
              height: "100%",
              overflow: "hidden",
              borderRadius: 16,
            }}
          />
        </View>

        <View
          style={{
            paddingLeft: 16,
            justifyContent: "space-around",
            flex: 1,
            gap: 8,
          }}
        >
          <View>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 18,
                fontFamily: "Outfit_600SemiBold",
                textAlign: "right",
              }}
            >
              {details?.donationTitle}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 14,
                fontFamily: "Outfit_500Medium",
                color: "gray",
                textAlign: "right",
              }}
            >
              {details?.donationDescription}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{}}>
              <View
                style={{ flexDirection: "row-reverse", flex: 1, margin: 3 }}
              >
                <SimpleLineIcons
                  name="location-pin"
                  size={18}
                  color={Colors.primary}
                />

                <Text
                  style={{ color: "gray", fontFamily: "Outfit_400Regular" }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {" "}
                  {details?.location}
                </Text>
              </View>

              <View
                style={{ flexDirection: "row-reverse", flex: 1, margin: 3 }}
              >
                <SimpleLineIcons
                  name="clock"
                  size={18}
                  color={Colors.primary}
                />

                <Text
                  style={{
                    color: Colors.primary,
                    fontFamily: "Outfit_400Regular",
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {" "}
                  נותרו {getRemainingTime(details.donationEndDate)}
                </Text>
              </View>
              <Text
                style={{
                  color: "gray",
                  fontFamily: "Outfit_400Regular",
                  textAlign: "right",
                  fontSize: 10,
                }}
              >
                {" "}
                נוצר ב{" "}
                {
                  new Date(details?.donationStartDate)
                    .toISOString()
                    .split("T")[0]
                }
              </Text>
            </View>
            {/* <Symbol veg={item?.veg} /> */}
            {/* <ContactButton /> */}
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default Card;

// const styles = StyleSheet.create({
//     card: {
//         height: 100,
//         marginVertical: 10,
//         flexDirection: 'row',
//         shadowColor: '#999',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.8,
//         shadowRadius: 2,
//         elevation: 5,
//     },
//     cardImgWrapper: {
//         flex: 1,
//     },
//     cardImg: {
//         height: '100%',
//         width: '100%',
//         alignSelf: 'center',
//         borderRadius: 8,
//         borderBottomRightRadius: 0,
//         borderTopRightRadius: 0,
//     },
//     cardInfo: {
//         flex: 2,
//         padding: 10,
//         borderColor: '#ccc',
//         borderWidth: 1,
//         borderLeftWidth: 0,
//         borderBottomRightRadius: 8,
//         borderTopRightRadius: 8,
//         backgroundColor: '#fff',
//         overflow: 'hidden', // Ensures content does not slip out
//     },
//     textContainer: {
//         flex: 1, // Allow text to take up the entire space available
//         overflow: 'hidden',
//     },
//     cardTitle: {
//         fontWeight: 'bold',
//     },
//     cardDetails: {
//         fontSize: 12,
//         color: '#444',
//         maxWidth: '90%', // Set maxWidth to prevent overflow

//     },
//     iconInfo: {
//         fontSize: 12,
//         marginLeft: 5,
//         flex: 1,
//         flexShrink: 1, // Allow the text to shrink if necessary

//     },
//     row: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginTop: 10,
//         alignItems: 'center',
//         overflow: 'hidden',

//         position: 'absolute',
//         bottom: 0,
//         left: 0,
//         right: 0,

//     },
//     iconRow: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         flex: 1,
//         marginHorizontal: 4, // Add margin to separate icons from text

//     },
// });

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    borderColor: "lightgray",
    backgroundColor: "#fff",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  favourite: {
    position: "absolute",
    top: -8,
    right: 20,
  },
  iconInfo: {
    fontSize: 12,
    marginLeft: 5,
    flex: 1,
    flexShrink: 1, // Allow the text to shrink if necessary
  },
});
