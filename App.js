/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */

import React, { Component } from 'react'
import { Root } from 'native-base'
import { Platform, StyleSheet } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import CardList from './screen/CardList'
import AddCard from './screen/AddCard'

const AppNavigator = createStackNavigator(
  {
    Home: { screen: CardList },
    AddCard: { screen: AddCard }
  },
  {
    initialRouteName: 'Home',
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

export default () => (
  <Root>
    <AppNavigator />
  </Root>
)
