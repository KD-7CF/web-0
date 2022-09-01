import * as B from '/page/js/ball.js'

class sim {

	#arrayballs;
	#ok = false;

	#play() {
		if(!this.#ok) {
			this.#arrayballs = B.createballs(10);
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




