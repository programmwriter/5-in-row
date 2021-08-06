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
export const testListForWin = (list, step) =>{
  const currentStep = step ? '1': '2'
  let isWin = false
  list.forEach(line=>{
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

export const increaseField = (list, row, coll) => {
  const width = list[0].length
  const height = list.length
  let resultList = list
  let isIncreased = false

  if(row<=4){
    isIncreased = true
    resultList = increaseTopSide(list, width)
  }
  if(row >= height -4){
    isIncreased = true
    resultList = increaseBottomSide(list, width)
  }
  if(coll <= 4){
    isIncreased = true
    resultList =  increaseLeftSide(list, height)
  }
  if(coll >= width - 4){
    isIncreased = true
    resultList = increaseRightSide(list, height)
  }
  return { isIncreased, resultList}
}

const increaseTopSide = (list, width) => {

  const additionalList = []
  for(let i = 0; i< 4; i++ ){
    const line = new Array(width)
    line.fill('0',0, width)
    additionalList.push(line)
  }

  return [...additionalList, ...list]
}
const increaseBottomSide = (list, width) => {

  const additionalList = []
  for(let i = 0; i< 4; i++ ){
    const line = new Array(width)
    line.fill('0',0, width)
    additionalList.push(line)
  }

  return [...list, ...additionalList]
}
const increaseLeftSide = (list) =>{

  const additionalPart = new Array(4)
  additionalPart.fill('0',0, 4)

  return list.map(line=> [...additionalPart, ...line ])

}
const increaseRightSide = (list) => {

  const additionalPart = new Array(4)
  additionalPart.fill('0',0, 4)

  return list.map(line=> [...line, ...additionalPart])
}

export const clearField = (field) => {
  field.innerHTML = ''
}
