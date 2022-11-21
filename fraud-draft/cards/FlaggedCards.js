import * as ReactYea from 'react';
import React, { useState, Component } from 'react';
import {
  Alert,
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Text,
  TouchableHighlight,
  FlatList,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import colors from '../config/colors';

{
  /* get screen dimensions */
}
const windowWidth = Dimensions.get('window').width;

/* Flagged Cards:
    Stores an array with details on each purchase, then renders each one as a card in a FlatList
    Specifically, tracks organization, flagged, suspicious, amount, purchase_date, location, and flag_reason for each purchase
    Special feature is that when a purchase is clicked, its details are sent to the Review Purchase page which can then render them again
*/
export default function FlaggedCards({ screenName }) {
  // so that we can navigate from this component
  const navigation = useNavigation();

  // this holds the array of all the article objects/items
  const initialState = [
    {
      organization: 'Tom Thumb',
      flagged: true,
      suspicious: false,
      amount: '-500',
      purchase_date: 'Sept. 17, 2022',
      location: 'Richardson, Texas (USA)',
      /* flag/suspicion reason can be 0, 1, 2, 3  */
      /*
        0 means not flagged/suspicious
        1 means due to unrealistic location
        2 means due to being an outlier
        3 means large amount of money
        */
      flag_reason: 2,
    },
    {
      organization: 'Gucci',
      flagged: true,
      suspicious: false,
      amount: '-5000',
      purchase_date: 'Sept. 15, 2022',
      location: 'Las Vegas, Nevada (USA)',
      flag_reason: 3,
    },
    {
      organization: 'SketchyPlace',
      flagged: false,
      suspicious: true,
      amount: '-42',
      purchase_date: 'Sept. 10, 2022',
      location: 'Las Vegas, Nevada (USA)',
      flag_reason: 2,
    },
    {
      organization: 'UTD Bursar',
      flagged: false,
      suspicious: true,
      amount: '-5000',
      purchase_date: 'Aug. 20, 2022',
      location: 'Richardson, Texas (USA)',
      flag_reason: 3,
    },
  ];

  // connected components to main navigation!!!
  /* https://reactnavigation.org/docs/connecting-navigation-prop/ */
  // this is the actual viewing component
  return (
    <SafeAreaView>
      <FlatList
        data={initialState}
        width="95%"
        extraData={initialState}
        keyExtractor={(index) => index.toString()}
        ItemSeparatorComponent={this.FlatListItemSeparator}
        //item is the name of the object so item.xxxx accesses the info in it
        renderItem={({ item }) => (
          /* This TouchableHighlight wraps around the card so that when it is pressed, the details of that card is sent to the Review Purchase Screen */
          <TouchableHighlight
            onPress={
              () =>
              // pass all the necessary information to the given screen
                navigation.navigate(screenName, {
                  organization: item.organization,
                  amount: item.amount,
                  purchase_date: item.purchase_date,
                  location: item.location,
                  flag_reason: item.flag_reason
                })
            }
            underlayColor="colors.light">
            <Card
              style={{
                width: windowWidth - 70,
                marginBottom: 5,
                borderColor: 'black',
                borderRadius: 15,
                boxShadow: colors.dark,
                backgroundColor: item.flagged
                  ? colors.card_red
                  : item.suspicious
                  ? colors.orange
                  : colors.card_light,
              }}>
              <Card.Content>
                <View style={styles.rowContainer}>
                  <Text style={styles.cardtext}>{item.organization}</Text>
                  <Ionicons
                    name={item.flagged ? 'flag' : 'flag-outline'}
                    color={colors.dark}
                    size={20}
                  />
                </View>
                <View style={styles.rowContainer}>
                  <Text style={styles.cardtext}>{item.purchase_date}</Text>
                  <Text style={{ fontFamily: 'Barlow_Medium', fontSize: 18 }}>
                    {item.amount}
                  </Text>
                </View>
              </Card.Content>
            </Card>
          </TouchableHighlight>
        )}
      />
    </SafeAreaView>
  );
}

FlatListItemSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: '100%',
      }}
    />
  );
};

const styles = StyleSheet.create({
  cardtext: {
    fontSize: 17,
    fontFamily: 'Barlow_Regular',
  },
  rowContainer: {
    paddingRight: 10,
    paddingBottom: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

/*                <View style={{alignSelf: 'flex-end', paddingRight: 10,}}>
                  <Text style={styles.cardtext}><b>{item.amount}</b></Text>
                </View> to align something to the end */
