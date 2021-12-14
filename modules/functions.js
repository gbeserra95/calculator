import { myInput, logList, errorMessage } from './selectors.js'

const messageError = 'Expressão mal formada'

// Insert data into input function
export const inputData = str => {
  let value = myInput.value
  myInput.value = value + str
}

// Backspace function
export const backSpace = () => {
  let value = myInput.value
  myInput.value = value.slice(0, -1)
}

// Clear input function
export const clearInput = () => {
  myInput.value = ''
}

// Convert symbols into math operators, e.g.: &divide -> /
export const getResult = str => {
  let newString = ''

  for (let i = 0; i < str.length; i++) {
    let c = str[i].charCodeAt()

    if (c === 43) {
      // &plus
      newString += '+'
    } else if (c === 8722) {
      // &minus
      newString += '-'
    } else if (c === 215) {
      // &times
      newString += '*'
    } else if (c === 247) {
      // &divide
      newString += '/'
    } else if (c === 178) {
      // ²
      if (i === str.length - 1) {
        newString += '**2'
      } else {
        if (
          str[i + 1].charCodeAt() === 43 || // +
          str[i + 1].charCodeAt() === 8722 || // -
          str[i + 1].charCodeAt() === 215 || // *
          str[i + 1].charCodeAt() === 247 || // /
          str[i + 1].charCodeAt() === 178 // ²
        ) {
          newString += '**2'
        } else {
          return messageError
        }
      }
    } else if (c === 44) {
      // ,
      newString += '.'
    } else if (c === 37) {
      // %
      newString += '*(1/100)'
    } else if (c === 8730) {
      if (i === 0) {
        newString += 'Math.sqrt'
      } else {
        if (
          str[i - 1].charCodeAt() === 43 || // +
          str[i - 1].charCodeAt() === 8722 || // +
          str[i - 1].charCodeAt() === 215 || // -
          str[i - 1].charCodeAt() === 247 // *
        ) {
          newString += 'Math.sqrt'
        } else {
          newString += '*Math.sqrt'
        }
      }
    } else if (c === 40) {
      // (
      if (i == 0) {
        newString += '('
      } else {
        if (isDigit(str[i - 1])) {
          newString += '*('
        } else if (str[i - 1].charCodeAt() === 41) {
          newString += '*('
        } else {
          newString += '('
        }
      }
    } else {
      if (i == 0) {
        newString += str[i]
      } else {
        if (str[i - 1].charCodeAt() === 178) {
          newString += '*' + str[i]
        } else {
          newString += str[i]
        }
      }
    }
  }

  console.log(newString)
  return evalStr(newString)
}

export const showResult = (input, number) => {
  let result = number.toString()

  let listItem = document.createElement('LI')
  let div1 = document.createElement('div')
  let div2 = document.createElement('div')
  let div3 = document.createElement('div')
  let span1 = document.createElement('span')
  let span3 = document.createElement('span')

  div1.classList.add('expression')
  div2.classList.add('equal')
  div3.classList.add('result')

  logList.appendChild(listItem)
  listItem.appendChild(div1)
  listItem.appendChild(div2)
  listItem.appendChild(div3)
  div1.appendChild(span1)
  div3.appendChild(span3)

  span1.innerHTML = input
  div2.innerHTML = '='
  span3.innerHTML = result.replace('.', ',')

  myInput.value = result.replace('.', ',')

  // List items selector
  let allInputs = document.querySelectorAll('.expression span')
  let allResults = document.querySelectorAll('.result span')

  // Expression and result list listeners
  allInputs.forEach(element => {
    element.addEventListener('click', () => {
      myInput.value = element.innerHTML
      errorMessage.innerHTML = ''
    })
  })

  allResults.forEach(element => {
    element.addEventListener('click', () => {
      myInput.value = element.innerHTML
      errorMessage.innerHTML = ''
    })
  })
}

const evalStr = str => {
  try {
    return eval(str)
  } catch (e) {
    return messageError
  }
}

const isDigit = c => {
  return /^\d+$/.test(c)
}
