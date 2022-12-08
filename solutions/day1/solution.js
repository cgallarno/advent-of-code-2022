const path = require('path')
const { read, position } = require('promise-path')
const fromHere = position(__dirname)
const report = (...messages) => console.log(`[${require(fromHere('../../package.json')).logName} / ${__dirname.split(path.sep).pop()}]`, ...messages)

async function run () {
  const input = (await read(fromHere('input.txt'), 'utf8')).trim()

  await solveForFirstStar(input)
  await solveForSecondStar(input)
}

async function solveForFirstStar (input) {
  // const solution = 'UNSOLVED'
  // report('Input:', input)
  const food = input.split('\n')
  console.log('lines', food.length)

  let highestCalories = 0
  food.reduce((calories, currentFood) => {
    const currentCalories = parseInt(currentFood)
    if (isNaN(currentCalories)) {
      if (calories > highestCalories) {
        highestCalories = calories
      }
      return 0
    } else {
      return calories + parseInt(currentFood)
    }
  }, 0)

  report('Solution 1:', highestCalories)
  return highestCalories
}

async function solveForSecondStar (input) {
  // const solution = 'UNSOLVED'

  let first = 0
  let second = 0
  let third = 0

  const food = input.split('\n')

  food.reduce((calories, currentFood) => {
    const currentCalories = parseInt(currentFood)
    if (isNaN(currentCalories)) {
      if (calories > first) {
        third = second
        second = first
        first = calories
      } else if (calories > second) {
        third = second
        second = calories
      } else if (calories > third) {
        third = calories
      }
      return 0
    } else {
      return calories + parseInt(currentFood)
    }
  }, 0)

  // Higher than 205250

  report('Solution 2:', first + second + third)
}

run()
