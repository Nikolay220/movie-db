import React, { Component } from 'react'
import { Pagination } from 'antd'

import './Paginator.scss'
import styles from './Paginator.module.scss'

export default class Paginator extends Component {
  render() {
    return (
      <div className={styles['paginator-container']}>
        <Pagination
          className={styles['paginator']}
          size="small"
          total={this.props.totalMovies}
          showSizeChanger={false}
          defaultPageSize={20}
          onChange={(page) => {
            this.props.onCurPageChange(page)
          }}
          current={this.props.curPage}
        />
      </div>
    )
  }
}
