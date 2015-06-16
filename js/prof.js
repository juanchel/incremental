function Prof (profName, hp, str, def, intl, res, agi) {
    this.profName = profName;
    this.baseStat = [hp, str, def, intl, res, agi];
}

var warrior = new Prof("Warrior", 6, 6, 6, 3, 4, 5);
warrior.desc = "Warriors desc goes here";
warrior.baseCost = 100;

var mage = new Prof("Mage", 5, 5, 5, 5, 5, 5);
mage.desc = "Mage desc goes here";
mage.baseCost = 100;

allProfs = {
    'warrior': warrior,
    'mage': mage,
};

availProfs = {
    'warrior': warrior,
    'mage': mage,
};

function LevelMult (costMult, levelMult, desc) {
    this.costMult = costMult;
    this.levelMult = levelMult;
    this.desc = desc;
}

levelMults = {
    'one': new LevelMult(1, 0, 'one'),
    'low': new LevelMult(3, 0.5, 'low'),
    'norm': new LevelMult(10, 0.75, 'normal'),
    'high': new LevelMult(25, 0.9, 'high'),
};

function StatType (costMult, desc, getBonus) {
    this.costMult = costMult;
    this.desc = desc;
    this.getBonus = getBonus;
}

statTypes = {
    'normal': new StatType(1, 'normal', function () {
        ret = [0, 0, 0, 0, 0, 0];
        for (var i = 0; i < 6; i++) {
            luck = Math.random();
            if (luck > 0.99) {
                ret[i] = 4;
            } else if (luck > 0.95) {
                ret[i] = 3;
            } else if (luck > 0.85) {
                ret[i] = 2;
            } else if (luck > 0.65) {
                ret[i] = 1;
            } else {
                ret[i] = 0;
            }
        }
        return ret;
    }),
    'adept': new StatType(5, 'adept', function () {
        ret = [0, 0, 0, 0, 0, 0];
        for (var i = 0; i < 6; i++) {
            luck = Math.random();
            if (luck > 0.95) {
                ret[i] = 4;
            } else if (luck > 0.85) {
                ret[i] = 3;
            } else if (luck > 0.65) {
                ret[i] = 2;
            } else if (luck > 0.35) {
                ret[i] = 1;
            } else {
                ret[i] = 0;
            }
        }
        return ret;
    }),
    'master': new StatType(20, 'master', function () {
        ret = [0, 0, 0, 0, 0, 0];
        for (var i = 0; i < 6; i++) {
            luck = Math.random();
            if (luck > 0.8) {
                ret[i] = 4;
            } else if (luck > 0.55) {
                ret[i] = 3;
            } else if (luck > 0.2) {
                ret[i] = 2;
            } else if (luck > 0.5) {
                ret[i] = 1;
            } else {
                ret[i] = 0;
            }
        }
        return ret;
    }),
    'retired': new StatType(2, 'retired', function () {
        ret = [0, 0, 0, 0, 0, 0];
        for (var i = 0; i < 6; i++) {
            luck = Math.random();
            if (luck > 0.8) {
                ret[i] = 1;
            } else {
                ret[i] = 0;
            }
        }
        return ret;
    }),
    'strong': new StatType(30, 'strong', function () {
        ret = [0, 0, 0, 0, 0, 0];
        for (var i = 0; i < 6; i++) {
            luck = Math.random();
            if (i == 1 || i == 2) {
                if (luck > 0.6) {
                    ret[i] = 4;
                } else {
                    ret[i] = 3;
                }
                continue;
            }
            ret[i] = Math.floor(luck * 5);
        }
        return ret;
    }),
    'intelligent': new StatType(30, 'intelligent', function () {
        ret = [0, 0, 0, 0, 0, 0];
        for (var i = 0; i < 6; i++) {
            luck = Math.random();
            if (i == 3 || i == 4) {
                if (luck > 0.6) {
                    ret[i] = 4;
                } else {
                    ret[i] = 3;
                }
                continue;
            }
            ret[i] = Math.floor(luck * 5);
        }
        return ret;
    }),
    'agile': new StatType(30, 'aglie', function () {
        ret = [0, 0, 0, 0, 0, 0];
        for (var i = 0; i < 6; i++) {
            luck = Math.random();
            if (i == 0 || i == 5) {
                if (luck > 0.6) {
                    ret[i] = 4;
                } else {
                    ret[i] = 3;
                }
                continue;
            }
            ret[i] = Math.floor(luck * 5);
        }
        return ret;
    }),
    'lawful': new StatType(50, 'lawful', function () {
        ret = [0, 0, 0, 0, 0, 0];
        for (var i = 0; i < 6; i++) {
            luck = Math.random();
            if (i % 2 == 0) {
                if (luck > 0.6) {
                    ret[i] = 4;
                } else {
                    ret[i] = 3;
                }
                continue;
            }
            ret[i] = Math.floor(luck * 5);
        }
        return ret;
    }),
    'chaotic': new StatType(50, 'chaotic', function () {
        ret = [0, 0, 0, 0, 0, 0];
        for (var i = 0; i < 6; i++) {
            luck = Math.random();
            if (i % 2 == 1) {
                if (luck > 0.6) {
                    ret[i] = 4;
                } else {
                    ret[i] = 3;
                }
                continue;
            }
            ret[i] = Math.floor(luck * 5);
        }
        return ret;
    }),
};