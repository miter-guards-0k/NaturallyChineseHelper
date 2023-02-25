jQuery('document').ready(() => {
    if (!location.href.match(/\/gallery/)) return;
    let update_page = (master_list) => {
        // Constants
        const PAGE_SIZE = 10; // Number of pictures to show per page
        // Variables
        let currentPage = 1; // Current page being shown
        const littlePics = '.product-thumbnail-num img'; // Thumbnail images
        const $prevButton = jQuery('#prev-btn'); // Previous page button
        const $nextButton = jQuery('#next-btn'); // Next page button
        const $viewer = jQuery('.product-preview-pic img'); // Picture viewer
        // Function to update a little-pic element with an image URL
        let updateLittlePic = (index, imageUrl) => {
            let num = index + 1;
            if ( num < 10 ) num = '0' + num;
            const $pic = jQuery(littlePics.replace(/num/, num));
            $pic.attr('src', imageUrl);
            $pic.off('click').on('click', () => $viewer.attr('src', imageUrl));
        };
        // Function to update the page controls (prev/next buttons)
        let updatePageControls = () => {
            if (currentPage === 1) $prevButton.hide() else $prevButton.show();
            if (currentPage >= Math.ceil(master_list.length / PAGE_SIZE)) $nextButton.hide() else $nextButton.show();;
        };
        // Function to show the pictures for the current page
        let showCurrentPage = () => {
            const startIndex = (currentPage - 1) * PAGE_SIZE;
            const endIndex = Math.min(startIndex + PAGE_SIZE, master_list.length);
            for (let i = startIndex; i < endIndex; i++) {
                const data = master_list[i];
                updateLittlePic(i % PAGE_SIZE, data.image);
            }
            jQuery(littlePic.replace(/num/, '01')).click();
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
    let dl_items = (data) => {
        let items = [];
        for (let j in data) {
            let item = data[j];
            if (item.image) items.push({
                id: item.id,
                name: item.name,
                image: item.image,
                price: item.value,
            });
        }
        update_page(items);
    };
    let dl_shop = (data) => {
        let shop = JSON.parse(data.result['#__NEXT_DATA__']);
        let menu = shop.props.pageProps.menu;
        let rest_id = shop.props.pageProps.restaurant.id;
        for (let i in menu) {
            let cat = menu[i];
            let cat_id = cat.id;
            let url = "https://www.naturallychineserestaurant.co.uk/wp-admin/dl.php?url=" + escape("https://pay.dines.co.uk/api/dines/api/menu/categories/" + cat_id + "?restaurant_id=" + rest_id + "&with_items=1");
            jQuery.ajax({
                url: url,
                success: dl_items,
            });
        }
    };
    jQuery.ajax({
        url: "https://web.scraper.workers.dev/?url=https%3A%2F%2Fpay.dines.co.uk%2Fvenue%2Fnaturally-chinese-restaurant&selector=%23__NEXT_DATA__&scrape=text&spaced=true&pretty=true",
        success: dl_shop,
    });
});
