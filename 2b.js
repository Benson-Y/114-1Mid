// ==========================================
// Node.js + EJS 網頁伺服器
// ==========================================
// 功能說明：
// 1. 提供多頁面路由（首頁、計算器、404頁面）
// 2. 支援 EJS 模板動態渲染
// 3. 處理靜態資源（CSS、JS、圖片等）
// 4. 自動錯誤處理與 404 頁面導向
// ==========================================

// ------------------------------------------
// 引入必要的 Node.js 核心模組
// ------------------------------------------


const http = require('http'); // 導入http模組,用於創建HTTP伺服器


const fs = require('fs'); // 導入fs模組，讀取文件


const ejs = require('ejs');  // 導入ejs模組 用於EJS模板渲染


const path = require('path'); // 導入path模組 用於處理文件和目錄路徑


http.createServer((req, res) => {  //創立伺服器，並設定回調函數處理請求

  let filePath = '';
  let fileOtherFile = '';


switch (req.url) {
    case '/':
      filePath = '/index.ejs';        // 若收到的值為 '/', 則filepath渲染 inddex.ejs
      break;
    case '/calculator':
      filePath = '/index2.ejs';       // 若收到的值為 '/calculator', 則filepath渲染 inddex2.ejs
      break;
}

if (req.url.endsWith('.css')  ||  (req.url.endsWith('.js')) || (req.url.endsWith('.png'))) {
    fileOtherFile = req.url;
} // 這裡是判斷若附檔名為 .css 、 .js、 .png 則把路徑存到 fileOtherFile 變數中


  const extname = (fileOtherFile === '') ? path.extname(filePath) : path.extname(fileOtherFile); //以文件的類型來分成filepath(ejs檔案)或fileOteherfile(.css、.png、.js)


  const contentTypes = {
    '.html': 'text/html; charset=utf-8',        // HTML 網頁文件
    '.ejs': 'text/html; charset=utf-8',         // EJS 模板（渲染後輸出為 HTML）
    '.js': 'text/javascript; charset=utf-8',    // JavaScript 腳本文件
    '.css': 'text/css; charset=utf-8',          // CSS 樣式表文件
    '.json': 'application/json',                // JSON 資料格式
    '.png': 'image/png',                        // PNG 圖片格式
    '.jpg': 'image/jpg',                        // JPG/JPEG 圖片格式
    '.gif': 'image/gif',                        // GIF 動畫圖片
    '.svg': 'image/svg+xml',                    // SVG 向量圖形
    '.ico': 'image/x-icon'                      // 網站 favicon 圖示
  }; // 定義文件類型,告訴瀏覽器收到的文件如何處理


  const contentType = contentTypes[extname] || 'text/plain';
// 找到對應的副檔名,使用該類型，找不到則使用'text/plain'

  if (extname === '.ejs') {  //若副檔名為.ejs則進入此區塊


    fs.readFile(('.' + filePath), 'utf8', (err, template) => {   //讀取完整路徑的ejs文件,並且指定編碼為utf8，以避免中文亂碼

     
      if (err) {  //若發生錯誤
        // 設定 HTTP 狀態碼 500（Internal Server Error - 伺服器內部錯誤）
        // 這表示伺服器嘗試處理請求時發生問題
        res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' }); //設定http狀態碼 500 

       
        res.end('錯誤：無法讀取模板文件 - ' + err.message);  //回應客戶端的頁面寫入錯誤訊息


        return;
      }

      // 使用 EJS 引擎渲染模板
      // ejs.render() 會：
      // 1. 解析 EJS 語法（如 <%= %>, <% %> 等）
      // 2. 執行嵌入的 JavaScript 代碼
      // 3. 將結果轉換成純 HTML 字串
      const html = ejs.render(template);

      // 設定 HTTP 回應標頭
      // 狀態碼 200: OK（請求成功）
      // Content-Type: 告訴瀏覽器這是 HTML 文件，使用 UTF-8 編碼
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

      // 將渲染完成的 HTML 發送給客戶端（瀏覽器）
      res.end(html);
    });

  } else {
    // ------------------------------------------
    // 處理方式 B: 靜態文件傳送
    // ------------------------------------------
    // 適用情況：extname !== '.ejs'（例如 .css, .js, .png 等）
    // 處理文件：style.css, style2.css, style3.css, script.js

    // 構建完整的靜態文件路徑
    // 在路徑前加上 '.' 表示當前工作目錄
    // 範例：
    //   '/style.css' → './style.css'
    //   '/script.js' → './script.js'
    const staticFilePath = '.' + fileOtherFile;


    fs.readFile(staticFilePath, (err, content) => {


      if (err) {  //若發生錯誤
        fs.readFile('index3.ejs', 'utf8', (err, template404) => {  //讀取index3.ejs文件

          res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' }); //設定HTTP狀態碼404，表示找不到文件

          if (err) { //若發生錯誤
            console.log('無法讀取 404 模板文件 - ' + err.message); // 終端顯示無法讀取文件加上錯誤訊息
            res.end('錯誤：無法讀取 404 模板文件'); //回應頁面上寫入錯誤訊息
            
          }else {
            res.end(template404); //將讀取到的index3.ejs文件內容回應給客戶端
          }
        });

      } else {

        res.writeHead(200, { 'Content-Type': contentType });

        res.end(content);
      }
    });
  }

// ==========================================
// 啟動伺服器並開始監聽請求
// ==========================================

// .listen() 方法啟動伺服器並監聽指定的端口
// 參數說明：
//   3000: 端口號（Port），伺服器將在此端口接收請求
//   回調函數: 伺服器成功啟動後執行的函數
}).listen(3000, () => {

  // 在終端機（控制台）輸出訊息，告知開發者伺服器已啟動
  // 使用者可以透過瀏覽器訪問 http://localhost:3000 來查看網站
  console.log('伺服器已啟動！請訪問 http://localhost:3000');
  console.log('可用路由：');
  console.log('  - http://localhost:3000');
  console.log('  - http://localhost:3000/calculator');
  console.log('  - 其他路徑將顯示 404 錯誤頁面');
});

// ==========================================
// 程式運行流程總結
// ==========================================
//
// 1. 使用者在瀏覽器輸入網址（例如：http://localhost:3000）
// 2. 瀏覽器發送 HTTP 請求到伺服器
// 3. 伺服器的 createServer 回調函數被觸發
// 4. 根據 req.url 判斷要返回哪個頁面或資源
// 5. 如果是 EJS 頁面：
//    - 讀取 EJS 模板文件
//    - 使用 ejs.render() 渲染成 HTML
//    - 將 HTML 發送給瀏覽器
// 6. 如果是靜態資源（CSS、JS）：
//    - 嘗試讀取對應的文件
//    - 如果存在，直接發送文件內容
//    - 如果不存在，顯示 404 錯誤頁面
// 7. 瀏覽器接收到內容並顯示給使用者
//
// ==========================================
