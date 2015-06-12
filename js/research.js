var researchPer = 10;

var curResearch = {};
var availResearch = {'rs-build-keep': rsBuildKeep};

function Research (rsName, cost, effect, gameName, desc) {
    this.rsName = rsName;
    this.cost = cost;
    this.progress = 0;
    this.effect = effect;
    this.gameName = gameName;
    this.desc = desc;
}

function showResearch (rsName) {
    availResearch[rsName] = allResearch[rsName];
    var $rsDiv = $("<div>", {id: rsName, class: 'research start'});
    var $rsProgress = $("<progress>", {max: allResearch[rsName].cost, value:0});
    var $rsText = $("<div>", {class: 'research-text'});
    $rsText.html('<b>' + allResearch[rsName].gameName + '</b> ' + allResearch[rsName].desc);
    var $rsTime = $("<div>", {class: 'research-time'});
    $rsTime.html(Math.ceil((allResearch[rsName].cost - allResearch[rsName].progress) / researchPer / 10));
    var $rsCover = $("<div>", {class: 'research-cover'});
    $rsCover.html('START PROJECT');

    $rsDiv.click(function () {
        if ($(this).hasClass('start')) {
            $(this).removeClass('start');
            $(this).addClass('pause');
            $(this).find('.research-cover').html('PAUSE PROJECT');
            curResearch[rsName] = allResearch[rsName];
        } else {
            $(this).removeClass('pause');
            $(this).addClass('start');
            $(this).find('.research-cover').html('RESUME PROJECT');
            delete curResearch[$(this).attr('id')];
            availResearch[rsName] = allResearch[rsName];
        }
    });

    $rsDiv.append($rsProgress);
    $rsDiv.append($rsText);
    $rsDiv.append($rsTime);
    $rsDiv.append($rsCover);
    $('#accordion-3').append($rsDiv);
}

var rsBuildKeep = new Research('rs-build-keep', 300, buildKeepEffect, 'Build Keep', 'first step to taking over the realm is building a sweet castle');
function buildKeepEffect() {
    showResearch('rs-first-miracle');
}

var rsFirstMiracle = new Research('rs-first-miracle', 500, firstMiracleEffect, 'Build Harvest Altar', 'allows you to cast the <span class="bold-blue">Bountiful Sunlight</span> miracle');
function firstMiracleEffect() {
    alert('eyyyee');
}

var allResearch = {
    'rs-build-keep': rsBuildKeep,
    'rs-first-miracle': rsFirstMiracle,
};