// 获取元素
const selectMovieEl = document.querySelector('#movie')
const containerEl = document.querySelector('.container')
const seatsEl = document.querySelectorAll('.row .seat:not(.occupied)')
const countEl = document.querySelector('#count')
const totalEl = document.querySelector('#total')

// 根据本地数据填充界面
populateUI()

// 获取电影价格
let moviePrice = +selectMovieEl.value

// 根据本地数据填充界面
function populateUI () {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seatsEl.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected')
      }
    })
  }

  const selectedMovieIndex = JSON.parse(
    localStorage.getItem('selectedMovieIndex')
  )

  if (selectedMovieIndex !== null) {
    selectMovieEl.selectedIndex = selectedMovieIndex
  }
}

// 保存电影
function setMovieData (movieIndex) {
  localStorage.setItem('selectedMovieIndex', movieIndex)
}

// 更新座位价格数据
function updateSelectedCount () {
  const selectedSeats = document.querySelectorAll('.row .seat.selected')

  // 数据持久化
  const seatsIndex = [...selectedSeats].map(seat => [...seatsEl].indexOf(seat))
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))

  const selectedCount = +selectedSeats.length
  countEl.innerText = selectedCount
  totalEl.innerText = (selectedCount * moviePrice).toFixed(1)
}

// 事件委托监听座位点击
containerEl.addEventListener('click', e => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected')
    // 更新座位价格数据
    updateSelectedCount()
  }
})

// 选择电影
selectMovieEl.addEventListener('change', e => {
  moviePrice = +e.target.value
  updateSelectedCount()
  setMovieData(e.target.selectedIndex)
})

// 数据初始化
updateSelectedCount()
