import React from 'react'

import { ButtonGroup, IconButton } from 'rsuite'

import PlusIcon from '@rsuite/icons/Plus'
import MinusIcon from '@rsuite/icons/Minus'

import { CField } from '../../../Components/CField'


const PhoneItem = ({ rowValue = {}, onChange, rowIndex, rowError }) => {
  const handleChangePhone = value => {
    onChange(rowIndex, { ...rowValue, phoneNumber: value })
  }

  console.log('rowError', rowError);

  return (
    <>
      <CField
        value={rowValue.phoneNumber}
        onChange={handleChangePhone}
        rowIndex={rowIndex}
        rowError={rowError}
      />
      {rowError ? (
        <ErrorMessage>{rowError.phoneNumber.errorMessage}</ErrorMessage>
      ) : null}
    </>
  )
}

export const PhoneInputControl = ({ value = [''], onChange, fieldError }) => {
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
    handleChangePhone(phoneNumber.concat([{ phoneNumber: ''}]))
  }

  return (
    <>
      {phoneNumber.map((rowValue, index) => (
        <PhoneItem
          key={index}
          rowIndex={index}
          rowValue={rowValue}
          rowError={errors[index] ? errors[index].object : null}
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
