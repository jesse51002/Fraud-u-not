import * as React from 'react';
import { useCallback, useState } from 'react';
import {
  Text,
  SafeAreaView,
  View,
  Image,
  Dimensions,
  Pressable,
  TextInput,
  ScrollView,
  Linking,
  StyleSheet,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Modal from 'react-native-modal';
import { useFonts } from 'expo-font';
import { Card } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// // import the cards that are shown in the Purchase History, Flagged History, and Bank Details screens (respectively)
import Transactions from './cards/TransactionCards';
import Flagged from './cards/FlaggedCards';

// // import these screens - please go to screens folder for more details on each
import BankDetailsScreen from './screens/BankDetails';
import AccountDetailsScreen from './screens/AccountDetails';
import ContactUsScreen from './screens/ContactUs';
import AboutAppScreen from './screens/AboutApp';
import ResourcesScreen from './screens/Resources';

import Cookies from 'universal-cookie';

import colors from './config/colors';
// import style sheet and color palette
const styles = require('./config/style').default;
/*
export default function App() {
  return (
    <View style={styles.container}>
      <Text>wosssssssssssssssssssssssssssssssssssssw</Text>
    </View>
  );
}
*/

// used to allow fonts to load
SplashScreen.preventAutoHideAsync();

{
  /* get screen dimensions */
}
const windowWidth = Dimensions.get('window').width;

{
  /* BIG GOAL: REFACTORRR EVERYTHINGGG 
  for dropdown menu https://www.npmjs.com/package/react-native-modal-dropdown
  add subject and body to email in File a Claim https://stackoverflow.com/questions/44594818/how-to-launch-and-open-email-client-react-native 
  */
}

{
  /* OVERALL ABILITIES AND NOTES 
    - Login or create account through home screen
    - Go between login and create account screens
    - Access menu from any page other than home, login, or create account
    - Logout button in menu brings you back to home screen
    - Submit buttons on login and create account brings you to menu
      - Exiting the menu at that point would bring you to the purchase history screen
    - Purchase History pages leads to Flagged Purchases page which, when a specific purchase is tapped, leads to the Review Purchase page, leading to the Generate Report then [autofilled] File a Claim page
      - If accessing File a Claim page from the menu screen instead, it is blank
    - Bank Details screen allows user to view details of each bank, but adding and removing is currently not possible
      - Actually establishing a link to a bank is outside our abilities
    - Informational screens - Account Details, Resources, About the App, Contact Us - are functional and kept separately in the screens folder
      - Not dynamic and pretty self-explanatory, so not many comments on those files
 */
}
{
  /* WILL WORK ON BETWEEN NOW AND DEMO
    - Make it possible for user to update account information 
    - Adding a bank with user input (will not actually establish a link)
    - Reviewing any purchase (not just flagged ones) to flag purchases missed by the algorithm
    - Improve email format of file a claim
    - Have an amount so that any purchase above that amount is flagged
    - (Separately) Connecting the front-end and the machine learning model
 */
}

{
  /* Home Screen:
    The first screen the user sees when opening the app
    Allows the user to login or create an account
 */
}
function HomeScreen({ navigation }) {
  {
    /* load the custom fonts */
  }
  const [fontsLoaded] = useFonts({
    Barlow_Regular: require('./assets/barlow/Barlow-Regular.otf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.logo}
        source={require('./assets/background_logo.png')}
      />
      <View
        style={{ justifyContent: 'center', alignItems: 'center', flex: 0.95 }}>
        <Image
          style={{
            width: windowWidth - 100,
            resizeMode: 'contain',
            alignContent: 'center',
          }}
          source={require('./assets/bi_shield-lock.png')}
        />
        <Text
          style={{
            fontFamily: 'Barlow_Regular',
            fontSize: 26,
            color: colors.dark,
            textAlign: 'center',
            paddingHorizontal: 30,
            paddingTop: 30,
          }}>
          Helping you fight fraud and keep your accounts secure - all in one
          place!
        </Text>
      </View>
      <View style={{ justifyContent: 'flex-end' }}>
        <Pressable
          style={styles.button_light}
          onPress={() => navigation.navigate('Login')}>
          <Text
            style={{
              fontFamily: 'Barlow_Regular',
              fontSize: 26,
              color: colors.dark,
              paddingHorizontal: windowWidth / 50,
            }}>
            Login
          </Text>
        </Pressable>
        <Pressable
          style={styles.underline}
          onPress={() => navigation.navigate('Create Account')}>
          <Text
            style={{
              fontFamily: 'Barlow_Regular',
              fontSize: 19,
              textDecorationLine: 'underline',
              color: colors.dark,
            }}>
            or create an account
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

{
  /* Login Screen:
    Allows the user to enter their username/email and password for authentication
    If the user does not have an account, they can switch the the create account page
 */
}
function LoginScreen({ navigation }) {
  // would send these to database for authentication when sign in button is clicked
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // for the pop-up window
  const [isModalVisible, setModalVisible] = useState(false);


  React.useEffect(() => {
    const cookies = new Cookies();
    if (cookies.get('username').length > 0){
      navigation.navigate('Menu', 'Purchase History');
    }
  })

  ///// JESSE THIS PART IS RELEVANT TO YOU /////
  {
    /* FETCHING FROM ML MODEL
    get the flagged value from the machine learning model by sending user input data and handling the response
  */
  }
  const getLoginSuccess = async () => {
    try {
      // ~~~ you just need to edit this part based on how your server works ~~~ //
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        // main thing you probably have to modify
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
      
      if (response.status == 200){
        const json = await response.json();
        // if value is 0, then purchase not been flagged
        // console.log(json.Success);
        if (json.Success == 0) return false;

        const cookies = new Cookies();
        cookies.set('username', username, { path: '/' });
        console.log(cookies.get('username')); // Pacman

        return true;
      }
    } catch (error) {
      console.error(error);
      return false
    }
  };

  {
    /* HANDLE CLICK FUNCTION
    to figure out whether authentication is successful (by calling getLoginSuccess())
    if the function returned true, then move on to the menu page
    otherwise, 
   */
  }
  const handleClick = async () => {
    if (await getLoginSuccess()) {
      navigation.navigate('Menu', 'Purchase History');
    } else {
      setModalVisible(!isModalVisible);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalView}>
          <View
            style={{
              alignContent: 'center',
              flex: 1,
            }}>
            <Text
              style={{
                fontFamily: 'Barlow_Regular',
                fontSize: 17,
                padding: 20,
                textAlign: 'center',
              }}>
              Authentication Failed!{'\n'}Please double-check your username
              and/or password
            </Text>
          </View>
          <Pressable
            style={styles.button_dark}
            onPress={() => setModalVisible(!isModalVisible)}>
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
      </Modal>
      <View
        style={{
          backgroundColor: colors.dark,
          flex: 0.3,
          padding: 3,
          justifyContent: 'center',
        }}
      />
      <View
        style={{
          backgroundColor: colors.highlight_light,
          flex: 3,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.whiteContainer}>
          <Text
            style={{
              fontFamily: 'Barlow_Regular',
              fontSize: 20,
              paddingVertical: 10,
            }}>
            Username/Email Address
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(username) => setUsername(username)}
            placeholder={'Enter username/email'}
            placeholderTextColor="gray"
          />
          <Text></Text>
          <Text
            style={{
              fontFamily: 'Barlow_Regular',
              fontSize: 20,
              paddingVertical: 10,
            }}>
            Password
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(password) => setPassword(password)}
            placeholder={'Enter password'}
            placeholderTextColor="gray"
            secureTextEntry={true}
          />
          <Text> </Text>
        </View>
        <View style={{ justifyContent: 'flex-end' }}>
          <Pressable
            style={styles.button_dark}
            onPress={() => {
              handleClick();
            }}>
            <Text
              style={{
                fontFamily: 'Barlow_Regular',
                fontSize: 26,
                color: 'white',
                paddingHorizontal: windowWidth / 50,
              }}>
              Submit
            </Text>
          </Pressable>
        </View>
        <Pressable
          style={styles.underline}
          onPress={() => navigation.navigate('Create Account')}>
          <Text
            style={{
              fontFamily: 'Barlow_Regular',
              fontSize: 19,
              textDecorationLine: 'underline',
              color: colors.dark,
            }}>
            or create an account
          </Text>
        </Pressable>
      </View>
      <View style={{ backgroundColor: colors.dark, flex: 0.25 }} />
    </SafeAreaView>
  );
}

{
  /* Create Account Screen:
    Allows the user to enter their username, email, and password to create an account
    If the user already has an account, they can switch the the login page
 */
}
function CreateAccScreen({ navigation }) {
  // send these to database for authentication when sign in button is clicked
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      <View
        style={{
          backgroundColor: colors.highlight_light,
          flex: 3,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={styles.title}>Create Account</Text>
        <View style={styles.whiteContainer}>
          <Text
            style={{
              fontFamily: 'Barlow_Regular',
              fontSize: 20,
              paddingVertical: 10,
            }}>
            Username
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(username) => setUsername(username)}
            placeholder={'Enter username'}
            placeholderTextColor="gray"
          />
          <Text
            style={{
              fontFamily: 'Barlow_Regular',
              fontSize: 20,
              paddingVertical: 10,
            }}>
            Email Address
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(email) => setEmail(email)}
            placeholder={'Enter email'}
            placeholderTextColor="gray"
          />
          <Text
            style={{
              fontFamily: 'Barlow_Regular',
              fontSize: 20,
              paddingVertical: 10,
            }}>
            Password
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(password) => setPassword(password)}
            placeholder={'Enter password'}
            placeholderTextColor="gray"
            secureTextEntry={true}
          />
          <Text> </Text>
        </View>
        <View style={{ justifyContent: 'flex-end' }}>
          <Pressable
            style={styles.button_dark}
            onPress={() => navigation.navigate('Menu', 'Purchase History')}>
            <Text
              style={{
                fontFamily: 'Barlow_Regular',
                fontSize: 26,
                color: 'white',
              }}>
              Submit
            </Text>
          </Pressable>
        </View>
        <Pressable
          style={styles.underline}
          onPress={() => navigation.navigate('Login')}>
          <Text
            style={{
              fontFamily: 'Barlow_Regular',
              fontSize: 19,
              textDecorationLine: 'underline',
              color: colors.dark,
            }}>
            or login
          </Text>
        </Pressable>
      </View>
      <View style={{ backgroundColor: colors.dark, flex: 0.25 }} />
    </SafeAreaView>
  );
}

{
  /* Menu Screen:
    The user can go to different pages using this menu screen
    Clicking the x button should bring the user to the last screen they were on
      - Note that the clicking the x after being on the Review Purchase, Generate Report, or File a Claim screens will bring users back to the Flagged Purchases page
    Is only accessible after the user has logged in
 */
}
function MenuScreen({ route, navigation }) {
  const prevScreen = route.params;

  const [fontsLoaded] = useFonts({
    Barlow_Regular: require('./assets/barlow/Barlow-Regular.otf'),
    Barlow_Medium: require('./assets/barlow/Barlow-Medium.otf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 8,
        backgroundColor: colors.dark,
      }}>
      <View style={{ alignItems: 'flex-end' }}>
        <Ionicons
          name="close-outline"
          size={50}
          color="#ADB6C4"
          onPress={() => navigation.navigate(prevScreen)}
        />
      </View>
      {/* list of all the menu items */}
      <View style={{ alignItems: 'center' }}>
        <Pressable
          onPress={() => navigation.navigate('Purchase History')}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? colors.press : colors.dark,
            },
            styles.wrapper,
          ]}>
          <Text style={styles.menuItems}>Purchase History</Text>
        </Pressable>
        {/* this empty view element acts as a divider */}
        <View style={styles.separator} />
        <Pressable
          onPress={() => navigation.navigate('Account Details')}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? colors.press : colors.dark,
            },
            styles.wrapper,
          ]}>
          <Text style={styles.menuItems}>Account Details</Text>
        </Pressable>
        <View style={styles.separator} />
        <Pressable
          onPress={() => navigation.navigate('Bank Details')}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? colors.press : colors.dark,
            },
            styles.wrapper,
          ]}>
          <Text style={styles.menuItems}>Bank Details</Text>
        </Pressable>
        <View style={styles.separator} />
        <Pressable
          onPress={() =>
            navigation.navigate('File a Claim', {
              organization: 'na',
              amount: 'na',
              purchase_date: 'na',
              location: 'na',
              flag_reason: -1,
            })
          }
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? colors.press : colors.dark,
            },
            styles.wrapper,
          ]}>
          <Text style={styles.menuItems}>File a Claim</Text>
        </Pressable>
        <View style={styles.separator} />
        <Pressable
          onPress={() => navigation.navigate('Resources')}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? colors.press : colors.dark,
            },
            styles.wrapper,
          ]}>
          <Text style={styles.menuItems}>Resources</Text>
        </Pressable>
        <View style={styles.separator} />
        <Pressable
          onPress={() => navigation.navigate('About The App')}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? colors.press : colors.dark,
            },
            styles.wrapper,
          ]}>
          <Text style={styles.menuItems}>About the App</Text>
        </Pressable>
        <View style={styles.separator} />
        <Pressable
          onPress={() => navigation.navigate('Contact Us')}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? colors.press : colors.dark,
            },
            styles.wrapper,
          ]}>
          <Text style={styles.menuItems}>Contact Us</Text>
        </Pressable>
        <View style={styles.separator} />
        <Pressable
          style={styles.underline}
          onPress={() => {
              navigation.navigate('Home')
              const cookies = new Cookies();
              cookies.set('username', '', { path: '/' });
            }}>
          <Text
            style={{
              justifyContent: 'flex-end',
              fontFamily: 'Barlow_Regular',
              fontSize: 19,
              textDecorationLine: 'underline',
              color: 'white',
              padding: 15,
            }}>
            or logout
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

{
  /* Purchase History Screen:
    Loads cards with details of each transaction in the user's purchase history
    The cards are color-coded based on suspicious-ness (red for flagged, orange for suspicious, and blue for normal)
    Button allows for viewing just the flagged purchases
 */
}
function PurchaseHisScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    Barlow_Regular: require('./assets/barlow/Barlow-Regular.otf'),
    Barlow_Medium: require('./assets/barlow/Barlow-Medium.otf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
          onPress={() => navigation.navigate('Menu', 'Purchase History')}
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
        <Text style={styles.title}>Purchase History</Text>
        <ScrollView style={styles.whiteAbsolute}>
          {/* The transactions element holds the true content of this screen - please go to the cards folder and review TransactionCards.js for more details */}
          <Transactions screenName="Review Purchase"></Transactions>
        </ScrollView>
        
        <Pressable
          style={styles.button_dark}
          onPress={() => navigation.navigate('Flagged Purchases')}>
          <Text
            style={{
              fontFamily: 'Barlow_Regular',
              fontSize: 24,
              color: 'white',
            }}>
            View Flagged
          </Text>
        </Pressable>
      </View>
      <View style={{ backgroundColor: colors.dark, flex: 0.15 }} />
    </SafeAreaView>
  );
}

{
  /* Flagged Purchases Screen:
    Loads only flagged cards with details of each transaction in the user's purchase history
    Clicking a purchase allows the user to confirm or deny it (leading to eventually generating a report and filing a claim)
    Button allows for viewing just the flagged purchases
 */
}
function FlaggedScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
          onPress={() => navigation.navigate('Menu', 'Flagged Purchases')}
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
        <Text
          style={{
            fontFamily: 'Barlow_Regular',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: 20,
            fontSize: 35,
          }}>
          Flagged Purchases
        </Text>
        <ScrollView style={styles.whiteAbsolute}>
          {/* The flagged element holds the true content of this screen - please go to the cards folder and review TransactionCards.js for more details */}
          <Flagged screenName="Review Purchase"></Flagged>
        </ScrollView>
        <Pressable
          style={styles.button_dark}
          onPress={() => navigation.navigate('Purchase History')}>
          <Text
            style={{
              fontFamily: 'Barlow_Regular',
              fontSize: 24,
              color: 'white',
            }}>
            Back
          </Text>
        </Pressable>
      </View>
      <View style={{ backgroundColor: colors.dark, flex: 0.15 }} />
    </SafeAreaView>
  );
}

{
  /* Review Purchases Screen:
    This screen is displayed when a specific purchase is clicked - therefore the details of the purchase are sent as paramters so that they can be displayed
    Each flagged purchase also stores the reason for flagged, which is then expanded in writing
    The user can either click confirm (which sends them to the generate report page) or deny (which sends them back to flagged purchases page)
 */
}
function ReviewPurchaseScreen({ route, navigation }) {
  /* Get the parameters */
  const {
    organization,
    amount,
    purchase_date,
    location,
    flag_reason,
    prevScreen,
  } = route.params;
  //{organization}
  /* hooray https://source--react-navigation-docs.netlify.app/docs/2.x/params/  */
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
          onPress={() => navigation.navigate('Menu', 'Flagged Purchases')}
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
        <Text style={styles.title}>Review Purchase</Text>
        <ScrollView style={styles.whiteAbsolute}>
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
              <Text style={styles.cardtext}>{organization}</Text>
              <Text
                style={{
                  fontFamily: 'Barlow_Medium',
                  fontSize: 17,
                  alignSelf: 'flex-end',
                }}>
                {amount}
              </Text>
              <Text style={styles.cardtext}>{purchase_date}</Text>
            </Card.Content>
          </Card>
          <View
            style={{
              width: windowWidth - 70,
              marginBottom: 5,
              padding: 8,
              borderColor: 'black',
              borderRadius: 15,
              boxShadow: colors.dark,
              backgroundColor: colors.card_light,
              justifyText: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.cardtext}>{location}</Text>
          </View>
          <View
            style={{
              width: windowWidth - 70,
              marginBottom: 10,
              padding: 10,
              justifyText: 'center',
              alignItems: 'center',
            }}>
            {flag_reason == 0 && (
              <Text style={styles.cardtext}>
                &emsp; This purchase has not been flagged by our algorithm.
              </Text>
            )}
            {flag_reason == 1 && (
              <Text style={styles.cardtext}>
                According to our machine learning algorithm, this purchase has
                been flagged for occuring in an unrealistic or impossible
                location
              </Text>
            )}
            {flag_reason == 2 && (
              <Text style={styles.cardtext}>
                According to our machine learning algorithm, this purchase has
                been flagged for being an outlier compared to previous purchase
                patterns
              </Text>
            )}
            {flag_reason == 3 && (
              <Text style={styles.cardtext}>
                According to our machine learning algorithm, this purchase has
                been flagged for being an amount significantly larger than usual
              </Text>
            )}
          </View>
          <View style={styles.rowContainer}>
            <Pressable
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 14,
                paddingHorizontal: 20,
                borderRadius: 17,
                elevation: 3,
                backgroundColor: colors.green,
                marginBottom: 5,
              }}
              onPress={() =>
                navigation.navigate('Generate Report', {
                  organization,
                  amount,
                  purchase_date,
                  location,
                  flag_reason,
                  prevScreen,
                })
              }>
              <Text
                style={{
                  fontFamily: 'Barlow_Regular',
                  fontSize: 17,
                  color: colors.dark,
                }}>
                Confirm
              </Text>
              <Text
                style={{
                  fontFamily: 'Barlow_Regular',
                  fontSize: 10,
                  color: colors.dark,
                }}>
                not my purchase
              </Text>
            </Pressable>
            <Pressable
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 14,
                paddingHorizontal: 20,
                borderRadius: 17,
                elevation: 3,
                backgroundColor: colors.card_red,
                marginBottom: 5,
              }}
              // NOTEEEE:
              // Technically, the purchase should then be unflagged, but this currently not possible rn
              onPress={() => navigation.navigate('Purchase History')}>
              <Text
                style={{
                  fontFamily: 'Barlow_Regular',
                  fontSize: 17,
                  color: colors.dark,
                }}>
                Deny
              </Text>
              <Text
                style={{
                  fontFamily: 'Barlow_Regular',
                  fontSize: 10,
                  color: colors.dark,
                }}>
                it is my purchase
              </Text>
            </Pressable>
          </View>
        </ScrollView>
        <Pressable
          style={styles.button_dark}
          onPress={() => navigation.navigate(prevScreen)}>
          <Text
            style={{
              fontFamily: 'Barlow_Regular',
              fontSize: 21,
              color: 'white',
            }}>
            Back
          </Text>
        </Pressable>
      </View>
      <View style={{ backgroundColor: colors.dark, flex: 0.15 }} />
    </SafeAreaView>
  );
}

{
  /* Generate Report Screen:
    Similar to the last screen, this one generates a report based on the details of the purchase
    User can then go back to the flagged purchases page or file a claim using that information
 */
}
function GenerateReportScreen({ route, navigation }) {
  /* Get the parameters */
  const {
    organization,
    amount,
    purchase_date,
    location,
    flag_reason,
    prevScreen,
  } = route.params;
  //{organization}
  /* hooray https://source--react-navigation-docs.netlify.app/docs/2.x/params/  */
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
          onPress={() => navigation.navigate('Menu', 'Flagged Purchases')}
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
        <Text style={styles.title}>Generate Report</Text>
        <ScrollView style={styles.whiteAbsolute}>
          <View
            style={{
              width: windowWidth - 70,
              marginBottom: 10,
              padding: 5,
              justifyText: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.cardtext}>
              &emsp; On {purchase_date}, a fraudulent purchase of amount{' '}
              {amount} dollars was made to the {organization} at {location}.{' '}
              {flag_reason
                ? ' The Fraud-U-Not Machine Learning algorthim has flagged this purchase and it has been confirmed to be fraudulent by the cardholder.'
                : ' This purchase has been confirmed to be fraudulent by the cardholder.'}
            </Text>
            {flag_reason == 1 && (
              <Text style={styles.cardtext}>
                &emsp; According to our machine learning algorithm, this
                purchase has been flagged for occuring in an unrealistic or
                impossible location.
              </Text>
            )}
            {flag_reason == 2 && (
              <Text style={styles.cardtext}>
                &emsp; According to our machine learning algorithm, this
                purchase has been flagged for being an outlier compared to
                previous purchase patterns.
              </Text>
            )}
            {flag_reason == 3 && (
              <Text style={styles.cardtext}>
                &emsp; According to our machine learning algorithm, this
                purchase has been flagged for being an amount significantly
                larger than usual.
              </Text>
            )}
            <Text style={styles.cardtext}>
              &emsp; Since confirmation of this fraudulent purchase, next steps
              regarding identity theft are advised. For example, temporarily
              suspend the card and file a claim to the respective bank.
            </Text>
          </View>
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
          }}>
          <Pressable
            style={styles.button_dark}
            onPress={() => navigation.navigate(prevScreen)}>
            <Text
              style={{
                fontFamily: 'Barlow_Regular',
                fontSize: 21,
                color: 'white',
              }}>
              Back
            </Text>
          </Pressable>
          <Text style={{ paddingHorizontal: 10 }}> </Text>
          <Pressable
            style={styles.button_dark}
            onPress={() =>
              navigation.navigate('File a Claim', {
                organization,
                amount,
                purchase_date,
                location,
                flag_reason,
                prevScreen,
              })
            }>
            <Text
              style={{
                fontFamily: 'Barlow_Regular',
                fontSize: 21,
                color: 'white',
              }}>
              File Claim
            </Text>
          </Pressable>
        </View>
      </View>
      <View style={{ backgroundColor: colors.dark, flex: 0.15 }} />
    </SafeAreaView>
  );
}

{
  /* File a Claim Screen:
    IF FROM GENERATE REPORT SCREEN:
      The content is autofilled from the generate report screen
    IF FROM MENU SCREEN:
      Text input boxes for user to fill in and submit
    FOR BOTH:
      If submit is clicked, an email client is opened
 */
}
function FileClaimScreen({ route, navigation }) {
  /* Get the parameters */
  const {
    organization,
    amount,
    purchase_date,
    location,
    flag_reason,
    prevScreen,
  } = route.params;
  // since {organization} is in the form { organization: "na" }, to just get the "na" we treat it like a JSON
  console.log({ organization }.organization);
  // when filing a claim from the menu instead of from the report, the text fields are blank for input
  // so if organization field, is na, then dont autofill
  let autofill = { organization }.organization != 'na';

  const [text, setText] = useState('');

  //{organization}
  /* hooray https://source--react-navigation-docs.netlify.app/docs/2.x/params/  */
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
          onPress={() => navigation.navigate('Menu', 'Flagged Purchases')}
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
        <Text style={styles.title}>File a Claim</Text>
        {autofill && (
          <View>
            <Text style={styles.header}>Purchase Details</Text>
            <ScrollView style={styles.whiteContainer}>
              <Text style={styles.cardtext}>
                On {purchase_date}, a fraudulent purchase of amount {amount}{' '}
                dollars was made to the {organization} at {location}.
                {flag_reason
                  ? ' The Fraud-U-Not Machine Learning algorthim has flagged this purchase and it has been confirmed to be fraudulent by the cardholder.'
                  : ' This purchase has been confirmed to be fraudulent by the cardholder.'}
              </Text>
            </ScrollView>
            <Text style={styles.header}>Fraud Details</Text>
            <ScrollView style={styles.whiteContainer}>
              {flag_reason == 1 && (
                <Text style={styles.cardtext}>
                  This purchase has been flagged for occuring in an unrealistic
                  or impossible location.
                </Text>
              )}
              {flag_reason == 2 && (
                <Text style={styles.cardtext}>
                  This purchase has been flagged for being an outlier compared
                  to previous purchase patterns.
                </Text>
              )}
              {flag_reason == 3 && (
                <Text style={styles.cardtext}>
                  This purchase has been flagged for being an amount
                  significantly larger than usual.
                </Text>
              )}
            </ScrollView>
          </View>
        )}
        {!autofill && (
          <View>
            <Text style={styles.header}>Purchase Details</Text>
            <TextInput
              style={styles.whiteContainer}
              multiline={true}
              numberOfLines={8}
            />
            <Text style={styles.header}>Fraud Details</Text>
            <TextInput
              style={styles.whiteContainer}
              multiline={true}
              numberOfLines={6}
            />
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            justifyText: 'space-evenly',
            alignContent: 'center',
            paddingHorizontal: 10,
          }}>
          {/* Only include the back button for the autofilled claim */}
          {autofill && (
            <Pressable
              style={styles.button_dark}
              onPress={() => navigation.navigate(prevScreen)}>
              <Text
                style={{
                  fontFamily: 'Barlow_Regular',
                  fontSize: 21,
                  color: 'white',
                }}>
                Back
              </Text>
            </Pressable>
          )}
          {autofill && <Text style={{ paddingHorizontal: 10 }}> </Text>}
          <Pressable
            style={styles.button_dark}
            // add subject and body https://stackoverflow.com/questions/44594818/how-to-launch-and-open-email-client-react-native
            onPress={() =>
              Linking.openURL(
                'mailto:support@example.com?subject=Fraudulent Purchase Claim&body=On {purchase_date}, a fraudulent purchase of amount {amount} dollars was made to the {organization} at {location}.'
              )
            }
            title="support@example.com">
            <Text
              style={{
                fontFamily: 'Barlow_Regular',
                fontSize: 21,
                color: 'white',
              }}>
              Submit
            </Text>
          </Pressable>
        </View>
      </View>
      <View style={{ backgroundColor: colors.dark, flex: 0.15 }} />
    </SafeAreaView>
  );
}

{
  /* Create the stack for navigation */
}
const Stack = createNativeStackNavigator();

{
  /* App:
    Stack navigator to connect various screens
    Contains all the screens in the app
 */
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="yuh">
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="Create Account"
          options={{ headerShown: false }}
          component={CreateAccScreen}
        />
        <Stack.Screen
          name="Menu"
          options={{ headerShown: false }}
          component={MenuScreen}
        />
        <Stack.Screen
          name="Purchase History"
          options={{ headerShown: false }}
          component={PurchaseHisScreen}
        />
        <Stack.Screen
          name="Flagged Purchases"
          options={{ headerShown: false }}
          component={FlaggedScreen}
        />
        <Stack.Screen
          name="Review Purchase"
          options={{ headerShown: false }}
          component={ReviewPurchaseScreen}
        />
        <Stack.Screen
          name="Generate Report"
          options={{ headerShown: false }}
          component={GenerateReportScreen}
        />
        <Stack.Screen
          name="File a Claim"
          options={{ headerShown: false }}
          component={FileClaimScreen}
        />
        <Stack.Screen
          name="Account Details"
          options={{ headerShown: false }}
          component={AccountDetailsScreen}
        />
        <Stack.Screen
          name="Bank Details"
          options={{ headerShown: false }}
          component={BankDetailsScreen}
        />
        <Stack.Screen
          name="Resources"
          options={{ headerShown: false }}
          component={ResourcesScreen}
        />
        <Stack.Screen
          name="About The App"
          options={{ headerShown: false }}
          component={AboutAppScreen}
        />
        <Stack.Screen
          name="Contact Us"
          options={{ headerShown: false }}
          component={ContactUsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

