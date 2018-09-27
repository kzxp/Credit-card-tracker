import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Title,
  Text,
  Content,
  Card,
  CardItem,
  Icon,
  Spinner
} from 'native-base'

export default class SecondScreen extends Component {
  render() {
    return (
      <Container>
        <Header transparent>
          <Left>
            <Button
              transparent
              primary
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon style={{ fontSize: 32 }} name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={styles.title}>{this.props.title}</Title>
          </Body>
          <Right>
            {this.props.rightHeader}
          </Right>
        </Header>
        <Content styles={styles.content}>{this.props.children}</Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    color: 'black'
  },
  content: {
    paddingLeft: 15,
    paddingRight: 15
  }
})
