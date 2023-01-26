import React from 'react'

import { Input, ButtonGroup, IconButton } from 'rsuite'

import PlusIcon from '@rsuite/icons/Plus'
import MinusIcon from '@rsuite/icons/Minus'

import { CDatePicker } from '../../../Components/CDatePicker'
import { CField } from '../../../Components/CField'
import { CSelectPicker } from '../../../Components/CSelectPicker'

const FamilyItem = ({
  rowValue = {},
  onChange,
  rowIndex,
  rowError
}) => {
  const handleChangeName = value => {
    onChange(rowIndex, { ...rowValue, name: value })
  }
  const handleChangeBirthdate = value => {
    onChange(rowIndex, { ...rowValue, birthdate: value.toString() })
  }

  const handleChangeRelation = value => {
    onChange(rowIndex, { ...rowValue, relation: value })
  }

  const selectData = ['brother', 'sister', 'parent', 'child'].map(item => ({
    label: item,
    value: item
  }))

  console.log('>>>', rowError)

  return (
    <div class='row'>
      <div class='col-sm'>
        <CField
          value={rowValue.name}
          onChange={handleChangeName}
          errorMessage={
            rowError && 'name' in rowError ? rowError.name.errorMessage : null
          }
        />
      </div>
      <div class='col-sm'>
        <CDatePicker
          // value={rowValue.birthdate ? new Date(rowValue.birthdate) : new Date()}
          onChange={handleChangeBirthdate}
          errorMessage={
            rowError && 'birthdate' in rowError
              ? rowError.birthdate.errorMessage
              : null
          }
        />
      </div>
      <div class='col-sm'>
        <CSelectPicker
          data={selectData}
          onChange={handleChangeRelation}
          errorMessage={
            rowError && 'relation' in rowError
              ? rowError.relation.errorMessage
              : null
          }
        />
      </div>
    </div>
  )
}

export const FamilyInputControl = ({ value = [], onChange, fieldError }) => {
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
          <div class='col-sm'>Nama*</div>
          <div class='col-sm'>Tanggal Lahir</div>
          <div class='col-sm'>Relasi</div>
        </div>
        {family.length > 0 &&
          family.map((rowValue, index) => (
            <FamilyItem
              key={index}
              rowIndex={index}
              rowValue={rowValue}
              rowError={errors && errors[index] ? errors[index].object : null}
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
