let hours = document.querySelector('.hours')
let minutes = document.querySelector('.minutes')
let seconds = document.querySelector('.seconds')
const start = document.querySelector('.start')
const stop = document.querySelector('.stop')
let sec = ''
let min = ''
let hrs = ''
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

function startClock(h, m, s) {
  let htmlCheckNum = h.innerHTML + m.innerHTML + s.innerHTML
  if (htmlCheckNum === '23 59 59') {
    h.innerHTML = '00'
    m.innerHTML = ' 00'
    s.innerHTML = ' 00'
  }
  sec = s
  min = m
  hrs = h
  s = Number(s.innerHTML)
  s++
  s = clockPiece(s)
  sec.innerHTML = s
  if (s > 59) {
    sec.innerHTML = ' 00'
    m = m.innerHTML
    m++
    m = clockPiece(m)
    min.innerHTML = m
  }
  if (m > 59) {
    min.innerHTML = ' 00'
    h = h.innerHTML
    h++
    h = clockPiece(h)
    hrs.innerHTML = h
    stpHr=hrs.innerHTML
  }
  stpSec = sec.innerHTML
  stpMin = min.innerHTML
  stpHr=hrs.innerHTML

}

function stopClock() {
  clearInterval(timeInterval)
  onStopClock(txtHrs, txtMin, txtSec)
  initInner(hours, minutes, seconds)
}

const clock = (hours, minutes, seconds) => {
  timeInterval = setInterval(() => {
    startClock(hours, minutes, seconds)
  }, 1000)
}

const onStopClock = (hours,min,sec) =>{
    if (hours.value === '') {
        hours.value = '0'
      }
      if (hours.value === '') {
        hours.value = '0'
      }
      if (hours.value === '') {
        hours.value = '0'
      }
      hours.value = stpHr.toString().trim()
      min.value = stpMin.toString().trim()
      sec.value = stpSec.toString().trim()
}

const initInner = (hr, mn, sc) => {
  hr.innerHTML = txtHrs.value.length < 2 ? '0' + txtHrs.value : txtHrs.value
  mn.innerHTML =
    txtMin.value.length < 2 ? ' 0' + txtMin.value : ' ' + txtMin.value
  sc.innerHTML =
    txtSec.value.length < 2 ? ' 0' + txtSec.value : ' ' + txtSec.value
}

const txtChecker = (strHrs, strMin, strSec) => {
  if (strHrs.value === '') {
    strHrs.value = '0'
  }
  if (strMin.value === '') {
    strMin.value = '0'
  }
  if (strSec.value === '') {
    strSec.value = '0'
  }
  strHrs.value = strHrs.value
  strMin.value = strMin.value
  strSec.value = strSec.value
}

start.addEventListener('click', (event) => {
  event.preventDefault()
  txtChecker(txtHrs, txtMin, txtSec)
  initInner(hours, minutes, seconds)
  clock(hours, minutes, seconds)
})

stop.addEventListener('click', (event) => {
  event.preventDefault()
  stopClock()
})
