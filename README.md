# Line_Notify_assistant
今天要介紹的是 **Line Notify 定時推播圖文機器人** 🔥！ 它能做的事很多，又不像是 LINE BOT 有推播訊息則數的限制，可以製作許多個人小工具。  
本篇要介紹的機器人製作方式，是使用 `Google apps script`(簡稱GAS) 加上 `Google Excel` 試算表來完成。 甚麼是 Google apps script 呢？其名稱的由來，部分原因是它的程式語法基本上是繼承 JavaScript 進一步擴展，它能操作的對象是 Google 的各項產品應用，`「Google apps script」=「Google apps」+「JavaScript」`。所以只要熟悉 JS 語法，即可應用 GAS 玩出許多變化。  
  
筆者之前做過 Line Notify 個人助理，像這樣：  
<img src="https://github.com/HannahHunag/Line_Notify_assistant/blob/main/Pictures/%E5%80%8B%E4%BA%BA%E5%8A%A9%E7%90%86.jpg"  lign="left"  width="250"/> 

今天要介紹的圖文推播機器人可以放在群組裡，而且**沒有推播訊息則數限制**，成果長這樣：  
<img src="https://github.com/HannahHunag/Line_Notify_assistant/blob/main/Pictures/%E5%9C%96%E6%96%87%E6%A9%9F%E5%99%A8%E4%BA%BA2.jpg"  lign="left"  width="250"/> 
  
  
## 📌 事前準備工作：
首先，到自己的Google帳號中，開啟一新的**Google App Script**專案，以及新的**Google試算表**。  
並事先將欲推播之圖片存在Google Drive，權限設為公開。 
  
  
## 📌 Excel 試算表的欄位配置如下：  
以下為筆者的欄位配置方法，以及 Excel 指令，僅供參考：
* B欄放入欲使機器人提醒之**日期**
* D欄放入欲在LINE中呈現之**內容**
* I欄放入存在Google Drive的**圖片網址**
* J欄放入**壓縮過後的圖片網址**
* A欄放入指令如下，意思是若B欄的日期是今天，就會在A欄呈現「Today」字樣。是為了讓後端 GAS 語法抓得到「Today」這一列的資訊。如此一來，**推播的圖文內容就會隨著日期的不同而變化**。  
`=if(B55=TODAY(),"Today","")`  
  <img src="https://github.com/HannahHunag/Line_Notify_assistant/blob/main/Pictures/today.png" lign="left"  width="900"/>  
* E欄放入的指令如下，為了檢查放入的圖片數量  
`=if(COUNTA(F55:G55)>0,COUNTA(F55:G55),"")`    
  <img src="https://github.com/HannahHunag/Line_Notify_assistant/blob/main/Pictures/picture_count.png" lign="left"  width="900"/>  
* K欄放入的指令如下，將I欄的圖片轉換格式  
`=if(I55="","","https://drive.google.com/uc?export=download&id="&REGEXREPLACE(I55,"/view.*|^.*d/|^.*d=|^.*folders/","")&"#")`
  <img src="https://github.com/HannahHunag/Line_Notify_assistant/blob/main/Pictures/K.png" lign="left"  width="900"/>  
* L欄放入的指令如下，將J欄的圖片轉換格式  
`=if(J55="","","https://drive.google.com/uc?export=download&id="&REGEXREPLACE(J55,"/view.*|^.*d/|^.*d=|^.*folders/","")&"#")`
  <img src="https://github.com/HannahHunag/Line_Notify_assistant/blob/main/Pictures/L.png" lign="left"  width="900"/>  
  
## 📌 Google App Script 程式碼  
完整程式碼請參考.js檔，以下僅提兩點注意事項：  
**第 4 行**要放入以下兩項資訊 
* Excel試算表的網址中間段，例如此網址「d/」和「/edit#gid=0」中間`「XXXXX」`的部分：https://docs.google.com/spreadsheets/d/XXXXX/edit#gid=0
* 以及放入試算表分頁名稱
```js
var sheet = SpreadsheetApp.openById('你的Excel試算表的網址中間段').getSheetByName('Excel試算表分頁名稱');
```
**第 32 行**要放入
* 在 [LINE Notify 官網](https://notify-bot.line.me/zh_TW/) 申請的 token
```js
var token = "Your_LINE_Notify_token";
```

## 📌 設定自動推播時間
最後的最後，設定完觸發條件，讓機器人定時推播圖文，就完成囉
* 在 GAS 中點選鬧鐘圖樣「**觸發條件**」  
<img src="https://github.com/HannahHunag/Line_Notify_assistant/blob/main/Pictures/%E8%A7%B8%E7%99%BC%E6%8C%89%E9%88%95.png" lign="left"  width="220"/>

* 並且點選介面右下角藍色按鈕「**新增觸發條件**」<img src="https://github.com/HannahHunag/Line_Notify_assistant/blob/main/Pictures/icon.png" lign="left"  width="100"/>，設定觸發時間，LINE Notify 機器人就會定時推播圖文
<img src="https://github.com/HannahHunag/Line_Notify_assistant/blob/main/Pictures/%E8%A7%B8%E7%99%BC%E6%99%82%E9%96%93.png" lign="left"  width="390"/>
  

