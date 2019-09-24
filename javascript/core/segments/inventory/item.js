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

	addCount(count) {
		this.amount += count;
	}
}
