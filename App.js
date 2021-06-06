import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import MainStackNavigator from "./navigation/Navigation";
import globalStyle from './assets/styles/globalStyle';
import consts from './src/consts';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
    };
  }

  async componentDidMount() {
  }

  render() {
      return (
            <MainStackNavigator />
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
