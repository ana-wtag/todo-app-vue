const debounce = (func, delay) => {
    let searchTimeout = null
    clearTimeout(searchTimeout)
    const later = () => {
        console.log(this)
        func.apply(this, arguments)
    }
    searchTimeout = setTimeout(later, delay)
}
export default debounce
