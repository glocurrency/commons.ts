export function isLocalStorageAvailable(): boolean {
  const test = '__storage_test__'
  try {
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch (e) {
    return false
  }
}
