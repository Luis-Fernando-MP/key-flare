import { CategoryScale, Chart as ChartJS, LineElement, LinearScale, PointElement } from 'chart.js'
import { Tooltip } from 'chart.js'
import { JSX, useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'

import useGameStore, { EGameStatus } from '../../store/useGameStore'
import useGameTimeStore from '../../store/useGameTimeStore'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip)

type TDataPoints = {
  totalWords: number[]
  errors: number[]
  correct: number[]
  wpm: number[]
}
const ResultsGame = (): JSX.Element => {
  const { gameStatus, totalLetters, totalCorrect, totalErrors, setGameStatus } = useGameStore()
  const { gameTime, setGameTime } = useGameTimeStore()

  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(0)
  const [dataPoints, setDataPoints] = useState<TDataPoints>({
    totalWords: [],
    errors: [],
    correct: [],
    wpm: []
  })

  const totalTypedWords = totalCorrect + totalErrors

  useEffect(() => {
    if (gameStatus !== EGameStatus.FINISHED) return

    if (totalTypedWords === 0) return

    // Calcular WPM
    const wpmCalc = Math.round(totalTypedWords / (30 - gameTime))
    const accuracyCalc =
      totalTypedWords > 0 ? Math.round((totalCorrect / totalTypedWords) * 100) : 0

    setWpm(wpmCalc)
    setAccuracy(accuracyCalc)

    const randomPoint = () => Math.floor(Math.random() * 100) + 10

    const wpmData = Array.from({ length: totalTypedWords }, randomPoint)

    const newTotalWords = Array.from({ length: totalTypedWords }, (_, i) => i + 1)
    const newErrors = Array.from(
      { length: totalErrors },
      (_, i) => randomPoint() + totalTypedWords - totalErrors + i + 1
    )
    const newCorrect = Array.from(
      { length: totalCorrect },
      (_, i) => randomPoint() + totalTypedWords - totalCorrect + i + 1
    )

    setDataPoints({
      totalWords: newTotalWords,
      errors: newErrors,
      correct: newCorrect,
      wpm: wpmData
    })
  }, [gameStatus, gameTime, totalCorrect, totalErrors])

  const handleResetGame = (): void => {
    setGameTime(30)
    setGameStatus(EGameStatus.PLAYING)
  }

  const chartData = {
    labels: dataPoints.totalWords,
    datasets: [
      {
        label: 'Palabras por Minuto (WPM)',
        data: dataPoints.wpm,
        borderColor: 'rgba(173, 121, 244, 1)',
        backgroundColor: 'rgba(173, 121, 244, 0.2)',
        tension: 0.3
      },
      {
        label: 'Errores',
        data: dataPoints.errors,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.3,
        showLine: false
      },
      {
        label: 'Palabras Correctas',
        data: dataPoints.correct,
        borderColor: 'rgba(0, 255, 0, 1)',
        backgroundColor: 'rgba(0, 255, 0, 0.2)',
        tension: 0.3
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: 'Resultados del Juego: Palabras Escritas, Errores y Correctas'
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || ''
            if (label === 'Palabras Correctas') {
              label += ` (Correcta)`
            } else if (label === 'Errores') {
              label += ` (Error)`
            }
            return label
          }
        }
      }
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Cantidad'
        }
      }
    }
  }

  return (
    <div>
      {gameStatus === 'finished' && totalTypedWords > 0 && (
        <div>
          <h2>Resultados</h2>
          <p>
            <strong>WPM:</strong> {wpm}
          </p>
          <p>
            <strong>Precisión (ACC):</strong> {accuracy}%
          </p>
          <p>
            <strong>Palabras Correctas:</strong> {totalCorrect}
          </p>
          <p>
            <strong>Errores Cometidos:</strong> {totalErrors}
          </p>
          <Line data={chartData} options={chartOptions} />
          <button onClick={handleResetGame}>Reiniciar Juego</button>
        </div>
      )}
      {totalTypedWords === 0 && <p>No se teclearon palabras. Intenta nuevamente.</p>}
    </div>
  )
}

export default ResultsGame
