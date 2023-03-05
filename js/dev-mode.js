jQuery('document').ready(() => {
    if ( location.href.match(/mode=dev/) ) {
        jQuery('.old-gallery').hide();
        jQuery('.new-gallery-slider').show();
        jQuery('.new-gallery-pictures').show();
    }
    else {
        jQuery('.old-gallery').show();
        jQuery('.new-gallery-slider').hide();
        jQuery('.new-gallery-pictures').hide();
    }
});
