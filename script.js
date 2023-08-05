let currentPlayer

const module = (() => {

  
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

  return board;
  }();

  
  
  
  const gameController = () => {
    
    const players = [
      playerOne = player('Player one', 'X'),
      playerTwo = player('Player two', 'O')
    ]
    
    
    const getCurrentPlayer = function() {
      currentPlayer = playerOne;
    }()



    const switchPlayers = (mark) => {
      // console.log(currentPlayer.getName());
      if (currentPlayer == playerOne) {
        currentPlayer = playerTwo
        console.log(currentPlayer.getMark());
        console.log(currentPlayer.getName());
        }
      //    else {
      //   currentPlayer = playerOne
      //   console.log(currentPlayer.getMark());
      // }
    }

    const clickListener = function () {
      const fields = document.querySelectorAll('.field');

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
      
      console.log(currentPlayer.getName());
      changeMark(cords.row, cords.column, currentPlayer.getMark())
      module.gameController().switchPlayers()
    }

    
    return {players, clickListener, switchPlayers, getCurrentPlayer}
  }

  const changeMark = (row, column, turn) => {
    if (module.board[row][column] === 0) {
      let targetRow = Array.from(document.querySelectorAll(`[data-row="${row}"]`));
      
      targetRow.forEach(field => {
        if (field.dataset.column == column) field.innerHTML = turn;
      })
      
    } 
  }
  
  
  return {gameController, board};
})();

const player = (name, mark) => {
  const getName = () => name;
  const getMark = () => mark;
  
  
  return {getName, getMark};
}

// currentPlayer = module.gameController().getCurrentPlayer();
module.gameController().clickListener()