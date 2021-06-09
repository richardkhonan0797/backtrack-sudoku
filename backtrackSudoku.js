class Sudoku {
  constructor(board_string) {
    this.board = this.createBoard(board_string)
  }

  createBoard(board_string){
    let arrBoard = []
    for(let i=0;i<board_string.length;i++){
      if(i%9===0){
        arrBoard.push([])
        if(board_string[i]==='0'){
          arrBoard[arrBoard.length-1].push(' ')
          continue
        } 
        arrBoard[arrBoard.length-1].push(board_string[i])
      }else{
        if(board_string[i]==='0'){
          arrBoard[arrBoard.length-1].push(' ')
          continue
        } 
        arrBoard[arrBoard.length-1].push(board_string[i])
      }
    }
    return arrBoard
  }

  checkSafe(i, j, num) {
    let checkHorizontal = this.checkHorizontal(i, num);
    let checkVertikal = this.checkVertikal(j, num);
    let checkBox = this.checkBox(i, j, num);

    if (
      checkHorizontal === true &&
      checkVertikal === true &&
      checkBox === true
    ) {
      return true;
    }
    return false;
  }

  checkHorizontal(indexI, num) {
    for (let j = 0; j < 9; j++) 
      if (this.board[indexI][j] === String(num)) 
        return false;
      
    return true;
  }

  checkVertikal(indexJ, num) {
    for (let i = 0; i < 9; i++) 
      if (this.board[i][indexJ] === String(num)) 
        return false;
      
    return true;
  }

  checkBox(i, j, num) {
    let boxI = i - (i % 3);
    let boxJ = j - (j % 3);

    for (let i = 0; i < 3; i++) 
      for (let j = 0; j < 3; j++) 
        if (this.board[i + boxI][j + boxJ] === String(num)) 
          return false;
        
    return true;
  }

  solve(){
    for(let i=3;i>=0;i--){
      if(i===0){
        console.log('SOLVE\n')
        this.printBoard()
        this.clearScreen(1000)
      }else{
        console.log(i+'\n')
        this.printBoard()
        this.clearScreen(1000)
      }
    }
    let position = 0
    let emptySpots = this.findEmptySpots(this.board)
    while(position<emptySpots.length){
      let currentSpot = emptySpots[position]
      let row = currentSpot[0]
      let col = currentSpot[1]
      if(this.board[row][col]===' '){
        this.board[row][col] = '0'
      }
      
      for(let num=Number(this.board[row][col]);num<=9;num++){
        if(num==='0'){
          continue
        } 

        if(this.checkSafe(row,col,num)){
          this.board[row][col]=String(num)
          position++
          break
        }

        if(num===9){
          this.board[row][col]=' '
          position--
        }
      }
      this.printBoard()
      this.clearScreen(20)
    }
  }

  findEmptySpots(){
    let arrEmpty = []
    for(let i=0;i<this.board.length;i++)
      for(let j=0;j<this.board[i].length;j++)
        if(this.board[i][j]===' ')
          arrEmpty.push([i,j])
    
    return arrEmpty
  }

  printBoard(){
    let newBoard = []
    console.log('--SUDOKU SOLVER--\n')
    for(let i=0;i<this.board.length;i++){
      let line = '| '
      line += this.board[i].join(' | ')
      line+= ' |'
      newBoard.push(line)
    }
    console.log(newBoard.join('\n-------------------------------------\n'))
    console.log('-------------------------------------')
  }

  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if (new Date().getTime() - start > milliseconds) {
        break;
      }
    }
  }

  clearScreen(ms){
    this.sleep(ms)
    console.clear()
  }
}

var fs = require("fs");
var board_string = fs
  .readFileSync("set-01_sample.unsolved.txt")
  .toString()
  .split("\n")[0];

var game = new Sudoku(board_string);

// Remember: this will just fill out what it can and not "guess"
game.solve();

game.printBoard()