import React, { Component } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Title,
  H2,
  H3,
  Text,
  Content,
  Card,
  CardItem,
  Icon,
  Spinner
} from 'native-base'

const getCreditCards = async () => {
  await new Promise((resolve, reject) => setTimeout(resolve, 5000))

  return Array.from({ length: 10 }, () => ({
    name: 'Credit card name',
    digits: '4422',
    type: 'VISA',
    transactions: [
      {
        name: 'Shabu indy',
        actualPrice: 1000.5,
        discount: 100,
        paidPrice: 900,
        isCashback: false,
        cashbackPercent: 0,
        type: 'restaurant'
      }
    ]
  }))
}

export default class List extends Component {
  state = {
    creditCards: [],
    isLoading: true
  }

  async componentDidMount() {
    const creditCards = await getCreditCards()
    this.setState(() => ({
      creditCards,
      isLoading: false
    }))
  }

  render() {
    return (
      <Container>
        <Header transparent>
          <Body>
            <Title style={styles.title}>Credit card tracker</Title>
          </Body>
          <Right>
            <Button
              transparent
              danger
              onPress={() => this.props.navigation.navigate('AddCard')}
            >
              <Icon style={{ fontSize: 28 }} name="funnel" />
            </Button>
            <Button
              transparent
              primary
              onPress={() => this.props.navigation.navigate('AddCard')}
            >
              <Icon style={{ fontSize: 28 }} name="add" />
            </Button>
          </Right>
        </Header>
        <Content style={styles.content}>
          {this.state.isLoading ? (
            <Spinner />
          ) : Array.isArray(this.state.creditCards) &&
          this.state.creditCards.length > 0 ? (
            this.state.creditCards.map(
              ({ name, transactions, digits, type }, index) => (
                <Card style={styles.creditCard} key={index}>
                  <CardItem>
                    <Left>
                      <H2>{name}</H2>
                    </Left>
                  </CardItem>
                  <CardItem>
                    <Left>
                      <H3 style={{ textDecorationLine: 'underline' }}>
                        Latest paid
                      </H3>
                    </Left>
                    <Right>
                      <H3 style={{ fontWeight: 'bold' }}>See more</H3>
                    </Right>
                  </CardItem>
                  {Array.isArray(transactions) && transactions.length > 0 ? (
                    <CardItem style={{ alignItems: 'flex-start' }}>
                      <Left>
                        <Image
                          style={{ height: 75, width: 50 }}
                          source={require('./Placeholder.png')}
                        />
                        <Text>
                          {transactions[transactions.length - 1].name}
                        </Text>
                        <Text>
                          {transactions[transactions.length - 1].paidPrice}
                        </Text>
                      </Left>
                      <Right>
                        <Icon
                          style={{ color: 'black', fontSize: 32 }}
                          name="ios-arrow-forward"
                        />
                      </Right>
                    </CardItem>
                  ) : null}
                  <CardItem style={{ position: 'relative' }}>
                    <Text style={styles.creditCardType}>
                      {digits} {type}
                    </Text>
                  </CardItem>
                </Card>
              )
            )
          ) : (
            <Text style={{ marginTop: 20, textAlign: 'center' }}>
              Please add a new card.
            </Text>
          )}
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    marginLeft: 10,
    fontWeight: 'bold',
    color: 'black'
  },
  content: {
    paddingLeft: 15,
    paddingRight: 15
  },
  creditCard: {
    minHeight: 220,
    flexDirection: 'column'
  },
  creditCardType: {
    position: 'absolute',
    fontWeight: 'bold',
    right: 5,
    bottom: 5
  }
})
