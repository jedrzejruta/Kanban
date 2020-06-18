export class Task {

	// TODO: 
	
	// task should contain boardID info, and which section it is assigned, or update board with tasks array
	public taskName: string;
	public taskDesc: string;
	constructor(taskName: string, taskDesc: string) {
		this.taskName = taskName;
		this.taskDesc = taskDesc;
		this.renderTask(taskName, taskDesc);		
	}

	renderTask(taskName: string, taskDesc: string): void{
		const activeBoard: HTMLElement = <HTMLElement>document.querySelector('.active'),
			toDoTaskSection: HTMLElement = <HTMLElement>activeBoard.querySelector('#taskList0'),
			newTaskEl: HTMLDivElement = document.createElement('div'),
			newTaskName: HTMLHeadingElement = document.createElement('h1'),
			newTaskDesc: HTMLParagraphElement = document.createElement('p'),
			newTaskDelButton: HTMLButtonElement = document.createElement('button'),
			taskID: string = `t${Date.now().toString()}`;

		newTaskEl.draggable = true;
		newTaskEl.id = taskID;
		newTaskEl.classList.add('note');
			
		newTaskName.textContent = taskName;
		newTaskName.classList.add('noteBar');

		newTaskDesc.textContent = taskDesc;

		newTaskDelButton.textContent = 'Delete task'; 

		newTaskEl.append(newTaskName, newTaskDesc, newTaskDelButton);
		toDoTaskSection.appendChild(newTaskEl);

		newTaskDelButton.addEventListener('click',() => {
			this.deleteTask(newTaskEl);
		});
		this.handleTaskDrag(newTaskEl);
	}

	handleTaskDrag(taskEl: HTMLDivElement): void {

		taskEl.addEventListener('dragstart', (e: any) => {
			e.dataTransfer.setData('text/plain', e.target.id);
			setTimeout(() => {
				taskEl.style.display = 'none';
			}, 0);
		});

		taskEl.addEventListener('dragend', () => {
			setTimeout(() => {
				taskEl.style.display = 'block';
			}, 0);
		});
	}

	deleteTask(taskEl: HTMLDivElement): void{
		taskEl.remove();
	}
}