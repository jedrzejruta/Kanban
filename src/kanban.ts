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
			const _boardName: string = (<HTMLInputElement>document.querySelector('#boardName')).value.trim();

			if (_boardName.length !== 0) {
				const board: Board = new Board(_boardName);

				// TODO: method to use more times
				if(this.boards.length !== 0) {
					const boardsArray: HTMLElement[] = Array.from(document.querySelectorAll('.board')),
						tempArr: HTMLElement[] = boardsArray.filter(el => el.id !== board.boardID);
					tempArr.forEach(el => {
						el.classList.replace('active','hidden');
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
		const boardList: HTMLUListElement = <HTMLUListElement>document.querySelector('#boardList'),
			boardListEl: HTMLLIElement = document.createElement('li');

		boardListEl.textContent = `📝${board.boardName}`; // todo: only show emoji, on hover show full text
		boardListEl.classList.add(board.boardID);
		boardList.appendChild(boardListEl);
		this.showActiveBoard();
	}

	private showActiveBoard(): void {
		const boardListElements: NodeListOf<HTMLLIElement> = document.querySelectorAll('#boardList>li'),
			boardArray: NodeListOf<HTMLElement> = document.querySelectorAll('.board');

		boardListElements.forEach(el => {
			el.addEventListener('click', () => {
				const activeBoardID: string = el.className;
				boardArray.forEach(element => {
					if(element.id === activeBoardID)
					{
						element.classList.replace('hidden','active');
					}
					else element.classList.replace('active','hidden');
				});
			});
		});

	}
}