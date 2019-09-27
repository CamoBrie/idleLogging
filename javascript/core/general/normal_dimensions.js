/*

	_The normal dimensions_

*/

//get the change of dimensions in percentages
var getDimensionPercent = function(t) {
	if (player.dimensions[t + 1]) {
		if (player.dimensions[t + 1].amount.compareTo("0") == 1) {
			let change = getDimensionPerSec(t);
			let current = player.dimensions[t].amount;
			let total = Decimal.multiply(Decimal.multiply(Decimal.divide(change, current), 100), 1000 / player.tickTiming);
			if (total.isFinite) {
				return total
			} else {
				return 0;
			}
		}
	}
	return 0
}

//get the produced dimensions per second
var getDimensionPerSec = function(t) {
	if (player.dimensions[t + 1]) {
		if (player.dimensions[t + 1].amount.compareTo("0") == 0) {
			return 0;
		}

		return Decimal.multiply(Decimal.multiply(player.dimensions[t + 1].amount, getMultiplier(t)), player.tickTiming);
	}
	return 0;
}

//get the multiplier for the dimensions
var getMultiplier = function(dimension) {

	let total = player.dimensions[dimension].multiplier;

	//raw multiplier to first dimensions
	if (dimension == 0 && player.inventory.itemInInventory("rm1dim")) {
		let currentMult = Math.pow(2, player.inventory.getItem("rm1dim").amount);
		total = Decimal.multiply(total, currentMult);
	}

	return changeToThreshold(total, 2, 2);
}


//show the dimension amount amount
var showDimensions = function(dimension) {
	return changeToThreshold(player.dimensions[dimension].amount, 2);
}

//show dimension cost
var showDimensionCost = function(dimension) {
	return changeToThreshold(player.dimensions[dimension].cost, 2);

}

//buy dimensions
var buyDimension = function(i) {
	if (hasEnoughMoneyToBuyDim(i)) {
		player.removeMoney(player.dimensions[i].cost);
		player.dimensions[i].amount = player.dimensions[i].amount.add(1);
		player.dimensions[i].amountBought = player.dimensions[i].amountBought.add(1);
		player.dimensions[i].cost = player.dimensions[i].cost.multiply(Math.pow(10, getCostIncrease(i)));
		player.dimensions[i].multiplier = player.dimensions[i].multiplier.multiply(1.5);
	}
}

//has enough money to buy
var hasEnoughMoneyToBuyDim = function(dimension) {
	return player.money.compareTo(player.dimensions[dimension].cost) >= 0;
}

var getCostIncrease = function(i) {
	switch (i) {
		case 0:
			return 1;
		case 1:
			return 2;
		case 2:
			return 3;
		case 3:
			return 5;
		case 4:
			return 8;
		case 5:
			return 12;
		case 6:
			return 16;
		case 7:
			return 20;
	}
}

var buyMaxNorDim = function() {
	for (let i = player.dimensionsLength - 1; i >= 0; i--) {
		while (hasEnoughMoneyToBuyDim(i)) {
			buyDimension(i);
		}
	}
}
