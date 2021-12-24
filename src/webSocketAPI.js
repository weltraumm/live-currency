import CryptoJS from "crypto-js";

function CreateSignature(timestamp, id, key, secret) {
  var hash = CryptoJS.HmacSHA256(timestamp + id + key, secret);
  return CryptoJS.enc.Base64.stringify(hash);
}

function socketSubscribe(address, id, keyy, secret, currency) {
  let socket = null;
  let timestamp = Date.now();
  let signature = CreateSignature(timestamp, id, keyy, secret);
  socket = new WebSocket(address);

  socket.onopen = () => {
    console.log("Socket state: " + socket.readyState + " (open)");

    let connectionRequest = {
      Id: id,
      Request: "Login",
      Params: {
        AuthType: "HMAC",
        WebApiId: id,
        WebApiKey: keyy,
        Timestamp: timestamp,
        Signature: signature,
        DeviceId: "WebBrowser",
        AppSessionId: "123",
      },
    };
    let jsonConnectionRequest = JSON.stringify(connectionRequest);
    socket.send(jsonConnectionRequest);

    let feedRequest = {
      Id: id,
      Request: "FeedSubscribe",
      Params: {
        Subscribe: [
          {
            Symbol: currency,
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

export default socketSubscribe;
