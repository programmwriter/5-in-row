import {clearField, renderField, openModal, closeModal} from "./render-controller";

export let matrix = []; //матрица ячеек
const rowCount = 20;
const colCount = 20;
let whichStep = true
let isGameOver = false

//меняем статус хода
const changeStep = () => {
  whichStep = !whichStep
}
// Возвращает победителя
const whoWinner = () => whichStep ? `крестики` : `нолики`

//отмечаем ход в матрице
const changeCellInMatrix = (row, col) => {
  matrix[row][col] = whichStep ? '1' : '2'
}

// увеличивает матрицу в одну из сторон
const increaseField = (row, col) => {
  const width = matrix[0].length
  const height = matrix.length

  let resultList = [...matrix]
  let isIncreased = false

  if(row<=4){
    isIncreased = true
    resultList = increaseTopSide(resultList, width)
  }
  if(row >= height - 5){
    isIncreased = true
    resultList = increaseBottomSide(resultList, width)
  }
  if(col <= 4){
    isIncreased = true
    resultList =  increaseLeftSide(resultList, height)
  }
  if(col >= width - 5){
    isIncreased = true
    resultList = increaseRightSide(resultList, height)
  }
  if(isIncreased){
    matrix = resultList
  }
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

//создние матрицы из всех направлений для поиска победной линии
const crateListOfDirections = (partOfCellsList) =>{
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

//создаем копию матрицы из 9х9 ячеек вокруг кликнутой
const getPartOfMatrix = (row, col) => {
  const partOfMatrix = []
  const beginRow = row <= 4? row: row - 4;
  const beginCol = col <= 4? col: col - 4;
  const endRow = +beginRow + 8;
  const endCol = +beginCol + 8;

  for (let i = beginRow; i <= endRow; i++) {
    const rowList = []
    for (let j = beginCol; j <= endCol + 8; j++) {
      rowList.push(matrix[i][j])
    }
    partOfMatrix.push(rowList)
  }
  return partOfMatrix
};

//проверяет все направления на существование победной линии
const checkWin = (rowId, colId) =>{
  const currentStep = whichStep ? '1': '2'

  const partOfMatrix = getPartOfMatrix(rowId, colId)

  const directionsList = crateListOfDirections(partOfMatrix)
  console.log("-> directionsList", directionsList);

  directionsList.forEach(direction=>{
    for(let i = 4; i < 9; i++){
      if (direction[i-4] === currentStep
        &&direction[i-3] === currentStep
        && direction[i-2] === currentStep
        && direction[i-1] === currentStep
        && direction[i] === currentStep){
        isGameOver =  true
      }
    }
  })
  return false
}

//открывает модальное окно при окончании игры
const endGame = () => {
  openModal(whoWinner())
}

//рестар игры
export const resetGame = () => {
  closeModal()
  fillMatrix(rowCount, colCount)
  clearField()
  renderField(matrix)
  isGameOver = false
  whichStep = true
}

//ход игрока
export const move = (rowId, colId)  => {
  changeCellInMatrix(rowId, colId)
  increaseField(rowId, colId)
  checkWin(rowId, colId)
  console.log("-> isGameOver", isGameOver);

  if(isGameOver){
    endGame()
  }
  changeStep()

  clearField()
  renderField(matrix)

}

//заполняем матрицу нулями
export const fillMatrix = (rows = rowCount, cols = colCount) => {
  matrix = []
  for (let i = 0; i < rows; i++) {
    matrix[i] = []
    for (let j = 0; j < cols; j++) {
      matrix[i][j] = '0'
    }
  }
};
