export class Task {
	constructor(taskName: string, taskDesc: string) {
		const activeBoard: HTMLElement = <HTMLElement>document.querySelector('.active'),
			toDoTaskSection: HTMLElement = <HTMLElement>activeBoard.querySelector('#taskList0'); // append task to active board 

		console.log('dziala');
		const newTaskEl: HTMLDivElement = document.createElement('div'),
			newTaskName: HTMLHeadingElement = document.createElement('h1'),
			newTaskDesc: HTMLParagraphElement = document.createElement('p'),
			newTaskDelButton: HTMLButtonElement = document.createElement('button'),
			taskID: string = 't' + Date.now().toString();

		newTaskName.textContent = taskName;
		newTaskDesc.textContent = taskDesc;
		newTaskEl.draggable = true;
		newTaskEl.id = taskID;
		newTaskEl.classList.add('note');
		newTaskName.classList.add('noteBar');

		newTaskDelButton.textContent = 'Delete task'; 

		newTaskEl.appendChild(newTaskName);
		newTaskEl.appendChild(newTaskDesc);
		newTaskEl.appendChild(newTaskDelButton);
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
// window.onclick = (e : Event) => {
// 	console.log(e.target);

// }; 
// TODO:
// Task list contains notes, add notes, drag and drop