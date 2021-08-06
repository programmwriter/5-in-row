import { crateListForWinTest, testListForWin, increaseField, clearField } from './list-actions/list-actions'
import '../scss/style.scss';

const field = document.querySelector('.field')

let cellsList = []
const rowCount = 20
const collCount = 20
let whichStep = true
let isGameOver = false

const fillCellList = (rows, cols)=>{
  for(let i =0; i<rows; i++){
    cellsList[i] = []
    for(let j =0; j<cols; j++){
      cellsList[i][j] = '0'
    }
  }
}
fillCellList(rowCount, collCount)

const gameOver = (isWin) => {
  if(!isGameOver){
    return
  }
  const whoWin = whichStep? `крестики` : `нолики`
  alert(`в этом матче победили ${whoWin}`)
  fillCellList(rowCount, collCount)
  clearField(field)
  renderField(cellsList)

}

const copyPartOfCellsList = (row, coll, list) => {
  const partOfCellsList = []
  const beginRow = row - 4
  const beginColl = coll- 4
  for (let i = beginRow; i<= beginRow + 8; i++){
    const rowList = []
    for (let j = beginColl; j<= beginColl + 8; j++){
      rowList.push(list[i][j])
    }
    partOfCellsList.push(rowList)
  }
  return partOfCellsList
}

const changeCellInCellList = (row, col) => {
  cellsList[row][col] = whichStep ? '1' : '2'
}

const cellClickHandler = ({target}) => {
  const {rowId, colId} = target.dataset

  changeCellInCellList(rowId, colId)

  const className = whichStep? 'cross': 'zero'
  target.classList.add(className)
  target.removeEventListener('click', cellClickHandler)
  const {isIncreased, resultList} = increaseField(cellsList, rowId, colId)
  if(isIncreased){
    cellsList = resultList
    clearField(field)
    renderField(cellsList)
  }

  const partOfCellsList = copyPartOfCellsList(rowId, colId, cellsList)

  const listForWinTest = crateListForWinTest(partOfCellsList)

  isGameOver = testListForWin(listForWinTest, whichStep)

  gameOver(isGameOver)
  whichStep = !whichStep
}

const createCell = (row, col, value)=>{
  const cell = document.createElement('li')
  cell.classList.add('cell')
  value === '1' && cell.classList.add('cross')
  value === '2' && cell.classList.add('zero')
  cell.dataset.colId = col
  cell.dataset.rowId = row
  cell.addEventListener('click', cellClickHandler)

  return cell
}

const renderField = (list) =>{
  for(let i =0; i<list.length; i++){
    const line = document.createElement('ul')
    for(let j =0; j<list[i].length; j++){
      const cell = createCell(i, j, list[i][j])
      line.append(cell)
    }
    field.append(line)
  }
}


renderField(cellsList)
