let N = 10001;

export class ball {
	#id;
	#x;
	#y;
	#worker;
	static #htmlcss = '';

	#init_htmlcss() {
		ball.#htmlcss += 
			`
		<style>
			#circle${this.#id} {
				position: absolute;
				left:${this.#x}%;
				top: ${this.#y}%;
				width: 1em;
				height: 1em;
				border-radius: 50%/50%;
				margin: 0% auto auto 0%;
				background-color: rgba(255,255,255,1);
				}
		</style>
		<div id="circle${this.#id}"></div>
		`;
		document.getElementsByClassName("screen")[0].innerHTML = ball.#htmlcss;
	}
	#update() {
		document.getElementById(`circle${this.#id}`).style.left =`${this.#x}%`;
		document.getElementById(`circle${this.#id}`).style.top = `${this.#y}%`;
	}
	constructor(id, x, y) {
		this.#id = id;
		this.#x = x;
		this.#y = y;
		this.#worker = new Worker('/page/js/worker.js');
		this.#worker.onmessage = (e) => {
			switch(e.data) {
				case 'clear':
					ball.#htmlcss = '';
					break;
				default:
					this.#x = e.data[0];
					this.#y = e.data[1];
					console.log(`x: ${this.#x} | y: ${this.#y}`);
					this.#update();
			}
		}
		this.#worker.postMessage([this.#x, this.#y]);
		this.#worker.postMessage('run');
		this.#init_htmlcss();
	}

	destructor() {
		if(this.#worker != undefined)
			this.#worker.postMessage('stop');
	}
}

export function createballs(n) {

	let arrayballs = [];

	for(let i = 0; i < n ;i++)
		arrayballs.push(new ball(
			i,
			Math.floor((Math.random() * N) % 95), 
			Math.floor((Math.random() * N) % 85)
		));
	return arrayballs;
}

export function destroyballs(arrayballs) {
	for(let x of arrayballs)
		x.destructor();
}
































