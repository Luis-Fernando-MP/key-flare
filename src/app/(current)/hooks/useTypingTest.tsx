import { playAudio } from '@/shared/audio'
import { normalizeCharacter } from '@/shared/text'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef } from 'react'

import useGameRulesStore, { EFreedomMode, EGameDifficulty } from '../store/useGameRulesStore'
import useGameStore, { EGameStatus } from '../store/useGameStore'
import useGameTimeStore from '../store/useGameTimeStore'
import usePhraseStore from '../store/usePhraseStore'
import useRenderTypingStore from '../store/useRenderTypingStore'

const allowedKeysRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9,.!:;\-\s]$/
const SPACE_KEY = ' '
const BACKSPACE_KEY = 'Backspace'

const useTypingTest = () => {
  const {
    gameStatus,
    setGameStatus,
    setTotalErrors,
    setTotalLetters,
    setTotalCorrect,
    resetGameStore
  } = useGameStore()
  const { phrase } = usePhraseStore()
  const { gameDifficulty, restartKey, freedomMode, writeValidation, writingVolume, writingSound } =
    useGameRulesStore()
  const { setRenderKey } = useRenderTypingStore()
  const { setGameTime } = useGameTimeStore()

  const words = phrase.split(' ')
  const $inputRef = useRef<HTMLInputElement>(null)
  const { push } = useRouter()
  const $paragraphRef = useRef<HTMLParagraphElement>(null)

  const handleFinishGame = useCallback(() => {
    if (!$inputRef.current || !$paragraphRef.current) return
    setGameStatus(EGameStatus.FINISHED)
    const totalIncorrectLetters = $paragraphRef.current.querySelectorAll('.letter.incorrect').length
    const totalCorrectLetters = $paragraphRef.current.querySelectorAll('.letter.correct').length
    $inputRef.current.value = ''
    setTotalCorrect(totalCorrectLetters ?? 0)
    setTotalErrors(totalIncorrectLetters ?? 0)
    setTotalLetters(words.join('').length)
    const uniqueKey = `${Math.random()}-renderKEy-${Date.now()}`
    setRenderKey(uniqueKey)
    push('/results')
  }, [push, setGameStatus, setRenderKey, setTotalCorrect, setTotalErrors, setTotalLetters, words])

  useEffect(() => {
    if (!$paragraphRef.current) return
    const $firstWord = $paragraphRef.current.querySelector('.word')
    $firstWord?.classList.add('active')
    $firstWord?.querySelector('.letter')?.classList.add('active')
  }, [phrase])

  const restartGame = useCallback(() => {
    if (!$inputRef.current || !$paragraphRef.current) return
    $inputRef.current.value = ''
    const uniqueKey = `${Math.random()}-renderKEy-${Date.now()}`
    setRenderKey(uniqueKey)
    resetGameStore(EGameStatus.PLAYING)
    setGameTime()
  }, [resetGameStore, setGameTime, setRenderKey])

  const handleInputDown = useCallback(
    (e: globalThis.KeyboardEvent) => {
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

        if (
          hasMissedLetters &&
          (gameDifficulty === EGameDifficulty.DIFFICULT ||
            gameDifficulty === EGameDifficulty.MASTER)
        ) {
          handleFinishGame()
        }

        return
      }

      if (e.key === BACKSPACE_KEY) {
        const $prevWord = $currentWord.previousElementSibling
        const $prevLetter = $currentLetter.previousElementSibling
        if (!$prevWord && !$prevLetter) return e.preventDefault()
        if (!$prevWord) return
        const $wordMarked = $paragraphRef.current.querySelector('.word.marked')
        if ((!$wordMarked && freedomMode === EFreedomMode.DISABLED) || $prevLetter) return

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
    },
    [gameDifficulty, handleFinishGame, $paragraphRef, $inputRef, freedomMode]
  )

  useEffect(() => {
    const handleKeyPress = (e: globalThis.KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (e.key === restartKey) return restartGame()

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
      if ($inputRef.current) $inputRef.current.value = ''
    }
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [gameStatus, gameDifficulty, restartKey, handleInputDown, restartGame, setGameStatus])

  useEffect(() => {
    if (gameStatus !== EGameStatus.TIMEOUT) return
    handleFinishGame()
  }, [gameStatus, handleFinishGame])

  useEffect(() => {
    const handleBlur = () => {
      if (gameStatus !== EGameStatus.PLAYING) return
      setGameStatus(EGameStatus.IDLE)
    }
    if (!($inputRef.current instanceof HTMLElement)) return
    const inputNode = $inputRef.current
    inputNode.addEventListener('blur', handleBlur)
    return () => {
      inputNode.removeEventListener('blur', handleBlur)
    }
  }, [gameStatus, setGameStatus])

  const handleAudioPlay = useCallback(() => {
    try {
      playAudio({
        fileName: `/music/${writingSound}.mp3`,
        volume: writingVolume / 100
      })
    } catch (error) {
      console.error('Error:', error)
    }
  }, [writingVolume, writingSound])

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
    const isASpecialLetter = /[^\w\s]/

    inputValue.forEach((char, index) => {
      const $letter = $allLetters[index]
      const letterToCheck = valueCurrentWord[index]
      if (!$letter) return

      let isCorrect = char === letterToCheck

      if (writeValidation) {
        isCorrect = isASpecialLetter.test(letterToCheck)
          ? true
          : normalizeCharacter(char) === normalizeCharacter(letterToCheck)
      }

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
