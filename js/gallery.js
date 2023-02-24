var menu_items = {};                                                                
jQuery('document').ready(() => {                                                 
    if (!location.href.match(/\/gallery/)) return;                                  
    let dl_items = (data) => {                                                   
        for (let j in data) {                                                    
            let item = data[j];                                                  
            menu_items[item.id] = {                                              
                name: item.name,                                                 
                image: item.image,                                               
                price: item.value,                                               
            };                                                                   
        }                                                                        
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
