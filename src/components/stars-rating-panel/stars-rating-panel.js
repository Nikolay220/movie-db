import React from 'react'
import { StarFilled } from '@ant-design/icons'
import './stars-rating-panel.css'

export default function StarsRatingPanel({ rating }) {
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
      //       <StarFilled style={{ fontSize: '20px', color: 'transparent', position: 'relative', zIndex: '2' }} />
      //       <span
      //         style={{
      //           content: '',
      //           width: '20px',
      //           height: '20px',
      //           backgroundColor: '#f0f0f0',
      //           position: 'absolute',
      //           zIndex: '1',
      //           left: '0',
      //         }}
      //       ></span>
      //     </span>
      //   )
      else
        starsArr.push(<StarFilled key={counter} style={{ fontSize: '17px', color: '#f0f0f0', marginRight: '6px' }} />)
    }
    return starsArr
  }
  return <div className="stars-rating-panel">{generateStars()}</div>
}
