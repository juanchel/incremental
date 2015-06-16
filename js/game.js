var gold = 0;
var goldDelta = 0;
var curHireCost = 10;
var bountifulGold = 10;
var heroHireCost = 100;
var maxLevel = 100;

var STAT_TO_STR = {
    0: 'HP', 1:'ATK', 2:'DEF', 3:'INT', 4:'RES', 5:'AGI'
}

function Hire(job, worth, cost, multBy) {
    this.job = job;
    this.worth = worth;
    this.multBy = multBy;
    this.baseCost = cost;
    this.amount = 0;
    this.mult = 1.0;
    this.curCost = cost;
    this.special = 0;
}

var farmer = new Hire("farmer", 0, 100, 1.2);
farmer.special = 1;
var hunter = new Hire("hunter", 1, 500, 1.05);

var curHire = farmer;

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

// Every tick of time
function takeStep() {
    // Add gold and update buy buttons
    gold += goldDelta;
    $('#current-gold').text(Math.floor(gold/10));
    if (gold >= curHire.curCost) {
        $('.hire-info-content .purchase-button').removeClass('disabled');
    } else if (! $('.hire-info-content .purchase-button').hasClass('disabled')) {
        $('.hire-info-content .purchase-button').addClass('disabled');
    }

    // Update research bars
    toRemove = [];
    for (var key in curResearch) {
        curResearch[key].progress += researchPer;
        $('#' + key + ' progress').attr('value', curResearch[key].progress);
        $('#' + key + ' .research-time').text(Math.ceil((curResearch[key].cost - curResearch[key].progress) / researchPer / 10));
        // When a research finishes
        if (curResearch[key].progress >= curResearch[key].cost) {
            toRemove.push(key);
            curResearch[key].effect();
            $('#' + key).remove();
            $nDiv = $('<div>', {class: 'inner-item'});
            $nDiv.html('Project completed:<br/><span class="bold-amber">' + curResearch[key].gameName + '</span>');
            $nX = $('<div>', {class: 'close-x'});
            $nX.html('x');
            $nX.click(function() {
                $(this).parent().slideUp(500, function() {$(this).remove();});
            });
            $nDiv.append($nX);
            $('.notifications .inner').append($nDiv);
        }
    }
    for (var i = 0; i < toRemove.length; i++) {
        delete curResearch[toRemove[i]];
    }
}

function calcBountifulGold() {
    hg = (farmer.special * farmer.amount * 10 + 10);
    bountifulGold = hg;
    $('#bountiful-value').text(hg / 10);
    return hg;
}

function calcGoldDelta() {
    delta = hunter.worth * hunter.amount;
    goldDelta = delta;
    $("#current-gold-delta").text(delta);
    return delta;
}

function calcHeroHireCost() {
    baseCost = allProfs[$('#hero-class').val()].baseCost;
    levelMult = levelMults[$('#hero-level-mult').val()].costMult;
    statTypeCost = statTypes[$('#hero-stat-type').val()].costMult;
    hhc = baseCost * levelMult * statTypeCost;
    $("#hire-hero-cost").text(hhc / 10);
    return hhc;
}

$(document).ready(function() {
    setInterval(takeStep, 100);
    showResearch('rs-build-keep');

    // Bountiful miracle
    $('#bountiful').click(function() {
        gold += bountifulGold;
    });

    // When the user clicks on a hire bar to view more information
    $('.hire-table .inner-item').click(function() {
        $('.hire-info-content .purchase-button').show();
        $('.hire-info-unique').hide();
        $('.hire-table .inner-item').removeClass("hire-selected");
        $(this).addClass("hire-selected");

        if ($(this).hasClass("farmer")) {
            $(".hire-info-unique.farmer").show();
            curHire = farmer;
        }

        if ($(this).hasClass("hunter")) {
            $(".hire-info-unique.hunter").show();
            curHire = hunter;
        }
    });

    // When the user tries to click the hire button
    $('.hire-info .purchase-button').click(function() {
        curHire.amount += 1;
        gold -= curHire.curCost;
        curHire.mult *= curHire.multBy;
        curHire.curCost = Math.round(curHire.baseCost * curHire.mult / 10) * 10;
        calcGoldDelta();

        $('.hire-table .inner-item.' + curHire.job + ' .hire-amount').text(String("    "+curHire.amount).slice(-4));
        $('#hire-cost-'+curHire.job).text(curHire.curCost/10);
        $('.hire-info-unique.' + curHire.job + ' .job-delta-total').text(curHire.worth * curHire.amount);
        $('.hire-info-unique.' + curHire.job + ' .job-special-total').text(curHire.special * curHire.amount);

        if (curHire == farmer) {calcBountifulGold();}
    });

    // When the user tries to hire a hero
    $('#hire-hero-confirm').click(function() {
        levelMult = Math.floor(levelMults[$('#hero-level-mult').val()].levelMult * maxLevel) + 1;
        hiredHero = new Hero('Sam', allProfs[$('#hero-class').val()], levelMult);
        hiredHero.setInitialStats(statTypes[$('#hero-stat-type').val()]);
        hiredId = 'hero' + nextHeroId;
        heroes[hiredId] = hiredHero;
        nextHeroId++;

        var $heroInnerItem = $("<div>", {id: hiredId, class: 'inner-item'});
        $heroInnerItem.html('<span class="list-display-level number">L'+hiredHero.level+'</span> <span class="list-display-class">'+hiredHero.prof.profName+'<span> <span class="list-display-name">'+hiredHero.heroName+'</span>');

        // When the user clicks on the hero to show information
        $heroInnerItem.click(function() {
            $('#buy-hero-info').hide();
            $('#view-hero-info').show();
            $('.hero-selected').removeClass('hero-selected');
            $(this).addClass('hero-selected');

            displayHero = heroes[$(this).attr('id')];
            updateDisplay(displayHero);
        });
        var $heroSort = $("<div>", {class: 'hero-sort'});
        $heroSort.html('+');

        // When the user tries to add or remove hero from party
        $heroSort.click(function() {
            if (!$(this).parent().hasClass('in-party')) {
                $(this).parent().insertBefore($('.party-select .inner-item:first'));
                $(this).parent().insertAfter($('.party-select .in-party:last'));
                $(this).parent().addClass('in-party');
                $(this).html('&ndash;');
            } else {
                $(this).parent().removeClass('in-party');
                $(this).html('+');
                $(this).parent().insertAfter($('.party-select .in-party:last'));
            }
        });
        $heroInnerItem.append($heroSort);
        $('#heroes-list').append($heroInnerItem);
    });

    // When the user selects a class to hire
    $('#hero-class').change(function() {
        $('#class-desc').html(allProfs[$(this).val()].desc);
        calcHeroHireCost();
    });
    
    // When the user selects a class to hire
    $('#hero-level-mult').change(function() {
        $('#level-desc').html(levelMults[$(this).val()].desc);
        calcHeroHireCost();
    });

    // When the user selects a class to hire
    $('#hero-stat-type').change(function() {
        $('#stat-desc').html(statTypes[$(this).val()].desc);
        calcHeroHireCost();
    });

    // When the user clicks the hire hero button to view the hire menu
    $('#hire-hero-button').click(function() {
        $('#buy-hero-info').show();
        $('#view-hero-info').hide();
    });

    // When the user decides to refresh the shop
    $('#refresh-shop').click(function() {
        shopItems = {};
        $('.shop-item').each(function(index) {
            $(this).empty();
            shopItem = new Item(ITEMTYPE.SWORD, 0, Math.floor(Math.random()*10));
            shopItems[shopItem.itemId] = shopItem;
            $pic = $('<div>', {class: 'shop-item-pic ' + shopItem.picClass});
            $name = $('<div>', {class: 'shop-item-name'});
            $name.text(shopItem.itemName);
            $(this).append($pic);
            $(this).append($name);
            $(this).append(shopItem.cost + '<span class="gold-g"> G<br/></span>'+shopItem.itemClass+'<br/>L'+shopItem.level+' ' + 'Common Item<br/>');
            for (var i=0; i<6; i++) {
                if (shopItem.stats[i] != 0) {
                    $statDiv = $('<div>', {class: 'shop-item-stat'});
                    $statDiv.text(shopItem.stats[i] + ' ' + STAT_TO_STR[i]);
                    $(this).append($statDiv);
                }
            }
            $buy = $('<div>', {class: 'purchase-button'});
            $buy.data('item-id', shopItem.itemId);
            $buy.click(function() {
                if ($('#personal-inventory .inventory-item').length < 48) {
                    inventoryItems[$(this).data('item-id')] = shopItems[$(this).data('item-id')];
                    $invenItem =  $('<div>', {class: 'inventory-item ' + shopItems[$(this).data('item-id')].picClass});
                    $invenItem.data('item-id', $(this).data('item-id'));
                    $invenItem.click( function() {
                        itemClick($(this));
                    });
                    $('#personal-inventory .inventory-cell:empty').first().append($invenItem);
                    $(this).parent().html('SOLD OUT');
                }
            });
            $buy.text('BUY');
            $(this).append($buy);
        });
    });
});
