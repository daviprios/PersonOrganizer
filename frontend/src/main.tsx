import React from 'react'
import ReactDOM from 'react-dom'

import './styles/global.sass'
import Routes from './Routes'

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
)
