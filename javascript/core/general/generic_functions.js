/*

  _These are generic functions_

*/
var switchTabs = function(tab) {
	for (let i = 0; i < document.getElementsByClassName("tab-btn").length; i++) {
		document.getElementsByClassName("tab-btn")[i].classList.remove("tab-btn-active");
	}
	document.getElementsByClassName("tab-btn")[tab].classList.add("tab-btn-active");

	for (let i = 0; i < player.tabs.length; i++) {
		document.getElementById(player.tabs[i]).style.display = "none";
	}
	document.getElementById(player.tabs[tab]).style.display = "block";

}

var fixString = function(s) {
	let string = s.replace(/\B(?=(\d{3})+(?!\d))/g, ",");


	if (string.startsWith("e,")) {
		string = string.split("e,")[1];
		return player.prefix + string;
	}

	return string;

}

var hideDimensions = function() {
	for (let i = 0; i < 8; i++) {
		document.getElementById("dimension" + (i + 1)).style.display = "table-row";
	}

	for (let i = 8 - player.dimensions.length; i > 0; i--) {
		//show/hide the dimensions not unlocked yet
		document.getElementById("dimension" + (9 - i)).style.display = "none";

	}
}
