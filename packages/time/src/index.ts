import { Option } from "./types"

export function getYearOptions(start: number) {
  const end = new Date().getFullYear()
  const years: Option[] = []
  for (let i = start; i <= end; i++) {
    years.push({ label: i.toString(), value: i.toString() })
  }
  return years
}

export function getMonthOptions() {
  const months: Option[] = []
  for (let i = 1; i <= 12; i++) {
    months.push({ label: i.toString(), value: i.toString() })
  }
  return months
}

export const parseAndFormatDate = (time: string): string => {
  const date = new Date(time)
  const formatted = date.toLocaleString('en-GB', { timeZone: 'Europe/London' })
  return formatted.replace(',', '')
}

export const parseAndFormatTime = (time: string): string => {
  const date = new Date(time)
  const formatted = date.toLocaleString('en-GB', { timeZone: 'Europe/London' })
  return formatted.substring(12, formatted.length - 3)
}

export const formatDateOnly = (date: Date): string => {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}`
}

function pad(n: number): string {
  return n < 10 ? '0' + n : n.toString()
}
