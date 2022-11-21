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
import * as WebBrowser from 'expo-web-browser';

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
export default function Resources({ navigation }) {
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
          onPress={() => navigation.navigate('Menu', 'Resources')}
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
        <Text style={styles.title}>Resources</Text>
        <ScrollView style={styles.whiteAbsolute}>
          <Card
            style={{
              width: windowWidth - 70,
              marginBottom: 5,
              borderRadius: 15,
            }}>
            <Card.Content>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Barlow_Medium',
                  fontSize: 16,
                  paddingTop: 3,
                }}>
                Identity Theft
              </Text>
              <Text style={styles.cardtext}>
                Occurs when someone steals your personal information and uses it
                to take your money, open credit accounts, file tax returns, make
                health insurance claims and/or more without your consent.
              </Text>
            </Card.Content>
          </Card>
          <Card style={styles.cardbackground}>
            <Card.Content>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Barlow_Medium',
                  fontSize: 16,
                  paddingTop: 3,
                }}>
                Report identity (ID) theft to the FTC at 1-877-438-4338.
              </Text>
            </Card.Content>
          </Card>
          <Card
            style={{
              width: windowWidth - 70,
              marginBottom: 5,
              borderRadius: 15,
            }}>
            <Card.Content>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Barlow_Regular',
                  padding: 2,
                  textAlign: 'center',
                }}>
                To learn more about identity theft is and how to report it, head
                to this website:
              </Text>
              {/* Opens a browser with the webpage */}
              <Pressable
                style={styles.underline}
                onPress={() =>
                  WebBrowser.openBrowserAsync('https://www.identitytheft.gov')
                }>
                <Text
                  style={{
                    fontFamily: 'Barlow_Regular',
                    fontSize: 17,
                    textDecorationLine: 'underline',
                    color: colors.dark,
                    textAlign: 'center',
                  }}>
                  https://www.identitytheft.gov
                </Text>
              </Pressable>
            </Card.Content>
          </Card>
        </ScrollView>
      </View>
      <View style={{ backgroundColor: colors.dark, flex: 0.15 }} />
    </SafeAreaView>
  );
}
