import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';

import { Header, Button, Spinner, Card, CardSection } from './src/components/common';
import LoginForm from './src/components/LoginForm';

export default class App extends Component {
  state = { loggedIn: null };
 
  componentWillMount = () => {
    firebase.initializeApp({
      apiKey: "AIzaSyC2OQC3gPsCR1nsw21sbuj0mRwLFWmLGOw",
      authDomain: "reactnativeauth-f4ea8.firebaseapp.com",
      databaseURL: "https://reactnativeauth-f4ea8.firebaseio.com",
      projectId: "reactnativeauth-f4ea8",
      storageBucket: "reactnativeauth-f4ea8.appspot.com", 
      messagingSenderId: "1089079357899"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Card>
            <CardSection>
              <Button
                style={{ marginTop: 150 }}
                onPress={() => firebase.auth().signOut()}>
                Log out
              </Button>
            </CardSection>
          </Card>
        )
      case false:
        return <LoginForm />
      default:
        return <Spinner size="large" />
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Auth with Firebase" />
        {this.renderContent()}
      </View>
    );
  }
}
