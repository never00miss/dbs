import React from 'react'
import { Container } from 'rsuite'

import 'rsuite/dist/rsuite.min.css'

export const CContainer = props => (
  <div className='d-flex justify-content-center'>
    <Container>{props.children}</Container>
  </div>
)
