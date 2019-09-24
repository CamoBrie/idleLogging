/*

	_This is the core of the game_

*/

var tick = function() {
	for (let i = 0; i < player.dimensions.length; i++) {
		if (player.dimensions[i + 1]) {
			player.dimensions[i].amount = player.dimensions[i].amount.add(getDimensionPerSec(i));
		}
	}

	let total = Decimal.multiply(player.dimensions[0].amount, player.tickTiming / 1000);
	total = Decimal.multiply(total, player.dimensions[0].multiplier);
	player.addMoney(total);

}

var update = function() {
	//update the money
	document.getElementById("money").innerHTML = player.showMoney();



	//update the normal dimensions
	for (let i = 0; i < player.dimensions.length; i++) {
		//percentage, cost and multiplier
		document.getElementById("dim" + (i + 1)).innerHTML = showDimensions(i) + " (" + fixString(getDimensionPercent(i).toFixed(player.roundingPlaces)) + "%/s)";
		document.getElementById("dim" + (i + 1) + "cost").innerHTML = showDimensionCost(i);
		document.getElementById("dim" + (i + 1) + "mult").innerHTML = getMultiplier(i);

		//change the button's color if enough money
		if (hasEnoughMoneyToBuyDim(i)) {
			document.getElementById("dim" + (i + 1) + "cost").classList.remove("unavailable-btn");
			document.getElementById("dim" + (i + 1) + "cost").classList.add("available-btn");
		} else {
			document.getElementById("dim" + (i + 1) + "cost").classList.add("unavailable-btn");
			document.getElementById("dim" + (i + 1) + "cost").classList.remove("available-btn");
		}
	}


}



var init = function() {

	switchTabs(0);
	hideDimensions();
}


//create new player
player = new Player(10);

//initialize
init();

//start the game
var tickInterval = setInterval(tick, player.tickTiming);
var updateInteval = setInterval(update, player.updateTiming);
