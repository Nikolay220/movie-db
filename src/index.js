import React from 'react'
import ReactDOMClient from 'react-dom/client'

import App from './components/App'

import 'antd/dist/antd.min.css'

const rootContainer = document.getElementById('root')
const root = ReactDOMClient.createRoot(rootContainer)
root.render(<App />)
