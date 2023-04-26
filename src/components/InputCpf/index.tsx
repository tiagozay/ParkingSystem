import React from 'react'
import ReactInputMask from 'react-input-mask'

interface InputCpfProps {
    className?: string,
    value?: string,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
    required?: boolean
}

export default function InputCpf({className, onChange, required, value = ''}: InputCpfProps) {
  return (
    <>
        <ReactInputMask mask='999.999.999-99'  type="text" onChange={onChange} className={className} value={value} required={required}/>
    </>
  )
}
