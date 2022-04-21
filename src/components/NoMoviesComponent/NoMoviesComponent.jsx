import React from 'react'

import AppController from '../../services/AppController'

import styles from './NoMoviesComponent.module.scss'

export default function NoMoviesComponent() {
  const appController = new AppController(styles)
  const f = appController.classesToCssModulesFormat.bind(appController)
  return (
    <div className={f('no-movies-component text text--font-size--31px text--color--827E7E')}>
      no movies for this search
    </div>
  )
}
