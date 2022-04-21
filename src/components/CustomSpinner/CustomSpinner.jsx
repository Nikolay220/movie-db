import { Spin } from 'antd'

import styles from './CustomSpinner.module.scss'

export default function CustomSpinner() {
  return (
    <div className={styles['custom-spinner']}>
      <div className={styles['custom-spinner__container']}>
        <Spin />
      </div>
    </div>
  )
}
