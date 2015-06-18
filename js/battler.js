var nextEnemyId = 0;

function EnemyBattler (enemy, x, y) {
    this.enemy = enemy;
    this.curHp = enemy.stats[0];

    $pic = $('<div>', {class: 'enemy-pic', id: 'enemy'+nextEnemyId});
    $pic.css('left', x+'px');
    $pic.css('bottom', y+'px');
    $('#battle-back').append($pic);

    this.enemyId = 'enemy'+nextEnemyId;
    nextEnemyId++;
}

EnemyBattler.prototype.physicalDamage = function (dmg) {
    var damage = dmg / this.enemy.stats[2];
    this.curHp -= damage;
    return damage;
}

function PartyBattler (hero) {
    this.hero = hero;
}

var partyBattlers = [];
var enemyBattlers = [];

// One step of battle
function doBattle () {
    for (var i=0; i<partyBattlers.length; i++) {
        // Autoattack
        if (enemyBattlers.length > 0) {
            var power = (partyBattlers[i].hero.level + 4) * partyBattlers[i].hero.equipStats[1] * 5;
            var dmg = enemyBattlers[0].physicalDamage(power);
            logEvent(partyBattlers[i].hero.heroName + ' dealt ' + dmg + ' damage to enemy');
        }
    }
    for (var i=enemyBattlers.length-1; i>=0; i--) {
        if (enemyBattlers[i].curHp <= 0) {
            $('#'+enemyBattlers[i].enemyId).remove();
            enemyBattlers.splice(i, 1);
            logEvent('enemy defeated');
        }
    }

    // If all enemies are dead
    if (enemyBattlers.length == 0) {
        var cur = areas[curArea];

        // If it was the boss
        if (fightingBoss) {
            fightingBoss = false;
            cur.progress = 0;
        }
        cur.encounter();
        cur.progress += 1;
        if (cur.progress >= cur.totalSize) {
            $('#boss-button').text('Fight Boss');
            $('#boss-button').removeClass('disabled');
        } else if (cur.finished) {
            $('#boss-button').text('Completed');
        } else if (cur.progress % cur.partSize == 0) {
            $('#boss-button').text('Checkpoint '+(cur.progress/cur.partSize));
        }
    }
}