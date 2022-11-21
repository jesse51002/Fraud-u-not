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
          onPress={() => navigation.navigate('Menu', 'Account Details')}
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
        <Text style={styles.title}>Account Details</Text>
        <ScrollView style={styles.whiteAbsolute}>
          <Card style={styles.cardbackground}>
            <Card.Content>
              <Text
                style={{
                  fontFamily: 'Barlow_Medium',
                  fontSize: 16,
                  paddingTop: 3,
                }}>
                Full Name:
              </Text>
              <Text style={styles.cardtext}>Krizteen Tomas</Text>
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
              <Text style={styles.cardtext}>kristine@gmail.com</Text>
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
                Address:
              </Text>
              <Text style={styles.cardtext}>
                221B Baker St. <br />
                Houston, Texas 77013
                <br />
                United States of America
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
                Password:
              </Text>
              <Text style={styles.cardtext}>**********</Text>
            </Card.Content>
          </Card>
        </ScrollView>
        <Pressable
          style={styles.button_dark}
          onPress={() => console.log("update things")}>
          <Text
            style={{
              fontFamily: 'Barlow_Regular',
              fontSize: 21,
              color: 'white',
            }}>
            Update
          </Text>
        </Pressable>
      </View>
      <View style={{ backgroundColor: colors.dark, flex: 0.15 }} />
    </SafeAreaView>
  );
}
