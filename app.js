let hours = document.querySelector('.hours')
let minutes = document.querySelector('.minutes')
let seconds = document.querySelector('.seconds')
const start = document.querySelector('.start')
const stop = document.querySelector('.stop')
const reset = document.querySelector('.reset')
let txtHrs = document.getElementById('hours')
let txtMin = document.getElementById('minutes')
let txtSec = document.getElementById('seconds')
let timeInterval
let stpSec = ''
let stpMin = ''
let stpHr = ''

function clockPiece(time) {
  time = Number(time) < 10 ? ' 0' + Number(time) : ' ' + time.toString()
  return time
}

function resetClock() {
  hours.textContent = '00'
  minutes.textContent = '00 '
  seconds.textContent = '00'

  stpHr = '00'
  stpMin = '00'
  stpSec = '00'
}

function startClock(hrs, min, sec) {
  let htmlCheckNum = hrs.textContent + min.textContent + sec.textContent
  if (htmlCheckNum === '23 59 59') {
    resetClock()
    return
  }
  let secHtml = sec
  let minHtml = min
  let hrsHtml = hrs

  sec.innerHTML = secondLimit(secHtml)
  clockLimit(sec, min, secHtml)
  clockLimit(min, hrs, minHtml)
  stpSec = secHtml.innerHTML
  stpMin = minHtml.innerHTML
  stpHr = hrsHtml.innerHTML
}

function secondLimit(secsHtml) {
  let secs = Number(secsHtml.innerHTML)
  if (secs > 59) {
    return ' 00'
  } else {
    secs++
    return clockPiece(secs)
  }
}

function clockLimit(chkTime, strAnrTm, timeHtml) {
  if (chkTime.innerHTML > 59) {
    timeHtml.innerHTML = ' 00'
    let strAnrTmValue = Number(strAnrTm.innerHTML)
    strAnrTmValue++
    strAnrTm.innerHTML = clockPiece(strAnrTmValue)
  }
}

function stopClock() {
  clearInterval(timeInterval)
  onStopClock(txtHrs, txtMin, txtSec)
  initInner(txtHrs, txtMin, txtSec)
}

const clock = (hours, minutes, seconds) => {
  timeInterval = setInterval(() => {
    startClock(hours, minutes, seconds)
  }, 1000)
}

const onStopClock = (hours, min, sec) => {
  emptyStrChecker(hours, min, sec)
  hours.value = stpHr.toString().trim() === '00' ? '0' : stpHr.toString().trim()
  min.value = stpMin.toString().trim() === '00' ? '0' : stpMin.toString().trim()
  sec.value = stpSec.toString().trim() === '00' ? '0' : stpSec.toString().trim()
}

const isValidClock = (hr, mn, sc) => {
  return (hr.value < 24 || hr.value === ''.trim()) &&
    (mn.value < 60 || mn.value === ''.trim()) &&
    (sc.value < 60 || sc.value === ''.trim())
    ? true
    : false
}

const initInner = (hr, mn, sc) => {
  if (isValidClock(hr, mn, sc)) {
    hours.innerHTML = clockPiece(hr.value).trim()
    minutes.innerHTML = clockPiece(mn.value)
    seconds.innerHTML = clockPiece(sc.value)
  } else {
    resetClock()
  }
}

const emptyStrChecker = (strHrs, strMin, strSec) => {
  if (strHrs.value === '') {
    strHrs.value = '0'
  }
  if (strMin.value === '') {
    strMin.value = '0'
  }
  if (strSec.value === '') {
    strSec.value = '0'
  }
}

start.addEventListener('click', (event) => {
  clearInterval(timeInterval)
  event.preventDefault()
  emptyStrChecker(txtHrs, txtMin, txtSec)
  initInner(txtHrs, txtMin, txtSec)
  clock(hours, minutes, seconds)
})

stop.addEventListener('click', (event) => {
  event.preventDefault()
  stopClock()
})

reset.addEventListener('click', (event) => {
  event.preventDefault()
  resetClock()
})
