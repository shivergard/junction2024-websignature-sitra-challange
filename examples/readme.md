https://polis.local/8ph94he2mv?site_id=polis_site_id_De3Plz2bIsZVlj1S59&page_id=PAGE_ID&parent_url=http%3A%2F%2Flocalhost%3A8000%2Fintegration.html

- handle_GET_participationInit - ZEBRA 
- polis-sitra/polis/server/src/server.ts


- function createPolisIframe(parent, o) {
- polis-sitra/polis/client-participation/api/embed.js


paramStrings.push("screen_height="+ encodeURIComponent(window.screen.height));
paramStrings.push("screen_width="+ encodeURIComponent(window.screen.width));

console.log("zebra zebra zebra", paramStrings);


req.p.screen_height
req.p.screen_width

- websocket for informing site...
      // Create a new WebSocket connection to the server
      ws = new WebSocket("ws://localhost:8080");

      // When the WebSocket connection opens
      ws.onopen = () => {
        console.log("Connected to WebSocket server");
        displayMessage("Connected to WebSocket server");
      };

      // When a message is received from the server
      ws.onmessage = (event) => {
        const message = JSON.parse(event.data).message;
        console.log("Received:", message);
        displayMessage("Server says: " + message);
      };

      // When the WebSocket connection is closed
      ws.onclose = () => {
        console.log("Disconnected from WebSocket server");
        displayMessage("Disconnected from WebSocket server");
      };

      // When there's an error with the WebSocket connection
      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        displayMessage("WebSocket error: " + error);
      };

https://polis.local/api/v3/votes

/api/v3/participationInit?conversation_id=8ph94he2mv&pid=mypid&lang=acceptLang 

this.participantAgreed

https://polis.local/api/v3/math/pca2?conversation_id=8ph94he2mv&cacheBust=825501433

curl 'https://polis.local/api/v3/votes?conversation_id=8ph94he2mv&pid=mypid' \
  -H 'accept: application/json, text/javascript, */*; q=0.01' \
  -H 'accept-language: en-GB,en;q=0.9' \
  -H 'cache-control: max-age=0' \
  -H 'content-type: application/json' \
  -H 'priority: u=1, i' \
  -H 'referer: https://polis.local/8ph94he2mv?site_id=polis_site_id_De3Plz2bIsZVlj1S59&page_id=PAGE_ID&parent_url=http%3A%2F%2Flocalhost%3A8000%2Fintegration.html' \
  -H 'sec-ch-ua: "Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: same-origin' \
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36' \
  -H 'x-requested-with: XMLHttpRequest' \
  --insecure


  curl 'https://polis.local/api/v3/comments?conversation_id=8ph94he2mv&include_social=true&gid=-1&translate=true&lang=en-GB' \
  -H 'accept: application/json, text/javascript, */*; q=0.01' \
  -H 'accept-language: en-GB,en;q=0.9' \
  -H 'cache-control: max-age=0' \
  -H 'content-type: application/json; charset=utf-8' \
  -H 'priority: u=1, i' \
  -H 'referer: https://polis.local/8ph94he2mv?site_id=polis_site_id_De3Plz2bIsZVlj1S59&page_id=PAGE_ID&parent_url=http%3A%2F%2Flocalhost%3A8000%2Fintegration.html' \
  -H 'sec-ch-ua: "Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: same-origin' \
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36' \
  -H 'x-requested-with: XMLHttpRequest' \
  --insecure


  curl 'https://polis.local/api/v3/math/pca2?conversation_id=8ph94he2mv&cacheBust=109391844' \
  -H 'accept: application/json, text/javascript, */*; q=0.01' \
  -H 'accept-language: en-GB,en;q=0.9' \
  -H 'cache-control: max-age=0' \
  -H 'content-type: application/json; charset=utf-8' \
  -H 'if-none-match: "11"' \
  -H 'priority: u=1, i' \
  -H 'referer: https://polis.local/8ph94he2mv?site_id=polis_site_id_De3Plz2bIsZVlj1S59&page_id=PAGE_ID&parent_url=http%3A%2F%2Flocalhost%3A8000%2Fintegration.html' \
  -H 'sec-ch-ua: "Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: same-origin' \
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36' \
  -H 'x-requested-with: XMLHttpRequest' \
  --insecure


  -----
  - https://github.com/compdemocracy/polis
  - https://compdemocracy.org/about
  - https://github.com/passwordless-id/webauthn
  - https://webauthn.passwordless.id/registration/
  - https://webauthn.passwordless.id/demos/playground
  - https://polis.local/8ph94he2mv?site_id=polis_site_id_De3Plz2bIsZVlj1S59&page_id=PAGE_ID&parent_url=http%3A%2F%2Flocalhost%3A8000%2Fintegration.html
  - 