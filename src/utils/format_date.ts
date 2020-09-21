type Day = string | number
type Month = string | number
type Hours = string | number
type Minutes = string | number

interface Options {
  showHours: boolean
}

/**
 * Formats a date.
 * @param date - The `date` to be formatted
 * @returns A string formatted as `DD:MM:YYYY HH:mm` or `DD:MM:YYYY`
 */
const formatDate = (date: Date, options?: Options): string => {
  let day: Day = date.getDate()
  let month: Month = date.getMonth() + 1
  const year = date.getFullYear()
  let hours: Hours = date.getHours()
  let minutes: Minutes = date.getMinutes()

  day = day < 10 ? `0${day}` : day

  month = month < 10 ? `0${month}` : month

  hours = hours < 10 ? `0${hours}` : hours

  minutes = minutes < 10 ? `0${minutes}` : minutes

  if (options?.showHours) {
    return `${day}/${month}/${year} ${hours}:${minutes}`
  }

  return `${day}/${month}/${year}`
}

export default formatDate
