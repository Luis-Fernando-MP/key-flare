import { AUDIOS, playAudio } from '@/shared/audio'

const useMenu = () => {
  const getMenuElement = () => {
    return document.getElementById('menu')
  }

  const toggleMenu = (): void => {
    const menu = getMenuElement()
    if (!menu) return
    if (menu.classList.contains('active')) return closeMenu()
    openMenu()
  }

  const closeMenu = (): void => {
    const menu = getMenuElement()
    if (!menu?.classList.contains('active')) return
    playAudio(AUDIOS.MENU_OFF)
    menu.classList.remove('active')
  }

  const openMenu = (): void => {
    const menu = getMenuElement()
    if (!menu || menu.classList.contains('active')) return
    playAudio(AUDIOS.MENU_ON)
    menu.classList.add('active')
  }

  return {
    toggleMenu,
    closeMenu,
    openMenu
  }
}

export default useMenu
