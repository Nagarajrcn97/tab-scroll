let scrolling: number
let callbackFn: () => void
let targetEl: HTMLElement
const resetTimer = 70

export const scrollEnd = (el: HTMLElement, callback: () => void): void => {
  if (!el || !callback || typeof callback !== 'function') return
  callbackFn = callback
  targetEl = el
  targetEl.addEventListener('scroll', scrollHandler, false)
}

const scrollHandler = (): void => {
  clearTimeout(scrolling)
  scrolling = setTimeout(() => {
    targetEl.removeEventListener('scroll', scrollHandler, false)
    callbackFn()
  }, resetTimer)
}
