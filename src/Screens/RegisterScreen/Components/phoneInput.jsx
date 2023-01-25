import React from 'react'

import { ButtonGroup, IconButton } from 'rsuite'

import PlusIcon from '@rsuite/icons/Plus'
import MinusIcon from '@rsuite/icons/Minus'

import { CField } from '../../../Components/CField'

const PhoneItem = ({
  rowValue = {},
  onChange,
  rowIndex,
  rowError
}) => {
  const handleChangePhone = value => {
    console.log(typeof value, value)
    onChange(rowIndex, { ...rowValue, phoneNumber: value })
  }

  return (
    <>
      <CField
        value={rowValue.phoneNumber}
        onChange={handleChangePhone}
        rowIndex={rowIndex}
        rowError={rowError}
        errorMessage={rowError ? rowError.phoneNumber.errorMessage : null}
      />
    </>
  )
}

export const PhoneInputControl = ({
  value = [''],
  onChange,
  fieldError
}) => {
  const errors = fieldError ? fieldError.array : []
  const [phoneNumber, setPhone] = React.useState(value)
  const handleChangePhone = nextPhone => {
    setPhone(nextPhone)
    onChange(nextPhone)
  }

  const handleInputChange = (rowIndex, value) => {
    const nextPhone = [...phoneNumber]
    nextPhone[rowIndex] = value
    handleChangePhone(nextPhone)
  }

  const handleMinus = () => {
    handleChangePhone(phoneNumber.slice(0, -1))
  }

  const handleAdd = () => {
    handleChangePhone(phoneNumber.concat([{ phoneNumber: '' }]))
  }

  console.log('ERROR', errors)

  return (
    <>
      {phoneNumber.map((rowValue, index) => (
        <PhoneItem
          key={index}
          rowIndex={index}
          rowValue={rowValue}
          rowError={errors && errors[index] ? errors[index].object : null}
          onChange={handleInputChange}
        />
      ))}
      <ButtonGroup size='xs'>
        <IconButton onClick={handleAdd} icon={<PlusIcon />} />
        <IconButton onClick={handleMinus} icon={<MinusIcon />} />
      </ButtonGroup>
    </>
  )
}
