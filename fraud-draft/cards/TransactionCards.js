import * as ReactYea from 'react';
import React, { useState, Component } from 'react';
import {
  Alert,
  Button,
  TextInput,
  View,
  StyleSheet,
  AppRegistry,
  Text,
  Image,
  Pressable,
  TouchableHighlight,
  SafeAreaView,
  Dimensions,
  Linking,
  FlatList,
  StatusBar,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Card } from 'react-native-paper';

import colors from '../config/colors';

{
  /* get screen dimensions */
}
const windowWidth = Dimensions.get('window').width;

/* Transaction Cards:
    Stores an array with details on each purchase, then renders each one as a card in a FlatList
    Specifically, tracks organization, flagged, suspicious, amount, purchase_date for each purchase
*/
export default class TransactionCards extends Component {
  constructor(props) {
    super(props);

    // this holds the array of all the article objects/items
    (this.array = [
      {
        organization: 'Tom Thumb',
        flagged: true,
        suspicious: false,
        amount: '-500',
        purchase_date: 'Sept. 17, 2022',      
      },
      {
        organization: 'Walmart',
        flagged: false,
        suspicious: false,
        amount: '-30',
        purchase_date: 'Sept. 16, 2022',
      },
      {
        organization: 'Gucci',
        flagged: true,
        suspicious: false,
        amount: '-5000',
        purchase_date: 'Sept. 15, 2022',
      },
      {
        organization: 'SketchyPlace',
        flagged: false,
        suspicious: true,
        amount: '-42',
        purchase_date: 'Sept. 10, 2022',
      },
      {
        organization: 'Costco',
        flagged: false,
        suspicious: false,
        amount: '-150',
        purchase_date: 'Sept. 3, 2022'
      },
      {
        organization: 'Subway',
        flagged: false,
        suspicious: false,
        amount: '-15',
        purchase_date: 'Sept. 1, 2022',
      },
      {
        organization: 'H&M',
        flagged: false,
        suspicious: false,
        amount: '-40',
        purchase_date: 'Oct. 15, 2022',
      },
      {
        organization: 'PARENT CHKG ACCT',
        flagged: false,
        suspicious: false,
        amount: '+2000',
        purchase_date: 'Oct. 12, 2022',
      },
      {
        organization: 'Shell',
        flagged: false,
        suspicious: false,
        amount: '-60',
        purchase_date: 'Oct. 10, 2022',
      },
      {
        organization: 'UTD Bursar',
        flagged: false,
        suspicious: true,
        amount: '-5000',
        purchase_date: 'Aug. 20, 2022',
      },
      {
        organization: 'Office Depot',
        flagged: false,
        suspicious: false,
        amount: '-50',
        purchase_date: 'Aug. 15, 2022',
      },
    ]),
      (this.state = {
        arrayHolder: [],

        textInput_Holder: '',
      });
    this.checked = [
      { repchecked: false, demchecked: false, nonparchecked: false },
    ];
  }

  componentDidMount() {
    this.setState({ arrayHolder: [...this.array] });
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

  GetItem(item) {
    Alert.alert(item);
  }

  // this alters the boolean save value so that when the user exits the page, you can just loop through and send the items with saved: true to the data base
  updateSaved = (item) => {
    let arrayHolder = [...this.state.arrayHolder];
    let index = arrayHolder.findIndex(
      (el) => el.website_title === item.website_title
    );
    arrayHolder[index] = { ...arrayHolder[index], saved: !item.saved };
    this.setState({ arrayHolder });
  };

  // this is the actual viewing component
  render() {
    return (
      <SafeAreaView>
        <FlatList
          data={this.state.arrayHolder}
          width="95%"
          extraData={this.state.arrayHolder}
          keyExtractor={(index) => index.toString()}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          //item is the name of the object so item.___ accesses the info in it
          renderItem={({ item }) => (
            <Card
              style={{
                width: windowWidth - 70,
                marginBottom: 5,
                borderColor: 'black',
                borderRadius: 15,
                boxShadow: colors.dark,
                backgroundColor: item.flagged ? colors.card_red : item.suspicious ? colors.orange : colors.card_light,
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
                  <Text style={{fontFamily: 'Barlow_Medium', fontSize: 18}}>{item.amount}</Text>
                </View>
              </Card.Content>
            </Card>
          )}
        />
      </SafeAreaView>
    );
  }
}

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
