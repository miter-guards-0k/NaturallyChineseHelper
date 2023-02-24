jQuery('document').ready(() => {
    if ( !location.href.match(/mode=dev/) ) jQuery('.new-gallery').hide();
});
