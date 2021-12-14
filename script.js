import {
  myInput,
  errorMessage,
  keys,
  btnBackSpace,
  btnClear,
  btnPower,
  btnSqrt,
  btnEquals
} from './modules/selectors.js'
import {
  inputData,
  backSpace,
  clearInput,
  getResult,
  showResult
} from './modules/functions.js'

// Numbers Listeners
keys.forEach(element => {
  element.addEventListener('click', () => {
    inputData(element.innerHTML)
  })
})

// Backspace Listener
btnBackSpace.addEventListener('click', backSpace)

// Clear Listener
btnClear.addEventListener('click', clearInput)

// Power and Square Root Listeners
btnPower.addEventListener('click', () => {
  inputData('²')
})

btnSqrt.addEventListener('click', () => {
  inputData(btnSqrt.innerHTML + '(')
})

// Equals Listener
btnEquals.addEventListener('click', () => {
  let result = getResult(myInput.value)

  if (result === 'Expressão mal formada') {
    errorMessage.innerHTML = result
  } else {
    showResult(myInput.value, result)
    errorMessage.innerHTML = ''
  }
})
