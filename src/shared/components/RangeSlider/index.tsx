'use client'

import { ChangeEvent, type JSX, memo } from 'react'

import './style.scss'

interface IRangeSlider {
  className?: string
  range: number | string
  min?: number
  max?: number
  onChange: (value: number) => void
}

const RangeSlider = ({
  className = '',
  range,
  onChange,
  min = 0,
  max = 100
}: IRangeSlider): JSX.Element => {
  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const value = Number(target.value)
    onChange(value)
  }

  return (
    <section className={`range ${className}`}>
      <input
        type='range'
        className='range-level'
        min={String(min)}
        max={String(max)}
        value={range}
        onChange={handleChange}
      />
      <div className='range-info'>
        <h5>{range}</h5>
      </div>
    </section>
  )
}

export default memo(RangeSlider)
