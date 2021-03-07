'use strict';

const MOVES = ['rock', 'paper', 'scissors']

const createRandomMove = () => MOVES[Math.floor(Math.random() * MOVES.length)]

const WINNING_MOVE = { rock: 'scissors', paper: 'rock', scissors: 'paper' }

const scores = {
  player: 0,
  computer: 0
}

const PLAYER_WIN = 'player', COMPUTER_WIN = 'computer'

function getResult(move1, move2) {
  if (!MOVES.includes(move1) || !MOVES.includes(move2)) {
    throw Error(`Arguments should be 'rock', 'paper' or 'scissors'`)
  }

  if (move1 === move2) return { found: false }

  return {
    found: true,
    winner: move2 === WINNING_MOVE[move1] ? PLAYER_WIN : COMPUTER_WIN
  }
}

function sayWinner(winner) {
  if (winner === PLAYER_WIN) {
    setDisplay('You Won!')
  } else {
    setDisplay('The computer won. Try again next time.')
  }
}

MOVES.forEach(move => {
  document.getElementById(move + '-btn').addEventListener('click', function buttonClickEvent(ev) {
    const userMove = move
    const computerMove = createRandomMove()
  
    const results = getResult(userMove, computerMove)
    displayResults(results, userMove, computerMove)
  
    updateScores(results)
    updateScoreBoard()
  
    const wins = checkFor5Wins()
    if (wins !== null) {
      console.log('not null')
  
      MOVES.forEach(move => {
        const btn = document.getElementById(move + '-btn')
        btn.disabled = true
        btn.removeEventListener('click', buttonClickEvent)
      })

      sayWinner(wins)
    }
  })
})

function checkFor5Wins() {
  let returnValue = null;

  [scores.player, scores.computer].forEach((elt, i) => {
    if (elt >= 5) {
      returnValue = [PLAYER_WIN, COMPUTER_WIN][i]
    }
  })

  return returnValue
}

function updateScores(results) {
  if (results.found) {
    if (results.winner === PLAYER_WIN) {
      scores.player++
    } else {
      scores.computer++
    }
  }
}

function updateScoreBoard() {
  const playerScore = document.getElementById('player-score')
  const computerScore = document.getElementById('computer-score')

  playerScore.innerHTML = scores.player
  computerScore.innerHTML = scores.computer
}

function displayResults(results, userMove, computerMove) {
  if (!results.found) {
    setDisplay(`It's a Tie! ${userMove} vs ${computerMove}`, 1500)
    return
  }

  if (results.winner === PLAYER_WIN) {
    setDisplay(`Congrats you won! ${userMove} vs ${computerMove}`, 1500)
  } else {
    setDisplay(`The computer won. Don't worry you still got this! ${userMove} vs ${computerMove}`, 1500)
  }
}

function setDisplay(text, time = null) {
  if (time) {
    setTimeout(() => {
      display.innerHTML = ''
    }, time)
  }

  const display = document.getElementById('display-results')
  display.innerHTML = text
}
