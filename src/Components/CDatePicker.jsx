import React from 'react'
import { DatePicker } from 'rsuite'

import 'rsuite/dist/rsuite.min.css'

export const CDatePicker = ({ name, label, ...rest }) => (
  <div className='d-flex justify-content-center pt-1'>
    <DatePicker format="yyyy-MM-dd" fluid='true' style={{ width: '100%' }} {...rest} />
  </div>
)
