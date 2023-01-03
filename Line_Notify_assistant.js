function phototo() { //圖發送
  // 取得要發送的文字內容，這裡是取得儲存格的資料發出
  // 這裡要放入你的Excel試算表的網址中間段，以及分頁名稱
  var sheet = SpreadsheetApp.openById('你的Excel試算表的網址中間段').getSheetByName('Excel試算表分頁名稱');
  // rownum 為抓取的列範圍
  for(var rownum=2; rownum<=500; rownum++){
    var today = sheet.getRange(rownum,1,1,1).getValues();
    var imagesnum = sheet.getRange(rownum,5,1,1).getValues();
    // 抓取 Excel 試算表中「Today」那一列
    if (today=='Today' && imagesnum!=""){
      //var titlecontent = sheet.getRange(1,2,1,6).getValues(); //只抓第1列B~G欄 共6個。 //sheet.getRange(列號,欄號,列範圍,欄範圍)
      //var shortencontent = sheet.getRange(rownum,2,1,6).getValues(); //隨rownum變動列，抓B~G欄 共6個。 //sheet.getRange(列號,欄號,列範圍,欄範圍)
      var content="";
      // i 為抓取的欄位範圍
      for(i= 3; i< 4; i++){
        content ='\n' + sheet.getRange(rownum,4,1,1).getValues();
        //請確認，將試算表日期整個欄位，調整成純文字格式。這樣才不會有類似GMT+0800 (香港標準時間)的顯示。
      }
      var message = "" + content + " ";
      for(var imgurl=1; imgurl<=imagesnum; imgurl++){
//下面var image的圖片訊息，必須使用外部連結，若是Google Drive裡面的圖片，必須要開啟權限分享然後製作成外部連結型式
        var image = sheet.getRange(rownum,imgurl+5).getValue();
        image = image + '#';
        //var t = sheet.getRange(rownum,6,1,1).getValues();
        //message = t;
        if(imgurl==1){
          var fullsizeimg = image;
        }
        if(imgurl==2){
          var thumbnailimg = image;
          // 這裡要放入你自己的 LINE_Notify_token
          var token = "Your_LINE_Notify_token";
          SendImagesNotify(message, fullsizeimg, thumbnailimg, token);
        }
        if(imgurl>1) message = '';
      }  
    }
  }  
}
function SendImagesNotify(message, fullsizeimg, thumbnailimg, token){ //錯誤說明參考 https://notify-bot.line.me/doc/en/
  var options =
   {
     "method"  : "post",
     //"payload" : {"message" : message}, /*https://devdocs.line.me/files/sticker_list.pdf used syntax as in URL:https://www.oxxostudio.tw/articles/201806/line-notify.html*/
     "payload" : {"message" : message, "imageThumbnail" : thumbnailimg, "imageFullsize" : fullsizeimg}, /*https://devdocs.line.me/files/sticker_list.pdf used syntax as in URL:https://www.oxxostudio.tw/articles/201806/line-notify.html*/
     "headers" : {"Authorization" : "Bearer " + token},
     "muteHttpExceptions" : true
   };
   UrlFetchApp.fetch("https://notify-api.line.me/api/notify", options);
}


