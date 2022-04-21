import React from 'react'
import { Pagination } from 'antd'

import './Paginator.scss'
import styles from './Paginator.module.scss'
// function itemRender(current, type, originalElement) {
//   if (type === 'prev') {
//     return <a>Previous</a>
//   }
//   if (type === 'next') {
//     return <a>Next</a>
//   }
//   return originalElement
// }
export default function Paginator() {
  return (
    <div className={styles['paginator-container']}>
      <Pagination className={styles['paginator']} size="small" total={45} showSizeChanger={false} defaultPageSize={9} />
    </div>
  )
}
