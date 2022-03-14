import { messageTheme } from '$components/PopupMessage'
import { createContext, Dispatch, ReactNode, Reducer, useReducer } from 'react'

interface State {
  messages: {
    id: number,
    text: string,
    theme: messageTheme
  }[],
  lastId: number
}

interface Action {
  type: 'ADD' | 'REMOVE',
  id?: number,
  message?: {
    text: string,
    theme: messageTheme
  }
}

const reducer = (state: State, action: Action): State => {
  const { type, id, message } = action
  const messages = state.messages

  switch(type){
    case 'ADD':
      if(!message) return { ...state }
      const lastId = state.lastId + 1
      return { ...state, lastId: lastId, messages: [ ...messages, { id: lastId, text: message.text, theme: message.theme } ] }

    case 'REMOVE':
      if(!id) return { ...state }
      const newMessages = messages.filter((message) => message.id !== id)
      return { ...state, messages: newMessages }

    default:
      throw new Error('Action type doesn\'t exist')
  }
}

interface PopupMessageContext {
  popupMessages: State,
  dispatchPopupMessages: Dispatch<Action>
}

const initialState: State = {
  messages: [],
  lastId: 0
}

const PopupMessageContext = createContext<PopupMessageContext>({ popupMessages: initialState, dispatchPopupMessages: () => {} })

const PopupMessageProvider = (props: { children: ReactNode }) => {
  const { children } = props

  const [state, dispatch] = useReducer<Reducer<State, Action>>(reducer, initialState)

  return (
    <PopupMessageContext.Provider value={{ popupMessages: state, dispatchPopupMessages: dispatch }}>
      {children}
    </PopupMessageContext.Provider>
  )
}

export { PopupMessageContext }
export default PopupMessageProvider