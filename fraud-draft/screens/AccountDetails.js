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
export default function AccountDetails({ navigation }) {
  // allow details to be changed by user
  const [isEditable, setIsEditable] = useState(false);
  // account details
  // for the information
  const [name, setName] = useState('Kristine Thomas');
  const [username, setUsername] = useState('krist123');
  const [email, setEmail] = useState('kristine@gmail.com');
  const [phone, setPhone] = useState('(832) 972-5130');
  const [address, setAddress] = useState(
    '221B Baker St. \nHouston, Texas 77013 \nUnited States of America'
  );
  const [password, setPassword] = useState('•••••••••');
  const [flagAmount, setFlagAmount] = useState('2000');

  const updateEdit = () => {
    //Handler to enable of disable TextInput
    //Make TextInput Enable/Disable
    setIsEditable(!isEditable);
  };

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
              <Text style={styles.accountHeader}>Full Name:</Text>
              <TextInput
                placeholder={name}
                style={[
                  styles.textInputCard,
                  {
                    backgroundColor: isEditable ? 'white' : colors.card_light,
                  },
                ]}
                //To make TextInput enable/disable
                editable={isEditable}
                onChangeText={(name) => setName(name)}
              />
            </Card.Content>
          </Card>
          <Card style={styles.cardbackground}>
            <Card.Content>
              <Text style={styles.accountHeader}>Username:</Text>
              <TextInput
                placeholder={username}
                style={[
                  styles.textInputCard,
                  {
                    backgroundColor: isEditable ? 'white' : colors.card_light,
                  },
                ]}
                //To make TextInput enable/disable
                editable={isEditable}
                onChangeText={(username) => setUsername(username)}
              />
            </Card.Content>
          </Card>
          <Card style={styles.cardbackground}>
            <Card.Content>
              <Text style={styles.accountHeader}>Email:</Text>
              <TextInput
                placeholder={email}
                style={[
                  styles.textInputCard,
                  {
                    backgroundColor: isEditable ? 'white' : colors.card_light,
                  },
                ]}
                //To make TextInput enable/disable
                editable={isEditable}
                onChangeText={(email) => setEmail(email)}
              />
            </Card.Content>
          </Card>
          <Card style={styles.cardbackground}>
            <Card.Content>
              <Text style={styles.accountHeader}>Phone Number:</Text>
              <TextInput
                placeholder={phone}
                style={[
                  styles.textInputCard,
                  {
                    backgroundColor: isEditable ? 'white' : colors.card_light,
                  },
                ]}
                //To make TextInput enable/disable
                editable={isEditable}
                onChangeText={(phone) => setPhone(phone)}
              />
            </Card.Content>
          </Card>
          <Card style={styles.cardbackground}>
            <Card.Content>
              <Text style={styles.accountHeader}>Address:</Text>
              <TextInput
                placeholder={address}
                style={[
                  styles.textInputCard,
                  {
                    backgroundColor: isEditable ? 'white' : colors.card_light,
                    height: 64,
                  },
                ]}
                //To make TextInput enable/disable
                editable={isEditable}
                onChangeText={(address) => setAddress(address)}
                multiline={true}
                numberOfLines={3}
              />
            </Card.Content>
          </Card>
          <Card style={styles.cardbackground}>
            <Card.Content>
              <Text style={styles.accountHeader}>Password:</Text>
              <TextInput
                placeholder={password}
                style={[
                  styles.textInputCard,
                  {
                    backgroundColor: isEditable ? 'white' : colors.card_light,
                  },
                ]}
                //To make TextInput enable/disable
                secureTextEntry={true}
                editable={isEditable}
                onChangeText={(password) => setPassword(password)}
              />
            </Card.Content>
          </Card>
          <Card style={styles.cardbackground}>
            <Card.Content>
              <Text style={styles.accountHeader}>Flag Amount:</Text>
              <TextInput
                placeholder={flagAmount}
                style={[
                  styles.textInputCard,
                  {
                    backgroundColor: isEditable ? 'white' : colors.card_light,
                  },
                ]}
                //To make TextInput enable/disable
                editable={isEditable}
                onChangeText={(flagAmount) => setFlagAmount(flagAmount)}
              />
            </Card.Content>
          </Card>
        </ScrollView>
        <Pressable style={styles.button_dark} onPress={updateEdit}>
          <Text
            style={{
              fontFamily: 'Barlow_Regular',
              fontSize: 21,
              color: 'white',
            }}>
            {!isEditable ? 'Edit' : 'Save'}
          </Text>
        </Pressable>
      </View>
      <View style={{ backgroundColor: colors.dark, flex: 0.15 }} />
    </SafeAreaView>
  );
}
