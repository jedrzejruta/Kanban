export class Task {
	constructor(private taskName: string) {
		const activeBoard: HTMLElement = <HTMLElement>document.querySelector('.active'); //append task to active board 
		//not working with many boards, only appends to first board
		console.log('dziala');
		const newTaskEl: HTMLParagraphElement = document.createElement('p');
		newTaskEl.innerText = taskName;
		newTaskEl.draggable = true;
		activeBoard.appendChild(newTaskEl);
	}
}
// window.onclick = (e : Event) => {
// 	console.log(e.target);

// }; 
//TODO:
//Task list contains notes, add notes, drag and drop