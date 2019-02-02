import React, { PureComponent } from 'react'
import { StyleSheet } from 'react-native'
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Title,
  H2,
  Text,
  Content,
  Card,
  CardItem,
  Icon,
  Spinner,
  View,
  Thumbnail
} from 'native-base'
import CardListContext, { withCardListConsumer } from '../../context/CardList'

const getCreditCards = async () => {
  await new Promise((resolve, reject) => setTimeout(resolve, 0))

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

const ListComponent = props => (
  <CardListContext.Consumer>
    {({ cardList, isLoading }) => (
      <Container>
        <Header transparent>
          <Body>
            <Title style={styles.title}>Credit card tracker</Title>
          </Body>
          <Right>
            <Button transparent danger onPress={() => alert('WIP')}>
              <Icon style={{ fontSize: 26 }} name="funnel" />
            </Button>
            <Button transparent primary onPress={() => alert('WIP')}>
              <Icon style={{ fontSize: 26 }} name="settings" />
            </Button>
          </Right>
        </Header>
        <Content style={styles.content}>
          {isLoading ? (
            <Spinner />
          ) : Array.isArray(cardList) && cardList.length > 0 ? (
            cardList.map(({ name, transactions, digits, type }, index) => (
              <Card
                style={{
                  flexDirection: 'column'
                }}
                key={index}
              >
                <CardItem>
                  <Left>
                    <H2>{name}</H2>
                  </Left>
                  <Right>
                    <Button
                      onPress={() => alert('WIP')}
                      danger
                      style={{
                        paddingLeft: 15,
                        paddingRight: 15
                      }}
                      transparent
                    >
                      <Icon
                        style={{
                          fontSize: 32
                        }}
                        name="add"
                      />
                    </Button>
                  </Right>
                </CardItem>
                <CardItem>
                  <Left>
                    <Text
                      style={{
                        marginLeft: 0
                      }}
                    >
                      Latest paid
                    </Text>
                  </Left>
                </CardItem>
                <CardItem style={{ minHeight: 100 }}>
                  {Array.isArray(transactions) && transactions.length > 0 ? (
                    <React.Fragment>
                      <Left>
                        <Thumbnail
                          square
                          large
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
                    </React.Fragment>
                  ) : (
                    <Body>
                      <Button large block transparent>
                        <Text uppercase={false}>No transaction</Text>
                      </Button>
                    </Body>
                  )}
                </CardItem>
                <CardItem>
                  <Text style={{ fontWeight: 'bold' }}>{digits}</Text>
                  <Text
                    style={{
                      position: 'absolute',
                      fontWeight: 'bold',
                      right: 10,
                      bottom: 5
                    }}
                  >
                    <Icon
                      style={{ fontSize: 32 }}
                      type="FontAwesome"
                      name={`cc-${type}`}
                    />
                  </Text>
                </CardItem>
              </Card>
            ))
          ) : (
            <View
              style={{
                marginTop: 20,
                marginBottom: 80,
                alignItems: 'center'
              }}
            >
              <Text
                style={{
                  marginTop: 20,
                  transform: [{ rotate: '35deg' }]
                }}
              >
                <Icon style={{ fontSize: 48 }} name="card" />
              </Text>
              <Text style={{ fontSize: 28 }}>Not found</Text>
            </View>
          )}
          <Button
            block
            iconLeft
            onPress={() => props.navigation.navigate('AddCard')}
            style={{ marginTop: 15 }}
          >
            <Text>Add a new card</Text>
          </Button>
        </Content>
      </Container>
    )}
  </CardListContext.Consumer>
)

const styles = StyleSheet.create({
  title: {
    marginLeft: 10,
    fontWeight: 'bold',
    color: 'black'
  },
  content: {
    paddingLeft: 15,
    paddingRight: 15
  }
})

export default props => <ListComponent {...props} />
