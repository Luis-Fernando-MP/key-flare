import { Lexend, Roboto_Mono } from 'next/font/google'

export const titleFont = Lexend({
  subsets: ['latin'],
  weight: ['700', '600', '500'],
  variable: '--titleFont'
})

export const paragraphFont = Roboto_Mono({
  subsets: ['latin'],
  weight: ['700', '500', '400', '300'],
  variable: '--paragraphFont'
})

export const bodyFonts = `${titleFont.variable} ${paragraphFont.variable}`
