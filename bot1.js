var access_token = "*********";
var line_endpoint = 'https://api.line.me/v2/bot/message/reply';

function doPost(e) {

  var json = JSON.parse(e.postData.contents);

  //返信するためのトークン取得
  var reply_token= json.events[0].replyToken;
  //送られたメッセージ内容を取得
  var longitude = json.events[0].message.longitude;
  var latitude = json.events[0].message.latitude;
  var address = json.events[0].message.address;
        var message = {
            "replyToken": reply_token,
            "messages": [
              {
                "type": "text",
                "text": "この場所の緯度と経度"
              },{
                "type": "text",
                "text": "緯度："+latitude
              },{
                "type": "text",
                "text": "経度："+longitude
              },{
                "type": "text",
                "text": "住所："+address
              }
                        ]
                    }

    var replyData = {
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + access_token
        },
        "payload": JSON.stringify(message)
    };
    try {
        UrlFetchApp.fetch(line_endpoint, replyData);
    } catch (e) {
        return "error";
    }
}
