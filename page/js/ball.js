import {geom} from '/page/js/geom.js';

let N = 1001;

export class ball extends geom{	
	#id;
	#worker;
	static #htmlcss = '';
	static #arraypts = [];

	#init_htmlcss() {
		ball.#htmlcss += 
			`
		<style>
			#circle${this.#id} {
				position: absolute;
				left:${this.x}%;
				top: ${this.y}%;
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

		if(ball.#arraypts == undefined)
			return;
		for(let pt1 of ball.#arraypts) {
			let pt2 = new geom(this.x, this.y);
			if(this.in_area(pt1, pt2, 1)) {
				this.#worker.postMessage('bounce');
				this.#worker.postMessage([this.x, this.y]);
				console.log(`collusion: ${pt1.x} : ${pt1.y} >< ${pt2.x} : ${pt2.y}`);
			}
		}
		document.getElementById(`circle${this.#id}`).style.left =`${this.x}%`;
		document.getElementById(`circle${this.#id}`).style.top = `${this.y}%`;
		ball.#arraypts[this.#id].x = this.x;
		ball.#arraypts[this.#id].y = this.y;
	}

	constructor(x, y, id) {
		super(x, y);
		this.#id = id;
		this.#worker = new Worker('/page/js/worker.js', {type: 'module'});
		this.#worker.onmessage = (e) => {
			switch(e.data) {
				case 'clear':
					ball.#htmlcss = '';
					ball.#arraypts = [];
					break;
				default:
					this.x = e.data[0];
					this.y = e.data[1];
					//	console.log(`x: ${this.x} | y: ${this.y}`);
					this.#update();
			}
		}
		this.#worker.postMessage([this.x, this.y]);
		this.#worker.postMessage('run');
		this.#init_htmlcss();
		ball.#arraypts.push(new geom());
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
			Math.floor((Math.random() * N) % 95), 
			Math.floor((Math.random() * N) % 85),
			i
		));
	return arrayballs;
}

export function destroyballs(arrayballs) {
	for(let x of arrayballs)
		x.destructor();
}
































