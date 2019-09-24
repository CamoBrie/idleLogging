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

	//clears all the items
	clearItems() {
		this.items.length = 0;
	}

	//returns the item
	getItem(key) {
		return this.items[this.getIndex(key)];
	}


	//get index of item
	getIndex(key) {
		for (let i = 0; i < this.items.length; i++) {
			if (this.items[i].key == key) {
				return i;
			}
		}
		return -1;
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

	updatePrice(currentPrice) {
		document.getElementById("ItemPrice").innerHTML = currentPrice;
	}

	itemInInventory(key) {
		if (this.getIndex(key) != -1) {
			return true;
		} else {
			return false;
		}
	}

	drawItem(lootTable) {
		//set current lootTable
		let tableIndex = lootTable;
		let clt = loot_tables[tableIndex];

		//check if has enough money
		if (player.enoughMoney(clt.currentPrice)) {

			player.removeMoney(clt.currentPrice);

			loot_tables[tableIndex].currentPrice = clt.currentPrice.mul(clt.valueIncrease);

			//calculate the total drawable number
			let totalDraw = 0;
			for (let i = 0; i < clt.items.length; i++) {
				totalDraw += clt.items[i].rarity;
			}

			//pick item from list
			let result = Math.floor(Math.random() * totalDraw);
			let itemGot = drawItemFromResult(clt, result);

			//set current key
			let currentKey = clt.items[itemGot].item.key;


			//does already have item?
			if (this.itemInInventory(currentKey)) {

				//see if has reached max of item
				if (this.getItem(currentKey).amount < clt.items[itemGot].maxCount) {
					this.getItem(currentKey).addCount(1);

				} else {
					console.log("already got the max count of the item");
				}
			} else {
				//add the item to the inventory
				this.addItem(clt.items[itemGot].item);
			}

			this.updatePrice(changeToThreshold(loot_tables[tableIndex].currentPrice));
			this.displayItems();
		}
	}
}
