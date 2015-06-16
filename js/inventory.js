"use strict";

$(document).ready(function () {

    jQuery.fn.extend({
        addRemoveItems: function (targetCount) {
            return this.each(function () {
                var $children = $(this).children();
                var rowCountDifference = targetCount - $children.length;
                //console.log('row count diff: ' + rowCountDifference);

                if (rowCountDifference > 0) {
                    // Add items
                    for (var i = 0; i < rowCountDifference; i++) {
                        //console.log($rows.first());
                        $children.last().clone().appendTo(this);
                    }
                } else if (rowCountDifference < 0) {
                    // remove items
                    $children.slice(rowCountDifference).remove();
                }
            });
        },
        // Modified and Updated by MLM
        // Origin: Davy8 (http://stackoverflow.com/a/5212193/796832)
        parentToAnimate: function (newParent, duration) {
            duration = duration || 'slow';

            var $element = $(this);
            //console.log($element);
            if ($element.length > 0) {

                newParent = $(newParent); // Allow passing in either a JQuery object or selector
                var oldOffset = $element.offset();
                $(this).appendTo(newParent);
                var newOffset = $element.offset();


                var temp = $element.clone().appendTo('body');

                temp.css({
                    'position': 'absolute',
                        'left': oldOffset.left,
                        'top': oldOffset.top,
                        'zIndex': 1000
                });

                $element.hide();

                temp.animate({
                    'top': newOffset.top,
                        'left': newOffset.left
                }, duration, function () {
                    $element.show();
                    temp.remove();
                });

                //console.log("parentTo Animate done");
            }
        }
    });

    // Sorting, dragging, dropping, etc

    refreshSortableInventoryList();

    function refreshSortableInventoryList() {
        $('.inventory-cell').sortable({
            connectWith: '.inventory-cell',
            placeholder: 'inventory-item-sortable-placeholder',
            receive: function (event, ui) {

                var canMoveIntoSlot = true;

                var $sendItem = $(ui.item);
                var $receiveItem = $(this).children().not(ui.item);
                var $toSlot = $(this);
                var $fromSlot = $(ui.sender);

                if (!canMoveIntoSlot) {
                    $(ui.item).parentToAnimate($(ui.sender), 200);
                } else {
                    $(this).children().not(ui.item).parentToAnimate($(ui.sender), 200);

                    // If we're equipping something
                    if ($toSlot.parent().parent().attr('id') == 'hero-inventory') {
                        var ndx = 3;
                        if ($toSlot.hasClass('inven-wep')) {
                            var ndx = 0;
                        }
                        displayHero.equips[ndx] = inventoryItems[$sendItem.data('item-id')];
                        updateStats(displayHero);
                    } else if ($fromSlot.parent().parent().attr('id') == 'hero-inventory') {
                        var ndx = 3;
                        if ($fromSlot.hasClass('inven-wep')) {
                            var ndx = 0;
                        }
                        if ($receiveItem) {
                            displayHero.equips[ndx] = inventoryItems[$receiveItem.data('item-id')];
                        } else {
                            displayHero.equips[ndx] = null;
                        }
                        updateStats(displayHero);
                    }
                }
            }
        }).each(function () {
            // Setup some nice attributes for everything
            // Makes it easier to update the backend
            $(this).attr('data-slot-position-x', $(this).prevAll('.inventory-cell').length);
            $(this).attr('data-slot-position-y', $(this).closest('.inventory-row').prevAll('.inventory-row').length);
        }).disableSelection();
    }


});