export class Task {
	constructor(public taskName: string) {
		const newTaskEl: HTMLParagraphElement = document.createElement('p');
		newTaskEl.innerText = taskName;
	}
}
// window.onclick = (e : Event) => {
// 	console.log(e.target);

// }; 
//TODO:
//Task list contains notes, add notes, drag and drop