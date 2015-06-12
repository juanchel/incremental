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
    this.hp = stat[0];
};

heroes = {};
nextHeroId = 0;