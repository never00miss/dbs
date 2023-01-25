import React from 'react'

import { Input, ButtonGroup, IconButton } from 'rsuite'

import PlusIcon from '@rsuite/icons/Plus'
import MinusIcon from '@rsuite/icons/Minus'

import { CDatePicker } from '../../../Components/CDatePicker'
import { CField } from '../../../Components/CField'
import { CSelectPicker } from '../../../Components/CSelectPicker'

const FamilyItem = ({
  rowValue = { birthdate: new Date() },
  onChange,
  rowIndex,
  rowError
}) => {
  const handleChangeName = value => {
    onChange(rowIndex, { ...rowValue, name: value })
  }
  const handleChangeBirthdate = value => {
    console.log('value', value)
    onChange(rowIndex, { ...rowValue, birthdate: value.toString() })
  }

  const handleChangeRelation = value => {
    console.log(value)
    onChange(rowIndex, { ...rowValue, relation: value })
  }

  const selectData = ['brother', 'sister', 'parent', 'child'].map(item => ({
    label: item,
    value: item
  }))

  console.log('birthdate', rowValue.birthdate)

  return (
    <div class='row'>
      <div class='col-sm'>
        <CField value={rowValue.name} onChange={handleChangeName} />
        {rowError ? (
          <ErrorMessage>{rowError.name.errorMessage}</ErrorMessage>
        ) : null}
      </div>
      <div class='col-sm'>
        <CDatePicker
          value={rowValue.birthdate ? new Date(rowValue.birthdate) : new Date()}
          onChange={handleChangeBirthdate}
        />
        {rowError ? (
          <ErrorMessage>{rowError.quantity.errorMessage}</ErrorMessage>
        ) : null}
      </div>
      <div class='col-sm'>
        <CSelectPicker data={selectData} onChange={handleChangeRelation} />
        {/* <CField value={rowValue.relationship} onChange={handleChangeRelation} /> */}
        {rowError ? (
          <ErrorMessage>{rowError.name.errorMessage}</ErrorMessage>
        ) : null}
      </div>
    </div>
  )
}

export const FamilyInputControl = ({ value = [''], onChange, fieldError }) => {
  const errors = fieldError ? fieldError.array : []
  const [family, setFamily] = React.useState(value)
  const handleChangeProducts = nextFamily => {
    setFamily(nextFamily)
    onChange(nextFamily)
  }
  const handleInputChange = (rowIndex, value) => {
    const nextFamily = [...family]
    nextFamily[rowIndex] = value
    handleChangeProducts(nextFamily)
  }

  const handleMinus = () => {
    handleChangeProducts(family.slice(0, -1))
  }
  const handleAdd = () => {
    handleChangeProducts(family.concat([{ name: '', quantity: null }]))
  }

  return (
    <>
      <div class='container'>
        <div class='row'>
          <div class='col-sm'>Nama</div>
          <div class='col-sm'>Tanggal Lahir</div>
          <div class='col-sm'>Relasi</div>
        </div>
        {family.map((rowValue, index) => (
          <FamilyItem
            key={index}
            rowIndex={index}
            rowValue={rowValue}
            rowError={errors[index] ? errors[index].object : null}
            onChange={handleInputChange}
          />
        ))}
        <div className='mt-3'>
          <ButtonGroup size='xs'>
            <IconButton onClick={handleAdd} icon={<PlusIcon />} />
            <IconButton onClick={handleMinus} icon={<MinusIcon />} />
          </ButtonGroup>
        </div>
      </div>
    </>
  )
}
