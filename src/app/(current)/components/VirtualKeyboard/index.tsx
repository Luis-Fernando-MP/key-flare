import { acl } from '@/shared/acl'
import React, { JSX, useEffect, useState } from 'react'

import useGameRulesStore, { EModeOption } from '../../store/useGameRulesStore'
import useGameStore, { EGameStatus } from '../../store/useGameStore'
import './style.scss'
import './userMobile.scss'

const KEYBOARD_LAYOUT = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Backspace'],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['Mayus', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '-']
]

const VirtualKeyboardComponent = () => {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set())
  const [isCapsLock, setIsCapsLock] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        !/^[a-zA-Z0-9,.!:\-; ]$/.test(e.key) &&
        e.key !== 'Backspace' &&
        e.key !== 'Shift' &&
        e.key !== 'CapsLock'
      )
        return
      setPressedKeys(prev => new Set(prev).add(e.key.toLowerCase()))
      if (e.key === 'CapsLock') setIsCapsLock(!isCapsLock)
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      setPressedKeys(prev => {
        const newSet = new Set(prev)
        newSet.delete(e.key.toLowerCase())
        return newSet
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [isCapsLock])

  const renderKey = (key: string) => {
    const isCapsKey = key === 'Shift' || key === 'CapsLock'
    const isPressed = pressedKeys.has(key.toLowerCase()) || (key === 'Mayus' && isCapsLock)

    const keyDisplay = isCapsLock || isCapsKey ? key.toUpperCase() : key.toLowerCase()

    return (
      <div key={key} className={`keyboard-key ${acl(isPressed)}`}>
        {keyDisplay}
      </div>
    )
  }

  return (
    <section className='keyboard'>
      {KEYBOARD_LAYOUT.map((row, i) => {
        const key = `${i}-row-key`
        return (
          <div key={key} className='keyboard-row'>
            {row.map(renderKey)}
          </div>
        )
      })}
      <div className='keyboard-space'>
        <div className={acl(pressedKeys.has(' '))} />
      </div>
    </section>
  )
}

const VirtualKeyboard = (): JSX.Element | null => {
  const gameStatus = useGameStore(s => s.gameStatus)
  const { modeOption } = useGameRulesStore()
  if (gameStatus !== EGameStatus.PLAYING || modeOption === EModeOption.FOCUSED) return null
  return <VirtualKeyboardComponent />
}

export default VirtualKeyboard
