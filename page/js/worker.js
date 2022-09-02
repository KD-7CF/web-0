import {geom} from '/page/js/geom.js';
let N = 1001;

class worker {
	#state;
	#n = [1, 1];
	#pt = new geom();
	#bounce = {a: false, b: 1};

	#calc() {

		let c = 1;
		if(this.#bounce.a)
			c = c == 1 ? -1 : 1;
		/*
		if(x == this.#mv.inv)
		if(x == this.#mv.bounce) {
			c = (c == 1) ? -1 : 1; //(Math.floor(Math.random() * N) % 2) == 0 ? -1 : 1;
			this.#mv.current = this.#mv.normal;		
		}
		*/
		if (this.#pt.x > 98)
			this.#n[0] = -1 * c;
		else if (this.#pt.x < 0)
			this.#n[0] = 1 * c;
		if (this.#pt.y > 96)
			this.#n[1] = -1 * c;
		else if (this.#pt.y < 0)
			this.#n[1] = 1 * c;
		this.#pt.x += this.#n[0] * c;
		this.#pt.y += this.#n[1] * c;
	}

	#sleep = (ms) => new Promise((f_resolve, f_reject) => setTimeout(() => f_resolve(`await: ${ms}`), ms));

	async excec(ms) {

		while(1) {
			if(this.#state == 'run') {
				this.#calc();
				self.postMessage([this.#pt.x, this.#pt.y]);
			}
			else if(this.#state == 'stop')
				break;	
			await this.#sleep(ms);
		}
	}

	constructor() {
		this.#bounce.a = (Math.floor(Math.random() * N) % 2) == 1 ? true : false;
		self.onmessage = (e) => {
			switch(e.data) {
				case 'run':
					this.#state = 'run';
					break;
				case 'stop':
					this.#state = 'stop';
					self.postMessage('clear');
					self.close();
					break;
				case 'bounce':
					this.#bounce.a = true;
					this.#bounce.b = Math.floor(Math.random() * N) % 2 + 1
					break;
				default:
					this.#pt.x = e.data[0];
					this.#pt.y = e.data[1];
			}
		}
	}
}
const wrk = new worker();
wrk.excec(100);




















































