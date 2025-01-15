import { toPng } from 'html-to-image'
import toast from 'react-hot-toast'

interface IDownloadImageBase {
  element: HTMLElement
  scale?: number
}

interface IDownloadImageToPng extends IDownloadImageBase {
  fileName: string
}

type ICopyImageToClipboard = Omit<IDownloadImageToPng, 'fileName'>

const captureElementToPng = async (element: HTMLElement, scale: number): Promise<string> => {
  element.classList.add('taking-screenshot')
  try {
    return await toPng(element, { quality: 1, pixelRatio: scale })
  } finally {
    element.classList.remove('taking-screenshot')
  }
}

export const downloadImageToPng = async ({ element, fileName, scale = 3 }: IDownloadImageToPng) => {
  const toastId = toast.loading('Capturando...')
  try {
    const dataUrl = await captureElementToPng(element, scale)
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = `${fileName}.png`
    link.click()
    toast.success('Hecho!!', { id: toastId })
  } catch (error) {
    console.error('Error al descargar la imagen:', error)
    toast.error('Error al capturar la imagen', { id: toastId })
  }
}

export const copyImageToClipboard = async ({ element, scale = 3 }: ICopyImageToClipboard) => {
  const toastId = toast.loading('Capturando...')
  try {
    const dataUrl = await captureElementToPng(element, scale)
    const response = await fetch(dataUrl)
    const blob = await response.blob()
    const clipboardItem = new ClipboardItem({ 'image/png': blob })
    await navigator.clipboard.write([clipboardItem])
    toast.success('Imagen copiada al portapapeles!', { id: toastId })
  } catch (error) {
    console.error('Error al copiar la imagen:', error)
    toast.error('Error al capturar la imagen', { id: toastId })
  }
}

// export const downloadImageWithP5 = async ({ element, fileName, scale = 1 }: IDownloadImageToPng) => {
//   const toastId = toast.loading('Generando imagen...')
//   try {
//     const canvas = await html2canvas(element, { scale })
//     const dataUrl = canvas.toDataURL('image/png')
//     new p5(sketch => {
//       sketch.setup = () => {
//         const img = sketch.loadImage(dataUrl, () => {
//           sketch.createCanvas(img.width, img.height)
//           sketch.image(img, 0, 0)
//           const output = sketch.canvas.toDataURL('image/png')
//           const link = document.createElement('a')
//           link.href = output
//           link.download = `${fileName}.png`
//           link.click()
//           sketch.noLoop()
//           toast.success('¡Imagen generada correctamente!', { id: toastId })
//         })
//       }
//     })
//   } catch (error) {
//     console.error('Error al generar la imagen:', error)
//     toast.error('Error al generar la imagen', { id: toastId })
//   }
// }
