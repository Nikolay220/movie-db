import React from 'react'
import { StarFilled } from '@ant-design/icons'

import AppController from '../../services/app-controller'

import styles from './stars-rating-panel.module.scss'

export default function StarsRatingPanel({ rating }) {
  const appController = new AppController(styles)
  const f = appController.classesToCssModulesFormat.bind(appController)
  const generateStars = () => {
    let fullAndDecimalDigits = rating
      .toString()
      .split('.')
      .map((value) => {
        return Number(value)
      })
    let starsArr = []
    let counter = 1
    while (counter++ < 11) {
      if (counter <= fullAndDecimalDigits[0])
        starsArr.push(<StarFilled key={counter} style={{ fontSize: '17px', color: '#fadb14', marginRight: '6px' }} />)
      // ниже кейс для закрашивания части звезды, здесь не подойдёт
      // стандартная, здесь нужна картинка звезды прозрахная внутри и
      // белая снаружи
      // else if (counter === fullAndDecimalDigits[0] + 1)
      //   starsArr.push(
      //     <span style={{ position: 'relative' }}>
      //       <StarFilled style={{ fontSize: '17px', color: '#f0f0f0', zIndex: '2', marginRight: '6px' }} />
      //       <StarFilled
      //         style={{
      //           fontSize: '17px',
      //           height: '17px',
      //           width: '10px',
      //           color: '#fadb14',
      //           position: 'absolute',
      //           // zIndex: '1',
      //           left: '0',
      //           top: '0',
      //         }}
      //       ></StarFilled>
      //     </span>
      //   )
      else
        starsArr.push(<StarFilled key={counter} style={{ fontSize: '17px', color: '#f0f0f0', marginRight: '6px' }} />)
    }
    return starsArr
  }
  return <div className={f('stars-rating-panel')}>{generateStars()}</div>
}
