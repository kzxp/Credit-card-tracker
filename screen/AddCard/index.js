import React, { Component } from 'react'
import {
  Form,
  Item,
  Input,
  Label,
  Picker,
  Icon,
  Button,
  Text
} from 'native-base'
import SecondScreen from '../components/base/SecondScreen'

import { set } from 'lodash/fp'

const CREDIT_CARD_TYPE = [
  {
    text: 'VISA',
    value: 'visa'
  },
  {
    text: 'MASTERCARD',
    value: 'mastercard'
  },
  {
    text: 'JCB',
    value: 'jcb'
  }
]

const defaultCreditCardValue = {
  name: '',
  digits: '',
  type: CREDIT_CARD_TYPE[0].value
}

export default class AddCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      creditCard: defaultCreditCardValue
    }
    this.setValue = this.setValue.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }

  setValue(key, value) {
    const newCreditCard = set(key, value, this.state.creditCard)
    this.setState({
      creditCard: newCreditCard
    })
  }

  async submitForm() {
    this.props.navigation.goBack()
  }

  render() {
    const isOkBtnDisabled = [
      this.state.creditCard.name,
      this.state.creditCard.digits,
      this.state.creditCard.type
    ].some(v => v === '')

    return (
      <SecondScreen
        {...this.props}
        title="New transaction"
      >
        <Form>
          <Item stackedLabel>
            <Label>Credit card name</Label>
            <Input
              value={this.state.creditCard.name}
              onChangeText={text => this.setValue('name', text)}
            />
          </Item>
          <Item stackedLabel>
            <Label>Last 4 digit</Label>
            <Input
              value={this.state.creditCard.digits}
              onChangeText={text => this.setValue('digits', text)}
            />
          </Item>
          <Item>
            <Label style={{ flex: 1 }}>Credit card type</Label>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              selectedValue={this.state.creditCard.type}
              onValueChange={text => this.setValue('type', text)}
            >
              {CREDIT_CARD_TYPE.map(({ text, value }) => (
                <Picker.Item key={value} label={text} value={value} />
              ))}
            </Picker>
          </Item>
        </Form>
        <Button
          full
          style={{ marginTop: 30 }}
          onPress={this.submitForm}
          disabled={isOkBtnDisabled}
        >
          <Text>ok</Text>
        </Button>
      </SecondScreen>
    )
  }
}
