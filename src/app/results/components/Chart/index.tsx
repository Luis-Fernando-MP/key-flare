'use client'

import useGameRulesStore from '@/home-store/useGameRulesStore'
import { CameraIcon, CopySlashIcon, RefreshCcwIcon } from 'lucide-react'
import { type JSX } from 'react'
import { Bar } from 'react-chartjs-2'

import useChart from '../../hooks/useChart'
import './style.scss'
import './userMobile.scss'

interface IChart {
  className: string
}

const Chart = ({ className }: IChart): JSX.Element | null => {
  const {
    wpm,
    accuracy,
    totalCorrect,
    totalErrors,
    totalLetters,
    chartData,
    chartOptions,
    staticTime,
    gameTime,
    handleScreenshot,
    handleCopyChart,
    handleResetGame
  } = useChart()
  const { gameDifficulty } = useGameRulesStore()

  return (
    <section className={`${className} chart`} id='chart'>
      <div className='chart-info'>
        <p>Resultado</p>
        <div className='chart-info__point'>
          <h4>WPM</h4>
          <h2 className='chart-point'>{wpm}</h2>
        </div>
        <div className='chart-info__point'>
          <h4>ACC</h4>
          <h2 className='chart-point'>{accuracy}%</h2>
        </div>
      </div>
      <article className='chart-graphic'>
        <section className='chart-graphic__info'>
          <p className='chart-detail'>
            Dificultad: <b>{gameDifficulty}</b>
          </p>
          <p className='chart-detail'>
            Tiempo:{' '}
            <b>
              {gameTime}s/{staticTime}s
            </b>
          </p>
          <p className='chart-detail'>
            Letras:{' '}
            <strong>
              {totalCorrect + totalErrors}/{totalLetters}
            </strong>
          </p>
          <p className='chart-detail'>
            P.Correctas: <b>{totalCorrect}</b>
          </p>
          <p className='chart-detail'>
            Errores: <b>{totalErrors}</b>
          </p>
        </section>
        <div className='chart-graphic__container'>
          <div className='chart-graphic__wrapper'>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
        <div className='chart-graphic__options'>
          <button onClick={handleScreenshot}>
            <CameraIcon />
            Capturar
          </button>
          <button onClick={handleCopyChart}>
            <CopySlashIcon />
            Copiar
          </button>
          <button onClick={handleResetGame}>
            <RefreshCcwIcon />
            Reiniciar
          </button>
        </div>
      </article>
    </section>
  )
}

export default Chart
