function Hero (heroName, prof, level) {
    this.heroName = heroName;
    this.prof = prof;
    this.level = level;
    this.xpReq = level * level * 50;
    this.xp = 0;
    this.equips = [null, null, null, null];
    this.equipStats = [0, 0, 0, 0, 0, 0];
}

Hero.prototype.setInitialStats = function(statType) {
    this.bonus = statType.getBonus();
    this.stats = [0, 0, 0, 0, 0, 0];
    for (i = 0; i < 6; i++) {
        this.stats[i] = (4 + this.level) * (this.prof.baseStat[i] + this.bonus[i] / 4);
        this.stats[i] *= 0.95 + Math.random() * 0.1;
        if (i == 0) {
            this.stats[i] *= 4;
        }
        this.stats[i] = Math.round(this.stats[i]);
        this.equipStats[i] = this.stats[i];
    }
    this.hp = this.stats[0];
};

heroes = {};
nextHeroId = 0;
displayHero = null;

function updateStats(hero) {
    for (i = 0; i < 6; i++) {
        hero.equipStats[i] = hero.stats[i];
        for (j = 0; j < 4; j++) {
            if (hero.equips[j]) {
                hero.equipStats[i] += hero.equips[j].stats[i];
            }
        }
    }
    updateDisplay(hero);
}

function updateDisplay(hero) {
    $('#health-bar').attr('value', hero.hp);
    $('#health-bar').attr('max', hero.stats[0]);
    $('#xp-bar').attr('value', hero.xp);
    $('#xp-bar').attr('max', hero.xpReq);
    $('#hero-name-class').html(hero.heroName+'<br/><br/>L'+ hero.level + ' ' + hero.prof.profName);
    $('#hero-hp').html(hero.hp+'<span style="font-size:12pt">'+hero.equipStats[0]+'</span>');
    $('#hero-xp').html(hero.xp+'<span style="font-size:12pt">'+hero.xpReq+'</span>');
    $('#hp-stat').html('HP<br/>' + '&#9733;&#9733;&#9733;&#9733;'.substring(0,7*hero.bonus[0]) + '<br/>'+hero.equipStats[0]);
    $('#atk-stat').html('ATK<br/>' + '&#9733;&#9733;&#9733;&#9733;'.substring(0,7*hero.bonus[1]) + '<br/>'+hero.equipStats[1]);
    $('#def-stat').html('DEF<br/>' + '&#9733;&#9733;&#9733;&#9733;'.substring(0,7*hero.bonus[2]) + '<br/>'+hero.equipStats[2]);
    $('#int-stat').html('INT<br/>' + '&#9733;&#9733;&#9733;&#9733;'.substring(0,7*hero.bonus[3]) + '<br/>'+hero.equipStats[3]);
    $('#res-stat').html('RES<br/>' + '&#9733;&#9733;&#9733;&#9733;'.substring(0,7*hero.bonus[4]) + '<br/>'+hero.equipStats[4]);
    $('#agi-stat').html('AGI<br/>' + '&#9733;&#9733;&#9733;&#9733;'.substring(0,7*hero.bonus[5]) + '<br/>'+hero.equipStats[5]);
}