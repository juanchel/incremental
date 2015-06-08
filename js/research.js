function Research (rsName, cost, effect) {
    this.rsName = rsName;
    this.cost = cost;
    this.progress = 0;
    this.effect = buildKeepEffect;
}

var rsBuildKeep = new Research('rs-build-keep', 300, buildKeepEffect);
function buildKeepEffect() {
    alert('eyy');
}

var curResearch = {};
var availResearch = {'rs-build-keep': rsBuildKeep};
var allResearch = {'rs-build-keep': rsBuildKeep}