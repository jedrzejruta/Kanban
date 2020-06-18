import { Board } from './board';

export class Kanban {
	private boards: Array<Board> = this.getFromLocalStorage();

	// TODO:
	// show first board from list on page load
	// update tasks in board array

	constructor() {
		this.setInputValidity();
		this.boards.forEach(el => {
			this.renderBoardList(el);
			new Board(el.boardName, el.boardID);
		});
		this.addNewBoard();
		this.showActiveBoard();
	}

	private setInputValidity(): void {
		const boardInput: HTMLInputElement = <HTMLInputElement>document.querySelector('#boardName');

		boardInput.addEventListener('input', () => {
			boardInput.setCustomValidity('');
		});

		boardInput.addEventListener('invalid', () => {
			boardInput.setCustomValidity('Nazwa tablicy nie może być pusta');
		});
	}

	private addNewBoard(): void {
		const newBoardButton: HTMLButtonElement = <HTMLButtonElement>document.querySelector('#newBoard');

		newBoardButton.addEventListener('click', () => {
			const _boardName: string = (<HTMLInputElement>document.querySelector('#boardName')).value.trim();

			if (_boardName.length !== 0) {
				const boardID: string = Date.now().toString(),
					board: Board = new Board(_boardName, boardID),
					boardsArray: NodeListOf<HTMLElement> = document.querySelectorAll('.board');
				
				boardsArray.forEach(el => {
					this.toggleBoardClass(el, board.boardID);
				});
				this.boards.push(board);
				this.addToLocalStorage();
				this.renderBoardList(board);
				this.showActiveBoard();
			}
			else return;
		});
	}

	private addToLocalStorage(): void {
		localStorage.setItem('boards', JSON.stringify(this.boards));
	}

	private getFromLocalStorage(): Array<Board> {
		if (localStorage.getItem('boards')) {
			const t = JSON.parse(<string>localStorage.getItem('boards'));
			return t;
		}
		else {
			return [];
		}
	}

	private renderBoardList(boardEl: Board): void {
		const boardList: HTMLUListElement = <HTMLUListElement>document.querySelector('#boardList'),
			boardListEl: HTMLLIElement = document.createElement('li'),
			boardListText: HTMLParagraphElement = document.createElement('p'),
			boardListEmoji: HTMLParagraphElement = document.createElement('p');

		boardListEmoji.textContent = '📝';
		boardListEmoji.classList.add('emoji');
		boardListText.textContent = boardEl.boardName;
		boardListText.classList.add('listText');
		boardListEl.append(boardListEmoji, boardListText);
		boardListEl.classList.add(boardEl.boardID);
		boardList.appendChild(boardListEl);
	}

	private toggleBoardClass(boardSection: HTMLElement, activeBoardID: string): void{
		boardSection.id !== activeBoardID ?
			boardSection.classList.replace('active','hidden') : boardSection.classList.replace('hidden','active');
	}

	private showActiveBoard(): void {
		const boardListElements: NodeListOf<HTMLLIElement> = document.querySelectorAll('#boardList>li'),
			boardArray: NodeListOf<HTMLElement> = document.querySelectorAll('.board');

		boardListElements.forEach(el => {
			el.addEventListener('click', () => {
				const activeBoardID: string = el.className;
				boardArray.forEach(section => {
					this.toggleBoardClass(section, activeBoardID);
				});
			});
		});
	}
}