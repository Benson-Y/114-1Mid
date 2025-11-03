

function getLowStock(products) { //建立一個名為getloestock的函式,參數為products
 let lowStock= [];  //宣告一個空陣列lowstock用來存放庫存少於10的商品名稱

 for (let i = 0; i < products.length; i++) {  //使用for迴圈,當i小於商品的數量時,i累加1
   if (products[i].stock < 10) { //使用if判斷式,當商品的庫存小於10時
     lowStock.push(products[i].name);  //將該商品的名稱push到lowstock陣列中
   };
 } 
 console.log('庫存少於10的項目:', lowStock); //在終端機顯示庫存少於10的商品名稱
//
};


// ==========================================
//  批次更新商品庫存
// ==========================================

/**
 * 根據更新物件批次更新商品庫存
 * 注意：不修改原始陣列，回傳新的陣列
 *
 * @param {Array} products - 原始商品陣列
 * @param {Object} updates - 要更新的商品庫存，格式：{ 商品名: 新庫存量 }
 * @returns {Array} 更新後的新商品陣列
 *
 * 範例：
 *   products = [{ name: "mouse", stock: 5 }]
 *   updates = { mouse: 15 }
 *   結果: [{ name: "mouse", stock: 15 }]
 */
function updateStock(products, updates) {
  
}


// ==========================================
// 測試範例
// ==========================================

// 測試資料
const products = [
  { name: "keyboard", stock: 25 },
  { name: "mouse", stock: 5 },
  { name: "monitor", stock: 8 },
  { name: "usb cable", stock: 40 }
];

console.log("==========================================");
console.log("原始商品資料：");
console.log("==========================================");
console.log(products);
console.log("");

// ------------------------------------------
// 測試 (a) getLowStock
// ------------------------------------------
console.log("==========================================");
console.log("(a) 測試 getLowStock - 查詢低庫存商品");
console.log("==========================================");

const lowStockItems = getLowStock(products);
//console.log("庫存少於 10 的商品：", lowStockItems);
console.log("預期結果：['mouse', 'monitor']");

// 檢查結果是否正確
let isCorrect = true;
if (lowStockItems.length !== 2) {
  isCorrect = false;
}
if (lowStockItems[0] !== "mouse" || lowStockItems[1] !== "monitor") {
  isCorrect = false;
}
console.log("測試結果：", isCorrect ? "✅ 通過" : "❌ 失敗");
console.log("");

// ------------------------------------------
// 測試 (b) updateStock
// ------------------------------------------
console.log("==========================================");
console.log("(b) 測試 updateStock - 批次更新庫存");
console.log("==========================================");

const updates = {
  mouse: 15,
  monitor: 20
};

console.log("要更新的商品：", updates);
console.log("");

const updatedProducts = updateStock(products, updates);

console.log("更新後的商品資料：");
console.log(updatedProducts);
console.log("");

console.log("原始商品資料是否被修改？");
console.log(products);
console.log("原始資料保持不變：",
  products[1].stock === 5 && products[2].stock === 8 ? "✅ 通過（未被修改）" : "❌ 失敗（被修改了）"
);
console.log("");

console.log("新陣列的庫存是否正確更新？");
console.log("mouse 的庫存：", updatedProducts[1].stock, " (預期: 15)", updatedProducts[1].stock === 15 ? "✅" : "❌");
console.log("monitor 的庫存：", updatedProducts[2].stock, " (預期: 20)", updatedProducts[2].stock === 20 ? "✅" : "❌");
console.log("keyboard 的庫存：", updatedProducts[0].stock, " (預期: 25，未變)", updatedProducts[0].stock === 25 ? "✅" : "❌");
console.log("");


// ==========================================
// 進階測試：組合使用兩個函式
// ==========================================
console.log("==========================================");
console.log("進階測試：組合使用兩個函式");
console.log("==========================================");

// 步驟 1: 找出低庫存商品
const lowStock = getLowStock(products);
console.log("步驟 1 - 低庫存商品：", lowStock);

// 步驟 2: 為低庫存商品補貨（設定庫存為 50）
const restockUpdates = {};
lowStock.forEach(name => {
  restockUpdates[name] = 50;
});
console.log("步驟 2 - 補貨清單：", restockUpdates);

// 步驟 3: 執行補貨
const restockedProducts = updateStock(products, restockUpdates);
console.log("步驟 3 - 補貨後的商品：", restockedProducts);

// 步驟 4: 檢查是否還有低庫存商品
const stillLowStock = getLowStock(restockedProducts);
console.log("步驟 4 - 補貨後的低庫存商品：", stillLowStock);
console.log("所有商品庫存充足：", stillLowStock.length === 0 ? "✅ 是" : "❌ 否");
console.log("");


// ==========================================
// 匯出函式（供其他檔案使用）
// ==========================================

// 如果在 Node.js 環境中使用，可以匯出這些函式
// 在其他檔案中可以使用：const { getLowStock, updateStock } = require('./sol2.js');
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getLowStock,
    updateStock
  };
}


// ==========================================
// 補充說明：關鍵概念解析
// ==========================================

/*

1. filter() 方法
   - 用途：篩選陣列中符合條件的元素
   - 語法：array.filter(callback)
   - 回傳：新陣列（只包含符合條件的元素）
   - 範例：[1, 2, 3, 4].filter(num => num > 2)  // [3, 4]

2. map() 方法
   - 用途：轉換陣列中的每個元素
   - 語法：array.map(callback)
   - 回傳：新陣列（每個元素都經過轉換）
   - 範例：[1, 2, 3].map(num => num * 2)  // [2, 4, 6]

3. 展開運算子 (...)
   - 用途：複製物件或陣列（淺拷貝）
   - 語法：{ ...原物件 } 或 [ ...原陣列 ]
   - 重要：可以在複製的同時覆寫特定屬性
   - 範例：
     const obj1 = { a: 1, b: 2 };
     const obj2 = { ...obj1, b: 3 };  // { a: 1, b: 3 }

4. 不可變性 (Immutability)
   - 原則：不修改原始資料，而是創建新的資料
   - 優點：
     * 避免副作用（side effects）
     * 容易追蹤資料變化
     * 方便實作復原功能
     * 在 React 等框架中是最佳實踐
   - 本題要求「原有 products 不得被改變」就是在強調不可變性

5. Method Chaining（方法鏈）
   - 將多個方法串接在一起
   - 範例：
     products
       .filter(p => p.stock < 10)
       .map(p => p.name)
   - 優點：程式碼簡潔、易讀

*/
