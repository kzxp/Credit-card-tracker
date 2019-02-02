import React, { createContext, Component, createFactory } from 'react'
import withReducer from 'recompose/withReducer'

const defaultValue = {
  cardList: [],
  isLoading: false
}

const ADD_CARD = 'ADD_CARD'
const EDIT_CARD = 'EDIT_CARD'
const DELETE_CARD = 'DELETE_CARD'
const SET_LOADING = 'SET_LOADING'
const addCard = card => ({
  type: ADD_CARD,
  payload: {
    card
  }
})
const setLoading = flag => ({
  type: SET_LOADING,
  payload: {
    flag
  }
})

export const actions = {
  addCard,
  setLoading
}

function reducer(state, action) {
  console.warn('action', action)
  switch (action.type) {
    case ADD_CARD: {
      return {
        ...state,
        cardList: [...state.cardList, action.payload.card]
      }
    }
    // case EDIT_CARD:
    //   return { count: state.count + 1 }
    case DELETE_CARD: {
      return {
        ...state,
        cardList: state.cardList.map(({ id }) => id !== action.payload.id)
      }
    }
    case SET_LOADING: {
      return { ...state, isLoading: action.payload.flag }
    }
    default:
      return state
  }
}
const _CardListProvider = ({ state, dispatch, children }) =>
  console.warn('provider', state) || (
    <CardListContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CardListContext.Provider>
  )
export const CardListProvider = withReducer(
  'state',
  'dispatch',
  reducer,
  defaultValue
)(_CardListProvider)

const CardListContext = createContext(defaultValue)

export const withCardListConsumer = ChildComponent => props => {
  const Consumer = () => (
    <CardListContext.Consumer>
      {context =>
        console.warn('comsumer', context) || (
          <ChildComponent {...props} {...context} />
        )
      }
    </CardListContext.Consumer>
  )
  Consumer.WrappedComponent = ChildComponent
  Consumer.displayName = `Consumer.${ChildComponent.displayName}`

  return <Consumer />
}

export default CardListContext
