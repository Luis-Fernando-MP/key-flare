'use client'

import useHookAppTheme from '@/app/hooks/useAppTheme'
import { acl } from '@/shared/acl'
import { type JSX } from 'react'

import './style.scss'

const AppTheme = (): JSX.Element => {
  const { selectedTheme, handleSetTheme, themes } = useHookAppTheme()
  return (
    <section className='appThemes'>
      {Object.entries(themes).map(([key, colors]) => (
        <button
          key={key}
          onClick={() => handleSetTheme(key)}
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
      ))}
    </section>
  )
}

export default AppTheme
