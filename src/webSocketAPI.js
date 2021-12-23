import CryptoJS from "crypto-js";



function CreateSignature(timestamp, id, key, secret) {
  var hash = CryptoJS.HmacSHA256(timestamp + id + key, secret);
  return CryptoJS.enc.Base64.stringify(hash);
}

let socket = null;

function socketConnect(address, id, key, secret) {
  try {
    let timestamp = Date.now();
    let signature = CreateSignature(timestamp, ID, KEY, SECRET);
    socket = new WebSocket(ADDRES);

    socket.onopen = () => {
      console.log("Socket state: " + socket.readyState + " (open)");

      let connectionRequest = {
        Id: ID,
        Request: "Login",
        Params: {
          AuthType: "HMAC",
          WebApiId: ID,
          WebApiKey: KEY,
          Timestamp: timestamp,
          Signature: signature,
          DeviceId: "WebBrowser",
          AppSessionId: "123",
        },
			};
			let jsonConnectionRequest = JSON.stringify(connectionRequest);
      socket.send(jsonConnectionRequest);

      let feedRequest = {
        Id: ID,
        Request: "FeedSubscribe",
        Params: {
          Subscribe: [
            {
              Symbol: "EURUSD",
              BookDepth: 1,
            },
          ],
        },
      };
      let jsonFeedRequest = JSON.stringify(feedRequest);
      socket.send(jsonFeedRequest);
    };

    socket.onmessage = (msg) => {
      // const message = JSON.parse(msg.data);
      console.log(msg.data);
    };

    socket.onclose = () => {
      console.log("Socket state: " + socket.readyState + " (closed)");
      socket = null;
    };
  } catch (exception) {
    console.log("Error: " + exception.text);
  }
}
