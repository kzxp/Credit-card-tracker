/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */

import React, { Component } from 'react'
import { Root } from 'native-base'
import { Platform, StyleSheet } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import Login from './screen/Login'
import CardList from './screen/CardList'
import AddCard from './screen/AddCard'
import Firebase from './firebase'
import { CardListProvider, withCardListConsumer } from './context/CardList'

const AppNavigator = createStackNavigator(
  {
    Login: { screen: Login },
    CardList: { screen: CardList },
    AddCard: { screen: AddCard }
  },
  {
    initialRouteName: 'Login',
    navigationOptions: { header: null },
    transitionConfig: () => ({
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps
        const { index } = scene
        const width = layout.initWidth

        return {
          opacity: position.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0, 1, 0]
          }),
          transform: [
            {
              translateX: position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [-width, 0, width]
              })
            }
          ]
        }
      }
    })
  }
)

const Spy = () => console.warn('Re render') || null

export default () => {
  const firebaseInstance = new Firebase()
  const screenProps = {
    onGoogleLogin: firebaseInstance.googleLogin,
    onReGoogleLogin: firebaseInstance.reGoogleLogin,
    isLoggedIn: firebaseInstance.isLoggedIn
  }

  return (
    <Root>
      <CardListProvider>
        <React.Fragment>
          <Spy />
          <AppNavigator screenProps={screenProps} />
        </React.Fragment>
      </CardListProvider>
    </Root>
  )
}
