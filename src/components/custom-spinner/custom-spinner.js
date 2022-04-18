import { Spin } from 'antd'
import './custom-spinner.scss'

export default function CustomSpinner() {
  return (
    <div className="custom-spinner">
      <div className="custom-spinner__container">
        <Spin />
      </div>
    </div>
  )
}
