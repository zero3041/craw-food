Url đc gọi fetch đầu tiên khi vào link cưa hàng:
1. curl 'https://gw.be.com.vn/api/v1/be-delivery-gateway/api/v1/user/guest' \
  -H 'accept: */*' \
  -H 'accept-language: vi' \
  -H 'content-type: application/json' \
  -H 'origin: https://food.be.com.vn' \
  -H 'priority: u=1, i' \
  -H 'referer: https://food.be.com.vn/' \
  -H 'sec-ch-ua: "Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Linux"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: same-site' \
  -H 'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36' \
  --data-raw '{}'
  Response:
  {
    "code": 143,
    "mesage": "Response has been sent successfully",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjowLCJhdWQiOiJndWVzdCIsImV4cCI6MTc1NjU0MTkwOSwiaWF0IjoxNzU2NDU1NTA5LCJpc3MiOiJiZS1kZWxpdmVyeS1nYXRld2F5In0.mtR3w2NamONN7CDn5Cl-PweJrkNKILv3CCFlGP13HhE"
  }

2. Url thứ 2 : curl 'https://firebaseinstallations.googleapis.com/v1/projects/befood-web1/installations' \
  -H 'accept: application/json' \
  -H 'accept-language: vi' \
  -H 'content-type: application/json' \
  -H 'origin: https://food.be.com.vn' \
  -H 'priority: u=1, i' \
  -H 'referer: https://food.be.com.vn/' \
  -H 'sec-ch-ua: "Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Linux"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: cross-site' \
  -H 'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36' \
  -H 'x-browser-channel: stable' \
  -H 'x-browser-copyright: Copyright 2025 Google LLC. All rights reserved.' \
  -H 'x-browser-validation: OhMsc7acNx+0w+NEQM7p961tYAw=' \
  -H 'x-browser-year: 2025' \
  -H 'x-firebase-client: eyJ2ZXJzaW9uIjoyLCJoZWFydGJlYXRzIjpbeyJhZ2VudCI6ImZpcmUtY29yZS8wLjkuMjQgZmlyZS1jb3JlLWVzbTIwMTcvMC45LjI0IGZpcmUtanMvIGZpcmUtanMtYWxsLWNkbi8xMC43LjAgZmlyZS1paWQvMC42LjQgZmlyZS1paWQtZXNtMjAxNy8wLjYuNCBmaXJlLWFuYWx5dGljcy8wLjEwLjAgZmlyZS1hbmFseXRpY3MtZXNtMjAxNy8wLjEwLjAgZmlyZS1yYy8wLjQuNCBmaXJlLXJjLWVzbTIwMTcvMC40LjQiLCJkYXRlcyI6WyIyMDI1LTA4LTI5Il19XX0' \
  -H 'x-goog-api-key: AIzaSyD-bXSsheMiev24eQVBgahiVmyrsbiYcWA' \
  --data-raw '{"fid":"eShjJDlE4zwj5XVnv1U5ZP","authVersion":"FIS_v2","appId":"1:761481737166:web:0cf07fad20e26a18df319f","sdkVersion":"w:0.6.4"}'
  response: {
  "name": "projects/761481737166/installations/eShjJDlE4zwj5XVnv1U5ZP",
  "fid": "eShjJDlE4zwj5XVnv1U5ZP",
  "refreshToken": "3_AS3qfwKTojWrNMm0k2lcCk9tfHPaOZe9I01vw-Hq0WtR0TfRenN83OjodTqS8BJFFzF6BNmK2KkW6T6jKRrtv8cZAHCyBJjFylJIJJCAd6gzos8",
  "authToken": {
    "token": "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjE6NzYxNDgxNzM3MTY2OndlYjowY2YwN2ZhZDIwZTI2YTE4ZGYzMTlmIiwiZXhwIjoxNzU3MDYwMzE0LCJmaWQiOiJlU2hqSkRsRTR6d2o1WFZudjFVNVpQIiwicHJvamVjdE51bWJlciI6NzYxNDgxNzM3MTY2fQ.AB2LPV8wRgIhAN1Xajs5qNFev_JqEUituCi4bfGhqV7HD1wqrJjFr15rAiEA385x2nHSzF2jAjleDEF2SKhxQu2tSxe62XPovDsmbx8",
    "expiresIn": "604800s"
  }
}

3. curl 'https://firebaseremoteconfig.googleapis.com/v1/projects/befood-web1/namespaces/firebase:fetch?key=AIzaSyD-bXSsheMiev24eQVBgahiVmyrsbiYcWA' \
  -H 'accept: */*' \
  -H 'accept-language: vi' \
  -H 'cache-control: max-age=0' \
  -H 'content-encoding: gzip' \
  -H 'content-type: application/json' \
  -H 'if-none-match: *' \
  -H 'origin: https://food.be.com.vn' \
  -H 'priority: u=1, i' \
  -H 'referer: https://food.be.com.vn/' \
  -H 'sec-ch-ua: "Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Linux"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: cross-site' \
  -H 'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36' \
  -H 'x-browser-channel: stable' \
  -H 'x-browser-copyright: Copyright 2025 Google LLC. All rights reserved.' \
  -H 'x-browser-validation: OhMsc7acNx+0w+NEQM7p961tYAw=' \
  -H 'x-browser-year: 2025' \
  --data-raw '{"sdk_version":"10.7.0","app_instance_id":"eShjJDlE4zwj5XVnv1U5ZP","app_instance_id_token":"eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjE6NzYxNDgxNzM3MTY2OndlYjowY2YwN2ZhZDIwZTI2YTE4ZGYzMTlmIiwiZXhwIjoxNzU3MDYwMzE0LCJmaWQiOiJlU2hqSkRsRTR6d2o1WFZudjFVNVpQIiwicHJvamVjdE51bWJlciI6NzYxNDgxNzM3MTY2fQ.AB2LPV8wRgIhAN1Xajs5qNFev_JqEUituCi4bfGhqV7HD1wqrJjFr15rAiEA385x2nHSzF2jAjleDEF2SKhxQu2tSxe62XPovDsmbx8","app_id":"1:761481737166:web:0cf07fad20e26a18df319f","language_code":"vi"}'

  response: {
  "entries": {
    "feature_checkout_cache": "qa,staging,prod",
    "feature_favorite_resto": "qa,staging,prod",
    "feature_google_place_sandbox": "qa,staging",
    "feature_group_order": "qa,staging,prod",
    "feature_order_rating": "qa,staging,prod",
    "feature_resto_rating": "qa,staging,prod",
    "feature_resto_rich_info": "qa,staging,prod",
    "feature_send_as_gift": "qa,staging"
  },
  "state": "UPDATE",
  "templateVersion": "16"
}

4. curl 'https://firebase.googleapis.com/v1alpha/projects/-/apps/1:761481737166:web:0cf07fad20e26a18df319f/webConfig' \
  -H 'accept: application/json' \
  -H 'accept-language: vi' \
  -H 'origin: https://food.be.com.vn' \
  -H 'priority: u=1, i' \
  -H 'referer: https://food.be.com.vn/' \
  -H 'sec-ch-ua: "Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Linux"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: cross-site' \
  -H 'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36' \
  -H 'x-browser-channel: stable' \
  -H 'x-browser-copyright: Copyright 2025 Google LLC. All rights reserved.' \
  -H 'x-browser-validation: OhMsc7acNx+0w+NEQM7p961tYAw=' \
  -H 'x-browser-year: 2025' \
  -H 'x-goog-api-key: AIzaSyD-bXSsheMiev24eQVBgahiVmyrsbiYcWA'
  response: {
  "projectId": "befood-web1",
  "appId": "1:761481737166:web:0cf07fad20e26a18df319f",
  "storageBucket": "befood-web1.firebasestorage.app",
  "authDomain": "befood-web1.firebaseapp.com",
  "messagingSenderId": "761481737166",
  "measurementId": "G-6BN02F6R47"
}
