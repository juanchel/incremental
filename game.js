$(document).ready(function () {
    setInterval(takeStep, 100)
});

var gold = 0;

function takeStep() {
    gold = gold + 1;
    $('#current-gold').text(gold);
}