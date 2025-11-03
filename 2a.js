
const http = require('http'); //導入 http 模組


const server = http.createServer(function (request, response) { //建立伺服器
  const url = request.url;  //取得請求的 url
  console.log(url) //執行這個url
  var answer = '';  //宣告一個變數 answer 用來儲存回應的內容


  switch (url) {   // switch判斷case中的url的字串,回應相對的字串
    case '/':
      answer = 'index.html輸出部分'; //收到 '/',則回應此字串
      break;
    case '/calculator':
      answer = 'index2.html輸出部分'; //收到 '/calculator',則回應此字串
      break;
    default:      //default為當收到的url沒有對，則回應此字串
      answer = 'error.html輸出部分';
      break;
  }



  
  response.setHeader('Content-Type', 'text/plain;charset=utf-8'); 
  response.end(answer);
});

server.listen('8888', function () {
  console.log("伺服器啟動成功，訪問：http://127.0.0.1:8888")
})