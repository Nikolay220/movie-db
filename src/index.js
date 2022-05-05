import React from 'react'
import ReactDOMClient from 'react-dom/client'
import { Offline, Online } from 'react-detect-offline'
import { Alert } from 'antd'

import App from './components/App'

import 'antd/dist/antd.min.css'

const rootContainer = document.getElementById('root')
const root = ReactDOMClient.createRoot(rootContainer)
root.render(
  <React.Fragment>
    <Offline>
      <Alert
        message="Error"
        description={'Recommendation: you are offline, check your internet connection.'}
        type="error"
        showIcon
      />
    </Offline>
    <Online>
      <App />
    </Online>
  </React.Fragment>
)
