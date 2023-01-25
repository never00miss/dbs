import React from 'react'
import { SelectPicker } from 'rsuite'

export const CSelectPicker = ({ name, label, data, ...rest }) => (
  <div className='d-flex justify-content-center pt-1'>
    <SelectPicker data={data} fluid='true' style={{ width: '100%' }} {...rest} />
  </div>
)
