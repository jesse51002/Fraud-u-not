import * as React from 'react';
import { useCallback, useState } from 'react';
import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
  Alert,
  Button,
  TextInput,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Divider } from 'react-native-paper';

// You can import from local files
import CreateAccount from './screens/CreateAccount';

import colors from './config/colors';

SplashScreen.preventAutoHideAsync();

{/* get screen dimensions */}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

{/* BIG GOAL: REFACTORRR EVERYTHINGGG */}

{/* Home Screen:
    The first screen the user sees when opening the app
    Allows the user to login or create an account
 */}
function HomeScreen({ navigation }) {
  {/* load the custom fonts */}
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

{/* Login Screen:
    Allows the user to enter their username/email and password for authentication
    If the user does not have an account, they can switch the the create account page
    Currently allows access to the menu, but this is only temporary (for testing purposes)
 */}
function LoginScreen({ navigation }) {
  // send these to database for authentication when sign in button is clicked
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // then get isError and isLogged in from Hector
  const [isError, setIsError] = useState(false);

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
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: colors.dark,
          flex: 0.3,
          padding: 3,
          justifyContent: 'center',
        }}>
        {/*NOTEEE: THE LOGIN AND CREATE ACCOUNT SCREENS SHOULD NOT HAVE MENU ICON!! remove later */}
        <Ionicons
          name="menu-outline"
          size={50}
          color="#ADB6C4"
          onPress={() => navigation.navigate('Menu', 'Login')}
        />
      </View>
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
            onChangeText={(username) => setUsername(username)}
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

{/* Create Account Screen:
    Allows the user to enter their username, email, and password to create an account
    If the user already has an account, they can switch the the login page
    Currently allows access to the menu, but this is only temporary (for testing purposes)
 */}
function CreateAccScreen({ navigation }) {
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
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: colors.dark,
          flex: 0.3,
          padding: 3,
          justifyContent: 'center',
        }}>
        {/*NOTEEE: THE LOGIN AND CREATE ACCOUNT SCREENS SHOULD NOT HAVE MENU ICON!! remove later */}
        <Ionicons
          name="menu-outline"
          size={50}
          color="#ADB6C4"
          onPress={() => navigation.navigate('Menu', 'Create Account')}
        />
      </View>
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
            onChangeText={(username) => setUsername(username)}
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
            onChangeText={(username) => setUsername(username)}
            placeholder={'Enter password'}
            placeholderTextColor="gray"
            secureTextEntry={true}
          />
          <Text> </Text>
        </View>
        <View style={{ justifyContent: 'flex-end' }}>
          <Pressable
            style={styles.button_dark}
            onPress={() => navigation.navigate('Purchase History', 'Menu')}>
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

{/* Menu Screen:
    The user can go to different pages using this menu screen
    Clicking the x button should bring the user to the last screen they were on
    Should only be accessible after the user has logged in - not the case right now
 */}
function MenuScreen({ route, navigation }) {
  const prevScreen = route.params;

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
    <SafeAreaView
      style={{
        flex: 1,
        padding: 10,
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
        <Pressable onPress={() => console.log('Purchase History')}>
          <Text style={styles.menuItems}>Purchase History</Text>
        </Pressable>
        {/* this empty view element acts as a divider */}
        <View style={styles.separator} />
        <Pressable onPress={() => console.log('Account Details')}>
          <Text style={styles.menuItems}>Account Details</Text>
        </Pressable>
        <View style={styles.separator} />
        <Pressable onPress={() => console.log('Bank Details')}>
          <Text style={styles.menuItems}>Bank Details</Text>
        </Pressable>
        <View style={styles.separator} />
        <Pressable onPress={() => console.log('File a Claim')}>
          <Text style={styles.menuItems}>File a Claim</Text>
        </Pressable>
        <View style={styles.separator} />
        <Pressable onPress={() => console.log('About the App')}>
          <Text style={styles.menuItems}>About the App</Text>
        </Pressable>
        <View style={styles.separator} />
        <Pressable onPress={() => console.log('About the Developers')}>
          <Text style={styles.menuItems}>About the Developers</Text>
        </Pressable>
        <View style={styles.separator} />
        <Pressable onPress={() => console.log('Contact Us')}>
          <Text style={styles.menuItems}>Contact Us</Text>
        </Pressable>
        <View style={styles.separator} />
        <Pressable
          style={styles.underline}
          onPress={() => navigation.navigate('Home')}>
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

const Stack = createNativeStackNavigator();

{/* App:
    Stack navigator to connect various screens
 */}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.light,
  },
  logo: {
    width: windowWidth,
    height: 115,
    resizeMode: 'cover',
    paddingBottom: 30,
  },
  title: {
    fontFamily: 'Barlow_Regular',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 20,
    fontSize: 40,
  },
  button_light: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 17,
    elevation: 3,
    backgroundColor: colors.highlight_light,
  },
  button_dark: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 17,
    elevation: 3,
    backgroundColor: colors.dark,
  },
  textInput: {
    width: windowWidth - 100,
    height: 35,
    padding: 10,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 15,
  },
  whiteContainer: {
    width: windowWidth - 50,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 15,
    borderRadius: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  separator: {
    borderBottomColor: colors.light,
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: windowWidth - 80,
  },
  menuItems: {
    fontFamily: 'Barlow_Regular',
    fontSize: 22,
    color: 'white',
    paddingTop: windowHeight / 25,
    paddingBottom: 10,
  },
  underline: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
});

