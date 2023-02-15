const debounce = (func, delay) => {
  let timeout
  
  return function executed() {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
        func.apply(this, arguments)
      }, delay)
  }
}
export default debounce
