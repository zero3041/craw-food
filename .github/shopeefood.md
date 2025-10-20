Các query theo thứ tự tự.
1. curl 'https://dem.shopee.com/dem/entrance/v1/apps/buyer-web/tags/web-performance/event/json' \
  -H 'accept: application/json' \
  -H 'accept-language: vi' \
  -H 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfbmFtZSI6ImJ1eWVyLXdlYiIsImV4cCI6MTc1NjQ2MDIxMywiaWF0IjoxNzU2NDU4NDEzLCJpc3MiOiJtZGFwIn0.lY3Gtgv2arNC17WUa6Da7tQUZDELegSf-Y6GAqPnyZ8' \
  -H 'content-type: application/json' \
  -H 'origin: https://shopeefood.vn' \
  -H 'priority: u=1, i' \
  -H 'referer: https://shopeefood.vn/' \
  -H 'sec-ch-ua: "Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Linux"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: cross-site' \
  -H 'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36' \
  --data-raw '{"event_timestamp":1756458423348,"app_name":"buyer-web","app_version":"v1.0.0","app_build_id":"v1.0.0","user_id":"","sdk_name":"@mdap/javascript-sdk","sdk_version":"0.3.0","session_id":"a12b95fe-5a16-4ddb-85e5-a0bf0ab85240","tag":"web-performance","os_name":"Linux","os_version":"x86_64","device_id":"2d9ba12374c7bf291bb65233a5a95b05","data":{"browser":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36","browser_name":"Chrome","browser_version":"139.0.0.0","engine_name":"Blink","engine_version":"139.0.0.0","screen_dpr":1,"screen_height":1080,"screen_width":1920,"connection_type":"4g","connection_downlink":10240,"connection_rtt":100,"region":"sg","environment":"live","entries":[{"url":"https://maps.googleapis.com/maps-api-v3/api/js/62/2c/intl/vi_ALL/common.js","start_timestamp":1756458419105,"end_timestamp":1756458419114,"duration":9,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":3,"type":"resource"},{"url":"https://maps.googleapis.com/maps-api-v3/api/js/62/2c/intl/vi_ALL/util.js","start_timestamp":1756458419106,"end_timestamp":1756458419116,"duration":10,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":4,"type":"resource"}]}}'

  res: 

  2. curl 'https://dem.shopee.com/dem/janus/v1/app-auth/login' \
  -H 'accept: */*' \
  -H 'accept-language: vi' \
  -H 'content-type: application/json' \
  -H 'origin: https://shopeefood.vn' \
  -H 'priority: u=1, i' \
  -H 'referer: https://shopeefood.vn/' \
  -H 'sec-ch-ua: "Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Linux"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: cross-site' \
  -H 'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36' \
  --data-raw '{"app_name":"buyer-web","sign":"cdb6086106c02be425685d323f55d65151735eb8bb822a2ae4a569a2d8f5e99f","timestamp":1756458423976}'

  res: {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfbmFtZSI6ImJ1eWVyLXdlYiIsImV4cCI6MTc1NjQ2MDIyMywiaWF0IjoxNzU2NDU4NDIzLCJpc3MiOiJtZGFwIn0.xbdr7AFyrsqz6eatfpvDAJJCmlHNpB-gES2b2ZqwgpU",
    "max_age": 1800
}

3. curl 'https://dem.shopee.com/dem/kose/v1/apps/buyer-web/configs/_fetch' \
  -H 'accept: application/json' \
  -H 'accept-language: vi' \
  -H 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfbmFtZSI6ImJ1eWVyLXdlYiIsImV4cCI6MTc1NjQ2MDIyMywiaWF0IjoxNzU2NDU4NDIzLCJpc3MiOiJtZGFwIn0.xbdr7AFyrsqz6eatfpvDAJJCmlHNpB-gES2b2ZqwgpU' \
  -H 'content-type: application/json' \
  -H 'origin: https://shopeefood.vn' \
  -H 'priority: u=1, i' \
  -H 'referer: https://shopeefood.vn/' \
  -H 'sec-ch-ua: "Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Linux"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: cross-site' \
  -H 'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36' \
  --data-raw '{"tags":["web-performance"],"view":"ALL","sdk_name":"@mdap/javascript-sdk","sdk_version":"0.3.0","os_name":"Linux","os_version":"x86_64","device_id":"2d9ba12374c7bf291bb65233a5a95b05","switch_config_labels":{"app_version":"v1.0.0"},"switch_config_keys":[{"key":"switch_config","checksum":"-1","sample_sub_key":"app_sample","default_sample_rate":1,"is_sampled":true}]}'
  res: {
    "configs": [
        {
            "tag": "web-performance",
            "vip_user": false,
            "switch_config_checksum": {
                "switch_config": "-1"
            },
            "switch_config_extra": {
                "switch_config": {
                    "is_sampled": true
                }
            }
        }
    ],
    "log_config": {
        "secret_key": "",
        "can_upload": true
    },
    "sdk_spec_checksum": "",
    "public_key": "",
    "key_version": "",
    "ntp_t2": 1756458424665,
    "ntp_t3": 1756458424665
}
4. curl 'https://gappapi.deliverynow.vn/api/delivery/get_detail?id_type=1&request_id=1239327' \
  -H '22e21d5d: Xj#4C*4+@opQg-I"1kkmf4Lf$' \
  -H $'2787ad5b: =[<Rb-J<"S]%L]=&\\2H$rIM1a*YFWVU\'Se`ICmb&00Z%-YjlHgAX0^F18erJe8$t(e,)T&,93]\\_\\P"O-fP5bdnX$_@r(-d%CHX;5p+Ga2)VkS=b<[k\u0021K8WI0,n0EY>,#)/gA\'f\u0021;:nkR)D(F=R@`n\\2-g:\u0021A/=C9eQ;IFOZE*m[u-Zg2M"Hg[K-\\L#flHGb@CpDTpa]_]s8NZg06;' \
  -H $'7e0fd885: Ft\'(Q4\u0021K=LfMpsI.nn?5Q\u0021;,8' \
  -H 'accept: application/json, text/plain, */*' \
  -H 'accept-language: vi' \
  -H 'origin: https://shopeefood.vn' \
  -H 'priority: u=1, i' \
  -H 'referer: https://shopeefood.vn/' \
  -H 'sec-ch-ua: "Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Linux"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: cross-site' \
  -H 'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36' \
  -H 'x-foody-access-token;' \
  -H 'x-foody-api-version: 1' \
  -H 'x-foody-app-type: 1004' \
  -H 'x-foody-client-id;' \
  -H 'x-foody-client-language: vi' \
  -H 'x-foody-client-type: 1' \
  -H 'x-foody-client-version: 3.0.0' \
  -H 'x-sap-ri: b96db168d7e650880e061f3f3bb43e4a5cfb31c6cd61ebd1'
  res: {
    "reply": {
        "delivery_detail": {
            "total_order": 0,
            "rating": {
                "total_review": 500,
                "avg": 4.8,
                "display_total_review": "500+",
                "app_link": "foody://foody.vn?action=reviewlist&id=1239327"
            },
            "is_subscribe": false,
            "is_favorite": false,
            "city_id": 218,
            "phones": [
                "0387401651"
            ],
            "restaurant_id": 1239327,
            "is_now_delivery": true,
            "restaurant_url": "linh-chi-banh-trang-tron-nguyen-khang",
            "logo_mms_img_id": "vn-11134513-7ras8-makzteeax8ewa0",
            "brand_id": 19958,
            "video": null,
            "asap_is_available": true,
            "contract_type": 1,
            "id": 383980,
            "location_url": "ha-noi",
            "is_quality_merchant": true,
            "banner_mms_img_id": "vn-11134259-7ra0g-m66bot5tulywce",
            "is_city_alert": false,
            "categories": [
                "Quán ăn"
            ],
            "cuisines": [],
            "service_type": 1,
            "price_slash_discounts": [],
            "delivery_fees": [],
            "vat": null,
            "confirm_language": null,
            "is_in_category_whitelist": false,
            "brand": {
                "brand_id": 19958,
                "brand_url": "linh-chi-banh-trang-tron",
                "name": "Linh Chi - Bánh Tráng Trộn",
                "restaurant_count": 2
            },
            "limit_distance": 15000,
            "delivery_categories": [
                2394,
                2580,
                2399
            ],
            "user_favorite_count": 0,
            "is_display_cutlery": true,
            "confirm_methods": {},
            "address": "83B Nguyễn Khang, P. Yên Hòa, Cầu Giấy, Hà Nội",
            "price_range": {
                "min_price": 0,
                "max_price": 0
            },
            "foody_service_id": 1,
            "min_order_value": {
                "text": "20.000đ",
                "value": 20000,
                "unit": "đ"
            },
            "root_category_ids": [
                2410,
                2411,
                2387
            ],
            "campaigns": [],
            "name": "Linh Chi - Bánh Tráng Trộn - Nguyễn Khang",
            "url": "https://shopeefood.vn/ha-noi/linh-chi-banh-trang-tron-nguyen-khang",
            "display_order": 0,
            "delivery_id": 383980,
            "district_id": 21,
            "is_pickup": false,
            "supporting_document_urls": {},
            "short_description": null,
            "url_rewrite_name": "linh-chi-banh-trang-tron-nguyen-khang",
            "parent_category_id": 2387,
            "position": {
                "latitude": 21.01820965,
                "is_verified": false,
                "longitude": 105.80203467
            },
            "name_en": "",
        }
    },
    "result": "success"
}

5. curl 'https://dem.shopee.com/dem/entrance/v1/apps/buyer-web/tags/web-performance/event/json' \
  -H 'accept: application/json' \
  -H 'accept-language: vi' \
  -H 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfbmFtZSI6ImJ1eWVyLXdlYiIsImV4cCI6MTc1NjQ2MDIyMywiaWF0IjoxNzU2NDU4NDIzLCJpc3MiOiJtZGFwIn0.xbdr7AFyrsqz6eatfpvDAJJCmlHNpB-gES2b2ZqwgpU' \
  -H 'content-type: application/json' \
  -H 'origin: https://shopeefood.vn' \
  -H 'priority: u=1, i' \
  -H 'referer: https://shopeefood.vn/' \
  -H 'sec-ch-ua: "Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Linux"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: cross-site' \
  -H 'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36' \
  --data-raw $'{"event_timestamp":1756458423432,"app_name":"buyer-web","app_version":"v1.0.0","app_build_id":"v1.0.0","user_id":"","sdk_name":"@mdap/javascript-sdk","sdk_version":"0.3.0","session_id":"19807a42-6982-4c58-a72f-a647727b5e0f","tag":"web-performance","os_name":"Linux","os_version":"x86_64","device_id":"2d9ba12374c7bf291bb65233a5a95b05","data":{"browser":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36","browser_name":"Chrome","browser_version":"139.0.0.0","engine_name":"Blink","engine_version":"139.0.0.0","screen_dpr":1,"screen_height":1080,"screen_width":1920,"connection_type":"4g","connection_downlink":10240,"connection_rtt":100,"region":"sg","environment":"live","page_performance":{"duration":1202,"page_url":"https://shopeefood.vn/now-food/shop/1239327","navigation_type":"reload","referer":"","start_time":0,"redirect_count":0,"redirect_start":0,"redirect_end":0,"fetch_start":1,"secure_connection_start":1,"domain_lookup_start":1,"domain_lookup_end":1,"connect_start":1,"connect_end":1,"request_start":3,"response_start":52,"response_end":57,"unload_event_start":63,"unload_event_end":63,"dom_interactive":248,"dom_content_loaded_event_start":549,"dom_content_loaded_event_end":550,"dom_complete":1201,"load_event_start":1201,"load_event_end":1202,"worker_start":0,"first_paint_start":216,"first_contentful_paint_start":-1,"offline_bundle":false},"entries":[{"url":"https://s3.prod.now.vn/resources/shopee_font/font.css","start_timestamp":1756458423500,"end_timestamp":1756458423621,"duration":121,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"css","resource_cache_type":"cache","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":189,"type":"resource"},{"url":"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.2.0/css/all.min.css","start_timestamp":1756458423500,"end_timestamp":1756458423536,"duration":35,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"css","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":6,"type":"resource"},{"url":"https://fonts.googleapis.com/css?family=Noto+Sans:400,400i,700,700i&subset=vietnamese","start_timestamp":1756458423500,"end_timestamp":1756458423500,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"css","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://shopeefood.vn/assets/css/app-16ab1f2c96eab453e35b.css","start_timestamp":1756458423501,"end_timestamp":1756458423501,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"css","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://www.google.com/recaptcha/api.js","start_timestamp":1756458423501,"end_timestamp":1756458423501,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"cache","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":69,"type":"resource"},{"url":"https://apis.google.com/js/platform.js","start_timestamp":1756458423501,"end_timestamp":1756458423501,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js","start_timestamp":1756458423501,"end_timestamp":1756458423501,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://deo.shopeemobile.com/shopee/shopee-trackingsdk-live-sg/index.js","start_timestamp":1756458423501,"end_timestamp":1756458423501,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://shopeefood.vn/app/assets/js/vendor-44af7fe3567cabf1519c.js","start_timestamp":1756458423501,"end_timestamp":1756458423501,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://shopeefood.vn/app/assets/js/app-a9f72c1728627334a3d5.js","start_timestamp":1756458423501,"end_timestamp":1756458423501,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://www.gstatic.com/recaptcha/releases/_mscDd1KHr60EWWbt2I_ULP0/recaptcha__vi.js","start_timestamp":1756458423622,"end_timestamp":1756458423627,"duration":5,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":4,"type":"resource"},{"url":"https://www.googletagmanager.com/gtm.js?id=GTM-KZSQTX3","start_timestamp":1756458423628,"end_timestamp":1756458423629,"duration":2,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"cache","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":198,"type":"resource"},{"url":"https://deo.shopeemobile.com/shopee/shopee-trackingsdk-live-sg/@shopee/tracking-loader@1.1.19.min.js","start_timestamp":1756458423977,"end_timestamp":1756458423977,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://www.google-analytics.com/analytics.js","start_timestamp":1756458423985,"end_timestamp":1756458423985,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"cache","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":553,"type":"resource"},{"url":"https://content.garena.com/shopee/track_config/split_by_market_config.json","start_timestamp":1756458423987,"end_timestamp":1756458424001,"duration":13,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":2,"type":"resource"},{"url":"https://www.google-analytics.com/plugins/ua/linkid.js","start_timestamp":1756458424560,"end_timestamp":1756458424560,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"cache","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":1128,"type":"resource"},{"url":"https://deo.shopeemobile.com/shopee/shopee-trackingsdk-live-sg/require-trackingsdk.js","start_timestamp":1756458424615,"end_timestamp":1756458424615,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://deo.shopeemobile.com/shopee/shopee-trackingsdk-live-sg/amd/@shopee/tracking-ubt@8f9af71.min.js","start_timestamp":1756458424640,"end_timestamp":1756458424640,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://deo.shopeemobile.com/shopee/shopee-trackingsdk-live-sg/amd/@shopee/tracking-core@8f9af71.min.js","start_timestamp":1756458424643,"end_timestamp":1756458424643,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://shopeefood.vn/favicon.ico","start_timestamp":1756458424644,"end_timestamp":1756458424664,"duration":20,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":2,"type":"resource"},{"url":"https://shopeefood.vn/app/assets/img/shopeefoodvn.png?4aa1a38e8da801f4029b80734905f3f7","start_timestamp":1756458424666,"end_timestamp":1756458424666,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://www.googletagmanager.com/gtag/js?id=G-S9ZZW5XN80&cx=c&_slc=1","start_timestamp":1756458424694,"end_timestamp":1756458424694,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"cache","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":1262,"type":"resource"},{"url":"https://shopeefood.vn/app/assets/img/img-new-app.png?2aafe2fa0d470c0d2fadada01c56a448","start_timestamp":1756458425214,"end_timestamp":1756458425214,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://shopeefood.vn/app/assets/img/Logo-ShopeefoodVN.png?a233b36c37415f85f46c25a6cd0963aa","start_timestamp":1756458425238,"end_timestamp":1756458425238,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://shopeefood.vn/app/assets/img/gov_seals1.jpg?4534b28245a7aad9805fbddc90f873d8","start_timestamp":1756458425238,"end_timestamp":1756458425238,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://connect.facebook.net/en_US/sdk.js","start_timestamp":1756458425240,"end_timestamp":1756458425243,"duration":2,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":1,"type":"resource"},{"url":"https://connect.facebook.net/en_US/fbevents.js","start_timestamp":1756458425249,"end_timestamp":1756458425259,"duration":9,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":7,"type":"resource"},{"url":"https://maps.googleapis.com/maps/api/js?key=AIzaSyAGbWF1KQ43PItIxxTtyigHnPuqwNh71O8&v=3.exp&libraries=geometry,drawing,places&language=vi&region=vn","start_timestamp":1756458425250,"end_timestamp":1756458425262,"duration":13,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":4,"type":"resource"},{"url":"https://connect.facebook.net/en_US/sdk.js?hash=43e8b32a993bf7e3e42b7521ca84c7c0","start_timestamp":1756458425264,"end_timestamp":1756458425266,"duration":2,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":1,"type":"resource"},{"url":"https://connect.facebook.net/signals/config/1288439581308150?v=2.9.227&r=stable&domain=shopeefood.vn&hme=98a01a771f1571b63142a5ab6b1965d297e9ee4aa2fec3ece59f72d8c5b28e26&ex_m=86%2C148%2C128%2C19%2C121%2C60%2C41%2C122%2C67%2C59%2C135%2C75%2C13%2C85%2C27%2C116%2C107%2C65%2C68%2C115%2C132%2C94%2C137%2C7%2C3%2C4%2C6%2C5%2C2%2C76%2C84%2C138%2C212%2C160%2C54%2C217%2C214%2C215%2C47%2C175%2C26%2C64%2C221%2C220%2C163%2C29%2C53%2C8%2C56%2C80%2C81%2C82%2C87%2C111%2C28%2C25%2C114%2C110%2C109%2C129%2C66%2C131%2C130%2C43%2C112%2C52%2C104%2C12%2C134%2C38%2C203%2C205%2C170%2C22%2C23%2C24%2C16%2C17%2C37%2C34%2C35%2C71%2C77%2C79%2C92%2C120%2C123%2C39%2C93%2C20%2C18%2C98%2C61%2C32%2C125%2C124%2C126%2C117%2C21%2C31%2C51%2C91%2C133%2C62%2C15%2C30%2C185%2C156%2C262%2C201%2C146%2C188%2C181%2C89%2C113%2C70%2C102%2C46%2C40%2C100%2C101%2C106%2C50%2C14%2C108%2C99%2C57%2C42%2C95%2C45%2C48%2C0%2C83%2C136%2C1%2C105%2C11%2C103%2C9%2C49%2C78%2C55%2C127%2C58%2C97%2C74%2C73%2C44%2C118%2C72%2C69%2C63%2C96%2C88%2C36%2C119%2C33%2C90%2C10%2C139","start_timestamp":1756458425302,"end_timestamp":1756458425305,"duration":3,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":1,"type":"resource"},{"url":"https://jsonip.com/?callback=jQuery3310760301519114266_1756458423926&_=1756458423927","start_timestamp":1756458425166,"end_timestamp":1756458425394,"duration":228,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"cache","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":1962,"type":"resource"},{"url":"https://shopeefood.vn/app/assets/img/deliverySorry.png?a9b29013e956fbf5c8a6eca2bb8b9651","start_timestamp":1756458425379,"end_timestamp":1756458425379,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://down-bs-vn.img.susercontent.com/vn-11134259-7ra0g-m66bot5tulywce@resize_ss640x400\u0021@crop_w640_h400_cT","start_timestamp":1756458425422,"end_timestamp":1756458425422,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://www.facebook.com/tr/?id=1288439581308150&ev=PageView&dl=https%3A%2F%2Fshopeefood.vn%2Fnow-food%2Fshop%2F1239327%3F&rl=&if=false&ts=1756458425415&sw=1920&sh=1080&v=2.9.227&r=stable&ec=0&o=4126&fbp=fb.1.1755749340233.664848384216464257&cs_est=true&ler=empty&pmd[title]=Order%20%C4%90%E1%BB%93%20%C4%83n%20in%20H%C3%A0%20N%E1%BB%99i%20%26%20Delivery%20Service%20%7C%20Food%20Delivery%20%26%20Shipping%20Service%20%7C%20ShopeeFood.vn&plt=549.5&it=1756458425300&coo=false&cdl=&exp=s1&expv2%5B%5D=pl0&expv2%5B%5D=el0&expv2%5B%5D=bc1&rqm=GET","start_timestamp":1756458425419,"end_timestamp":1756458425458,"duration":39,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"cache","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":2026,"type":"resource"},{"url":"https://www.facebook.com/tr/?id=1288439581308150&ev=ViewContent&dl=https%3A%2F%2Fshopeefood.vn%2Fnow-food%2Fshop%2F1239327%3F&rl=&if=false&ts=1756458425416&cd[content_ids]=%5B%22383980%22%5D&cd[content_type]=product&sw=1920&sh=1080&v=2.9.227&r=stable&ec=1&o=4126&fbp=fb.1.1755749340233.664848384216464257&ler=empty&plt=549.5&it=1756458425300&coo=false&cdl=&exp=s1&expv2%5B%5D=pl0&expv2%5B%5D=el1&expv2%5B%5D=bc1&rqm=GET","start_timestamp":1756458425419,"end_timestamp":1756458425461,"duration":41,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"cache","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":2029,"type":"resource"},{"url":"https://shopeefood.vn/727e67f2da54ca40fd3c.worker.js","start_timestamp":1756458425518,"end_timestamp":1756458425515,"duration":-3,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://shopeefood.vn/now-food/shop/1239327?","http_method":"GET","start_timestamp":1756458425686,"end_timestamp":1756458425686,"duration":1,"page_url":"https://shopeefood.vn/now-food/shop/1239327","logic_status_code":0,"http_status_code":400,"resource_type":"image","type":"resource"},{"url":"https://www.facebook.com/privacy_sandbox/pixel/register/trigger/?id=1288439581308150&ev=PageView&dl=https%3A%2F%2Fshopeefood.vn%2Fnow-food%2Fshop%2F1239327%3F&rl=&if=false&ts=1756458425415&sw=1920&sh=1080&v=2.9.227&r=stable&ec=0&o=4126&fbp=fb.1.1755749340233.664848384216464257&cs_est=true&ler=empty&pmd[title]=Order%20%C4%90%E1%BB%93%20%C4%83n%20in%20H%C3%A0%20N%E1%BB%99i%20%26%20Delivery%20Service%20%7C%20Food%20Delivery%20%26%20Shipping%20Service%20%7C%20ShopeeFood.vn&plt=549.5&it=1756458425300&coo=false&cdl=&exp=s1&expv2%5B%5D=pl0&expv2%5B%5D=el0&expv2%5B%5D=bc1&rqm=FGET","start_timestamp":1756458425419,"end_timestamp":1756458425651,"duration":232,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"cache","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":2219,"type":"resource"},{"url":"https://www.facebook.com/privacy_sandbox/pixel/register/trigger/?id=1288439581308150&ev=ViewContent&dl=https%3A%2F%2Fshopeefood.vn%2Fnow-food%2Fshop%2F1239327%3F&rl=&if=false&ts=1756458425416&cd[content_ids]=%5B%22383980%22%5D&cd[content_type]=product&sw=1920&sh=1080&v=2.9.227&r=stable&ec=1&o=4126&fbp=fb.1.1755749340233.664848384216464257&ler=empty&plt=549.5&it=1756458425300&coo=false&cdl=&exp=s1&expv2%5B%5D=pl0&expv2%5B%5D=el1&expv2%5B%5D=bc1&rqm=FGET","start_timestamp":1756458425419,"end_timestamp":1756458425654,"duration":234,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"cache","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":2222,"type":"resource"},{"url":"https://mms.img.susercontent.com/vn-11134513-7r98o-ltm6j1v3kah653","start_timestamp":1756458425524,"end_timestamp":1756458425524,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://down-bs-vn.img.susercontent.com/vn-11134517-7ra0g-m66caqdcxry0bc","start_timestamp":1756458425530,"end_timestamp":1756458425530,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://down-bs-vn.img.susercontent.com/vn-11134517-7ra0g-m66c9f5c1jib8b","start_timestamp":1756458425533,"end_timestamp":1756458425533,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://down-bs-vn.img.susercontent.com/vn-11134517-7ra0g-m66cc42q792w11","start_timestamp":1756458425537,"end_timestamp":1756458425537,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://down-bs-vn.img.susercontent.com/vn-11134517-7ra0g-m66cb6xmp6v722","start_timestamp":1756458425540,"end_timestamp":1756458425540,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://down-bs-vn.img.susercontent.com/vn-11134517-7ra0g-m66cafc137w819","start_timestamp":1756458425544,"end_timestamp":1756458425544,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://down-bs-vn.img.susercontent.com/vn-11134517-7ra0g-m66cbklkpaf7f4","start_timestamp":1756458425547,"end_timestamp":1756458425547,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://down-bs-vn.img.susercontent.com/vn-11134517-7ra0g-m66ccx9rh4xi51","start_timestamp":1756458425550,"end_timestamp":1756458425550,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://down-bs-vn.img.susercontent.com/vn-11134517-7ra0g-m66cejx9n7ee48","start_timestamp":1756458425554,"end_timestamp":1756458425554,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://down-bs-vn.img.susercontent.com/vn-11134517-7ra0g-m66cfmwolh6e36","start_timestamp":1756458425557,"end_timestamp":1756458425557,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://down-bs-vn.img.susercontent.com/vn-11134517-7ra0g-m66cgfs2cipkb6","start_timestamp":1756458425560,"end_timestamp":1756458425560,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://down-bs-vn.img.susercontent.com/vn-11134517-7ra0g-m66ck3rn75q00b","start_timestamp":1756458425563,"end_timestamp":1756458425563,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://down-bs-vn.img.susercontent.com/vn-11134517-7ra0g-m66cgoaxve4617","start_timestamp":1756458425566,"end_timestamp":1756458425566,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://down-bs-vn.img.susercontent.com/vn-11134517-7ra0g-m66chxq1eoc890","start_timestamp":1756458425674,"end_timestamp":1756458425677,"duration":4,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":2,"type":"resource"},{"url":"https://down-bs-vn.img.susercontent.com/vn-11134517-7ra0g-m66ci8ffqoebb9","start_timestamp":1756458425674,"end_timestamp":1756458425678,"duration":5,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":3,"type":"resource"},{"url":"https://down-bs-vn.img.susercontent.com/vn-11134517-7ra0g-m66cj5j5aq1j4d","start_timestamp":1756458425674,"end_timestamp":1756458425679,"duration":5,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":3,"type":"resource"},{"url":"https://down-bs-vn.img.susercontent.com/vn-11134517-7ra0g-m66ciihj0sub25","start_timestamp":1756458425674,"end_timestamp":1756458425679,"duration":6,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":2,"type":"resource"},{"url":"https://down-bs-vn.img.susercontent.com/vn-11134517-7ra0g-m66ciw5h0wxk84","start_timestamp":1756458425674,"end_timestamp":1756458425680,"duration":6,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":2,"type":"resource"},{"url":"https://down-bs-vn.img.susercontent.com/vn-11134517-7ra0g-m66xub9w2puf04","start_timestamp":1756458425674,"end_timestamp":1756458425682,"duration":9,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":3,"type":"resource"},{"url":"https://down-bs-vn.img.susercontent.com/vn-11134517-7ra0g-m66ckexouta09d","start_timestamp":1756458425674,"end_timestamp":1756458425683,"duration":9,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":3,"type":"resource"},{"url":"https://down-bs-vn.img.susercontent.com/vn-11134517-7ra0g-m66cjutsa5rs87","start_timestamp":1756458425674,"end_timestamp":1756458425683,"duration":9,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":3,"type":"resource"},{"url":"https://down-bs-vn.img.susercontent.com/vn-11134517-7ra0g-m66ckrcep1snd9","start_timestamp":1756458425674,"end_timestamp":1756458425683,"duration":9,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":2,"type":"resource"}],"api_performances":[{"url":"https://content.garena.com/shopee/track_config/split_by_market_config.json","page_url":"https://shopeefood.vn/now-food/shop/1239327","start_time":556,"duration":13,"connect_start":556,"connect_end":556,"domain_lookup_start":556,"domain_lookup_end":556,"redirect_start":0,"redirect_end":0,"request_start":567,"response_start":567,"response_end":569,"worker_start":0,"fetch_start":556,"secure_connection_start":556}]}}'
  res: curl 'https://dem.shopee.com/dem/entrance/v1/apps/buyer-web/tags/web-performance/event/json' \
  -H 'accept: application/json' \
  -H 'accept-language: vi' \
  -H 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfbmFtZSI6ImJ1eWVyLXdlYiIsImV4cCI6MTc1NjQ2MDIyMywiaWF0IjoxNzU2NDU4NDIzLCJpc3MiOiJtZGFwIn0.xbdr7AFyrsqz6eatfpvDAJJCmlHNpB-gES2b2ZqwgpU' \
  -H 'content-type: application/json' \
  -H 'origin: https://shopeefood.vn' \
  -H 'priority: u=1, i' \
  -H 'referer: https://shopeefood.vn/' \
  -H 'sec-ch-ua: "Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Linux"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: cross-site' \
  -H 'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36' \
  --data-raw $'{"event_timestamp":1756458423432,"app_name":"buyer-web","app_version":"v1.0.0","app_build_id":"v1.0.0","user_id":"","sdk_name":"@mdap/javascript-sdk","sdk_version":"0.3.0","session_id":"19807a42-6982-4c58-a72f-a647727b5e0f","tag":"web-performance","os_name":"Linux","os_version":"x86_64","device_id":"2d9ba12374c7bf291bb65233a5a95b05","data":{"browser":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36","browser_name":"Chrome","browser_version":"139.0.0.0","engine_name":"Blink","engine_version":"139.0.0.0","screen_dpr":1,"screen_height":1080,"screen_width":1920,"connection_type":"4g","connection_downlink":10240,"connection_rtt":100,"region":"sg","environment":"live","page_performance":{"duration":1202,"page_url":"https://shopeefood.vn/now-food/shop/1239327","navigation_type":"reload","referer":"","start_time":0,"redirect_count":0,"redirect_start":0,"redirect_end":0,"fetch_start":1,"secure_connection_start":1,"domain_lookup_start":1,"domain_lookup_end":1,"connect_start":1,"connect_end":1,"request_start":3,"response_start":52,"response_end":57,"unload_event_start":63,"unload_event_end":63,"dom_interactive":248,"dom_content_loaded_event_start":549,"dom_content_loaded_event_end":550,"dom_complete":1201,"load_event_start":1201,"load_event_end":1202,"worker_start":0,"first_paint_start":216,"first_contentful_paint_start":-1,"offline_bundle":false},"entries":[{"url":"https://s3.prod.now.vn/resources/shopee_font/font.css","start_timestamp":1756458423500,"end_timestamp":1756458423621,"duration":121,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"css","resource_cache_type":"cache","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":189,"type":"resource"},{"url":"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.2.0/css/all.min.css","start_timestamp":1756458423500,"end_timestamp":1756458423536,"duration":35,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"css","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":6,"type":"resource"},{"url":"https://fonts.googleapis.com/css?family=Noto+Sans:400,400i,700,700i&subset=vietnamese","start_timestamp":1756458423500,"end_timestamp":1756458423500,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"css","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://shopeefood.vn/assets/css/app-16ab1f2c96eab453e35b.css","start_timestamp":1756458423501,"end_timestamp":1756458423501,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"css","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://www.google.com/recaptcha/api.js","start_timestamp":1756458423501,"end_timestamp":1756458423501,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"cache","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":69,"type":"resource"},{"url":"https://apis.google.com/js/platform.js","start_timestamp":1756458423501,"end_timestamp":1756458423501,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js","start_timestamp":1756458423501,"end_timestamp":1756458423501,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://deo.shopeemobile.com/shopee/shopee-trackingsdk-live-sg/index.js","start_timestamp":1756458423501,"end_timestamp":1756458423501,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://shopeefood.vn/app/assets/js/vendor-44af7fe3567cabf1519c.js","start_timestamp":1756458423501,"end_timestamp":1756458423501,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://shopeefood.vn/app/assets/js/app-a9f72c1728627334a3d5.js","start_timestamp":1756458423501,"end_timestamp":1756458423501,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://www.gstatic.com/recaptcha/releases/_mscDd1KHr60EWWbt2I_ULP0/recaptcha__vi.js","start_timestamp":1756458423622,"end_timestamp":1756458423627,"duration":5,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":4,"type":"resource"},{"url":"https://www.googletagmanager.com/gtm.js?id=GTM-KZSQTX3","start_timestamp":1756458423628,"end_timestamp":1756458423629,"duration":2,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"cache","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":198,"type":"resource"},{"url":"https://deo.shopeemobile.com/shopee/shopee-trackingsdk-live-sg/@shopee/tracking-loader@1.1.19.min.js","start_timestamp":1756458423977,"end_timestamp":1756458423977,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://www.google-analytics.com/analytics.js","start_timestamp":1756458423985,"end_timestamp":1756458423985,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"cache","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":553,"type":"resource"},{"url":"https://content.garena.com/shopee/track_config/split_by_market_config.json","start_timestamp":1756458423987,"end_timestamp":1756458424001,"duration":13,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":2,"type":"resource"},{"url":"https://www.google-analytics.com/plugins/ua/linkid.js","start_timestamp":1756458424560,"end_timestamp":1756458424560,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"cache","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":1128,"type":"resource"},{"url":"https://deo.shopeemobile.com/shopee/shopee-trackingsdk-live-sg/require-trackingsdk.js","start_timestamp":1756458424615,"end_timestamp":1756458424615,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://deo.shopeemobile.com/shopee/shopee-trackingsdk-live-sg/amd/@shopee/tracking-ubt@8f9af71.min.js","start_timestamp":1756458424640,"end_timestamp":1756458424640,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://deo.shopeemobile.com/shopee/shopee-trackingsdk-live-sg/amd/@shopee/tracking-core@8f9af71.min.js","start_timestamp":1756458424643,"end_timestamp":1756458424643,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://shopeefood.vn/favicon.ico","start_timestamp":1756458424644,"end_timestamp":1756458424664,"duration":20,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":2,"type":"resource"},{"url":"https://shopeefood.vn/app/assets/img/shopeefoodvn.png?4aa1a38e8da801f4029b80734905f3f7","start_timestamp":1756458424666,"end_timestamp":1756458424666,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://www.googletagmanager.com/gtag/js?id=G-S9ZZW5XN80&cx=c&_slc=1","start_timestamp":1756458424694,"end_timestamp":1756458424694,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"cache","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":1262,"type":"resource"},{"url":"https://shopeefood.vn/app/assets/img/img-new-app.png?2aafe2fa0d470c0d2fadada01c56a448","start_timestamp":1756458425214,"end_timestamp":1756458425214,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://shopeefood.vn/app/assets/img/Logo-ShopeefoodVN.png?a233b36c37415f85f46c25a6cd0963aa","start_timestamp":1756458425238,"end_timestamp":1756458425238,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://shopeefood.vn/app/assets/img/gov_seals1.jpg?4534b28245a7aad9805fbddc90f873d8","start_timestamp":1756458425238,"end_timestamp":1756458425238,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://connect.facebook.net/en_US/sdk.js","start_timestamp":1756458425240,"end_timestamp":1756458425243,"duration":2,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":1,"type":"resource"},{"url":"https://connect.facebook.net/en_US/fbevents.js","start_timestamp":1756458425249,"end_timestamp":1756458425259,"duration":9,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":7,"type":"resource"},{"url":"https://maps.googleapis.com/maps/api/js?key=AIzaSyAGbWF1KQ43PItIxxTtyigHnPuqwNh71O8&v=3.exp&libraries=geometry,drawing,places&language=vi&region=vn","start_timestamp":1756458425250,"end_timestamp":1756458425262,"duration":13,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":4,"type":"resource"},{"url":"https://connect.facebook.net/en_US/sdk.js?hash=43e8b32a993bf7e3e42b7521ca84c7c0","start_timestamp":1756458425264,"end_timestamp":1756458425266,"duration":2,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":1,"type":"resource"},{"url":"https://connect.facebook.net/signals/config/1288439581308150?v=2.9.227&r=stable&domain=shopeefood.vn&hme=98a01a771f1571b63142a5ab6b1965d297e9ee4aa2fec3ece59f72d8c5b28e26&ex_m=86%2C148%2C128%2C19%2C121%2C60%2C41%2C122%2C67%2C59%2C135%2C75%2C13%2C85%2C27%2C116%2C107%2C65%2C68%2C115%2C132%2C94%2C137%2C7%2C3%2C4%2C6%2C5%2C2%2C76%2C84%2C138%2C212%2C160%2C54%2C217%2C214%2C215%2C47%2C175%2C26%2C64%2C221%2C220%2C163%2C29%2C53%2C8%2C56%2C80%2C81%2C82%2C87%2C111%2C28%2C25%2C114%2C110%2C109%2C129%2C66%2C131%2C130%2C43%2C112%2C52%2C104%2C12%2C134%2C38%2C203%2C205%2C170%2C22%2C23%2C24%2C16%2C17%2C37%2C34%2C35%2C71%2C77%2C79%2C92%2C120%2C123%2C39%2C93%2C20%2C18%2C98%2C61%2C32%2C125%2C124%2C126%2C117%2C21%2C31%2C51%2C91%2C133%2C62%2C15%2C30%2C185%2C156%2C262%2C201%2C146%2C188%2C181%2C89%2C113%2C70%2C102%2C46%2C40%2C100%2C101%2C106%2C50%2C14%2C108%2C99%2C57%2C42%2C95%2C45%2C48%2C0%2C83%2C136%2C1%2C105%2C11%2C103%2C9%2C49%2C78%2C55%2C127%2C58%2C97%2C74%2C73%2C44%2C118%2C72%2C69%2C63%2C96%2C88%2C36%2C119%2C33%2C90%2C10%2C139","start_timestamp":1756458425302,"end_timestamp":1756458425305,"duration":3,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":1,"type":"resource"},{"url":"https://jsonip.com/?callback=jQuery3310760301519114266_1756458423926&_=1756458423927","start_timestamp":1756458425166,"end_timestamp":1756458425394,"duration":228,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"cache","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":1962,"type":"resource"},{"url":"https://shopeefood.vn/app/assets/img/deliverySorry.png?a9b29013e956fbf5c8a6eca2bb8b9651","start_timestamp":1756458425379,"end_timestamp":1756458425379,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://down-bs-vn.img.susercontent.com/vn-11134259-7ra0g-m66bot5tulywce@resize_ss640x400\u0021@crop_w640_h400_cT","start_timestamp":1756458425422,"end_timestamp":1756458425422,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://www.facebook.com/tr/?id=1288439581308150&ev=PageView&dl=https%3A%2F%2Fshopeefood.vn%2Fnow-food%2Fshop%2F1239327%3F&rl=&if=false&ts=1756458425415&sw=1920&sh=1080&v=2.9.227&r=stable&ec=0&o=4126&fbp=fb.1.1755749340233.664848384216464257&cs_est=true&ler=empty&pmd[title]=Order%20%C4%90%E1%BB%93%20%C4%83n%20in%20H%C3%A0%20N%E1%BB%99i%20%26%20Delivery%20Service%20%7C%20Food%20Delivery%20%26%20Shipping%20Service%20%7C%20ShopeeFood.vn&plt=549.5&it=1756458425300&coo=false&cdl=&exp=s1&expv2%5B%5D=pl0&expv2%5B%5D=el0&expv2%5B%5D=bc1&rqm=GET","start_timestamp":1756458425419,"end_timestamp":1756458425458,"duration":39,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"cache","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":2026,"type":"resource"},{"url":"https://www.facebook.com/tr/?id=1288439581308150&ev=ViewContent&dl=https%3A%2F%2Fshopeefood.vn%2Fnow-food%2Fshop%2F1239327%3F&rl=&if=false&ts=1756458425416&cd[content_ids]=%5B%22383980%22%5D&cd[content_type]=product&sw=1920&sh=1080&v=2.9.227&r=stable&ec=1&o=4126&fbp=fb.1.1755749340233.664848384216464257&ler=empty&plt=549.5&it=1756458425300&coo=false&cdl=&exp=s1&expv2%5B%5D=pl0&expv2%5B%5D=el1&expv2%5B%5D=bc1&rqm=GET","start_timestamp":1756458425419,"end_timestamp":1756458425461,"duration":41,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"cache","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":2029,"type":"resource"},{"url":"https://shopeefood.vn/727e67f2da54ca40fd3c.worker.js","start_timestamp":1756458425518,"end_timestamp":1756458425515,"duration":-3,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"script","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://shopeefood.vn/now-food/shop/1239327?","http_method":"GET","start_timestamp":1756458425686,"end_timestamp":1756458425686,"duration":1,"page_url":"https://shopeefood.vn/now-food/shop/1239327","logic_status_code":0,"http_status_code":400,"resource_type":"image","type":"resource"},{"url":"https://www.facebook.com/privacy_sandbox/pixel/register/trigger/?id=1288439581308150&ev=PageView&dl=https%3A%2F%2Fshopeefood.vn%2Fnow-food%2Fshop%2F1239327%3F&rl=&if=false&ts=1756458425415&sw=1920&sh=1080&v=2.9.227&r=stable&ec=0&o=4126&fbp=fb.1.1755749340233.664848384216464257&cs_est=true&ler=empty&pmd[title]=Order%20%C4%90%E1%BB%93%20%C4%83n%20in%20H%C3%A0%20N%E1%BB%99i%20%26%20Delivery%20Service%20%7C%20Food%20Delivery%20%26%20Shipping%20Service%20%7C%20ShopeeFood.vn&plt=549.5&it=1756458425300&coo=false&cdl=&exp=s1&expv2%5B%5D=pl0&expv2%5B%5D=el0&expv2%5B%5D=bc1&rqm=FGET","start_timestamp":1756458425419,"end_timestamp":1756458425651,"duration":232,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"cache","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":2219,"type":"resource"},{"url":"https://www.facebook.com/privacy_sandbox/pixel/register/trigger/?id=1288439581308150&ev=ViewContent&dl=https%3A%2F%2Fshopeefood.vn%2Fnow-food%2Fshop%2F1239327%3F&rl=&if=false&ts=1756458425416&cd[content_ids]=%5B%22383980%22%5D&cd[content_type]=product&sw=1920&sh=1080&v=2.9.227&r=stable&ec=1&o=4126&fbp=fb.1.1755749340233.664848384216464257&ler=empty&plt=549.5&it=1756458425300&coo=false&cdl=&exp=s1&expv2%5B%5D=pl0&expv2%5B%5D=el1&expv2%5B%5D=bc1&rqm=FGET","start_timestamp":1756458425419,"end_timestamp":1756458425654,"duration":234,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"cache","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":2222,"type":"resource"},{"url":"https://mms.img.susercontent.com/vn-11134513-7r98o-ltm6j1v3kah653","start_timestamp":1756458425524,"end_timestamp":1756458425524,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://down-bs-vn.img.susercontent.com/vn-11134517-7ra0g-m66caqdcxry0bc","start_timestamp":1756458425530,"end_timestamp":1756458425530,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://down-bs-vn.img.susercontent.com/vn-11134517-7ra0g-m66c9f5c1jib8b","start_timestamp":1756458425533,"end_timestamp":1756458425533,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://down-bs-vn.img.susercontent.com/vn-11134517-7ra0g-m66cc42q792w11","start_timestamp":1756458425537,"end_timestamp":1756458425537,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://down-bs-vn.img.susercontent.com/vn-11134517-7ra0g-m66cb6xmp6v722","start_timestamp":1756458425540,"end_timestamp":1756458425540,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://down-bs-vn.img.susercontent.com/vn-11134517-7ra0g-m66cafc137w819","start_timestamp":1756458425544,"end_timestamp":1756458425544,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://down-bs-vn.img.susercontent.com/vn-11134517-7ra0g-m66cbklkpaf7f4","start_timestamp":1756458425547,"end_timestamp":1756458425547,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://down-bs-vn.img.susercontent.com/vn-11134517-7ra0g-m66ccx9rh4xi51","start_timestamp":1756458425550,"end_timestamp":1756458425550,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://down-bs-vn.img.susercontent.com/vn-11134517-7ra0g-m66cejx9n7ee48","start_timestamp":1756458425554,"end_timestamp":1756458425554,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://down-bs-vn.img.susercontent.com/vn-11134517-7ra0g-m66cfmwolh6e36","start_timestamp":1756458425557,"end_timestamp":1756458425557,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://down-bs-vn.img.susercontent.com/vn-11134517-7ra0g-m66cgfs2cipkb6","start_timestamp":1756458425560,"end_timestamp":1756458425560,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://down-bs-vn.img.susercontent.com/vn-11134517-7ra0g-m66ck3rn75q00b","start_timestamp":1756458425563,"end_timestamp":1756458425563,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://down-bs-vn.img.susercontent.com/vn-11134517-7ra0g-m66cgoaxve4617","start_timestamp":1756458425566,"end_timestamp":1756458425566,"duration":0,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":0,"type":"resource"},{"url":"https://down-bs-vn.img.susercontent.com/vn-11134517-7ra0g-m66chxq1eoc890","start_timestamp":1756458425674,"end_timestamp":1756458425677,"duration":4,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":2,"type":"resource"},{"url":"https://down-bs-vn.img.susercontent.com/vn-11134517-7ra0g-m66ci8ffqoebb9","start_timestamp":1756458425674,"end_timestamp":1756458425678,"duration":5,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":3,"type":"resource"},{"url":"https://down-bs-vn.img.susercontent.com/vn-11134517-7ra0g-m66cj5j5aq1j4d","start_timestamp":1756458425674,"end_timestamp":1756458425679,"duration":5,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":3,"type":"resource"},{"url":"https://down-bs-vn.img.susercontent.com/vn-11134517-7ra0g-m66ciihj0sub25","start_timestamp":1756458425674,"end_timestamp":1756458425679,"duration":6,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":2,"type":"resource"},{"url":"https://down-bs-vn.img.susercontent.com/vn-11134517-7ra0g-m66ciw5h0wxk84","start_timestamp":1756458425674,"end_timestamp":1756458425680,"duration":6,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":2,"type":"resource"},{"url":"https://down-bs-vn.img.susercontent.com/vn-11134517-7ra0g-m66xub9w2puf04","start_timestamp":1756458425674,"end_timestamp":1756458425682,"duration":9,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":3,"type":"resource"},{"url":"https://down-bs-vn.img.susercontent.com/vn-11134517-7ra0g-m66ckexouta09d","start_timestamp":1756458425674,"end_timestamp":1756458425683,"duration":9,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":3,"type":"resource"},{"url":"https://down-bs-vn.img.susercontent.com/vn-11134517-7ra0g-m66cjutsa5rs87","start_timestamp":1756458425674,"end_timestamp":1756458425683,"duration":9,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":3,"type":"resource"},{"url":"https://down-bs-vn.img.susercontent.com/vn-11134517-7ra0g-m66ckrcep1snd9","start_timestamp":1756458425674,"end_timestamp":1756458425683,"duration":9,"page_url":"https://shopeefood.vn/now-food/shop/1239327","http_method":"GET","logic_status_code":0,"http_status_code":200,"resource_type":"image","resource_cache_type":"not_modified","resource_load_speed":0,"resource_query_cache":0,"resource_load_time":2,"type":"resource"}],"api_performances":[{"url":"https://content.garena.com/shopee/track_config/split_by_market_config.json","page_url":"https://shopeefood.vn/now-food/shop/1239327","start_time":556,"duration":13,"connect_start":556,"connect_end":556,"domain_lookup_start":556,"domain_lookup_end":556,"redirect_start":0,"redirect_end":0,"request_start":567,"response_start":567,"response_end":569,"worker_start":0,"fetch_start":556,"secure_connection_start":556}]}}'

  6. curl 'https://gappapi.deliverynow.vn/api/dish/get_delivery_dishes?id_type=2&request_id=383980' \
  -H '61000470: clFbINXqP$WX8_ErBqZFY9%0]' \
  -H $'272e0a80: 4r>CHfPhl>7W9CVJaNs@U[DYpHme9Fi-7c)?gN:TUV.f*gFsO:<bb%iR(ANhSbYRG,\\S7_D=1-`<\\Do55BGJP\u0021ktegFch(\\I#HI/_n%jE,(cjJH5,GhbX,f^\'f.d^b<%WmC;4`feZK#ZBs3OPTCSG?EJo@%,s=KE;:&60Iif[*dLos4/+UO3E,L/uA/1jMI29q6/+UO3E,L/uA/1jMI29q6' \
  -H 'accept: application/json, text/plain, */*' \
  -H 'accept-language: vi' \
  -H $'faab144: lf0d7qVK@Xd3=i-)\u0021^L"J`X+L' \
  -H 'origin: https://shopeefood.vn' \
  -H 'priority: u=1, i' \
  -H 'referer: https://shopeefood.vn/' \
  -H 'sec-ch-ua: "Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Linux"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: cross-site' \
  -H 'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36' \
  -H 'x-foody-access-token;' \
  -H 'x-foody-api-version: 1' \
  -H 'x-foody-app-type: 1004' \
  -H 'x-foody-client-id;' \
  -H 'x-foody-client-language: vi' \
  -H 'x-foody-client-type: 1' \
  -H 'x-foody-client-version: 3.0.0' \
  -H 'x-sap-ri: b96db1682e110b2ca4a71e375a7d82c9bbb5998849884b24'
  res: {
    "reply": {
        "menu_infos": [
            {
                "dish_type_id": 7898648,
                "dish_type_name": "MÓN BÁN CHẠY",
                "dishes": [
                    {
                        "is_deleted": false,
                        "description": "4 loại sốt: bơ, me, mayonnaise, phô mai\n",
                        "price": {
                            "text": "49.000đ",
                            "unit": "đ",
                            "value": 49000.0
                        },
                        "is_active": true,
                        "display_order": 0,
                        "total_like": "10+",
                        "properties": [],
                        "photos": [
                            {
                                "width": 120,
                                "value": "https://mms.img.susercontent.com/vn-11134517-7ra0g-m66caqdcxry0bc@resize_ss120x120!@crop_w120_h120_cT",
                                "height": 120
                            },
                            {
                                "width": 180,
                                "value": "https://mms.img.susercontent.com/vn-11134517-7ra0g-m66caqdcxry0bc@resize_ss180x180!@crop_w180_h180_cT",
                                "height": 180
                            },
                            {
                                "width": 400,
                                "value": "https://mms.img.susercontent.com/vn-11134517-7ra0g-m66caqdcxry0bc@resize_ss400x400!@crop_w400_h400_cT",
                                "height": 400
                            },
                            {
                                "width": 560,
                                "value": "https://mms.img.susercontent.com/vn-11134517-7ra0g-m66caqdcxry0bc@resize_ss560x560!@crop_w560_h560_cT",
                                "height": 560
                            },
                            {
                                "width": 750,
                                "value": "https://mms.img.susercontent.com/vn-11134517-7ra0g-m66caqdcxry0bc@resize_ss750x750!@crop_w750_h750_cT",
                                "height": 750
                            },
                            {
                                "width": 1242,
                                "value": "https://mms.img.susercontent.com/vn-11134517-7ra0g-m66caqdcxry0bc@resize_ss1242x1242!@crop_w1242_h1242_cT",
                                "height": 1242
                            }
                        ],
                        "options": [
                            {
                                "ntop": "",
                                "mandatory": false,
                                "id": 2306921,
                                "option_items": {
                                    "min_select": 0,
                                    "max_select": 6,
                                    "items": [
                                        {
                                            "name": "Thêm ruốc",
                                            "weight": 1,
                                            "ntop_price": {
                                                "text": "0đ",
                                                "value": 0,
                                                "unit": "đ"
                                            },
                                            "max_quantity": 1,
                                            "id": 12726096,
                                            "is_default": false,
                                            "top_order": 0,
                                            "price": {
                                                "text": "10.000đ",
                                                "value": 10000.0,
                                                "unit": "đ"
                                            }
                                        },
                                        {
                                            "name": "Thêm sốt bơ",
                                            "weight": 1,
                                            "ntop_price": {
                                                "text": "0đ",
                                                "value": 0,
                                                "unit": "đ"
                                            },
                                            "max_quantity": 1,
                                            "id": 12726084,
                                            "is_default": false,
                                            "top_order": 0,
                                            "price": {
                                                "text": "7.000đ",
                                                "value": 7000.0,
                                                "unit": "đ"
                                            }
                                        },
                                        {
                                            "name": "Thêm sốt me",
                                            "weight": 1,
                                            "ntop_price": {
                                                "text": "0đ",
                                                "value": 0,
                                                "unit": "đ"
                                            },
                                            "max_quantity": 1,
                                            "id": 12726085,
                                            "is_default": false,
                                            "top_order": 0,
                                            "price": {
                                                "text": "7.000đ",
                                                "value": 7000.0,
                                                "unit": "đ"
                                            }
                                        },
                                        {
                                            "name": "Thêm bò",
                                            "weight": 1,
                                            "ntop_price": {
                                                "text": "0đ",
                                                "value": 0,
                                                "unit": "đ"
                                            },
                                            "max_quantity": 1,
                                            "id": 12726086,
                                            "is_default": false,
                                            "top_order": 0,
                                            "price": {
                                                "text": "10.000đ",
                                                "value": 10000.0,
                                                "unit": "đ"
                                            }
                                        },
                                        {
                                            "name": "Thêm trứng",
                                            "weight": 1,
                                            "ntop_price": {
                                                "text": "0đ",
                                                "value": 0,
                                                "unit": "đ"
                                            },
                                            "max_quantity": 1,
                                            "id": 12726087,
                                            "is_default": false,
                                            "top_order": 0,
                                            "price": {
                                                "text": "5.000đ",
                                                "value": 5000.0,
                                                "unit": "đ"
                                            }
                                        },
                                        {
                                            "name": "Thêm sốt phô mai",
                                            "weight": 1,
                                            "ntop_price": {
                                                "text": "0đ",
                                                "value": 0,
                                                "unit": "đ"
                                            },
                                            "max_quantity": 1,
                                            "id": 12726088,
                                            "is_default": false,
                                            "top_order": 0,
                                            "price": {
                                                "text": "7.000đ",
                                                "value": 7000.0,
                                                "unit": "đ"
                                            }
                                        }
                                    ]
                                },
                                "name": "Món thêm"
                            }
                        ],
                        "is_available": true,
                        "is_group_discount_item": false,
                        "time": {
                            "available": [],
                            "week_days": [
                                {
                                    "start": "00:00",
                                    "week_day": 1,
                                    "end": "23:59"
                                },
                                {
                                    "start": "00:00",
                                    "week_day": 2,
                                    "end": "23:59"
                                },
                                {
                                    "start": "00:00",
                                    "week_day": 3,
                                    "end": "23:59"
                                },
                                {
                                    "start": "00:00",
                                    "week_day": 4,
                                    "end": "23:59"
                                },
                                {
                                    "start": "00:00",
                                    "week_day": 5,
                                    "end": "23:59"
                                },
                                {
                                    "start": "00:00",
                                    "week_day": 6,
                                    "end": "23:59"
                                },
                                {
                                    "start": "00:00",
                                    "week_day": 7,
                                    "end": "23:59"
                                }
                            ],
                            "not_available": []
                        },
                        "quantity": 0,
                        "discount_price": {
                            "text": "44.100đ",
                            "unit": "đ",
                            "value": 44100.0
                        },
                        "id": 175573239,
                        "mms_image": "vn-11134517-7ra0g-m66caqdcxry0bc",
                        "name": "Cuốn to sốt lẫn"
                    }
                ]
            }
        ]
    },
    "result": "success"
}