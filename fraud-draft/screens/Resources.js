import * as ReactYea from 'react';
import React, { useCallback, useState, useEffect, useRef } from 'react';
import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Pressable,
  FlatList,
  TextInput,
  ScrollView,
  CheckBox,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Modal from 'react-native-modal';
import { Card } from 'react-native-paper';

import colors from '../config/colors';

SplashScreen.preventAutoHideAsync();

/* fetching from stuff: */
// https://reactnative.dev/docs/network
// check out the getFlagged method!!

/* Add notfiications!! */

// screen dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

/*
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
*/

// App
export default function Resources() {
  // purchases array
  {
    /*~~~ https://bobbyhadz.com/blog/react-push-to-state-array ~~~*/
  }
  const initialState = [
    {
      organization: 'Tom Thumb',
      amount: '-500',
      purchase_date: 'Sept. 17, 2022',
      flagged: false,
      suspicious: true,
    },
    {
      organization: 'Walmart',
      amount: '-30',
      purchase_date: 'Sept. 16, 2022',
      flagged: false,
      suspicious: false,
    },
    {
      organization: 'Gucci',
      amount: '-5000',
      purchase_date: 'Sept. 15, 2022',
      flagged: true,
      suspicious: false,
    },
    {
      organization: 'SketchyPlace',
      amount: '-42',
      purchase_date: 'Sept. 10, 2022',
      flagged: false,
      suspicious: true,
    },
    {
      organization: 'Costco',
      amount: '-150',
      purchase_date: 'Sept. 3, 2022',
      flagged: false,
      suspicious: false,
    },
    {
      organization: 'Subway',
      amount: '-15',
      purchase_date: 'Sept. 1, 2022',
      flagged: false,
      suspicious: false,
    },
    {
      organization: 'H&M',
      amount: '-40',
      purchase_date: 'Oct. 15, 2022',
      flagged: false,
      suspicious: false,
    },
  ];

  {
    /* All variables! */
  }
  // account details
  const username = 'name';

  // used to update the array
  const [purchases, setPurchases] = useState(initialState);

  // for the pop-up window
  const [isModalVisible, setModalVisible] = useState(false);

  // for the information
  const [organization, setOrg] = useState('');
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState('');
  const [distHome, setDistHome] = useState(0);
  const [distLast, setDistLast] = useState(0);
  const [isPin, setIsPin] = useState(false);
  const [isChip, setIsChip] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isOnline, setIsOnline] = useState(false);

  {
    /* HANDLE CLICK FUNCTION
    to push user input elements to array and to ML Model
    is called when modal window is closed (after necessary info is inputted by user)
  */
  }
  const handleClick = async () => {
    // updating purchases array - the flatlist automatically rerenders with the new purchase at the top
    setPurchases([
      {
        organization: organization,
        amount: amount,
        purchase_date: date,
        flagged: await getFlagged(),
        suspicious: false,
      },
      ...purchases,
    ]);
  };

///// JESSE THIS PART IS RELEVANT TO YOU /////
  {
    /* FETCHING FROM ML MODEL
    get the flagged value from the machine learning model by sending user input data and handling the response
  */
  }
  const getFlagged = async () => {
    try {
      // ~~~ you just need to edit this part based on how your server works ~~~ //
      
      const response = await fetch('http://127.0.0.1:5000/fraudPred', {
        method: 'POST',
        // main thing you probably have to modify
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Username: username,
          DistanceFromHome: distHome,
          DistanceFromLastPurchase: distLast,
          Amount: amount,
          RepeatRetailer: +isRepeat,
          UsedChip: +isChip,
          UsedPin: +isPin,
          OnlineOrder: +isOnline,
        }),
      });

      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

      const json = await response.json();
      // if value is 0, then purchase not been flagged
      //console.log(json.FraudPrediction);
      if (json.FraudPrediction == 0) return false;
      return true;
    } catch (error) {
      console.error(error);
    }
  };

  /*
  // notification stuff
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  */
  // for the fonts
  const [fontsLoaded] = useFonts({
    Barlow_Regular: require('../assets/barlow/Barlow-Regular.otf'),
    Barlow_Medium: require('../assets/barlow/Barlow-Medium.otf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  // end of fonts

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: colors.dark,
          flex: 0.3,
          padding: 3,
          justifyContent: 'center',
        }}
      />
      <Modal isVisible={isModalVisible}>
        <View
          style={{ justifyContent: 'center', alignContent: 'center', flex: 1 }}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.textInput}
              onChangeText={(organization) => setOrg(organization)}
              placeholder={'Organization'}
              placeholderTextColor="gray"
            />
            <TextInput
              style={styles.textInput}
              onChangeText={(amount) => setAmount(amount)}
              placeholder={'Amount'}
              placeholderTextColor="gray"
            />
            <TextInput
              style={styles.textInput}
              onChangeText={(date) => setDate(date)}
              placeholder={'Date'}
              placeholderTextColor="gray"
            />
            <TextInput
              style={styles.textInput}
              onChangeText={(distHome) => setDistHome(distHome)}
              placeholder={'Distance from home'}
              placeholderTextColor="gray"
            />
            <TextInput
              style={styles.textInput}
              onChangeText={(distLast) => setDistLast(distLast)}
              placeholder={'Distance from last purchase'}
              placeholderTextColor="gray"
            />
            <View style={styles.checkboxContainer}>
              <Text
                style={{
                  color: colors.dark,
                  fontFamily: 'Barlow_Regular',
                  fontSize: 15,
                }}>
                Check box if pin was used
              </Text>
              <CheckBox
                value={isPin}
                onValueChange={setIsPin}
                style={styles.checkbox}
              />
            </View>
            <View style={styles.checkboxContainer}>
              <Text
                style={{
                  color: colors.dark,
                  fontFamily: 'Barlow_Regular',
                  fontSize: 15,
                }}>
                Check box if chip was used
              </Text>
              <CheckBox
                value={isChip}
                onValueChange={setIsChip}
                style={styles.checkbox}
              />
            </View>
            <View style={styles.checkboxContainer}>
              <Text
                style={{
                  color: colors.dark,
                  fontFamily: 'Barlow_Regular',
                  fontSize: 15,
                }}>
                Check box if a repeat retailer
              </Text>
              <CheckBox
                value={isRepeat}
                onValueChange={setIsRepeat}
                style={styles.checkbox}
              />
            </View>
            <View style={styles.checkboxContainer}>
              <Text
                style={{
                  color: colors.dark,
                  fontFamily: 'Barlow_Regular',
                  fontSize: 15,
                }}>
                Check box if online purchase
              </Text>
              <CheckBox
                value={isOnline}
                onValueChange={setIsOnline}
                style={styles.checkbox}
              />
            </View>
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
                Close
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View
        style={{
          backgroundColor: colors.highlight_light,
          flex: 3,
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 10,
        }}>
        <Text style={styles.title}>Purchase History</Text>
        <ScrollView style={styles.whiteAbsolute}>
          <FlatList
            data={purchases}
            width="95%"
            extraData={purchases}
            keyExtractor={(index) => index.toString()}
            //item is the name of the object so item.___ accesses the info in it
            renderItem={({ item }) => (
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
            )}
          />
        </ScrollView>
        <Pressable
          style={styles.button_dark}
          onPress={() => setModalVisible(true)}>
          <Text
            style={{
              fontFamily: 'Barlow_Regular',
              fontSize: 24,
              color: 'white',
            }}>
            Add Purchase
          </Text>
        </Pressable>
      </View>
      <View style={{ backgroundColor: colors.dark, flex: 0.15 }} />
    </SafeAreaView>
  );
}
/*
// sending push notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}


async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }q
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
*/

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Barlow_Regular',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 20,
    fontSize: 38,
  },
  button_dark: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 17,
    elevation: 3,
    backgroundColor: colors.dark,
  },
  whiteAbsolute: {
    width: windowWidth - 50,
    height: windowHeight - 225,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 15,
    borderRadius: 15,
    paddingVertical: 10,
    backgroundColor: 'white'
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
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
    padding: 10,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 15,
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-evenly',
  },
  checkbox: {
    alignSelf: 'center',
    marginHorizontal: 10,
    borderColor: colors.dark,
  },
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

// import json file - https://stackoverflow.com/questions/29452822/how-to-fetch-data-from-local-json-file-on-react-native
// import ml_results from './ml-results.json';
// for file reading/writing
// import fs from 'fs';
// add a purchase ML
// create a json file with the required data
// parse through and get purchase history - hashmap to json
// https://stackoverflow.com/questions/10685998/how-to-update-a-value-in-a-json-file-and-save-it-through-node-js