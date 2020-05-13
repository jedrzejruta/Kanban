import { Task } from './task';

export class Board  {
	private tasks: Array<Task> = [];
	public boardID: string;

	constructor(public boardName: string) {
		this.boardID = Date.now().toString();
		this.addNewBoard(boardName);
		
		// this.addNewTask();
	}

	private addNewBoard(_boardName: string): void{

		const mainPage: HTMLElement = <HTMLElement>document.querySelector('main'),
			addTaskBtn: HTMLButtonElement = document.createElement('button'),
			newBoardSection: HTMLElement = document.createElement('section'),
			newBoardTitle: HTMLHeadingElement = document.createElement('h1'),
			taskNameInput: HTMLInputElement = document.createElement('input'),
			taskDescInput: HTMLTextAreaElement = document.createElement('textarea');
		
		taskNameInput.setAttribute('type', 'text');
		taskNameInput.setAttribute('placeholder','Task list name');
		taskNameInput.setAttribute('pattern','.*\\S.*');
		taskNameInput.required = true;
		taskNameInput.classList.add('taskListName');

		taskDescInput.setAttribute('placeholder','Write your note here');
		taskDescInput.classList.add('taskListDesc');

		addTaskBtn.innerText = 'Add task list';
		addTaskBtn.id = 'taskBtn';

		newBoardTitle.innerText = _boardName;

		newBoardSection.classList.add('board','active');
		newBoardSection.id = this.boardID;
		newBoardSection.appendChild(newBoardTitle);
		newBoardSection.appendChild(taskNameInput);
		newBoardSection.appendChild(taskDescInput);
		newBoardSection.appendChild(addTaskBtn);
		
		mainPage.appendChild(newBoardSection);
		addTaskBtn.addEventListener('click', () => this.addNewTask(this.tasks));
	}

	private addNewTask(tasks: Array<Task>): void{
		const activeBoard: HTMLElement = <HTMLElement>document.querySelector('.active'),
			taskName: string = (<HTMLInputElement>activeBoard.querySelector('.taskListName')).value.trim(),
			taskDesc: string = (<HTMLTextAreaElement>activeBoard.querySelector('.taskListDesc')).value;

		if(taskName.length !== 0) {
			const task: Task = new Task(taskName,taskDesc);
			tasks.push(task);
		}
		else return;
		// addtask.addEventListener('click', () => {
		// });
	}
	
}