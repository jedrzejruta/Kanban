class Board  {
	private boardClassName: string = 'board'; //change and add appropriate properties to class
	
	constructor(public boardID: string) {
		this.addNewBoard(boardID);
	}

	private addNewBoard(_boardID: string){
		const mainPage: HTMLElement = <HTMLElement>document.querySelector('main');
		const newBoardSection: HTMLElement = document.createElement('section');
		const newBoardTitle: HTMLHeadingElement = document.createElement('h1');
		const addTaskBtn: HTMLButtonElement = document.createElement('button');
		const taskNameInput: HTMLInputElement = document.createElement('input');

		taskNameInput.setAttribute('type', 'text');
		taskNameInput.setAttribute('placeholder','Task list name');
		taskNameInput.classList.add('taskListName');

		addTaskBtn.innerText = 'Add task list';
		addTaskBtn.id = 'taskBtn';

		newBoardTitle.innerText = _boardID;

		newBoardSection.classList.add(this.boardClassName);
		newBoardSection.id = _boardID;
		newBoardSection.appendChild(newBoardTitle);
		newBoardSection.appendChild(taskNameInput);
		newBoardSection.appendChild(addTaskBtn);
		
		mainPage.appendChild(newBoardSection);
	}
}
//TODO:
//Task list contains notes, add notes, drag and drop

class Task {
	constructor(public taskName: string) {
		const newTaskEl: HTMLParagraphElement = document.createElement('p');
		newTaskEl.innerText = taskName;
	}
}

class Kanban {
	private createBoard: HTMLButtonElement = <HTMLButtonElement>document.querySelector('#newBoard');
	private boards: Array<Board> = [];

	constructor(){
		this.addNewBoard();
	}

	private addNewBoard(){
		this.createBoard.addEventListener('click',() => {
			const _boardID: string = (<HTMLInputElement>document.querySelector('#boardId')).value.trim();
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

document.addEventListener('DOMContentLoaded',() => {
	new Kanban();
});