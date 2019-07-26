import './index.css'

import React from 'react'
import {render, hydrate} from 'react-dom'

import App from './App'

if (window.localStorage.getItem(`lastKnown_${window.location.href}`)) {
  document.querySelector('#app').innerHTML = JSON.parse(window.localStorage.getItem(`lastKnown_${window.location.href}`)).component
  hydrate(<App/>, document.querySelector('#app'));
}
else {
  render(<App/>, document.querySelector('#app'));
}
