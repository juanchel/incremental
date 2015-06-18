var curArea = 'map';
var curHighlightArea = 'dest-hills';
var battlePause = false;
var fightingBoss = false;

$(document).ready(function() {
    $('.destination').click(function () {
        $('#map-wrapper').scrollTo($(this), 1000, {offset: {left:-305, top:-225}});
        $('#dest-select').animate({
            left: $(this).css('left'),
            top: $(this).css('top')
        }, 1000);
        curHighlightArea = $(this).attr('id');
    });

    $('#enter-exit').click(function () {
        // Enter
        if (curArea == 'map') {
            $('#battle-back').show('scale', 500, function() {
                $('#map-wrapper').hide();
            });
            $(this).text('Return');
            for (var i=0; i<travelParty.length; i++) {
                partyBattlers.push(new PartyBattler(heroes[travelParty[i]]));
            }
            curArea = curHighlightArea;
            if (areas[curArea].progress >= areas[curArea].totalSize) {
                $('#boss-button').text('Fight Boss');
                $('#boss-button').removeClass('disabled');
            } else if (areas[curArea].finished) {
                $('#boss-button').text('Complete');
                $('#boss-button').addClass('disabled');
            } else {
                $('#boss-button').text('Checkpoint ' + areas[curArea].progress / areas[curArea].partSize);
                $('#boss-button').addClass('disabled');
            }
        // Exit
        } else {
            $('#map-wrapper').show();
            $('#battle-back').hide('scale', 500);
            $(this).text('Enter');
            areas[curArea].progress = areas[curArea].progress - (areas[curArea].progress % areas[curArea].partSize);
            fightingBoss = false;
            curArea = 'map';
            partyBattlers = [];
            enemyBattlers = [];
            $('.enemy-pic').remove();
        }
    });

    $('#pause-button').click(function () {
        battlePause = true;
        $(this).addClass('disabled');
        $('#step-button').removeClass('disabled');
        $('#play-button').removeClass('disabled');
    });

    $('#play-button').click(function () {
        battlePause = false;
        $(this).addClass('disabled');
        $('#step-button').addClass('disabled');
        $('#pause-button').removeClass('disabled');
    });

    $('#step-button').click(function () {
        if (battlePause) {
            doBattle();
        }
    });

    $('#boss-button').click(function () {
        if (areas[curArea].progress >= areas[curArea].totalSize && !fightingBoss) {
            areas[curArea].boss();
            fightingBoss = true;
            $(this).addClass('disabled');
        }
    });
});

function Area (encounter, boss, partSize, totalSize) {
    this.encounter = encounter;
    this.boss = boss;
    this.partSize = partSize;
    this.totalSize = totalSize;
    this.progress = 0;
    this.finished = false;
}

var areas = {
    'dest-hills': new Area (
        function () {
            enemyBattlers = [new EnemyBattler(allEnemies['slime'], 100, 100)];
        },
        function () {
            enemyBattlers = [new EnemyBattler(allEnemies['slime'], 100, 100), new EnemyBattler(allEnemies['slime'], 250, 100)];
        }, 10, 20
    ),
    'dest-forest': new Area (
        function () {
            enemyBattlers = [new EnemyBattler(allEnemies['slime'], 200, 100)];
        },
        function () {
            enemyBattlers = [new EnemyBattler(allEnemies['slime'], 200, 100)];
        }, 10, 20
    ),
}