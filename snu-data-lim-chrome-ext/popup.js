function doSomethingAfterwards(response){
  /* Do something else */
  //alert(response);
}

window.onload = function() {

  chrome.storage.sync.get({
    userID: '00000'
  }, function(items) {
    if(items.userID == '00000') {
      document.getElementById("data").innerHTML = "Goto <a target='_blank' href='chrome://extensions/'>chrome://extensions/</a> and set your UserID in this Extensions Settings";
    }
    else{
      chrome.runtime.sendMessage(
    {from: "popup", action: "doAjaxReq"},
    doSomethingAfterwards
  );

  chrome.runtime.onMessage.addListener( function(message, sender, sendResponse) {
  if(message.from && message.from === "bg"){
    switch(message.action){
      case "updateData":
        /* Do something */
        document.getElementById("data").innerHTML = message.value;
        var test = message.value;
        /* Maybe sendResponse(something) */
        sendResponse("globalres")
        break;
    }
  }
});
    }
  });

  

}
