import {move, whichStep} from "../game-controller/game-controller";


const field = document.querySelector('.field')
const crossClassName = 'cross'
const zeroClassName = 'zero'

export const renderField = (list) =>{
  for(let i =0; i<list.length; i++){
    const line = document.createElement('ul')
    for(let j =0; j<list[i].length; j++){
      const cell = createCell(i, j, list[i][j])
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

  const className = whichStep ? crossClassName : zeroClassName;
  target.classList.add(className)
  target.removeEventListener('click', cellClickHandler)

  move(rowId, colId)
}
