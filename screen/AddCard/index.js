import React, { Component, createRef } from 'react'
import { createSelector } from 'reselect'
import {
  Form,
  Item,
  Input,
  Label,
  Picker,
  Icon,
  Button,
  Text,
  View,
  DatePicker,
  Spinner
} from 'native-base'
import SecondScreen from '../components/base/SecondScreen'

import { set, isEmpty, merge, isEqual, isNil } from 'lodash/fp'
import CardListContext, {
  actions,
  CardListProvider,
  withCardListConsumer
} from '../../context/CardList'

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
  type: '',
  transactions: []
}

function getCreditCardType(number) {
  // visa
  var re = new RegExp('^4')
  if (number.match(re) != null) return 'visa'

  // Mastercard
  re = new RegExp('^5[1-5]')
  if (number.match(re) != null) return 'mastercard'

  // AMEX
  re = new RegExp('^3[47]')
  if (number.match(re) != null) return 'amex'

  // JCB
  re = new RegExp('^35(2[89]|[3-8][0-9])')
  if (number.match(re) != null) return 'jcb'

  return ''
}

const validateAddCard = createSelector(
  state => state.name,
  state => state.digits,
  state => state.type,
  (name, digits, type, isLoading) =>
    [!isEmpty(name), digits.length === 4, !isEmpty(type)].some(isEqual(false))
)

class AddCardComponent extends Component {
  state = defaultCreditCardValue
  saveRequest = null

  setValue = (key, value) => {
    if (key === 'digits') {
      this.setState(
        merge(this.state, {
          digits: value,
          type: getCreditCardType(value)
        })
      )
    } else {
      const newCreditCard = set(key, value, this.state)
      this.setState(newCreditCard)
    }
  }
  submitForm = () => {
    try {
      this.props.dispatch(actions.setLoading(true))
      new Promise(resolve => setTimeout(resolve, 5000)).then(() =>
        this.props.dispatch(actions.setLoading(false))
      )
      this.props.dispatch(actions.addCard(this.state))
      this.props.navigation.goBack()
    } catch (error) {}
  }

  render() {
    const isOkBtnDisabled = validateAddCard(this.state)

    return (
      <SecondScreen {...this.props} title="New card">
        <Form>
          <Item style={{ marginBottom: 30 }} stackedLabel>
            <Label>Credit card name</Label>
            <Input
              autoFocus
              maxLength={40}
              value={this.state.name}
              onChangeText={text => this.setValue('name', text)}
            />
          </Item>
          <Item style={{ marginBottom: 30 }} stackedLabel>
            <Label>First 4 digits</Label>
            <Input
              keyboardType="numeric"
              maxLength={4}
              value={this.state.digits}
              onChangeText={text => {
                this.setValue('digits', text.replace(/[^0-9]/g, ''))
              }}
            />
            <Text style={{ position: 'absolute', bottom: 10, right: 10 }}>
              {this.state.type ? (
                <Icon
                  style={{ fontSize: 40 }}
                  type="FontAwesome"
                  name={`cc-${this.state.type}`}
                />
              ) : null}
            </Text>
          </Item>
          <Item stackedLabel>
            <Label>Transactions (Optional)</Label>
            <Button
              transparent
              dark
              block
              style={{ paddingTop: 40, paddingBottom: 40 }}
              onPress={() =>
                this.props.navigation.push('AddTransaction', {
                  id: '1111'
                })
              }
            >
              <Text>no transaction, add a new one ?</Text>
            </Button>
          </Item>
        </Form>
        <View padder>
          <Button
            block
            style={{ marginTop: 30 }}
            onPress={this.submitForm}
            disabled={isOkBtnDisabled}
          >
            <Text>add</Text>
          </Button>
        </View>
      </SecondScreen>
    )
  }
}

export default withCardListConsumer(AddCardComponent)
