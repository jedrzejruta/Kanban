import {Board} from './board';

export class Kanban {
	private createBoard: HTMLButtonElement = <HTMLButtonElement>document.querySelector('#newBoard');
	private boards: Array<Board> = [];

	constructor(){
		this.addNewBoard();
	}

	private addNewBoard(){
		this.createBoard.addEventListener('click',() => {
			const _boardID: string =  (<HTMLInputElement>document.querySelector('#boardId')).value.trim(); //also document.querySelector<HTMLInputElement>('#boardId')!.value; 

			if(_boardID.length !== 0){
				const board: Board = new Board(_boardID);
				this.boards.push(board);
				this.displayBoards(_boardID);
			}
			else {
				return;
			}
		});
	}

	displayBoards(_boardID: string){
		const boardList: HTMLUListElement = <HTMLUListElement>document.querySelector('#boardList');
		const boardListEl: HTMLLIElement = document.createElement('li');
		const tempBoard: Array<Board> = this.boards.filter(el => el.boardID === _boardID);
		boardListEl.textContent = tempBoard[0].boardID;
		boardList.appendChild(boardListEl);
	}
}