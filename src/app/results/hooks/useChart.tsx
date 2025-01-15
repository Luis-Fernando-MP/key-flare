'use client'

import useHookAppTheme from '@/app/hooks/useAppTheme'
import useGameStore, { EGameStatus } from '@/home-store/useGameStore'
import useGameTimeStore from '@/home-store/useGameTimeStore'
import { AUDIOS, playAudio } from '@/shared/audio'
import { copyImageToClipboard, downloadImageToPng } from '@/shared/imageDownloader'
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from 'chart.js'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'

ChartJS.register(BarElement, Legend, Tooltip, CategoryScale, LinearScale)

const useChart = () => {
  const { theme } = useHookAppTheme()

  const { gameStatus, totalCorrect, totalErrors, totalLetters, resetGameStore } = useGameStore()
  const { staticTime, gameTime, resetGameTime } = useGameTimeStore()
  const { push, prefetch } = useRouter()

  const totalTypedWords = totalCorrect + totalErrors
  prefetch('/')
  useEffect(() => playAudio(AUDIOS.WELCOME), [])

  useEffect(() => {
    if (gameStatus === EGameStatus.FINISHED && totalTypedWords >= 0) return
    push('/')
  }, [gameStatus, push, prefetch, totalTypedWords])

  const wpm = useMemo(() => {
    return totalTypedWords > 0 ? Math.round(totalTypedWords / staticTime) : 0
  }, [totalTypedWords, staticTime])

  const accuracy = useMemo(() => {
    return totalLetters > 0 ? Math.round((totalCorrect / totalLetters) * 100) : 0
  }, [totalCorrect, totalLetters])

  const chartData = useMemo(() => {
    const generateSmoothPoints = (count: number) => {
      const data = Array.from({ length: count }, () => Math.floor(Math.random() * 50))
      for (let i = 1; i < data.length; i++) {
        data[i] = Math.round((data[i - 1] + data[i]) / 2)
      }
      return data
    }

    return {
      labels: Array.from({ length: totalTypedWords }, (_, i) => i + 1),
      datasets: [
        {
          label: 'WPM',
          data: generateSmoothPoints(totalTypedWords),
          borderColor: `rgb(${theme['fnt-primary']})`,
          backgroundColor: `rgba(${theme['fnt-primary']}, 0.3)`
        },
        {
          label: 'Errores',
          data: generateSmoothPoints(totalErrors),
          borderColor: `rgb(${theme['fnt-secondary']})`,
          backgroundColor: `rgba(${theme['fnt-secondary']}, 0.8)`
        },
        {
          label: 'Palabras Correctas',
          data: generateSmoothPoints(totalCorrect),
          borderColor: `rgb(${theme['tn-primary']})`,
          backgroundColor: `rgba(${theme['tn-primary']}, 0.8)`
        }
      ]
    }
  }, [theme, totalTypedWords, totalErrors, totalCorrect])

  const chartOptions: any = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        bar: {
          hoverBorderWidth: 3
        }
      },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            color: `rgb(${theme['fnt-primary']})`,
            align: 'center',
            font: {
              size: 16,
              weight: '500',
              family: 'Roboto Mono'
            }
          }
        },
        tooltip: {
          backgroundColor: `rgba(${theme['bg-primary']}, 0.7)`,
          titleColor: `rgb(${theme['fnt-primary']})`,
          bodyColor: `rgb(${theme['fnt-secondary']})`,
          borderColor: `rgb(${theme['tn-primary']})`,
          borderWidth: 1.5,
          usePointStyle: true,
          enable: true,
          padding: 10,
          titleFont: {
            family: 'Roboto Mono',
            size: 16
          },
          bodyFont: {
            family: 'Roboto Mono',
            size: 14
          },
          callbacks: {
            label: function (context: any) {
              return `${context.raw}: ${context.dataset.label}`
            }
          }
        }
      },
      scales: {
        y: {
          min: 0,
          max: 50,
          ticks: {
            stepSize: 10,
            color: `rgb(${theme['fnt-tertiary']})`,
            font: {
              family: 'Roboto Mono',
              size: 14
            }
          },
          grid: {
            color: `rgba(${theme['bg-secondary']}, 0.7)`,
            lineWidth: 2
          }
        },
        x: {
          ticks: {
            stepSize: 10,
            color: `rgb(${theme['fnt-secondary']})`,
            font: {
              family: 'Roboto Mono',
              size: 14
            }
          },
          grid: {
            color: `rgba(${theme['bg-secondary']}, 0.7)`,
            lineWidth: 2
          }
        }
      }
    }),
    [theme]
  )

  const handleScreenshot = async () => {
    const element = document.getElementById('chart')
    if (!(element instanceof HTMLElement)) return
    await downloadImageToPng({
      element,
      fileName: 'key-flare'
    })
    playAudio(AUDIOS.OK)
  }

  const handleCopyChart = async () => {
    const element = document.getElementById('chart')
    if (!(element instanceof HTMLElement)) return
    await copyImageToClipboard({ element })
    playAudio(AUDIOS.OK)
  }

  const handleResetGame = (): void => {
    playAudio(AUDIOS.RESET)
    resetGameStore()
    resetGameTime()
    push('/')
  }

  return {
    wpm: String(wpm).padStart(2, '0'),
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
  }
}

export default useChart
