function myFunction() {
  // var token = "your_access_token";
  // 取得要發送的文字內容，這裡是取得儲存格的資料發出
  for(var time=1; time<=1; time++){
    // 這裡要填入你的Google_Excel網址以及分頁名稱
    if(time==1) var sheet = SpreadsheetApp.openById('Your_Google_Excel_URL').getSheetByName('Your_Google_Excel_分頁名稱');
    // rownum 是抓取資料的欄位範圍
    for(var rownum=130; rownum<=300; rownum++){
      var notice = sheet.getRange(rownum,1,1,1).getValues();
      if (notice=='Notice'){
        // var titlecontent = sheet.getRange(1,2,1,6).getValues(); //只抓第1列B~G欄 共6個。 //sheet.getRange(列號,欄號,列範圍,欄範圍)
        // var shortencontent = sheet.getRange(rownum,2,1,6).getValues(); //隨rownum變動列，抓B~G欄 共6個。 //sheet.getRange(列號,欄號,列範圍,欄範圍)
        var content="";
        // i 是設定抓取資料的列範圍
        for(i= 3; i< 8; i++){
          content = content + '\n' + sheet.getRange(1,i+2,1,1).getValues() + '：' + sheet.getRange(rownum,i+2,1,1).getValues();
          // 請確認，將試算表日期整個欄位，調整成純文字格式。這樣才不會有類似GMT+0800 (香港標準時間)的顯示。
        }
        var message = "" + content;
        // Line Notify 的 Access_Token
        var token = "Your_Access_Token";
        sendLineNotify(message, token);
      }
    }  
  }
}
function sendLineNotify(message, token){//, image){
  var options =
   {
     "method"  : "post",
     "payload" : {"message" : message},
     //"payload" : {"message" : message, "imageThumbnail" : image, "imageFullsize" : image},  /*https://devdocs.line.me/files/sticker_list.pdf used syntax as in URL:https://www.oxxostudio.tw/articles/201806/line-notify.html*/
     "headers" : {"Authorization" : "Bearer " + token}
   };
   UrlFetchApp.fetch("https://notify-api.line.me/api/notify", options);

}
