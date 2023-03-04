jQuery('document').ready(() => {
    if ( location.href.match(/mode=dev/) ) {
        jQuery('.old-gallery').hide();
        jQuery('.new-gallery').show();
    }
    else {
        jQuery('.old-gallery').show();
        jQuery('.new-gallery').hide();
    }
});
