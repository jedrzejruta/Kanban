import { Task } from './task';

export class Board  {
	private tasks: Array<Task> = [];
	public boardID: string;

	constructor(public boardName: string) {
		this.boardID = Date.now().toString();
		this.addNewBoard(boardName);
		this.addNewTask();
	}

	private addNewBoard(_boardName: string){
		const mainPage: HTMLElement = <HTMLElement>document.querySelector('main');
		const addTaskBtn: HTMLButtonElement = document.createElement('button');
		const newBoardSection: HTMLElement = document.createElement('section');
		const newBoardTitle: HTMLHeadingElement = document.createElement('h1');
		const taskNameInput: HTMLInputElement = document.createElement('input');

		taskNameInput.setAttribute('type', 'text');
		taskNameInput.setAttribute('placeholder','Task list name');
		taskNameInput.setAttribute('pattern','.*\\S.*');
		taskNameInput.required = true;
		taskNameInput.classList.add('taskListName');

		addTaskBtn.innerText = 'Add task list';
		addTaskBtn.id = 'taskBtn';

		newBoardTitle.innerText = _boardName;

		newBoardSection.classList.add('board','active');
		newBoardSection.id = this.boardID;
		newBoardSection.appendChild(newBoardTitle);
		newBoardSection.appendChild(taskNameInput);
		newBoardSection.appendChild(addTaskBtn);
		
		mainPage.appendChild(newBoardSection);
	}

	addNewTask(){
		const addtask: HTMLButtonElement = <HTMLButtonElement>document.querySelector('#taskBtn');

		addtask.addEventListener('click', () => {
			const taskName: string = (<HTMLInputElement>document.querySelector('.taskListName')).value.trim();
			if(taskName.length !== 0) {
				const task: Task = new Task(taskName);
				this.tasks.push(task);
			}
			else return;
		});
	}
}