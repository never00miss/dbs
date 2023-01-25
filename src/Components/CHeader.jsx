import React from 'react'
import { Header } from 'rsuite'

export const CHeader = props => (
  <div className='d-flex justify-content-center flex-column p-3 bg-primary text-white'>
    <Header>{props.children}</Header>
  </div>
)
