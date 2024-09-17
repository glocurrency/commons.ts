export const formatCents = (currency: string, cents: number): string => {
  return formatAmount(currency, cents / 100)
}

export const formatAmount = (currency: string, amount: number): string => {
  const formatted = formatAmountWithZeroes(currency, amount)
  if (formatted.endsWith('.00')) {
    return formatted.slice(0, -3)
  }
  return formatted
}

export const formatAmountWithZeroes = (
  currency: string,
  amount: number
): string => {
  return amount.toLocaleString('en-UK', {
    style: 'currency',
    currency: currency,
  })
}

export const guessAmount = (input: string): number => {
  const guess = parseFloat(input.replace(/[^0-9.]/g, ''))
  if (isNaN(guess)) {
    return 0
  }
  return guess
}
