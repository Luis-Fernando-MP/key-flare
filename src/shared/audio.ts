import { Howl } from 'howler'

interface IPlayAudio {
  fileName: string
  volume: number
}

export const AUDIOS = {
  RESET: { fileName: '/music/interface/reset.mp3', volume: 0.6 },
  ERROR: { fileName: '/music/interface/error.mp3', volume: 0.1 },
  TOUCH: { fileName: '/music/interface/toc.mp3', volume: 0.2 },
  CHANGE: { fileName: '/music/interface/change.mp3', volume: 0.2 },
  OK: { fileName: '/music/interface/alert.mp3', volume: 0.2 },
  WELCOME: { fileName: '/music/interface/welcome.mp3', volume: 0.3 },
  MENU_ON: { fileName: '/music/interface/menu-on.mp3', volume: 0.3 },
  MENU_OFF: { fileName: '/music/interface/menu-off.mp3', volume: 0.2 }
}

export const playAudio = ({ fileName, volume }: IPlayAudio) => {
  try {
    const sound = new Howl({
      src: [fileName],
      volume: volume,
      rate: 1,
      preload: true
    })
    sound.play()
  } catch (error) {
    console.error('Error:', error)
  }
}
