const module = (() => {
  let currentPlayer
  let test = true;
  
  const board = [];

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

  
  
  
  const gameController = () => {
    
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
      return document.querySelectorAll('.field');
    }

    const clickListener = function () {
      const fields = getFields();

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
      module.gameController().switchPlayers()
      document.querySelector('h3').innerText = 'turn: ' + currentPlayer.getMark()
    }

    
    const changeMark = (row, column, turn) => {
      if (module.board[row][column] === 0) {
        let targetRow = Array.from(document.querySelectorAll(`[data-row="${row}"]`));
        
        targetRow.forEach(field => {
          if (field.dataset.column == column) field.innerHTML = turn;
        })
        
      } 
    }

    return {players, clickListener, switchPlayers, getCurrentPlayer, getFields}
  }

  const newGame = () => {
    console.log(document.querySelector('button'));
    document.querySelector('button').addEventListener('click', () => {
      let fields = gameController().getFields();
      fields.forEach(field => field.innerHTML = '');
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