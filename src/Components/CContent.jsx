import React from 'react'
import { Content } from 'rsuite'

export const CContent = props => (
  <div className='d-flex'>
    <Content>{props.children}</Content>
  </div>
)
