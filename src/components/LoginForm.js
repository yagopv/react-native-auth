import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import firebase from 'firebase';

import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
  state = { email: '', password: '', errorMessage: '', loading: false };

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ errorMessage: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)    
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this));
      });    
  }

  onLoginFail() {
    this.setState({
      loading: false,
      error: 'Authentication Failed' 
    });
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    })
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
    )
  }

  render() {
    return ( 
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="user@mail.com"
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })} />
        </CardSection>

        <CardSection>
          <Input
            label="Password"
            placeholder="Enter your password here"
            secureTextEntry
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })} />
        </CardSection>

        <Text style={styles.errorStyle}>
          {this.state.errorMessage}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  errorStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
});

export default LoginForm;