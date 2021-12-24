import CryptoJS from "crypto-js";

function CreateSignature(timestamp, id, key, secret) {
  var hash = CryptoJS.HmacSHA256(timestamp + id + key, secret);
  return CryptoJS.enc.Base64.stringify(hash);
}

let socket = null;

export default function socketSubscribe(address, id, key, secret) {
    let timestamp = Date.now();
    let signature = CreateSignature(timestamp, id, key, secret);
    socket = new WebSocket(address);

    socket.onopen = () => {
      console.log("Socket state: " + socket.readyState + " (open)");

      let connectionRequest = {
        Id: id,
        Request: "Login",
        Params: {
          AuthType: "HMAC",
          WebApiId: id,
          WebApiKey: key,
          Timestamp: timestamp,
          Signature: signature,
          DeviceId: "WebBrowser",
          AppSessionId: "123",
        },
			};
			let jsonConnectionRequest = JSON.stringify(connectionRequest);
      socket.send(jsonConnectionRequest);
      console.log('');
      
      let feedRequest = {
        Id: id,
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
    return socket;
}
