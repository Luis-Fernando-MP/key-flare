import { Howl } from 'howler'
import { useEffect, useRef } from 'react'

import useGameStore, { EGameStatus } from '../store/useGameStore'
import usePhraseStore from '../store/usePhraseStore'

const allowedKeysRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9,.!:;\-\s]$/
const SPACE_KEY = ' '
const BACKSPACE_KEY = 'Backspace'

const useTypingTest = () => {
  const { gameStatus, setGameStatus, setTotalErrors, setTotalLetters, setTotalCorrect } =
    useGameStore()
  const { phrase } = usePhraseStore()

  const words = phrase.split(' ')
  const $inputRef = useRef<HTMLInputElement>(null)
  const $paragraphRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!$paragraphRef.current) return
    const $firstWord = $paragraphRef.current.querySelector('.word')
    $firstWord?.classList.add('active')
    $firstWord?.querySelector('.letter')?.classList.add('active')
  }, [phrase])

  useEffect(() => {
    const handleKeyPress = (e: globalThis.KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (!allowedKeysRegex.test(e.key) && e.key !== BACKSPACE_KEY && !e.shiftKey) {
        return e.preventDefault()
      }
      const isInputField =
        target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable
      if (isInputField && target.id !== 'typingTestInput') return
      handleInputDown(e)
      $inputRef.current?.focus()
      if (gameStatus !== EGameStatus.IDLE) return
      setGameStatus(EGameStatus.PLAYING)
    }
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [gameStatus])

  useEffect(() => {
    if (gameStatus !== EGameStatus.TIMEOUT) return
    handleFinishGame()
  }, [gameStatus])

  useEffect(() => {
    const handleBlur = () => {
      if (gameStatus !== EGameStatus.PLAYING) return
      setGameStatus(EGameStatus.IDLE)
    }
    $inputRef.current?.addEventListener('blur', handleBlur)
    return () => {
      $inputRef.current?.removeEventListener('blur', handleBlur)
    }
  }, [gameStatus])

  const handleFinishGame = (): void => {
    setGameStatus(EGameStatus.FINISHED)
    const totalIncorrectLetters =
      $paragraphRef.current?.querySelectorAll('.letter.incorrect').length
    const totalCorrectLetters = $paragraphRef.current?.querySelectorAll('.letter.correct').length
    setTotalCorrect(totalCorrectLetters ?? 0)
    setTotalErrors(totalIncorrectLetters ?? 0)
    setTotalLetters(words.join('').length)
  }

  const handleAudioPlay = () => {
    try {
      const sound = new Howl({
        src: ['/music/keyboard1.mp3'],
        volume: 1,
        rate: 1
      })
      sound.play()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleInputDown = (e: globalThis.KeyboardEvent) => {
    if (!$paragraphRef.current || !$inputRef.current) return
    const $currentWord = $paragraphRef.current.querySelector('.word.active')
    const $currentLetter = $currentWord?.querySelector('.letter.active')
    if (!$currentWord || !$currentLetter) return
    if (e.key === SPACE_KEY) {
      e.preventDefault()
      const $nextWord = $currentWord.nextElementSibling
      const $nextLetter = $nextWord?.querySelector('.letter')

      if (!$nextWord) {
        return handleFinishGame()
      }
      if (!$nextLetter) return

      $currentWord.classList.remove('active')
      $currentLetter.classList.remove('active')
      $nextWord.classList.add('active')
      $nextLetter.classList.add('active')

      $inputRef.current.value = ''

      const hasMissedLetters = $currentWord.querySelectorAll('.letter:not(.correct)').length > 0
      const classToAdd = hasMissedLetters ? 'marked' : 'correct'
      $currentWord.classList.add(classToAdd)

      return
    }

    if (e.key === BACKSPACE_KEY) {
      const $prevWord = $currentWord.previousElementSibling
      const $prevLetter = $currentLetter.previousElementSibling
      if (!$prevWord && !$prevLetter) return e.preventDefault()
      if (!$prevWord) return

      const $wordMarked = $paragraphRef.current.querySelector('.word.marked')
      if (!$wordMarked || $prevLetter) return

      e.preventDefault()
      $prevWord.classList.remove('marked')
      $prevWord.classList.add('active')
      $currentWord.classList.remove('active')
      $currentLetter.classList.remove('active')

      const $letterToGo = $prevWord.querySelector('.letter:last-child')

      if (!$letterToGo) return
      $letterToGo.classList.add('active')
      const prevLetters = $prevWord.querySelectorAll('.letter.correct, .letter.incorrect')
      $inputRef.current.value = Array.from(prevLetters)
        .map($el => {
          if (!($el instanceof HTMLElement)) return
          return $el.classList.contains('correct') ? $el.innerText : '*'
        })
        .join('')
    }
  }

  const handleInputUp = () => {
    if (!$paragraphRef.current || !$inputRef.current) return
    const $currentWord = $paragraphRef.current.querySelector('.word.active') as HTMLElement
    const $currentLetter = $currentWord?.querySelector('.letter.active') as HTMLElement
    if (!$currentWord || !$currentLetter) return
    const valueCurrentWord = $currentWord.innerText.trim()
    $inputRef.current.maxLength = valueCurrentWord.length
    const $allLetters = $currentWord.querySelectorAll('.letter')
    $allLetters.forEach($letter => $letter.classList.remove('correct', 'incorrect'))

    const inputValue = $inputRef.current.value.split('')
    inputValue.forEach((char, index) => {
      const $letter = $allLetters[index]
      const letterToCheck = valueCurrentWord[index]
      if (!$letter) return

      const isCorrect = char === letterToCheck
      const letterClass = isCorrect ? 'correct' : 'incorrect'
      $letter.classList.add(letterClass)
    })
    handleAudioPlay()
    $currentLetter.classList.remove('active', 'is-last')
    const inputLength = $inputRef.current.value.length
    const $nextActiveLetter = $allLetters[inputLength]
    if ($nextActiveLetter) {
      return $nextActiveLetter.classList.add('active')
    }
    $currentLetter.classList.add('active', 'is-last')
    const $nextWord = !!$currentWord.nextElementSibling
    if ($nextWord) return
    handleFinishGame()
  }

  return {
    $paragraphRef,
    $inputRef,
    words,
    handleInputUp
  }
}

export default useTypingTest
