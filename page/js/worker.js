class worker {
	#state;
	#x;
	#y;
	#n1 = 1;
	#n2 = 1;

	#calc() {
		if (this.#x > 98) {
			this.#n1 = -1;
		} else if (this.#x < 0) {
			this.#n1 = 1;
		}

		if (this.#y > 96) {
			this.#n2 = -1;
		} else if (this.#y < 0) {
			this.#n2 = 1;
		}

		this.#x += this.#n1;
		this.#y += this.#n2;	
	}

	#sleep = (ms) => new Promise((f_resolve, f_reject) => setTimeout(() => f_resolve(`await: ${ms}`), ms));

	async excec(ms) {

		while(1) {
			if(this.#state == 'run') {
				this.#calc();
				self.postMessage([this.#x, this.#y]);
			}

			else if(this.#state == 'stop')
				break;	

			await this.#sleep(ms);
		}

	}

	constructor() {

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
				default:
					this.#x = e.data[0];
					this.#y = e.data[1];
			}
		}
	}
}

const wrk = new worker();
wrk.excec(10);







