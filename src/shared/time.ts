export function validateTimeFormat(input: string) {
  const timeRegex =
    /^(?:[1-2]h(?::([0-5]?\d)m(?::([0-5]?\d)s)?)?|([0-5]?\d)m(?::([0-5]?\d)s)?|([0-5]?\d)s)$/
  if (!timeRegex.test(input)) return null
  let totalSeconds = 0
  const parts = input.split(':')
  parts.forEach(part => {
    if (part.includes('h')) {
      const hours = Number(part.replace('h', ''))
      totalSeconds += hours * 3600
    } else if (part.includes('m')) {
      const minutes = Number(part.replace('m', ''))
      totalSeconds += minutes * 60
    } else if (part.includes('s')) {
      const seconds = Number(part.replace('s', ''))
      totalSeconds += seconds
    }
  })
  return totalSeconds
}

export function formatTimeFromSeconds(secondsTime: number) {
  const parseFormat = (value: number) => value.toString().padStart(2, '0')

  const hours = parseFormat(Math.floor(secondsTime / 3600))
  const minutes = parseFormat(Math.floor((secondsTime % 3600) / 60))
  const seconds = parseFormat(secondsTime % 60)

  return { hours, minutes, seconds }
}
