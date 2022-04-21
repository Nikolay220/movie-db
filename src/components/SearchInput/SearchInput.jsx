import React, { Component } from 'react'
import { Input } from 'antd'

import AppController from '../../services/AppController'

import styles from './SearchInput.module.scss'

export default class SearchInput extends Component {
  render() {
    const appController = new AppController(styles)
    const f = appController.classesToCssModulesFormat.bind(appController)
    if (this.props.windowSize === 'desktop' || this.props.windowSize === 'tablet')
      return (
        <div className={f('search-panel')}>
          <Input className={f('search-panel__input')} onChange={this.props.onChange} placeholder="Type to search ..." />
        </div>
      )
    else
      return (
        <div className={f('search-panel search-panel--mobile')}>
          <Input
            className={f('search-panel__input search-panel__input--mobile')}
            onChange={(evt) => this.props.onChange(evt)}
            placeholder="Type to search ..."
          />
        </div>
      )
  }
}
