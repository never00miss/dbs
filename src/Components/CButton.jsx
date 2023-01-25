import React from 'react'
import { Button } from 'rsuite'

export const CButton = ({ label, appearance, type, onClick }) => (
  <Button appearance={appearance} type={type} onClick={onClick}>
    {label}
  </Button>
)
