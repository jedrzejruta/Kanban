import { Task } from './task';

export class Board  {
	private tasks: Array<Task> = this.getFromLocalStorage();
	public boardID: string;

	constructor(public boardName: string, boardID: string) {
		// this.tasks.forEach(el => {
		// 	new Task(el.taskName, el.taskDesc);
		// });
		this.boardID = boardID;
		this.renderBoard(boardName);
	}

	private renderBoard(_boardName: string): void{
		const mainPage: HTMLElement = <HTMLElement>document.querySelector('main'),
			taskForm: HTMLFormElement = document.createElement('form'),
			addTaskBtn: HTMLButtonElement = document.createElement('button'),
			newBoardSection: HTMLElement = document.createElement('section'),
			boardInfoContainer: HTMLElement = document.createElement('article'),
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

		addTaskBtn.textContent = 'Add task';
		addTaskBtn.id = 'taskBtn';

		newBoardTitle.textContent = _boardName;

		newBoardSection.classList.add('board', 'hidden');
		newBoardSection.id = this.boardID;
		taskForm.append(taskNameInput, taskDescInput, addTaskBtn);

		boardInfoContainer.className = 'formContainer';
		boardInfoContainer.append(newBoardTitle, taskForm);

		newBoardSection.appendChild(boardInfoContainer);

		mainPage.appendChild(newBoardSection);
		addTaskBtn.addEventListener('click', () => this.addNewTask());
		this.createListSections(newBoardSection);
		this.addListSectionTitle(newBoardSection);
	}

	private addToLocalStorage(): void {
		localStorage.setItem('tasks', JSON.stringify(this.tasks));
	}

	private getFromLocalStorage(): Array<Task> {
		if (localStorage.getItem('tasks')) {
			const t = JSON.parse(<string>localStorage.getItem('tasks'));
			return t;
		}
		else {
			return [];
		}
	}

	private createListSections(boardSection: HTMLElement): void{
		const taskSectionContainer: HTMLElement = document.createElement('article');
		taskSectionContainer.classList.add('taskSectionContainer');
		for(let i = 0; i < 3; i++){
			const taskSection: HTMLElement = document.createElement('section');

			taskSection.id = `taskList${i.toString()}`;
			taskSection.classList.add('taskSection','normalState');
			taskSectionContainer.appendChild(taskSection);
			boardSection.appendChild(taskSectionContainer);

			this.handleDragEvents(taskSection);
		}	
	}

	private addListSectionTitle(boardSection: HTMLElement): void{
		const sections: NodeListOf<HTMLElement> = boardSection.querySelectorAll('.taskSection');

		sections[0].innerHTML = '<h1>ToDo</h1>';
		sections[1].innerHTML = '<h1>W trakcie</h1>';
		sections[2].innerHTML = '<h1>Zrobione</h1>';
	}

	private addNewTask(): void {
		const activeBoard: HTMLElement = <HTMLElement>document.querySelector('.active'),
			taskName: string = (<HTMLInputElement>activeBoard.querySelector('.taskListName')).value.trim(),
			taskDesc: string = (<HTMLTextAreaElement>activeBoard.querySelector('.taskListDesc')).value;

		if(taskName.length !== 0) {
			const task: Task = new Task(taskName, taskDesc);
			this.tasks.push(task);
			this.addToLocalStorage();
		}
		else return;
	}

	private handleDragEvents(taskSection: HTMLElement){

		taskSection.addEventListener('dragover', (e: any) => {
			taskSection.classList.replace('normalState','draggedOver');
			e.preventDefault();
		});

		taskSection.addEventListener('dragenter', (e: Event) => {
			e.preventDefault();
		});

		taskSection.addEventListener('dragleave', () => {
			taskSection.classList.replace('draggedOver', 'normalState');
		});

		taskSection.addEventListener('drop', (e: any) => {
			e.preventDefault();

			const draggedItem = e.dataTransfer.getData('text');
			taskSection.classList.replace('draggedOver','normalState');
			taskSection.appendChild(<HTMLDivElement>document.querySelector(`#${draggedItem}`));
			e.dataTransfer.clearData();
		});
	}
}