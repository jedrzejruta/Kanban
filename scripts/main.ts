class Board  {
	boardClassName: string = 'board';
	mainPage: HTMLElement = <HTMLElement>document.querySelector('main');

	constructor(public boardID: string) {
		const newBoardSection: HTMLElement = document.createElement('section');
		const newBoardTitle: HTMLHeadingElement = document.createElement('h1');
		const addTaskBtn: HTMLButtonElement = document.createElement('button');
		addTaskBtn.innerText = 'Add task';
		newBoardTitle.innerText = boardID;
		newBoardSection.classList.add(this.boardClassName);
		newBoardSection.appendChild(newBoardTitle);
		newBoardSection.appendChild(addTaskBtn);

		this.mainPage.appendChild(newBoardSection);
	}

}

class Task {
	constructor(public taskName: string) {
		const newTaskEl: HTMLParagraphElement = document.createElement('p');
		newTaskEl.innerText = taskName;
	}
}

class Kanban {
	createBoard: HTMLButtonElement = <HTMLButtonElement>document.querySelector('#newBoard');
	constructor(){

		this.createBoard.addEventListener('click',() => {
			const _boardID: string = (<HTMLInputElement>document.querySelector('#boardId')).value;
			//TODO:
			//make function to validate input 
			if(_boardID.trim().length === 0){
				return false;
			}
			else {
				new Board(_boardID.trim());
				console.log(_boardID);
			}
		});
	}

}

document.addEventListener('DOMContentLoaded',() => {
	new Kanban();
});