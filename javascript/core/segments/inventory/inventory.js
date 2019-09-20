const inventoryHook = document.getElementById("inventory-table");

class Inventory {
	constructor() {
		this.items = [];
	}

	//add an item
	addItem(item) {
		this.items.push(item);
	}

	//removes the item and moves the rest of the array
	removeItem(key) {
		this.items.splice(getIndex(key), 1);
	}

	//returns the item
	getItem(key) {
		return this.items[getIndex(key)];
	}


	//get index of item
	getIndex(key) {
		this.items.findIndex(function(element) {
			return element.key == key;
		});
	}

	//returns table
	displayItems() {
		while (inventoryHook.firstChild) {
			inventoryHook.removeChild(inventoryHook.firstChild);
		}

		for (let i = 0; i < this.items.length; i++) {
			inventoryHook.append(this.items[i].display());
		}

	}

}

//a single item
class Item {
	constructor(name, amount, image, key) {
		this.name = name;
		this.amount = amount;
		this.image = image;
		this.key = key;
	}

	display() {
		//create outer div
		let itemHook = document.createElement("div");
		itemHook.className = "inventory-item";

		//create image
		let image = document.createElement("img");

		image.src = "images/inventory/" + this.image + ".png";
		image.style.width = "128px";
		image.style.height = "128px";

		image.addEventListener("click", function() {
			alert(image.src);
		});

		itemHook.append(image);

		return itemHook;

	}
}
