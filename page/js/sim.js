import * as B from '/page/js/ball.js'

class sim {

	#arrayballs;
	#ok = false;

	#play() {
		if(!this.#ok) {
			let n = window.prompt("number of balls: ");  
			this.#arrayballs = B.createballs(isNaN(n) ? 1 : n);
			this.#ok = true;
		} else {
			B.destroyballs(this.#arrayballs);
			this.#ok = false;
		}
	}

	constructor() {
		document.getElementsByClassName("btn-play")[0].addEventListener("click", () => this.#play());
	}
}

const o = new sim();




