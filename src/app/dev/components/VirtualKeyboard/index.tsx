import React, { useEffect, useState } from 'react'

const KEYBOARD_LAYOUT = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ'],
  ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace']
]

export default function VirtualKeyboard() {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set())

  useEffect(() => {
    // Presiona la tecla
    const handleKeyDown = (e: KeyboardEvent) => {
      setPressedKeys(prev => new Set(prev).add(e.key.toLowerCase()))
    }

    // Suelta la tecla
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
  }, [])

  return (
    <div className={`select-none`}>
      {KEYBOARD_LAYOUT.map((row, i) => (
        <div key={i} className='my-1 flex justify-center gap-1'>
          {row.map(key => {
            const isPressed = pressedKeys.has(key.toLowerCase())
            const isSpecialKey = key === 'Shift' || key === 'Backspace'
            return (
              <div
                key={key}
                className={` ${isSpecialKey ? 'w-20' : 'w-10'} flex h-10 items-center justify-center rounded font-medium transition-all duration-150 ${
                  isPressed ? 'bg-gray-300 text-gray-900' : 'bg-gray-700 text-gray-300'
                } `}
              >
                {key}
              </div>
            )
          })}
        </div>
      ))}
      <div className='my-1 flex justify-center'>
        <div
          className={`h-10 w-64 rounded ${pressedKeys.has(' ') ? 'bg-gray-300' : 'bg-gray-700'}`}
        />
      </div>
    </div>
  )
}
