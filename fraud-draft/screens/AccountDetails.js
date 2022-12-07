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
import Cookies from 'universal-cookie';
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
  // (I think) every time the screen re-renders this function is called - perfect because it will keep getting updated by the database hopefully
  
  /**/
  // JESSE get this from the cache
  const [username, setUsername] = useState('rohanisbad');
  // JESSE you need to leave the variables, but you can take out the text in it
  // e.g., const [name, setName] = useState(''); instead
  const [name, setName] = useState('Kristine Thomas');
  const [email, setEmail] = useState('kristine@gmail.com');
  const [phone, setPhone] = useState('(832) 972-5130');
  const [address, setAddress] = useState(
    '221B Baker St. \nHouston, Texas 77013 \nUnited States of America'
  );
  const [password, setPassword] = useState('•••••••••');
  const [flagAmount, setFlagAmount] = useState('2000');
  const [pulled, setPulled] = useState(false);
  

  React.useEffect(() => {
    console.log('screen reloaded.');

    const cookies = new Cookies();
    setUsername(cookies.get('username'))

  }, []);
  /**/

  React.useEffect(() => {
    pullDetails()
  }, [username]);

  //// JESSE THIS PART IS RELEVANT TO YOU /////
  {
    /* PULLING FROM DATABASE
    sending the database a username and getting the results back
  */
  }
  const pullDetails = async () => {
    try {
      // ~~~ you just need to edit this part based on how your server works ~~~ //

      const response = await fetch('http://127.0.0.1:5000/accountDetails', {
        method: 'POST',
        // main thing you probably have to modify
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // JESSE you're gonna need to get this from the cache cuz right now its coming from my hardcoded value
          type:"GET",
          username: username,
        })
      });

      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
      if (response.status === 200){
        const json = await response.json();
        // updating all the stored values
        setName(json.name);
        setEmail(json.email);
        setPhone(json.phone);
        setAddress(json.address);
        // censoring the password
        const pass = json.password3;
        var replaced = pass.replace(/./g, '•');
        setPassword(replaced);
        //
        //setFlagAmount(json.FlagAmount);
      }
      else{
        print('pullDetails failed')
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = async () => {
    // Handler to enable of disable TextInput + update data in the database
    // JESSE add this too
    if (isEditable) {
      await updateDetails();
      console.log("update database");

      console.log('screen reloaded.');
      pullDetails();
    }
    setIsEditable(!isEditable);
  };

  if(!pulled){
    console.log('screen reloaded.');
    pullDetails();
    setPulled(true)
  }

  //// JESSE THIS PART IS RELEVANT TO YOU /////
  {
    /* SENDING UPDATES TO DATABASE
    sending the database the updated account info whenever user clicks save
  */
  }
  const updateDetails = async () => {
    try {
      // ~~~ you just need to edit this part based on how your server works ~~~ //

      const response = await fetch('http://127.0.0.1:5000/accountDetails', {
        method: 'POST',
        // main thing you probably have to modify
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type:"SET",
          username: username,
          name: name,
          email: email,
          phone: phone,
          address: address,
          password3: password
        }),
      });

      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
      if (response.status === 200){
        const json = await response.json();
        // I guess you could send me a value abt whether it worked or not
        const didWork = json.Success;
        console.log({ didWork });
      }
    } catch (error) {
      console.error(error);
    }
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
        <Pressable style={styles.button_dark} onPress={handleClick}>
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
