const display = document.getElementById('display')
const buttons = document.querySelectorAll('.btn')

let CURRENTINPUT = ''
let CURRENTOPERATOR = ''
let FIRSTDIGIT = ''
let SECONDDIGIT = ''
let sum = 0
let minus = 0
let num = ''

function updatedDisplay() {
    display.value = CURRENTINPUT || 0
}

function handleDigitClick(digit) {
    if (CURRENTINPUT == '' && digit != '.') {
        CURRENTINPUT = digit
        num = digit
    } else if (CURRENTINPUT.includes('.') && digit == '.') {
        return
    } else {
        CURRENTINPUT += digit
        num += digit
    }
    updatedDisplay()
}
Number(CURRENTINPUT)
function CLEAR() {
    CURRENTINPUT = ''
    CURRENTOPERATOR = ''
    FIRSTDIGIT = ''
    SECONDDIGIT = ''
    sum = 0
    minus = 0
    updatedDisplay()
}

function BACKSPACE() {
    CURRENTINPUT = CURRENTINPUT.slice(0, -1)
    updatedDisplay()
}

function HANDLEOPERATORCLICK(OPERATOR) {
    CURRENTOPERATOR = OPERATOR
    CURRENTINPUT += OPERATOR
    updatedDisplay()

    if (CURRENTOPERATOR == '-') {
        if (sum == 0) {
            sum = Number(num)
            num = ''
        } else {
            minus += Number(num)
            num = ''
        }
    } else if (OPERATOR == '+') {
        sum += Number(num)
        num = ''
    } else if (OPERATOR == '*') {
        if (sum == 0) {
            sum = 1
            sum *= Number(num)
            num = ''
        } else {
            sum *= Number(num)
            num = ''
        }
    } else if (OPERATOR == '/' || num != '0') {
        if (sum == 0) {
            sum = Number(num)
            num = ''
        } else {
            sum /= Number(num)
            num = ''
        }
    } else {
        FIRSTDIGIT = ''
        SECONDDIGIT = ''
        CURRENTOPERATOR = ''
        updatedDisplay()
    }
}

function CALCULATERESULT() {
    if (CURRENTOPERATOR == '+') {
        sum += Number(num)
        CURRENTINPUT = sum
        updatedDisplay()
    } else if (CURRENTOPERATOR == '-') {
        minus += Number(num)
        CURRENTINPUT = sum - minus
        updatedDisplay()
    } else if (CURRENTOPERATOR == '*') {
        sum *= Number(num)
        CURRENTINPUT = sum
        updatedDisplay()
    } else if (CURRENTOPERATOR == '/') {
        sum /= Number(num)
        CURRENTINPUT = sum
        updatedDisplay()
    }
}

buttons.forEach((btn) => {
    btn.addEventListener('click', ()=> {
        if (/[\d\.]/.test(btn.textContent)) {
            handleDigitClick(btn.textContent)
        } else if (btn.textContent == 'c') {
            CLEAR()
        } else if (btn.textContent == '⌫') {
            BACKSPACE()
        } else if (/[-/*+]/.test(btn.textContent)) {
            HANDLEOPERATORCLICK(btn.textContent)
        } else if (btn.textContent == '=') {
            CALCULATERESULT()
        }
    })
})

updatedDisplay()