# Line_Notify_assistant
打造專屬自己的 Line_Notify 機器人助理，讓機器人定時提醒代辦事項。  
首先，到自己的Google帳號中，開啟一新的**Google App Script**專案，以及新的**Google試算表**。  
筆者事先將欲呈現於 LINE 之圖片存在Google Drive，權限設為公開。 
  
### Excel 試算表的欄位配置如下：  
* B欄放入欲使機器人提醒之**日期**
* D欄放入欲在LINE中呈現之**內容**
* I欄放入存在Google Drive的**圖片網址**
* J欄放入**壓縮過後的圖片網址**
* A欄放入指令如下，意思是若B欄的日期是今天，就會在A欄呈現「Today」字樣。是為了讓後端GAS語法抓得到這一列的資訊。
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
  
### Google App Script 程式碼  
第四行要放入 
* Excel試算表的網址中間段，例如此網址**XXXXX**的部分：https://docs.google.com/spreadsheets/d/XXXXX/edit#gid=0
* 以及放入試算表分頁名稱
```js
var sheet = SpreadsheetApp.openById('你的Excel試算表的網址中間段').getSheetByName('Excel試算表分頁名稱');
```
第32行要放入在 LINE Notify 官網 (https://notify-bot.line.me/zh_TW/) 申請的 token
* 
```js
var token = "Your_LINE_Notify_token";
```

### 設定自動推播時間
* 在 GAS 中點選鬧鐘圖樣「**觸發條件**」  
<img src="https://github.com/HannahHunag/Line_Notify_assistant/blob/main/Pictures/%E8%A7%B8%E7%99%BC%E6%8C%89%E9%88%95.png" lign="left"  width="250"/>

* 並且設定觸發時間，LINE Notify 機器人就會定時推播圖文
<img src="https://github.com/HannahHunag/Line_Notify_assistant/blob/main/Pictures/%E8%A7%B8%E7%99%BC%E6%99%82%E9%96%93.png" lign="left"  width="250"/>
  
  
### 呈現在 LINE 中的圖文推播機器人長這樣：  
<img src="https://github.com/HannahHunag/Line_Notify_assistant/blob/main/Pictures/%E5%9C%96%E6%96%87%E6%A9%9F%E5%99%A8%E4%BA%BA1.jpg" lign="left"  width="250"/>

