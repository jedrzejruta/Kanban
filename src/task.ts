export class Task {
	constructor(taskName: string, taskDesc: string) {
		const activeBoard: HTMLElement = <HTMLElement>document.querySelector('.active'); //append task to active board 

		console.log('dziala');
		const newTaskEl: HTMLDivElement = document.createElement('div'),
			newTaskName: HTMLHeadingElement = document.createElement('h1'),
			newTaskDesc: HTMLParagraphElement = document.createElement('p');

		newTaskName.innerText = taskName;
		newTaskDesc.innerText = taskDesc;
		newTaskEl.draggable = true;
		newTaskEl.classList.add('note');
		newTaskName.classList.add('noteBar');

		newTaskEl.appendChild(newTaskName);
		newTaskEl.appendChild(newTaskDesc);
		activeBoard.appendChild(newTaskEl);
	}
}
// window.onclick = (e : Event) => {
// 	console.log(e.target);

// }; 
//TODO:
//Task list contains notes, add notes, drag and drop