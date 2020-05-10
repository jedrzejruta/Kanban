import { Board } from './board';

export class Kanban {
	private boards: Array<Board> = [];

	constructor(){
		this.addNewBoard();
	}

	private addNewBoard(){
		const newBoardButton: HTMLButtonElement = <HTMLButtonElement>document.querySelector('#newBoard');
		newBoardButton.addEventListener('click',() => {
			const _boardName: string =  (<HTMLInputElement>document.querySelector('#boardName')).value.trim(); //also document.querySelector<HTMLInputElement>('#boardId')!.value; 

			if(_boardName.length !== 0){
				const board: Board = new Board(_boardName);
				this.boards.push(board);
				this.displayBoards(board);
			}
			else return;
			
		});
	}
	//add method modificators 
	displayBoards(board: Board){
		const boardList: HTMLUListElement = <HTMLUListElement>document.querySelector('#boardList');
		const boardListEl: HTMLLIElement = document.createElement('li');
		// const tempBoard: Array<Board> = this.boards.filter(el => el.boardName === board.boardName);
		// boardListEl.textContent = tempBoard[0].boardName;
		boardListEl.textContent = board.boardName;
		boardList.appendChild(boardListEl);
		this.showActiveBoard();
	}

	showActiveBoard(){
		const boardListElements = Array.from(document.querySelectorAll('#boardList>li'));
		boardListElements.forEach(element => {
			element.addEventListener('click',() => {
				console.log(element); 
				//TODO:
				// after click, add hidden class to all besides this and display active
				// maybe filter boards by id
			});
			
		});
	}
}