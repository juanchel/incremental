eventLines = 0;

function logEvent (msg) {
    eventLines++;
    var $event = $('<div>', {class: 'battle-event'});
    $event.html(msg);
    $('#battle-log').append($event);
    if (eventLines > 500) {
        $('#battle-log .battle-event').slice(0,100).remove();
        eventLines -= 100;
    }
    $('#battle-log').scrollTop($('#battle-log').prop('scrollHeight'));
}