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

var STAT_TO_STR = {
    0: 'HP', 1:'ATK', 2:'DEF', 3:'INT', 4:'RES', 5:'AGI'
}

var nextItemId = 0

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

var shopItems = {

}

var inventoryItems = {

}

// When the user clicks an item to select it
function itemClick ($thisDiv) {
    if ($thisDiv.hasClass("inventory-selected")) {
        $('.inventory-item').removeClass("inventory-selected");
        return;
    }
    $('.inventory-item').removeClass("inventory-selected");
    $thisDiv.addClass("inventory-selected");

    invenItem = inventoryItems[$thisDiv.data('item-id')];
    $('#item-desc').html('<b>' + invenItem.itemName + '</b></br>'+invenItem.itemClass+'<br/>');
    for (var i=0; i<6; i++) {
        if (invenItem.stats[i] != 0) {
            $statDiv = $('<div>', {class: 'item-stat'});
            $statDiv.text(invenItem.stats[i] + ' ' + STAT_TO_STR[i]);
            $('#item-desc').append($statDiv);
        }
    }
    $('#item-desc').append('<div style="clear:both"></div>');
    $flavor = $('<div>', {class: 'item-flavor'});
    $flavor.text('A sword.');
    $('#item-desc').append($flavor);
    $right = $('<div>', {class: 'item-right'});
    $right.html(invenItem.cost+' <span class="gold-g">G</span><br/> L'+invenItem.level+' Common Item');
    $('#item-desc').append($right);
}