class coord {
	x;
	y;
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}
}

export class geom extends coord {
	constructor(x = 0, y = 0) {
		super(x, y);
	}

	in_area(pt1, pt2, area = 0) {
		if((Math.abs(pt1.x - pt2.x) <= area) && (Math.abs(pt1.y - pt2.y) <= area))
			return true;
		return false;
	}
}
