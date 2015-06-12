function Hero (heroName, prof, level) {
    this.heroName = heroName;
    this.prof = prof;
    this.level = level;
    this.xpReq = level * level * 50;
    this.xp = 0;
}

Hero.prototype.setInitialStats = function(statType) {
    this.bonus = statType.getBonus();
    this.stat = [0, 0, 0, 0, 0, 0];
    for (i = 0; i < 6; i++) {
        this.stat[i] = (4 + this.level) * (this.prof.baseStat[i] + this.bonus[i] / 4);
        this.stat[i] *= 0.95 + Math.random() * 0.1;
        if (i == 0) {
            this.stat[i] *= 4;
        }
        this.stat[i] = Math.round(this.stat[i]);
    }
    this.hp = this.stat[0];
};

heroes = {};
nextHeroId = 0;
toDisplay = null;

function updateDisplay(hero) {
    $('#health-bar').attr('value', hero.hp);
    $('#health-bar').attr('max', hero.stat[0]);
    $('#xp-bar').attr('value', hero.xp);
    $('#xp-bar').attr('max', hero.xpReq);
    $('#hero-name-class').html(hero.heroName+'<br/><br/>L'+ hero.level + ' ' + hero.prof.profName);
    $('#hero-hp').html(hero.hp+'<span style="font-size:12pt">'+hero.stat[0]+'</span>');
    $('#hero-xp').html(hero.xp+'<span style="font-size:12pt">'+hero.xpReq+'</span>');
    $('#hp-stat').html('HP<br/>' + '&#9733;&#9733;&#9733;&#9733;'.substring(0,7*hero.bonus[0]) + '<br/>'+hero.stat[0]);
    $('#atk-stat').html('ATK<br/>' + '&#9733;&#9733;&#9733;&#9733;'.substring(0,7*hero.bonus[1]) + '<br/>'+hero.stat[1]);
    $('#def-stat').html('DEF<br/>' + '&#9733;&#9733;&#9733;&#9733;'.substring(0,7*hero.bonus[2]) + '<br/>'+hero.stat[2]);
    $('#int-stat').html('INT<br/>' + '&#9733;&#9733;&#9733;&#9733;'.substring(0,7*hero.bonus[3]) + '<br/>'+hero.stat[3]);
    $('#res-stat').html('RES<br/>' + '&#9733;&#9733;&#9733;&#9733;'.substring(0,7*hero.bonus[4]) + '<br/>'+hero.stat[4]);
    $('#agi-stat').html('AGI<br/>' + '&#9733;&#9733;&#9733;&#9733;'.substring(0,7*hero.bonus[5]) + '<br/>'+hero.stat[5]);
}