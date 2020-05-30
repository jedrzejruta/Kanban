import { Board } from './board';

export class Kanban {
	private boards: Array<Board> =  []; // this.getFromLocalStorage();

	// update boards when task added?

	constructor() {
		this.setInputValidity();
		this.addNewBoard();
	}

	private setInputValidity(): void {
		const boardInput: HTMLInputElement = <HTMLInputElement>document.querySelector('#boardName');
		
		boardInput.addEventListener('input', () => {
			boardInput.setCustomValidity('');
		});

		boardInput.addEventListener('invalid',() => {
			boardInput.setCustomValidity('Nazwa tablicy nie może być pusta');
		});
	}

	private addNewBoard(): void {
		const newBoardButton: HTMLButtonElement = <HTMLButtonElement>document.querySelector('#newBoard');

		newBoardButton.addEventListener('click', () => {
			const _boardName: string = (<HTMLInputElement>document.querySelector('#boardName')).value.trim(); // also document.querySelector<HTMLInputElement>('#boardId')!.value; 

			if (_boardName.length !== 0) {
				const board: Board = new Board(_boardName);
				// console.log(board);

				// hides other boards and makes active one we are adding right now
				// TODO: method to use more times
				if(this.boards.length !== 0) {
					const boardsArray: HTMLElement[] = Array.from(document.querySelectorAll('.board'));
					const tempArr: HTMLElement[] = boardsArray.filter(el => el.id !== board.boardID);
					tempArr.forEach(el => {
						el.classList.add('hidden');
						el.classList.remove('active');
					});
				}

				this.boards.push(board);
				this.addToLocalStorage();
				this.displayBoards(board);
			}
			else return;
		});
	}
	// not working with empty localstorage
	private addToLocalStorage(): void {
		localStorage.setItem('boards', JSON.stringify(this.boards));
	}

	private getFromLocalStorage(): Array<Board> {
		const t =  JSON.parse(<string>localStorage.getItem('boards'));
		console.table(t);
		return t;
	}
	// add method modificators 
	private displayBoards(board: Board): void {
		this.getFromLocalStorage();
		const boardList: HTMLUListElement = <HTMLUListElement>document.querySelector('#boardList');
		const boardListEl: HTMLLIElement = document.createElement('li');
		// const tempBoard: Array<Board> = this.boards.filter(el => el.boardName === board.boardName);
		// boardListEl.textContent = tempBoard[0].boardName;

		boardListEl.textContent = board.boardName;
		boardListEl.classList.add(board.boardID);
		boardList.appendChild(boardListEl);
		this.showActiveBoard();
	}

	private showActiveBoard(): void {
		const boardListElements: HTMLLIElement[] = Array.from(document.querySelectorAll('#boardList>li'));
		const boardArray: HTMLElement[] = Array.from(document.querySelectorAll('.board'));
		
		boardListElements.forEach(el => {
			el.addEventListener('click', () => {
				const activeBoardID: string = el.className;
				boardArray.forEach(element => {
					if(element.id === activeBoardID)
					{
						element.classList.remove('hidden');
						element.classList.add('active');
					}
					else {
						element.classList.add('hidden');
						element.classList.remove('active');
					}
				});
				// activeBoard.classList.add('active');
				// activeBoard.classList.remove('hidden');
			});
		});

	}
}