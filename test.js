{/* <script src="http://crypto-js.googlecode.com/svn/tags/3.1.2/build/components/core-min.js" type='text/javascript'></script>
<script src="http://crypto-js.googlecode.com/svn/tags/3.1.2/build/components/enc-base64-min.js" type='text/javascript'></script>
<script src="http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/hmac-sha256.js" type='text/javascript'></script>

<script> */}

function CreateSignature(timestamp, id, key, secret) {
  var hash = CryptoJS.HmacSHA256(timestamp + id + key, secret);
  return CryptoJS.enc.Base64.stringify(hash);
}

var socket = null;

function Connect(address, id, key, secret) {
  try {
    var timestamp = Date.now();
    var signature = CreateSignature(timestamp, id, key, secret);

    socket = new WebSocket(address);
    console.log('Socket state: ' + socket.readyState);
    socket.onopen = function() {
      console.log('Socket state: ' + socket.readyState + ' (open)');
      var request = {
        Id: "8AF57382-DE83-49DC-9B4E-CF9FF4A4A798",
        Request: "Login",
        Params: {
          AuthType: "HMAC",
          WebApiId: id,
          WebApiKey: key,
          Timestamp: timestamp,
          Signature: signature,
          DeviceId: "WebBrowser",
          AppSessionId: "123"
        }
      };
      var jsonrequest = JSON.stringify(request);
      socket.send(jsonrequest);
    }
    socket.onmessage = function(msg) {
      console.log(msg.data);
    }
    socket.onclose = function() {
      console.log('Socket state: ' + socket.readyState + ' (closed)');
      socket = null;
    }
  } catch(exception) {
    console.log('Error: ' + exception.text);
  }
}

{/* </script> */}