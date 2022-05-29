import React, { Component } from 'react'
import { Pagination } from 'antd'

import './Paginator.scss'
import styles from './Paginator.module.scss'

export default class Paginator extends Component {
  render() {
    const { totalMovies, onCurPageChange, curPage } = this.props
    return (
      <div className={styles['paginator-container']}>
        <Pagination
          className={styles['paginator']}
          size="small"
          total={totalMovies}
          showSizeChanger={false}
          defaultPageSize={20}
          onChange={(page) => {
            onCurPageChange(page)
          }}
          current={curPage}
        />
      </div>
    )
  }
}
