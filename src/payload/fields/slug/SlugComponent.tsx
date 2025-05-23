'use client'
import React, { useCallback, useEffect } from 'react'

import { useField, Button, TextInput, FieldLabel, useFormFields } from '@payloadcms/ui'

import { formatSlug } from './formatSlug'
import './index.scss'
import { TextFieldClientProps } from 'payload'

type SlugComponentProps = {
  fieldToUse: string
  checkboxFieldPath: string
  path: string
} & TextFieldClientProps

export const SlugComponent: React.FC<SlugComponentProps> = ({
  field,
  fieldToUse,
  checkboxFieldPath: checkboxFieldPathFromProps,
  path,
}) => {
  const { label } = field
  // const { path, readOnly: readOnlyFromProps } = useFieldProps()

  const checkboxFieldPath = path.includes('.')
    ? `${path}.${checkboxFieldPathFromProps}`
    : checkboxFieldPathFromProps

  const { value, setValue } = useField<string>({ path })

  const { value: checkboxValue, setValue: setCheckboxValue } = useField<boolean>({
    path: checkboxFieldPath,
  })

  const fieldToUseValue = useFormFields(([fields]) => {
    return fields[fieldToUse]?.value as string
  })

  useEffect(() => {
    if (checkboxValue) {
      if (fieldToUseValue) {
        const formattedSlug = formatSlug(fieldToUseValue)

        if (value !== formattedSlug) setValue(formattedSlug)
      } else {
        if (value !== '') setValue('')
      }
    }
  }, [fieldToUseValue, checkboxValue, setValue, value])

  const handleLock = useCallback(
    (e: React.MouseEvent<Element>) => {
      e.preventDefault()

      setCheckboxValue(!checkboxValue)
    },
    [checkboxValue, setCheckboxValue],
  )

  return (
    <div className="field-type slug-field-component">
      <div className="label-wrapper">
        <FieldLabel htmlFor={`field-${path}`} label={label} />

        <Button className="lock-button" buttonStyle="none" onClick={handleLock}>
          {checkboxValue ? 'Unlock' : 'Lock'}
        </Button>
      </div>

      <TextInput
        label={''}
        value={value}
        onChange={setValue}
        path={path}
        readOnly={checkboxValue}
      />
    </div>
  )
}
