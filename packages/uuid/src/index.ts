export const first8 = (value: string): string => {
  return value.slice(0, 8)
}

export const slim = (value: string): string => {
  return value.replace(/-/g, '');
}
