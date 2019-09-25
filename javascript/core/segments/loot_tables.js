const loot_tables = [];

//main inventory loot table
loot_tables[0] = {
	currentPrice: new Decimal("100"),
	valueIncrease: 10,
	items: [{
		item: new Item("Add extra Dimension", 1, "extradimension", "exndim"),
		maxCount: 5,
		rarity: 1
	}, {
		item: new Item("Raw 2x multiplier to First dimension", 1, "x2firstdimension", "rm1dim"),
		maxCount: 10,
		rarity: 3
	}]
};
