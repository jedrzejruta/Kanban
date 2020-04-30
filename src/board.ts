export class Board  {
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