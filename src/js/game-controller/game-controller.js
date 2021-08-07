import {clearField, renderField} from "../render-controller/render-controller";

export let cellsList = []; //матрица ячеек
const rowCount = 20;
const collCount = 20;
export let whichStep = true
let isGameOver = false

//меняем статус хода
export const changeStep = () => {

  console.log("-> whichStep before", whichStep);
  whichStep = !whichStep
  console.log("-> whichStep after", whichStep);
}

//создние матрицы из всех направлений для поиска победной линии
export const crateListForWinTest = (partOfCellsList) =>{
  const horizontalLine = partOfCellsList[4]
  const verticalLine = []
  const diagonalLeftLine = []
  const diagonalRightLine = []

  for(let i = 0; i < 9; i++){
    verticalLine.push(partOfCellsList[i][4])
  }
  let count = 8
  for(let i = 0; i < 9; i++){
      diagonalLeftLine.push(partOfCellsList[i][count])
      count--
  }
  for(let i = 0; i < 9; i++){
      diagonalRightLine.push(partOfCellsList[i][i])

  }
  return [horizontalLine, verticalLine, diagonalLeftLine, diagonalRightLine]
}

//проверяет все направления на существование победной линии
export const testListForWin = (rowId, colId) =>{

  const partOfCellsList = copyPartOfCellsList(rowId, colId)

  const listForWinTest = crateListForWinTest(partOfCellsList)

  const currentStep = whichStep ? '1': '2'
  let isWin = false
  listForWinTest.forEach(line=>{
    for(let i = 4; i < 9; i++){
      if (line[i-4] === currentStep
        && line[i-3] === currentStep
        && line[i-2] === currentStep
        && line[i-1] === currentStep
        && line[i] === currentStep){
        isWin = true
      }
    }
  })
  return isWin
}
// увеличивает матрицу в одну из сторон
export const increaseField = (row, coll) => {
  const width = cellsList[0].length
  const height = cellsList.length
  let resultList = cellsList
  let isIncreased = false

  if(row<=4){
    isIncreased = true
    resultList = increaseTopSide(cellsList, width)
  }
  if(row >= height - 5){
    isIncreased = true
    resultList = increaseBottomSide(cellsList, width)
  }
  if(coll <= 4){
    isIncreased = true
    resultList =  increaseLeftSide(cellsList, height)
  }
  if(coll >= width - 5){
    isIncreased = true
    resultList = increaseRightSide(cellsList, height)
  }
  return { isIncreased, resultList}
}

//увеличение верхнего предела
const increaseTopSide = (list, width) => {

  const additionalList = []
  for(let i = 0; i< 4; i++ ){
    const line = new Array(width)
    line.fill('0',0, width)
    additionalList.push(line)
  }

  return [...additionalList, ...list]
}

//увеличение нижнего предела
const increaseBottomSide = (list, width) => {

  const additionalList = []
  for(let i = 0; i< 4; i++ ){
    const line = new Array(width)
    line.fill('0',0, width)
    additionalList.push(line)
  }

  return [...list, ...additionalList]
}
//увеличение левого предела
const increaseLeftSide = (list) =>{

  const additionalPart = new Array(4)
  additionalPart.fill('0',0, 4)

  return list.map(line=> [...additionalPart, ...line ])

}

//увеличение правого предела
const increaseRightSide = (list) => {

  const additionalPart = new Array(4)
  additionalPart.fill('0',0, 4)

  return list.map(line=> [...line, ...additionalPart])
}

//создаем копию матрицы из 9х9 ячеек вокруг кликнутой
export const copyPartOfCellsList = (row, coll) => {
  const partOfCellsList = []
  const beginRow = row - 4
  const beginColl = coll - 4
  for (let i = beginRow; i <= beginRow + 8; i++) {
    const rowList = []
    for (let j = beginColl; j <= beginColl + 8; j++) {
      rowList.push(cellsList[i][j])
    }
    partOfCellsList.push(rowList)
  }
  return partOfCellsList
};

//отмечаем ход в матрице
export const changeCellInCellList = (row, col) => {
  cellsList[row][col] = whichStep ? '1' : '2'
}

//заполняем матрицу нулями
export const fillCellList = (rows = rowCount, cols = collCount) => {
  for (let i = 0; i < rows; i++) {
    cellsList[i] = []
    for (let j = 0; j < cols; j++) {
      cellsList[i][j] = '0'
    }
  }
};

//проверка на окончание игры
export const gameOver = (rowId, colId) => {
  const isGameOver = testListForWin(rowId, colId)

  if(!isGameOver){
    return
  }

  const whoWin = whichStep? `крестики` : `нолики`
  alert(`в этом матче победили ${whoWin}`)
  fillCellList(rowCount, collCount)
  clearField()
  renderField(cellsList)

}

//ход
export const move = (rowId, colId)  => {


  changeCellInCellList(rowId, colId)

  changeStep()
  const {isIncreased, resultList} = increaseField(rowId, colId)
  if(isIncreased){
    cellsList = resultList
    clearField()
    renderField(cellsList)
  }
  clearField()
  renderField(cellsList)
  gameOver(rowId, colId)

}
