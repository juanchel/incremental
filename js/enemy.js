function Enemy (enemyName, xp, pic) {
    this.enemyName = enemyName;
    this.xp = xp;
    this.pic = pic;
}

var allEnemies = {}

allEnemies['slime'] = new Enemy('Slime', 10, '');
allEnemies['slime'].stats = [100, 20, 20, 20, 20, 20];