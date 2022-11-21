import * as ReactYea from 'react';
import React, { useState, Component } from 'react';
import {
  Alert,
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Text,
  Pressable,
  FlatList,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Card } from 'react-native-paper';

import colors from '../config/colors';

{
  /* get screen dimensions */
}
const windowWidth = Dimensions.get('window').width;

/* Bank Cards:
    Stores an array with details on each bank, then renders each one as a card in a FlatList
    Specifically tracks bankname, email, phone, and cardtype of each bank/card
*/
export default class BankCards extends Component {
  constructor(props) {
    super(props);

    // this holds the array of all the article objects/items
    (this.array = [
      {
        bankname: 'Wells Fargo',
        email: 'wellsfargorep@gmail.com',
        phone: '(123) 456 7980',
        cardtype: 'Debit',
      },
      {
        bankname: 'Capital One',
        email: 'cap1rep@gmail.com',
        phone: '(987) 654 3210',
        cardtype: 'Credit',
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
                backgroundColor: colors.card_light,
              }}>
              <Card.Content>
                <View style={styles.rowContainer}>
                  <Text style={{ fontFamily: 'Barlow_Medium', fontSize: 16 }}>
                    {item.bankname}
                  </Text>
                  <Pressable onPress={() => console.log("remove bank !?")}>
                    <Ionicons
                      name={'close-outline'}
                      color={'#B72929'}
                      size={24}
                    />
                  </Pressable>
                </View>
                <Text style={styles.cardtext}>Email: {item.email}</Text>
                <Text style={styles.cardtext}>Phone Number: {item.phone}</Text>
                <Text style={styles.cardtext}>Card Type: {item.cardtype}</Text>
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
    fontSize: 15,
    fontFamily: 'Barlow_Regular',
    padding: 2,
  },
  rowContainer: {
    paddingRight: 5,
    paddingBottom: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
});

/*                <View style={{alignSelf: 'flex-end', paddingRight: 10,}}>
                  <Text style={styles.cardtext}><b>{item.amount}</b></Text>
                </View> to align something to the end */
