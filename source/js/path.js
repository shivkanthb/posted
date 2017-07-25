$(function() {
    $('img').each(function() {
        var imgsrc = $(this).attr('src');
        $(this).attr('src',"../" + imgsrc);
    });
});