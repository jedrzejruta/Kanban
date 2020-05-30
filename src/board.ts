import { Task } from './task';

export class Board  {
	private tasks: Array<Task> = [];
	public boardID: string;

	constructor(public boardName: string) {
		this.boardID = Date.now().toString();
		this.addNewBoard(boardName);
	}

	private addNewBoard(_boardName: string): void{
	// TODO, W trakcie, Zrobione
		const mainPage: HTMLElement = <HTMLElement>document.querySelector('main'),
			taskForm: HTMLFormElement = document.createElement('form'),
			addTaskBtn: HTMLButtonElement = document.createElement('button'),
			newBoardSection: HTMLElement = document.createElement('section'),
			newBoardTitle: HTMLHeadingElement = document.createElement('h1'),
			taskNameInput: HTMLInputElement = document.createElement('input'),
			taskDescInput: HTMLTextAreaElement = document.createElement('textarea');

		taskForm.setAttribute('action','javascript:;');

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
		taskForm.appendChild(taskNameInput);
		taskForm.appendChild(taskDescInput);
		taskForm.appendChild(addTaskBtn);
		newBoardSection.appendChild(newBoardTitle);
		newBoardSection.appendChild(taskForm);
		// // eslint-disable-next-line no-magic-numbers
		// for(let i = 0; i < 3; i++){
		// 	const taskSection = document.createElement('section');

		// 	taskSection.id = `taskList${i.toString()}`;
		// 	taskSection.classList.add('taskSection');


		// 	newBoardSection.appendChild(taskSection);
		// }

		mainPage.appendChild(newBoardSection);
		addTaskBtn.addEventListener('click', () => this.addNewTask(this.tasks));
		this.createListSections(newBoardSection);
	}

	private createListSections(boardSection: HTMLElement): void{
		// eslint-disable-next-line no-magic-numbers
		for(let i = 0; i < 3; i++){
			const taskSection = document.createElement('section');

			taskSection.id = `taskList${i.toString()}`;
			taskSection.classList.add('taskSection');
			boardSection.appendChild(taskSection);

			this.handleDragEvents(taskSection);
		}	
	}

	private addNewTask(tasks: Array<Task>): void {
		const activeBoard: HTMLElement = <HTMLElement>document.querySelector('.active'),
			taskName: string = (<HTMLInputElement>activeBoard.querySelector('.taskListName')).value.trim(),
			taskDesc: string = (<HTMLTextAreaElement>activeBoard.querySelector('.taskListDesc')).value;

		if(taskName.length !== 0) {
			const task: Task = new Task(taskName, taskDesc);
			tasks.push(task);
		}
		else return;
	}

	private handleDragEvents(taskSection: HTMLElement){

		taskSection.addEventListener('dragover', (e: Event) => {
			e.preventDefault();
		});

		taskSection.addEventListener('dragenter', (e: Event) => {
			e.preventDefault();
		});

		taskSection.addEventListener('drop', (e: any) => {
			e.preventDefault();

			const draggedItem = e.dataTransfer.getData('text');
			taskSection.appendChild(<HTMLDivElement>document.querySelector(`#${draggedItem}`));
			e.dataTransfer.clearData();
		});
	}
}