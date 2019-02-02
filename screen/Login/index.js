import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import {
  Icon,
  Container,
  Header,
  Body,
  Title,
  Right,
  Content,
  Button,
  Text,
  Spinner,
  View
} from 'native-base'

import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin'

class Login extends Component {
  state = {
    isLoging: false,
    userInfo: {},
    isChecking: true
  }

  handleGoogleLogin = async () => {
    this.setState({
      isLoging: true
    })
    try {
      const userInfo = await this.props.screenProps.onGoogleLogin()
      this.props.navigation.replace('CardList')
    } catch (error) {
    } finally {
      this.setState({
        isLoging: false
      })
    }
  }

  async componentDidMount() {
    try {
      const isLoggedIn = await this.props.screenProps.isLoggedIn()
      if (isLoggedIn) this.props.navigation.replace('CardList')
      return
    } catch (error) {}
    this.setState({
      isChecking: false
    })
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.content}>
          {this.state.isChecking ? (
            <Spinner />
          ) : (
            <GoogleSigninButton
              style={{ width: 100, height: 64 }}
              size={GoogleSigninButton.Size.Icon}
              color={GoogleSigninButton.Color.Dark}
              onPress={this.handleGoogleLogin}
              disabled={this.state.isLoging}
            />
          )}
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Login
