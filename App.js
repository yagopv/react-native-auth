import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';

import { Header } from './src/components/common';
import LoginForm from './src/components/LoginForm';

export default class App extends Component {
  componentWillMount = () => {
    firebase.initializeApp({
      apiKey: "AIzaSyC2OQC3gPsCR1nsw21sbuj0mRwLFWmLGOw",
      authDomain: "reactnativeauth-f4ea8.firebaseapp.com",
      databaseURL: "https://reactnativeauth-f4ea8.firebaseio.com",
      projectId: "reactnativeauth-f4ea8",
      storageBucket: "reactnativeauth-f4ea8.appspot.com",
      messagingSenderId: "1089079357899"
    });
  }
  
  render() {
    return (
      <View> 
        <Header headerText="Auth with Firebase" />
        <LoginForm />
      </View>
    );
  }
}
