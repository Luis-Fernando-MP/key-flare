import { acl } from '@/shared/acl'
import { useEffect, useState } from 'react'
import type { JSX } from 'react'

import './style.scss'
import { themes } from './themes'

const AppTheme = (): JSX.Element => {
  const [selectedTheme, setSelectedTheme] = useState<string>('Aurora Day')

  useEffect(() => {
    const root = document.documentElement
    Object.entries(themes[selectedTheme]).forEach(col => {
      const [key, color] = col
      root.style.setProperty(`--${key}`, `${color}`)
    })
  }, [selectedTheme])

  return (
    <section className='appThemes'>
      {Object.entries(themes).map(theme => {
        const [key, colors] = theme
        return (
          <button
            key={key}
            onClick={() => setSelectedTheme(key)}
            className={`appThemes-action ${acl(key === selectedTheme)}`}
            style={{
              backgroundColor: `rgb(${colors['bg-primary']})`,
              borderColor: `rgb(${colors['tn-primary']})`,
              color: `rgb(${colors['fnt-primary']})`
            }}
          >
            {key}
            <div className='appThemes-colors'>
              <div style={{ backgroundColor: `rgb(${colors['tn-primary']})` }} />
              <div style={{ backgroundColor: `rgb(${colors['bg-secondary']})` }} />
              <div style={{ backgroundColor: `rgb(${colors['fnt-primary']})` }} />
            </div>
          </button>
        )
      })}
    </section>
  )
}

export default AppTheme
