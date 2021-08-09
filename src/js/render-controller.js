import {move, resetGame} from "./game-controller";


const field = document.querySelector('.field')
const crossClassName = 'cross'
const zeroClassName = 'zero'

export const renderField = (matrix) =>{
  console.log("-> matrix", matrix);
  for(let i =0; i<matrix.length; i++){
    const line = document.createElement('ul')
    for(let j =0; j<matrix[i].length; j++){
      const cell = createCell(i, j, matrix[i][j])
      line.append(cell)
    }
    field.append(line)
  }
}

const createCell = (row, col, value)=>{
  const cell = document.createElement('li')
  cell.classList.add('cell')
  value === '1' && cell.classList.add(crossClassName)
  value === '2' && cell.classList.add(zeroClassName)
  cell.dataset.colId = col
  cell.dataset.rowId = row
  if(value === '0')(
    cell.addEventListener('click', cellClickHandler)
  )

  return cell
}

export const clearField = () => {
  field.innerHTML = ''
}

const cellClickHandler = ({target}) => {
  const {rowId, colId} = target.dataset

  move(rowId, colId)
}

const addWinnerName = (name) => {
  const title = document.querySelector('.winner-title')
  title.innerHTML = `Победили ${name}`
}

export const addBtnsHandlers = () => {
  const resetBtn = document.querySelectorAll('.reset-btn')
  resetBtn.forEach(btn => btn.addEventListener('click', resetGame))
  const backBtn = document.querySelector('.back-btn')
  backBtn.addEventListener('click', backToGame)
}

const backToGame = () => {
  const cellsList = document.querySelectorAll('.cell')
  cellsList.forEach(cell => cell.removeEventListener('click', cellClickHandler))
  closeModal()
}

export const openModal = (winner) => {
  addWinnerName(winner)
  const modal = document.querySelector('.modal-wrapper')
  modal.classList.remove('hide')
}

export const closeModal = () => {
  const modal = document.querySelector('.modal-wrapper')
  modal.classList.add('hide')
}
