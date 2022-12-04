import * as ReactYea from 'react';
import React, { useState, Component } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Text,
  Pressable,
  FlatList,
  TextInput,
  ScrollView,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Card } from 'react-native-paper';
import Modal from 'react-native-modal';

// import style sheet and color palette
import colors from '../config/colors';
const styles = require('../config/style').default;


{
  /* get screen dimensions */
}
const windowWidth = Dimensions.get('window').width;

/* Bank Cards:
    Stores an array with details on each bank, then renders each one as a card in a FlatList
    Specifically tracks bankname, email, phone, and cardtype of each bank/card
*/
export default function BankDetails({ navigation }) {
  // this holds the array of all the article objects/items
  const initialState = [
    {
      bankname: 'Wells Fargo',
      cardholder: 'Kristine Thomas',
      cardnumber: '••••••••••••9072',
      expdate: '09/2089',
      cvv: 123,
      cardtype: 'Debit',
    },
    {
      bankname: 'Capital One',
      cardholder: 'Kristine Thomas',
      cardnumber: '••••••••••••8362',
      expdate: '12/2043',
      cvv: 123,
      cardtype: 'Credit',
    },
  ];

  // used to update the array
  const [purchases, setPurchases] = useState(initialState);

  // for the pop-up window
  const [isModalVisible, setModalVisible] = useState(false);

  // for the information
  const [bankname, setBankname] = useState('');
  const [cardholder, setCardholder] = useState('');
  const [cardnumber, setCardnumber] = useState('');
  const [expdate, setExpdate] = useState('');
  const [cvv, setCVV] = useState('');
  const [cardtype, setCardtype] = useState('');

  {
    /* HANDLE CLICK FUNCTION
    to push user input elements to array
    is called when modal window is closed (after necessary info is inputted by user)
  */
  }
  const handleClick = () => {
    /* censor all digits except the last 4 - thank you https://stackoverflow.com/questions/66008805/how-to-convert-number-in-start-except-last-4-digits-in-react-native */
    var replaced = cardnumber.replace(/.(?=.{4,}$)/g, '•');
    // updating purchases array - the flatlist automatically rerenders with the new purchase at the top
    setPurchases((current) => [
      {
        bankname: bankname,
        cardholder: cardholder,
        cardnumber: replaced,
        cardtype: cardtype,
      },
      ...current,
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Modal isVisible={isModalVisible}>
        <View style={styleSpecs.modalView}>
          <View
            style={{
              alignContent: 'center',
              flex: 1,
            }}>
            <TextInput
              style={styleSpecs.textInput}
              onChangeText={(bankname) => setBankname(bankname)}
              placeholder={'Bank Name'}
              placeholderTextColor="gray"
            />
            <TextInput
              style={styleSpecs.textInput}
              onChangeText={(cardholder) => setCardholder(cardholder)}
              placeholder={'Cardholder Name'}
              placeholderTextColor="gray"
            />
            <TextInput
              style={styleSpecs.textInput}
              onChangeText={(cardnumber) => setCardnumber(cardnumber)}
              placeholder={'Card Number'}
              keyboardType="numeric"
              maxLength={16}
              placeholderTextColor="gray"
            />
            <View style={styleSpecs.rowModalContainer}>
              <TextInput
                style={styleSpecs.textInputSmall}
                onChangeText={(expdate) => setExpdate(expdate)}
                placeholder={'Exp. Date'}
                placeholderTextColor="gray"
              />
              <TextInput
                style={styleSpecs.textInputSmall}
                onChangeText={(cvv) => setCVV(cvv)}
                placeholder={'CVV'}
                placeholderTextColor="gray"
                secureTextEntry={true}
                maxLength={3}
              />
            </View>
            <TextInput
              style={styleSpecs.textInput}
              onChangeText={(cardtype) => setCardtype(cardtype)}
              placeholder={'Card Type'}
              placeholderTextColor="gray"
            />
          </View>
          <View style={styleSpecs.rowModalContainer}>
            <Pressable
              style={styles.button_dark}
              onPress={() => {
                setModalVisible(!isModalVisible);
                handleClick();
              }}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Barlow_Medium',
                  fontSize: 20,
                }}>
                Save
              </Text>
            </Pressable>
            <Pressable
              style={styles.button_dark}
              onPress={() => setModalVisible(!isModalVisible)}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Barlow_Medium',
                  fontSize: 20,
                }}>
                Cancel
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View
        style={{
          backgroundColor: colors.dark,
          flex: 0.3,
          padding: 3,
          justifyContent: 'center',
        }}>
        <Ionicons
          name="menu-outline"
          size={50}
          color="#ADB6C4"
          onPress={() => navigation.navigate('Menu', 'Bank Details')}
        />
      </View>
      <View
        style={{
          backgroundColor: colors.highlight_light,
          flex: 3,
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 10,
        }}>
        <Text style={styles.title}>Bank Details</Text>
        <ScrollView style={styles.whiteAbsolute}>
          <FlatList
            data={purchases}
            width="95%"
            extraData={purchases}
            keyExtractor={(index) => index.toString()}
            //item is the name of the object so item.xxxx accesses the info in it
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
                  <View style={styleSpecs.rowContainer}>
                    <Text style={{ fontFamily: 'Barlow_Medium', fontSize: 16 }}>
                      {item.bankname}
                    </Text>
                    <Pressable onPress={() => console.log('remove bank !?')}>
                      <Ionicons
                        name={'close-outline'}
                        color={'#B72929'}
                        size={24}
                      />
                    </Pressable>
                  </View>
                  <Text style={styleSpecs.cardtext}>
                    Name: {item.cardholder}
                  </Text>
                  <Text style={styleSpecs.cardtext}>
                    Card Number: {item.cardnumber}
                  </Text>
                  <Text style={styleSpecs.cardtext}>
                    Card Type: {item.cardtype}
                  </Text>
                </Card.Content>
              </Card>
            )}
          />
        </ScrollView>
        <Pressable
          style={styles.button_dark}
          onPress={() => setModalVisible(!isModalVisible)}>
          <Text
            style={{
              fontFamily: 'Barlow_Regular',
              fontSize: 24,
              color: 'white',
            }}>
            Add Bank
          </Text>
        </Pressable>
      </View>
      <View style={{ backgroundColor: colors.dark, flex: 0.15 }} />
    </SafeAreaView>
  );
}

// styles specific to this screen
const styleSpecs = StyleSheet.create({
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
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    //alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textInput: {
    width: windowWidth - 100,
    height: 35,
    fontFamily: 'Barlow_Regular',
    padding: 10,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 15,
    marginBottom: 20,
  },
  textInputSmall: {
    height: 35,
    width: windowWidth - 225,
    fontFamily: 'Barlow_Regular',
    padding: 10,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 15,
    marginBottom: 20,
  },
  rowModalContainer: {
    padding: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

/*                <View style={{alignSelf: 'flex-end', paddingRight: 10,}}>
                  <Text style={styles.cardtext}><b>{item.amount}</b></Text>
                </View> to align something to the end */
