const socket = new WebSocket('ws://localhost:5500');

socket.onopen = () => {
	alert('Connected');
	socket.send('Client is connected to the server');
};

socket.onmessage = (e) => {
	console.log(`message received: ${e.data}`);
};

socket.onerror = (error) => {
	console.log(`WebSocket error: ${error}`);
};

document.addEventListener('DOMContentLoaded', () => {
	const boardButton: HTMLButtonElement = <HTMLButtonElement>document.querySelector('#newBoard');
	if(socket.readyState !== 3) {
		boardButton.addEventListener('click', () => {
			const boardName: string = (<HTMLInputElement>document.querySelector('#boardName')).value.trim();
			socket.send(`board name => ${boardName}`);
		});
	}
});


