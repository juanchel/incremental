var ITEMTYPE = {
    SWORD: 1,
}

var ITEMCLASS = {
    WEAPON: "Weapon",
    OFFHAND: 2,
    BOW: 3,
    ARROW: 4,
    ACCESSORY: 5,
    HERO: 6,
    CONSUMABLE: 7,
}

nextItemId = 0

function Item (itemType, rarity, level) {
    this.level = level;
    this.itemId = 'itemId' + nextItemId;
    nextItemId++;
    this.stats = [0, 0, 0, 0, 0, 0];
    if (itemType == ITEMTYPE.SWORD) {
        this.itemName = "Sword";
        this.itemClass = ITEMCLASS.WEAPON;
        this.stats[1] = (4 + level) * 2.5;
        this.cost = 100;
        this.picClass = "item-sword";
    }
}

shopItems = {

}

inventoryItems = {

}