let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('box'))
let tie = document.getElementById('tie')
let x_won = document.getElementById('x_won')
let o_won = document.getElementById('o_won')

winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const O_TEXT = "O"
const X_TEXT = "X"
let currentPlayer = X_TEXT
let spaces = Array(9).fill(null)
let isGameActive = true

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

function boxClicked(e, num) {
    const id = e.target.id

    if (!isGameActive) {
        return
    }

    if(spaces[id] == null) {
        spaces[id] = currentPlayer

        e.target.innerText = currentPlayer
        console.log(e.target)

        if(playerWon()) {
            let winningBlocks = playerWon()

            if(currentPlayer == X_TEXT) {
                open_X_won(x_won)
            }
            else {
                open_O_won(o_won)
            }
            isGameActive = false

            winningBlocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
            return
        }

        if(gameDraw()) {
            openTie(tie)
            isGameActive = false
        }
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT

        if (currentPlayer == O_TEXT) {
            botsmove = botcalc(spaces)
            boxes[botsmove].click()
        }
    
    }
}

function botcalc(spaces) {
    let bestScore = -99999
    let bestMove = -1

    console.log("spaces: ", spaces) //for checking "spaces" array in console 

    for (i = 0; i<spaces.length; i++) {
        if (spaces[i] == null) {
            let score = minimax(spaces, 0, True)
            console.log("score: ", score) //logs score
            if (score > bestScore) 
            {
                bestScore = score
                bestMove = i

                console.log("best score: ", bestScore) //logs best score
                console.log("best move: ", bestMove) //logs best move
            }
        }
    }
    return bestMove
}

        // got the ai to click the first empty box, 
        // now i need it to click the   <------------------------------------------------
        // best choice box with minimax algorithm


function minimax(board, depth, isMaxing)
{
    return 1; 
}

restartBtn.addEventListener('click', restart)

function restart() {
    spaces.fill(null)

    boxes.forEach(box => {
        box.innerText = ''
        box.style.backgroundColor=''
    })
    closeTie(tie)
    close_O_won(o_won)
    close_X_won(x_won)

    isGameActive = true

    currentPlayer = X_TEXT
}

const winCondition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
]

function playerWon() {
    for (const condition of winCondition) {
        let [a,b,c] = condition

        if(spaces[a] && (spaces[a] == spaces[b] && (spaces[a] == spaces[c]))) {
            return [a,b,c]
        }
    }
    return false
}

function gameDraw() {
    for(i = 0; i<spaces.length;i++) {
        if (spaces[i] == null) {
            return false
        }
    }
    return true
}

function openTie(tie) {
    if(tie == null) return
    tie.classList.add('active')
}

function closeTie(tie) {
    if(tie == null) return
    tie.classList.remove('active')
}

function open_X_won(x_won) {
    if(x_won == null) return
    x_won.classList.add('active')
}

function close_X_won(x_won) {
    if(x_won == null) return
    x_won.classList.remove('active')
}

function open_O_won(o_won) {
    if(o_won == null) return
    o_won.classList.add('active')
}

function close_O_won(o_won) {
    if(tie == null) return
    o_won.classList.remove('active')
}




startGame()
