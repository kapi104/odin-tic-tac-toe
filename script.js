const module = (() => {
  let currentPlayer
  let test = true;
  
  let board = [];

  const generateBoard = function()  {
    for (let i = 0; i < 3; i++) {
      board[i] = [];
      for(let j = 0; j < 3; j++) {
        board[i].push(0);
        let field = document.createElement('div');
        field.classList.add('field');
        field.dataset.row = i; 
        field.dataset.column = j; 
        document.querySelector('.gameField').appendChild(field);
      }
  }
  }();

  const resetBoard = () => {
    module.board = [];
    for (let i = 0; i < 3; i++) {
      module.board[i] = [];
      for(let j = 0; j < 3; j++) {
        module.board[i].push(0);
      }
  }
  }
  
  const gameController = () => {

    let fields
    
    const players = [
      playerOne = player('Player one', 'X'),
      playerTwo = player('Player two', 'O')
    ]
    
    
    const getCurrentPlayer = function() {
      if (test == true) {
        currentPlayer = playerOne;
        test = false;
      }
    }()



    const switchPlayers = () => {
      if (currentPlayer.getName() == 'Player one') {
        currentPlayer = players[1]
      }
      else if (currentPlayer.getName() == 'Player two'){
        currentPlayer = players[0]
      }
    }

    const getFields = () => {
      fields = document.querySelectorAll('.field');
      return fields;
    }

    const clickListener = function () {
      getFields()

      fields.forEach(field => {
        field.addEventListener('click', clickEvent, false);
      })
    }

    const clickEvent = (e) => {
      const field = e.target
      let cords = {
        row: field.dataset.row,
        column: field.dataset.column
      }
      
      changeMark(cords.row, cords.column, currentPlayer.getMark())
      document.querySelector('h3').innerText = 'turn: ' + currentPlayer.getMark()
    }
    
    
    const changeMark = (row, column, turn) => {
      if (module.board[row][column] == 0) {
        let targetRow = Array.from(document.querySelectorAll(`[data-row="${row}"]`));
        
        targetRow.forEach(field => {
          if (field.dataset.column == column) field.innerHTML = turn;
          module.board[row][column] = turn;
        })
        
        setTimeout(() => {
          
          checkBoard()
        }, 1);
        module.gameController().switchPlayers()
        
      } 
    }


    const checkBoard = () => {
      const equalArr = arr => arr.every( v => v === arr[0] && v !== 0)
      let rowResult = [];
      let columnResult = [];
      let diagResult = []
      for(let i = 0; i < 3; i++) {
        rowResult[i] = equalArr(module.board[i])
      }
      console.log({rowResult});

      for(let i = 0; i < 3; i ++) {
        let column = [];
        for(let j = 0; j < 3; j ++) {
          column.push(module.board[j][i]);
        }
        columnResult[i] = equalArr(column)
      }
      console.log({columnResult});

      let rl = [];
      for(let i = 0; i < 3; i ++) {
        rl.push(module.board[i][i]) 
      }
      diagResult[0] = equalArr(rl);

      let lr = []
      let temp = 2;
      for(let i = 0; i < 3; i ++) {
        lr.push(module.board[i][temp]) 
        temp -= 1;
      }
      diagResult[1] = equalArr(lr);

      checkWinner(rowResult, columnResult, diagResult);
    }

    const checkWinner = (row, column, diag) => {
      const containTrue = arr => arr.includes(true);
      if (containTrue(row) || containTrue(column) || containTrue(diag)) {
        alert('wygrywa' + currentPlayer.getMark())
      }
    }

    return {players, clickListener, switchPlayers, getCurrentPlayer, getFields}
  }

  const newGame = () => {
    console.log(document.querySelector('button'));
    document.querySelector('button').addEventListener('click', () => {
      let fields = gameController().getFields();
      fields.forEach(field => field.innerHTML = '');
      resetBoard();
    }, false)
  }

  
  
  return {gameController, board, newGame};
})();

const player = (name, mark) => {
  const getName = () => name;
  const getMark = () => mark;
  
  return {getName, getMark};
}

module.gameController().clickListener()
module.newGame()