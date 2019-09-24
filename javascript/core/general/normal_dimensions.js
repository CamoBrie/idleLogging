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

		return player.dimensions[t + 1].amount;

	}
	return 0;
}

//get the multiplier for the dimensions
var getMultiplier = function(dimension) {
	return changeToThreshold(player.dimensions[dimension].multiplier, 2);
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
		player.money = player.money.subtract(player.dimensions[i].cost);
		player.dimensions[i].amount = player.dimensions[i].amount.add(1);
		player.dimensions[i].amountBought = player.dimensions[i].amountBought.add(1);
		player.dimensions[i].cost = player.dimensions[i].cost.multiply(Decimal.pow(10, (i + 1)));
		player.dimensions[i].multiplier = player.dimensions[i].multiplier.multiply(2);
	}
}

//has enough money to buy
var hasEnoughMoneyToBuyDim = function(dimension) {
	return player.money.compareTo(player.dimensions[dimension].cost) >= 0;
}
