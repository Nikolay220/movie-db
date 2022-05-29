import React, { Component } from 'react'
import { Input } from 'antd'

import AppController from '../../services/AppController'

import styles from './SearchInput.module.scss'

export default class SearchInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      curQuery: this.props.curQuery,
    }
    this.onChange = (evt) => {
      this.setState({ curQuery: evt.target.value })
    }
  }
  render() {
    const appController = new AppController(styles)
    const f = appController.classesToCssModulesFormat.bind(appController)
    const { windowSize, onChange } = this.props
    if (windowSize === 'desktop' || windowSize === 'tablet')
      return (
        <div className={f('search-panel')}>
          <Input
            value={this.state.curQuery}
            className={f('search-panel__input')}
            onChange={(evt) => {
              this.onChange(evt)
              onChange(evt)
            }}
            placeholder="Type to search ..."
          />
        </div>
      )
    else
      return (
        <div className={f('search-panel search-panel--mobile')}>
          <Input
            value={this.state.curQuery}
            className={f('search-panel__input search-panel__input--mobile')}
            onChange={(evt) => {
              this.onChange(evt)
              onChange(evt)
            }}
            placeholder="Type to search ..."
          />
        </div>
      )
  }
}
