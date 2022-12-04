import * as React from 'react';
import { useCallback, useState } from 'react';
import {
  Text,
  SafeAreaView,
  View,
  Dimensions,
  Pressable,
  TextInput,
  ScrollView,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Card } from 'react-native-paper';

// import style sheet and colors
import colors from '../config/colors';
const styles = require('../config/style').default;


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
  //return (<View><Text>yolomy ngiagasda d</Text></View>)

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
          onPress={() => navigation.navigate('Menu', 'Contact Us')}
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
        <Text style={styles.title}>Contact Us</Text>
        {/*<ScrollView style={styles.whiteAbsolute}>*/}
          <Card
            style={{
              width: windowWidth - 70,
              marginBottom: 5,
              borderRadius: 15,
            }}>
            <Card.Content>
              <Text style={styles.cardtext}>
                Thank you for choosing Fraud-U-Not! If you have any questions,
                concerns, or suggestions, please feel free to reach out to us!
              </Text>
            </Card.Content>
          </Card>
          <Card style={styles.cardbackground}>
            <Card.Content>
              <Text
                style={{
                  fontFamily: 'Barlow_Medium',
                  fontSize: 16,
                  paddingTop: 3,
                }}>
                Email:
              </Text>
              <Text style={styles.cardtext}>fraudunot@gmail.com</Text>
            </Card.Content>
          </Card>
          <Card style={styles.cardbackground}>
            <Card.Content>
              <Text
                style={{
                  fontFamily: 'Barlow_Medium',
                  fontSize: 16,
                  paddingTop: 3,
                }}>
                Phone Number:
              </Text>
              <Text style={styles.cardtext}>(832) 972-5130</Text>
            </Card.Content>
          </Card>
          <Card style={styles.cardbackground}>
            <Card.Content>
              <Text
                style={{
                  fontFamily: 'Barlow_Medium',
                  fontSize: 16,
                  paddingTop: 3,
                }}>
                Headquarters:
              </Text>
              <Text style={styles.cardtext}>800 W Campbell Road, Richardson, Texas</Text>
            </Card.Content>
          </Card>
        {/*</ScrollView>*/}
      </View>
      <View style={{ backgroundColor: colors.dark, flex: 0.15 }} />
    </SafeAreaView>
  );
}
