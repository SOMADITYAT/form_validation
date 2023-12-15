import React from 'react'
import UserForm from './components/userForm'
import { Provider } from 'react-redux'
import store from './redux/Store'
import UserList from './components/UseList'

const App = () => {
  return (
    <Provider store={store}>
       <UserForm/>
       <UserList/>
    </Provider>
    
  )
}

export default App