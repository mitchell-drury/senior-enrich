'use strict'
import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {render} from 'react-dom'

import store from './store'
import Galaxy from './components/Galaxy'

render (
  <BrowserRouter >
    <Galaxy />
  </BrowserRouter >,
  document.getElementById('main')
)
