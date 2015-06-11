function Prof (profName, hp, str, def, intl, res, agi) {
    this.profName = profName;
    this.hp = hp;
    this.str = str;
    this.def = def;
    this.intl = intl;
    this.res = res;
    this.agi = agi;
}

var warrior = new Prof("warrior", 25, 6, 6, 3, 4, 5);
warrior.desc = "Warriors desc goes here";

var mage = new Prof("mage", 25, 6, 6, 3, 4, 5);
mage.desc = "Mage desc goes here";

allProfs = {
    'warrior': warrior,
    'mage': mage,
}

availProfs = {
    'warrior': warrior,
    'mage': mage,
}