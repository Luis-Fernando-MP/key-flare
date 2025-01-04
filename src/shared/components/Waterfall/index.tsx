'use client'

import type { JSX } from 'react'
import { useEffect, useState } from 'react'

import './style.scss'

interface IWaterfall {
  key: string
  delay: number
  xPos: number
  yPos: number
}

const Waterfall = (): JSX.Element => {
  const [stars, setStars] = useState<IWaterfall[]>([])

  useEffect(() => {
    const positions = Array.from({ length: 50 }, (_, i) => ({
      key: `waterfall-${i}`,
      delay: Math.random() * 10,
      xPos: Math.random() * 90,
      yPos: Math.random() * 100
    }))
    setStars(positions)
  }, [])

  return (
    <section className='waterfall'>
      {stars.map(({ key, delay, xPos, yPos }) => (
        <div
          key={key}
          className='waterfall-point'
          style={{
            animationDelay: `${delay}s`,
            left: `${xPos}vw`,
            top: `${yPos}vh`
          }}
        />
      ))}
    </section>
  )
}

export default Waterfall
