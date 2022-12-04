'use strict';
import { StyleSheet, Dimensions } from 'react-native';
import colors from './colors';

{
  /* get screen dimensions */
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
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
  accountHeader: {
    fontFamily: 'Barlow_Medium',
    fontSize: 16,
    paddingVertical: 3,
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
    fontFamily: 'Barlow_Regular',
    fontSize: 16,
  },
  textInputCard: {
    height: 35,
    borderColor: colors.card_light,
    borderRadius: 10,
    paddingTop: 2,
    backgroundColor: 'white',
    fontFamily: 'Barlow_Regular',
    fontSize: 16,
    width: windowWidth - 100,
    padding: 4,
    borderWidth: 1,
    color: colors.dark,
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
    justifyContent: 'space-between',
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    //alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
