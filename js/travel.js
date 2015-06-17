$(document).ready(function() {
    $('.destination').click(function () {
        $('#map-wrapper').scrollTo($(this), 1000, {offset: {left:-305, top:-225}});
        $('#dest-select').animate({
            left: $(this).css('left'),
            top: $(this).css('top')
        }, 1000);
    });
});