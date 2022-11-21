'use strict';
import { StyleSheet, Dimensions } from 'react-native';
import colors from './colors';

{
  /* get screen dimensions */
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

module.exports = StyleSheet.create({
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
    fontSize: 38,
  },
  header: {
    fontFamily: 'Barlow_Medium',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingBottom: 10,
    fontSize: 21,
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
    paddingVertical: 14,
    paddingHorizontal: 25,
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
    padding: 10,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  whiteAbsolute: {
    width: windowWidth - 50,
    height: windowHeight - 225,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 15,
    borderRadius: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
    alignContent: 'center',
    alignItems: 'center',
  },
  separator: {
    borderBottomColor: colors.light,
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: windowWidth - 80,
  },
  wrapper: {
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItems: {
    fontFamily: 'Barlow_Regular',
    fontSize: 22,
    color: 'white',
    justifyContent: 'center',
    marginTop: windowHeight / 25,
    marginBottom: 10,
  },
  cardtext: {
    fontSize: 16,
    fontFamily: 'Barlow_Regular',
    padding: 2,
  },
  cardbackground: {
    width: windowWidth - 70,
    marginBottom: 5,
    borderColor: 'black',
    borderRadius: 15,
    boxShadow: colors.dark,
    backgroundColor: colors.card_light,
  },
  underline: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  rowContainer: {
    paddingBottom: 2,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
