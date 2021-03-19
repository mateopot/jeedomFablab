import { StyleSheet } from 'react-native';
import consts from '../../src/consts';


export default StyleSheet.create({
  shadowStyle: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  fontTextRegular: {
    fontFamily: 'Raleway-Regular'
  },
  fontTextMedium: {
    fontFamily: 'Raleway-Medium'
  },
  fontTitleRegular: {
    fontFamily: 'PlayfairDisplay-Regular'
  },
  headerTitleText: {
    color: consts.BLACK
  },
  buttonBlack: {
    backgroundColor: consts.BLACK,
  },
  buttonBlackText: {
    color: '#FFF',
    fontSize: consts.FONT_SIZE_BUTTON_TEXT,
    textAlign: 'center'
  },
  buttonYellow: {
    backgroundColor: consts.YELLOW,
  },
  buttonYellowText: {
    color: '#000',
    fontSize: consts.FONT_SIZE_BUTTON_TEXT,
    textAlign: 'center',
  },
  buttonBottomNavigation: {
    padding: '4%',
    borderRadius: 100,
    width: '40%',
  },
  buttonsBottomContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'space-around',
    marginBottom: '5%'
  },
  disable: {
    opacity: .5
  },
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: consts.BACKGROUND_COLOR
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  textError: {
    width: '90%',
    fontSize: 20,
    textAlign: 'center',
    //  marginBottom: '3%'
  },
  textErrorTitle: {
    fontSize: 30,
    marginBottom:'15%'
  },
  iconErrorRefresh: {
    marginTop: '10%'
  }


});