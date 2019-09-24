class Player {
	constructor(value) {
		//set variable values
		this.money = new Decimal(value);

		//set the dimensions
		this.dimensions = [];
		this.dimensionsLength = 3;

		for (let i = 0; i < this.dimensionsLength; i++) {
			this.dimensions[i] = {};
			this.dimensions[i].amount = new Decimal("0");
			this.dimensions[i].amountBought = new Decimal("0");
			this.dimensions[i].cost = new Decimal("10e" + (i * 3) * Math.log2(i + 1) * 2);
			this.dimensions[i].multiplier = new Decimal("1");
		}


		//set the inventory
		this.inventory = new Inventory();

		//formatting
		this.prefix = "e";
		this.roundingPlaces = 2;
		this.logarithmThreshold = 1e5;

		//interval timings
		this.tickTiming = 50;
		this.updateTiming = 100;


		this.tabs = ["dimensions", "inventory"];

	}

	//add value to current money
	addMoney(value) {
		this.money = this.money.plus(new Decimal(value));
	}

	removeMoney(value) {
		this.money = this.money.sub(new Decimal(value));
	}

	//display the money
	showMoney() {
		return changeToThreshold(this.money);

	}

	enoughMoney(value) {
		return this.money.compareTo(value) >= 0;
	}
}
