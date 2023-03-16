jQuery('document').ready(() => {
    if (!location.href.match(/\/gallery/)) return;
    if (!location.href.match(/mode=dev/)) return;
    let update_desktop_slide = (master_list) => {
        // Constants
        const PAGE_SIZE = 10; // Number of pictures to show per page
        // Variables
        let currentPage = 1; // Current page being shown
        const littlePics = '.product-thumbnail-num img'; // Thumbnail images
        const $prevButton = jQuery('#prev-btn'); // Previous page button
        const $nextButton = jQuery('#next-btn'); // Next page button
        const $viewer = jQuery('.product-preview-pic img') // Picture viewer
            .attr('width', '')
            .attr('height', '')
            .css('height', '600px');
        const info = '.product-preview-info .product-what';
        // Function to update a little-pic element with an image URL
        let updateLittlePic = (index, item) => {
            let num = index + 1;
            if (num < 10) num = '0' + num;
            const $pic = jQuery(littlePics.replace(/num/, num));
            $pic.attr('src', item.image);
            $pic.attr('title', item.name);
            $pic.attr('alt', item.desc);
            let update = () => {
                $viewer.attr('src', item.image);
                jQuery(info.replace(/what/, 'name')).text(item.name);
                jQuery(info.replace(/what/, 'desc')).text(item.desc);
            };
            if (num == '01') update();
            $pic.off('click').on('click', update);
        };
        // Function to update the page controls (prev/next buttons)
        let updatePageControls = () => {
            let prev = (currentPage === 1) ? $prevButton.hide() : $prevButton.show();
            let next = (currentPage >= Math.ceil(master_list.length / PAGE_SIZE)) ? $nextButton.hide() : $nextButton.show();;
        };
        // Function to show the pictures for the current page
        let showCurrentPage = () => {
            const startIndex = (currentPage - 1) * PAGE_SIZE;
            const endIndex = Math.min(startIndex + PAGE_SIZE, master_list.length);
            for (let i = startIndex; i < endIndex; i++) {
                const data = master_list[i];
                updateLittlePic(i % PAGE_SIZE, data);
            }
            updatePageControls();
        };
        // Function to handle when the user clicks the previous page button
        let handlePrevButton = () => {
            if (currentPage > 1) {
                currentPage--;
                showCurrentPage();
            }
        };
        // Function to handle when the user clicks the next page button
        let handleNextButton = () => {
            if (currentPage < Math.ceil(master_list.length / PAGE_SIZE)) {
                currentPage++;
                showCurrentPage();
            }
        };
        // Initialize the page controls and show the first page of pictures
        updatePageControls();
        showCurrentPage();
        // Add event listeners to the page controls
        $prevButton.on('click', handlePrevButton);
        $nextButton.on('click', handleNextButton);
    };

    let update_mobile_slide = (master_list) => {
        let $gallery = jQuery('.fusion-gallery').html('');

        let count = 1;

        for (let i = 0; i < master_list.length; i++) {
            let img = master_list[i].image;
            let title = master_list[i].name;
            let label = 'image-' + i;

            $gallery.append(
                jQuery('<a>').attr('label', label),
                jQuery('<div>').css('padding', '5px').addClass('fusion-grid-column').addClass('fusion-gallery-column').addClass('fusion-gallery-column-3').addClass('hover-type-none').append(
                  jQuery('<div>').addClass('fusion-gallery-image').append(
                    jQuery('<a>').attr('href', '#' + label).attr('rel', 'noreferrer').attr('data-rel', 'iLightbox[gallery_image_2]').addClass('fusion-lightbox').attr('target', '_self').append(
                      jQuery('<img>').attr('loading', 'lazy').attr('src', img).attr('width', '2000').attr('height', '1325').attr('alt', '').attr('title', title).attr('aria-label', '23').addClass('img-responsive').addClass('wp-image-6649').attr('srcset', img + ' 200w, ' + img + ' 400w, ' + img + ' 600w, ' + img + ' 800w, ' + img + ' 1200w, ' + img + ' 2000w').attr('sizes', '(min-width: 2200px) 100vw, (min-width: 824px) 423px, (min-width: 732px) 635px, (min-width: 640px) 732px,')
                    )
                  )
                )
            );

            if ( i == 0 ) {}
            else if ( i == 1 ) {
                $gallery.append(jQuery('<div>').addClass('clearfix'));
            }
            else {
                count++;
                if (count == 3) {
                    count = 1;
                    $gallery.append(jQuery('<div>').addClass('clearfix'));
                }
            }
        }
        jQuery('.fusion-gallery-column').css('display', 'span !important');
    };

    let update_slide = (master_list) => {
        update_desktop_slide(master_list);
        update_mobile_slide(master_list);
    }

    let update_list_of_pics = (master_list) => {
        let $wrapper = [];

        for (let j = 0; j <= 3; j++ ) {
            let $X = jQuery('.list-of-pics .fusion-gallery-image:nth-of-type(' + j + ')');
            let $Y = X.parent();
            $wrapper[j] = $Y.clone();
        }

        let $container = jQuery('.list-of-pics').html('');

        for (let i = 0; i < master_list.length; i++) {
            let item = master_list[i];
            let $picture, separate = false;

            for (let j = 0; j <= 3; j++ ) {
                if (i % j == 0) $picture = $wrapper[j].clone().show();
            }

            if (i == 0) {
                separate = true;
            }
            else if (i == 3) {
                separate = true;
            }
            else if ( i % 3 == 0) {
                separate = true;
            }

            $picture.find('a')
                .attr('href', '#');
            $picture.find('.fusion-masonry-element-container')
                .css('background-image', item.image);
            $picture.find('img')
                .attr('src', item.image)
                .attr('title', item.name)
                .attr('alt', item.desc);
            $container.append($picture);

            if (separate) {
                $container.append('<div class="clearfix">');
            }
        }
    };

    let update_page = (master_list) => {
        update_slide(master_list);
        //update_list_of_pics(master_list);
    };

    let dl_shop = (data) => {
        let shop = JSON.parse(data.result['#__NEXT_DATA__']);
        let menu = shop.props.pageProps.menu;
        let rest_id = shop.props.pageProps.restaurant.id;
        let items = [];
        let total_cats = 0;
        let loaded_cats = 0;
        let dl_items = (data) => {
            for (let j in data) {
                let item = data[j];
                if (item.image) items.push({
                    id: item.id,
                    name: item.name,
                    desc: item.description,
                    image: item.image,
                    price: item.value,
                });
            }
            loaded_cats++;
        };
        for (let i in menu) {
            total_cats++;
            let cat = menu[i];
            let cat_id = cat.id;
            let url = "/wp-admin/dl.php?url=" + escape("https://pay.dines.co.uk/api/dines/api/menu/categories/" + cat_id + "?restaurant_id=" + rest_id + "&with_items=1");
            jQuery.ajax({
                url: url,
                success: dl_items,
            });
        }
        let wait_for_all_cats_loaded = setInterval(() => {
            if (loaded_cats != total_cats) return;
            update_page(items);
            clearInterval(wait_for_all_cats_loaded);
        }, 1);
    };
    jQuery.ajax({
        url: "https://web.scraper.workers.dev/?url=https%3A%2F%2Fpay.dines.co.uk%2Fvenue%2Fnaturally-chinese-restaurant&selector=%23__NEXT_DATA__&scrape=text&spaced=true&pretty=true",
        success: dl_shop,
    });
});
