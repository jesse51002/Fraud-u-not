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
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Card } from 'react-native-paper';

// import style sheet and colors
const styles = require('../config/style');
import colors from '../config/colors';

{
  /* get screen dimensions */
}
const windowWidth = Dimensions.get('window').width;

{
  /* Purchase History Screen:
    Incomplete placeholder page
 */
}
export default function ContactUs({ navigation }) {
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
          onPress={() => navigation.navigate('Menu', 'About The App')}
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
        <Text style={styles.title}>About the App</Text>
        <ScrollView style={styles.whiteAbsolute}>
          <Card
            style={{
              width: windowWidth - 70,
              marginBottom: 5,
              borderRadius: 15,
            }}>
            <Card.Content>
              <Text style={styles.cardtext}>
                The purpose of this app is to prevent credit card fraud through
                detective measures. By extension, the main function of this app
                is to alert credit card users of unusual purchases.
                <br />
                <br />
                However, to increase the flexibility of this app and better
                satisfy its purpose, a flag and review system and filing a claim
                capabilities are included.
              </Text>
            </Card.Content>
          </Card>
        </ScrollView>
        <Image
          style={{
            width: windowWidth - 70,
            height: 90,
            resizeMode: 'cover',
            justifyContent: 'flex-end',
          }}
          source={require('../assets/background_logo.png')}
        />
      </View>
      <View style={{ backgroundColor: colors.dark, flex: 0.15 }} />
    </SafeAreaView>
  );
}
